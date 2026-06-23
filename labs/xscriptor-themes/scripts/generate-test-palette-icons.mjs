import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const BASE = path.join(ROOT, "themes/xscriptor-themes");
const SRC = path.join(BASE, "icons/colors");
const DST = path.join(BASE, "icons/test");
const MANIFEST = path.join(BASE, "icons/test.json");

// X palette — 6 distinct medium colors
const PALETTE = {
  pink:   "#fc618d",
  green:  "#7bd88f",
  yellow: "#fce566",
  orange: "#fd9353",
  purple: "#948ae3",
  cyan:   "#5ad4e6",
  dark:   "#0a0a0a",
  light:  "#f7f1ff",
};

// Luminance-based contrast text color
function luminance(hex) {
  const r = parseInt(hex.slice(1,3), 16) / 255;
  const g = parseInt(hex.slice(3,5), 16) / 255;
  const b = parseInt(hex.slice(5,7), 16) / 255;
  const toLinear = (c) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function contrastRatio(fgLum, bgLum) {
  const lighter = Math.max(fgLum, bgLum);
  const darker = Math.min(fgLum, bgLum);
  return (lighter + 0.05) / (darker + 0.05);
}

function textColor(bg) {
  const bgLum = luminance(bg);
  const withDark = contrastRatio(luminance(PALETTE.dark), bgLum);
  const withLight = contrastRatio(luminance(PALETTE.light), bgLum);
  if (withDark >= 4.5) return PALETTE.dark;
  if (withLight >= 4.5) return PALETTE.light;
  return withDark > withLight ? PALETTE.dark : PALETTE.light;
}

// Cycle through palette colors for language backgrounds
const paletteColors = [PALETTE.pink, PALETTE.green, PALETTE.yellow, PALETTE.orange, PALETTE.purple, PALETTE.cyan];
let bgIdx = 0;
function nextBg() { const c = paletteColors[bgIdx % paletteColors.length]; bgIdx++; return c; }

function svg(bg, label) {
  const fg = textColor(bg);
  const size = 24;
  const xColor = fg;
  let fontSize;
  if (label.length <= 2) fontSize = 9;
  else if (label.length === 3) fontSize = 7;
  else fontSize = 5;

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="16" height="16">`,
    `  <rect x="0" y="0" width="${size}" height="${size}" fill="${bg}" rx="3" ry="3"/>`,
    `  <text x="${size / 2}" y="${size / 2 + fontSize * 0.35}" text-anchor="middle" fill="${fg}" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="bold">${label}</text>`,
    `  <text x="${size - 3}" y="7" text-anchor="middle" fill="${xColor}" font-family="Arial, sans-serif" font-size="4" font-weight="bold" opacity="0.8">x</text>`,
    `</svg>`,
  ].join("\n") + "\n";
}

const LANGS = [
  "js", "ts", "jsx", "tsx", "mdx",
  "css", "html", "json",
  "python", "markdown", "php", "java",
  "c", "cpp", "go", "rust", "ruby",
  "csharp", "kotlin", "swift", "sql",
  "bash", "dart", "scala", "perl",
  "objectivec", "r", "matlab", "haskell", "elixir",
  "yaml", "docker", "powershell", "lua", "cobol",
  "vue", "svelte", "astro",
  "scss", "sass", "less", "stylus",
  "graphql", "prisma",
];

const LABELS = {
  js:"JS", ts:"TS", jsx:"JSX", tsx:"TSX", mdx:"MDX",
  css:"CSS", html:"H", json:"{}",
  python:"PY", markdown:"MD", php:"PHP", java:"JV",
  c:"C", cpp:"C++", go:"GO", rust:"RS", ruby:"RB",
  csharp:"C#", kotlin:"KT", swift:"SW", sql:"SQL",
  bash:"SH", dart:"DT", scala:"SC", perl:"PL",
  objectivec:"OC", r:"R", matlab:"M", haskell:"HS", elixir:"EX",
  yaml:"YML", docker:"D", powershell:"PS", lua:"LUA", cobol:"COB",
  vue:"VUE", svelte:"SV", astro:"AST",
  scss:"SCS", sass:"SAS", less:"LES", stylus:"STY",
  graphql:"GQL", prisma:"PR",
};

const SPECIALS = [
  { id:"gitignore",      label:"!" },
  { id:"packagejson",    label:"{}" },
  { id:"tsconfig",       label:"TS" },
  { id:"readme",         label:"MD" },
  { id:"license",        label:"©" },
  { id:"env",            label:"ENV" },
  { id:"env-local",      label:"ENV" },
  { id:"env-example",    label:"ENV" },
  { id:"env-development",label:"ENV" },
  { id:"editorconfig",   label:"EC" },
  { id:"eslint",         label:"ES" },
  { id:"prettier",       label:"PR" },
  { id:"vite",           label:"V" },
  { id:"webpack",        label:"WP" },
  { id:"nextjs",         label:"N" },
  { id:"babel",          label:"B" },
  { id:"changelog",      label:"CL" },
  { id:"packagelock",    label:"{}" },
  { id:"yarn",           label:"Y" },
  { id:"pnpm",           label:"PN" },
  { id:"jsconfig",       label:"JS" },
  { id:"csv",            label:"CSV" },
  { id:"xml",            label:"XML" },
  { id:"svg",            label:"SVG" },
  { id:"pdf",            label:"PDF" },
  { id:"xlsx",           label:"XLS" },
  { id:"docx",           label:"DOC" },
  { id:"wasm",           label:"W" },
  { id:"font",           label:"F" },
  { id:"key",            label:"🔑" },
  { id:"conf",           label:"CFG" },
  { id:"terminal",       label:">_" },
  { id:"file",           label:"F" },
  { id:"image",          label:"IMG" },
];

console.log("Generating 'test' icon theme with X palette colors...\n");

fs.mkdirSync(DST, { recursive: true });

// Copy folder SVGs from colors/
console.log("1. Copying folder SVGs from colors/...");
const folderSvgs = fs.readdirSync(SRC).filter(f => f.startsWith("folder-") && f.endsWith(".svg"));
for (const f of folderSvgs) {
  fs.copyFileSync(path.join(SRC, f), path.join(DST, f));
}
console.log(`   ${folderSvgs.length} folder SVGs copied`);

// Generate language SVGs with palette colors
console.log("2. Generating language SVGs with X palette colors...");
for (const id of LANGS) {
  const bg = nextBg();
  const label = LABELS[id] || id.toUpperCase();
  fs.writeFileSync(path.join(DST, id + ".svg"), svg(bg, label));
}
console.log(`   ${LANGS.length} language SVGs (backgrounds cycle through 6 palette colors)`);

// Generate special file SVGs
console.log("3. Generating special file SVGs...");
for (const s of SPECIALS) {
  const bg = nextBg();
  fs.writeFileSync(path.join(DST, s.id + ".svg"), svg(bg, s.label));
}
console.log(`   ${SPECIALS.length} special SVGs`);

// Copy folder.svg and file.svg if missing
for (const f of ["folder.svg", "file.svg"]) {
  if (!fs.existsSync(path.join(DST, f)) && fs.existsSync(path.join(SRC, f))) {
    fs.copyFileSync(path.join(SRC, f), path.join(DST, f));
  }
}

// ── Generate manifest ──
console.log("\n4. Generating test.json manifest...");

const svgFiles = fs.readdirSync(DST).filter(f => f.endsWith(".svg")).map(f => f.replace(".svg", ""));

const iconDefinitions = {};
for (const id of svgFiles) {
  iconDefinitions[id] = { iconPath: `./test/${id}.svg` };
}

const fileExtensions = {
  jsx:"jsx", tsx:"tsx", mdx:"mdx",
  js:"js", mjs:"js", cjs:"js",
  ts:"ts", mts:"ts", cts:"ts",
  css:"css", html:"html", htm:"html",
  json:"json", jsonl:"json", jsonc:"json",
  py:"python", pyw:"python",
  md:"markdown", markdown:"markdown",
  php:"php", phtml:"php",
  java:"java", class:"java",
  c:"c", h:"c",
  cpp:"cpp", cc:"cpp", cxx:"cpp", hpp:"cpp", hxx:"cpp",
  go:"go",
  rs:"rust", rb:"ruby",
  cs:"csharp",
  kt:"kotlin", kts:"kotlin",
  swift:"swift",
  sql:"sql",
  sh:"bash", bash:"bash", zsh:"bash", fish:"bash",
  dart:"dart",
  scala:"scala", sc:"scala",
  pl:"perl", pm:"perl",
  m:"objectivec", mm:"objectivec",
  r:"r",
  mat:"matlab",
  hs:"haskell", lhs:"haskell",
  ex:"elixir", exs:"elixir",
  yml:"yaml", yaml:"yaml",
  toml:"conf", ini:"conf", cfg:"conf", conf:"conf", config:"conf",
  dockerfile:"docker",
  ps1:"powershell", psm1:"powershell", psd1:"powershell",
  lua:"lua",
  cob:"cobol", cbl:"cobol", cpy:"cobol",
  vue:"vue", svelte:"svelte", astro:"astro",
  scss:"scss", sass:"sass", less:"less", styl:"stylus",
  graphql:"graphql", gql:"graphql",
  prisma:"prisma",
  png:"image", jpg:"image", jpeg:"image", gif:"image",
  svg:"svg", webp:"image", bmp:"image", ico:"image",
  pdf:"pdf", csv:"csv", xml:"xml",
  xlsx:"xlsx", xls:"xlsx",
  docx:"docx", doc:"docx",
  wasm:"wasm",
  ttf:"font", otf:"font", woff:"font", woff2:"font",
  pem:"key", der:"key", key:"key", cert:"key", pub:"key",
  txt:"markdown", rst:"markdown", adoc:"markdown", log:"markdown",
  env:"conf",
};

const fileNames = {
  ".gitignore":"gitignore",
  "package.json":"packagejson", "package-lock.json":"packagelock",
  "yarn.lock":"yarn", "pnpm-lock.yaml":"pnpm",
  "tsconfig.json":"tsconfig", "jsconfig.json":"jsconfig",
  ".editorconfig":"editorconfig",
  ".env":"env", ".env.local":"env-local", ".env.example":"env-example", ".env.development":"env-development",
  "README.md":"readme", "LICENSE":"license", "CHANGELOG.md":"changelog",
  ".eslintrc.js":"eslint", ".eslintrc.json":"eslint",
  ".prettierrc":"prettier",
  "vite.config.js":"vite", "vite.config.ts":"vite",
  "webpack.config.js":"webpack", "next.config.js":"nextjs",
  ".babelrc":"babel",
  "index.html":"html", "index.js":"js", "index.ts":"ts",
  "Dockerfile":"docker", "docker-compose.yml":"docker", "docker-compose.yaml":"docker", ".dockerignore":"docker",
};

const folderNames = {
  src:"folder-src", source:"folder-src", sources:"folder-src",
  scripts:"folder-src", script:"folder-src",
  tests:"folder-tests", test:"folder-tests", __tests__:"folder-tests",
  docs:"folder-docs", doc:"folder-docs", documentation:"folder-docs",
  assets:"folder-assets", images:"folder-images", img:"folder-assets",
  icons:"folder-icons", icon:"folder-icon",
  config:"folder-config", conf:"folder-config", settings:"folder-config",
  node_modules:"folder-node",
  public:"folder-public", out:"folder-out", dist:"folder-dist", build:"folder-build",
  screenshots:"folder-screenshots", screenshot:"folder-screenshots",
  app:"folder-app", api:"folder-api", blog:"folder-blog",
  components:"folder-components", component:"folder-components",
  contact:"folder-contact", contacto:"folder-contact",
  info:"folder-info", terms:"folder-terms",
  pages:"folder-pages", page:"folder-pages",
  lib:"folder-lib", libs:"folder-lib", library:"folder-lib",
  php:"folder-php", fonts:"folder-fonts", font:"folder-fonts",
  preview:"folder-preview", x:"folder-x",
  general:"folder-general", basics:"folder-basics", basic:"folder-basics",
  android:"folder-android", ios:"folder-ios", web:"folder-web",
  ".vscode":"folder-vscode", vscode:"folder-vscode",
  ".github":"folder-github", ".git":"folder-git", ".husky":"folder-husky",
  workflows:"folder-workflows",
  ".next":"folder-next", nuxt:"folder-nuxt", ".svelte-kit":"folder-sveltekit",
  ".cache":"folder-cache", temp:"folder-temp", tmp:"folder-tmp",
  middleware:"folder-middleware", server:"folder-server",
  controllers:"folder-controllers", routes:"folder-routes",
  utils:"folder-utils", helpers:"folder-helpers", hooks:"folder-hooks",
  services:"folder-services", context:"folder-context", store:"folder-store",
  database:"folder-database", db:"folder-db",
  migrations:"folder-migrations", seeds:"folder-seeds", models:"folder-models",
  auth:"folder-auth", security:"folder-security", certs:"folder-certs",
  nemches:"folder-nemches", examples:"folder-examples", example:"folder-examples",
  target:"folder-target", ".cargo":"folder-cargo", cargo:"folder-cargo",
  bin:"folder-bin", include:"folder-include", obj:"folder-obj",
  release:"folder-release", installer:"folder-installer",
  sandbox:"folder-sandbox", playground:"folder-playground",
  drafts:"folder-drafts", draft:"folder-drafts",
  infra:"folder-infra", infrastructure:"folder-infra",
  docker:"folder-docker",
  translations:"folder-translations", translation:"folder-translations",
  localization:"folder-localization", locale:"folder-localization", locales:"folder-localization",
  styles:"folder-styles", style:"folder-styles", css:"folder-css",
  modules:"folder-modules", module:"folder-modules",
  plugins:"folder-plugins", plugin:"folder-plugins",
  extensions:"folder-extensions", extension:"folder-extensions",
  packages:"folder-packages", package:"folder-packages",
  dev:"folder-dev", ".devcontainer":"folder-devcontainer", devcontainer:"folder-devcontainer",
  gnome:"folder-gnome", kitty:"folder-kitty",
  terminal:"folder-terminal", konsole:"folder-konsole", powershell:"folder-powershell",
  mods:"folder-mods", mod:"folder-mods",
  tools:"folder-utils", tool:"folder-utils",
  vendor:"folder-node", vendors:"folder-node",
  views:"folder-components", view:"folder-components",
  data:"folder-database",
  types:"folder-src", type:"folder-src",
  schemas:"folder-models", schema:"folder-models",
  events:"folder-services", event:"folder-services",
  jobs:"folder-services",
  mail:"folder-contact",
  notifications:"folder-info", notification:"folder-info",
  storage:"folder-database",
  logs:"folder-out", log:"folder-out",
};

// Dot-prefixed folders → folder-github
const dotFolders = [
  ".terraform",".kube",".ssh",".aws",".azure",".gcloud",
  ".bundle",".gem",".pip",".venv",".tox",
  ".mypy_cache",".pytest_cache",".ruff_cache",
  ".angular",".expo",".expo-shared",".metro",
  ".svn",".hg",".bzr",
  ".npm",".nvm",".pnpm",".yarn",".rush",".lerna",
  ".envs",".ebextensions",".elasticbeanstalk",".platform",
  ".circleci",".travis",".jenkins",".drone",".semaphore",
  ".bitbucket",".gitlab",".devops",
  ".vscode-test",
  ".cursor",".windsurf",".zed",".continue",".aider",".cline",
  ".opencode",".agents",".roo",".gemini",".copilot",".copilot-ut",
  ".codex",".tabby",".codium",".qoder",".pearai",".void",
  ".augment",".sourcegraph",".supermaven",".avante",
  ".storybook",".changeset",".turbo",".nx",
  ".eslintcache",
  ".pnpm-store",".yarnrc",".npmrc",
  ".envrc",".direnv",
  ".cmake",".gradle",".mvn",
  ".pulumi",".cdk",".cdktf",
  ".serverless",".sam",".chalice",
  ".netlify",".vercel",".firebase",
  ".supabase",".planetscale",
  ".dvc",".mlflow",".wandb",
  ".jupyter",".ipynb_checkpoints",
  ".streamlit",".gradio",
  ".openapi",".redoc",
];
for (const d of dotFolders) {
  folderNames[d] = "folder-github";
}

const languageIds = {
  javascript:"js", typescript:"ts",
  javascriptreact:"jsx", typescriptreact:"tsx", mdx:"mdx",
  css:"css", scss:"scss", sass:"sass", less:"less", stylus:"stylus",
  html:"html", json:"json", jsonc:"json",
  python:"python", markdown:"markdown",
  php:"php", java:"java",
  c:"c", cpp:"cpp",
  go:"go", rust:"rust", ruby:"ruby",
  csharp:"csharp", kotlin:"kotlin", swift:"swift",
  sql:"sql", shellscript:"bash", dart:"dart",
  scala:"scala", perl:"perl", r:"r",
  "objective-c":"objectivec", matlab:"matlab",
  haskell:"haskell", elixir:"elixir",
  yaml:"yaml", xml:"xml", csv:"csv",
  dockerfile:"docker", dockercompose:"docker",
  powershell:"powershell", lua:"lua", cobol:"cobol",
  vue:"vue", svelte:"svelte", astro:"astro",
  graphql:"graphql", prisma:"prisma",
};

const manifest = {
  showLanguageModeIcons: true,
  iconDefinitions,
  file: "file",
  folder: "folder",
  folderExpanded: "folder",
  rootFolder: "folder",
  rootFolderExpanded: "folder",
  fileExtensions,
  fileNames,
  folderNames,
  folderNamesExpanded: folderNames,
  languageIds,
};

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));

// ── Register in package.json ──
const pkg = JSON.parse(fs.readFileSync(path.join(BASE, "package.json"), "utf8"));
const hasTest = pkg.contributes.iconThemes.some(t => t.id === "test-icons");
if (!hasTest) {
  pkg.contributes.iconThemes.push({
    id: "test-icons",
    label: "Test",
    path: "./icons/test.json",
  });
  fs.writeFileSync(path.join(BASE, "package.json"), JSON.stringify(pkg, null, 2));
  console.log("\n5. Registered test-icons in package.json");
} else {
  console.log("\n5. test-icons already registered");
}

// Summary
const allSvgs = fs.readdirSync(DST).filter(f => f.endsWith(".svg"));
console.log(`\nDone.`);
console.log(`  SVGs:    ${allSvgs.length}`);
console.log(`  Palette: 6 distinct X colors + 2 neutrals for contrast`);
console.log(`  Manifest: ${Object.keys(iconDefinitions).length} definitions`);
console.log(`  Folders:  ${Object.keys(folderNames).length} names`);
