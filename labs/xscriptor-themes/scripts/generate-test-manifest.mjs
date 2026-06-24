import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const BASE = path.join(ROOT, "themes/xscriptor-themes");
const ICON_DIR = path.join(BASE, "icons/test");
const MANIFEST = path.join(BASE, "icons/test.json");

const svgs = fs.readdirSync(ICON_DIR).filter(f => f.endsWith(".svg")).map(f => f.replace(".svg", ""));

function def(id) {
  return { iconPath: `./test/${id}.svg` };
}

// Icon definitions for all SVGs
const iconDefinitions = {};
for (const id of svgs) {
  iconDefinitions[id] = def(id);
}

// File extensions: map extension → icon id
const fileExtensions = {
  jsx: "jsx", tsx: "tsx", mdx: "mdx",
  js: "js", mjs: "js", cjs: "js",
  ts: "ts", mts: "ts", cts: "ts",
  css: "css", html: "html", htm: "html",
  json: "json", jsonl: "json", jsonc: "json",
  py: "python", pyw: "python",
  md: "markdown", markdown: "markdown",
  php: "php", phtml: "php",
  java: "java", class: "java",
  c: "c", h: "c",
  cpp: "cpp", cc: "cpp", cxx: "cpp", hpp: "cpp", hxx: "cpp",
  go: "go",
  rs: "rust", rb: "ruby",
  cs: "csharp",
  kt: "kotlin", kts: "kotlin",
  swift: "swift",
  sql: "sql",
  sh: "bash", bash: "bash", zsh: "bash", fish: "bash",
  dart: "dart",
  scala: "scala", sc: "scala",
  pl: "perl", pm: "perl",
  m: "objectivec", mm: "objectivec",
  r: "r", R: "r",
  mat: "matlab",
  hs: "haskell", lhs: "haskell",
  ex: "elixir", exs: "elixir",
  yml: "yaml", yaml: "yaml",
  toml: "conf", ini: "conf", cfg: "conf", conf: "conf", config: "conf",
  dockerfile: "docker",
  ps1: "powershell", psm1: "powershell", psd1: "powershell",
  lua: "lua",
  cob: "cobol", cbl: "cobol", cpy: "cobol",
  vue: "vue", svelte: "svelte", astro: "astro",
  scss: "scss", sass: "sass", less: "less",
  styl: "stylus",
  graphql: "graphql", gql: "graphql",
  prisma: "prisma",
  png: "image", jpg: "image", jpeg: "image", gif: "image",
  svg: "svg", webp: "image", bmp: "image", ico: "image",
  pdf: "pdf", csv: "csv", xml: "xml",
  xlsx: "xlsx", xls: "xlsx",
  docx: "docx", doc: "docx",
  wasm: "wasm",
  ttf: "font", otf: "font", woff: "font", woff2: "font",
  pem: "key", der: "key", key: "key", cert: "key", pub: "key",
  txt: "markdown", rst: "markdown", adoc: "markdown", log: "markdown",
  env: "conf",
};

// File names
const fileNames = {
  ".gitignore": "gitignore",
  "package.json": "packagejson",
  "package-lock.json": "packagelock",
  "yarn.lock": "yarn",
  "pnpm-lock.yaml": "pnpm",
  "tsconfig.json": "tsconfig",
  "jsconfig.json": "jsconfig",
  ".editorconfig": "editorconfig",
  ".env": "env",
  ".env.local": "env-local",
  ".env.example": "env-example",
  ".env.development": "env-development",
  "README.md": "readme",
  "LICENSE": "license",
  "CHANGELOG.md": "changelog",
  ".eslintrc.js": "eslint",
  ".eslintrc.json": "eslint",
  ".prettierrc": "prettier",
  "vite.config.js": "vite",
  "vite.config.ts": "vite",
  "webpack.config.js": "webpack",
  "next.config.js": "nextjs",
  ".babelrc": "babel",
  "index.html": "html",
  "index.js": "js",
  "index.ts": "ts",
  "Dockerfile": "docker",
  "docker-compose.yml": "docker",
  "docker-compose.yaml": "docker",
  ".dockerignore": "docker",
};

// Folder names — use the same set as X theme
const folderNames = {
  src: "folder-src", source: "folder-src", sources: "folder-src",
  tests: "folder-tests", test: "folder-tests", "__tests__": "folder-tests",
  docs: "folder-docs", doc: "folder-docs", documentation: "folder-docs",
  assets: "folder-assets", images: "folder-images", img: "folder-assets",
  icons: "folder-icons", icon: "folder-icon",
  config: "folder-config", conf: "folder-config", settings: "folder-config",
  node_modules: "folder-node",
  public: "folder-public", out: "folder-out", dist: "folder-dist", build: "folder-build",
  screenshots: "folder-screenshots", screenshot: "folder-screenshots",
  app: "folder-app", api: "folder-api",
  blog: "folder-blog",
  components: "folder-components", component: "folder-components",
  contact: "folder-contact", contacto: "folder-contact",
  info: "folder-info", terms: "folder-terms",
  pages: "folder-pages", page: "folder-pages",
  lib: "folder-lib", libs: "folder-lib", library: "folder-lib",
  php: "folder-php",
  fonts: "folder-fonts", font: "folder-fonts",
  preview: "folder-preview", x: "folder-x",
  general: "folder-general", basics: "folder-basics", basic: "folder-basics",
  android: "folder-android", ios: "folder-ios", web: "folder-web",
  ".vscode": "folder-vscode", vscode: "folder-vscode",
  ".github": "folder-github", ".git": "folder-git", ".husky": "folder-husky",
  workflows: "folder-workflows",
  ".next": "folder-next", nuxt: "folder-nuxt", ".svelte-kit": "folder-sveltekit",
  ".cache": "folder-cache", temp: "folder-temp", tmp: "folder-tmp",
  middleware: "folder-middleware", server: "folder-server",
  controllers: "folder-controllers", routes: "folder-routes",
  utils: "folder-utils", helpers: "folder-helpers", hooks: "folder-hooks",
  services: "folder-services", context: "folder-context", store: "folder-store",
  database: "folder-database", db: "folder-db",
  migrations: "folder-migrations", seeds: "folder-seeds", models: "folder-models",
  auth: "folder-auth", security: "folder-security", certs: "folder-certs",
  nemches: "folder-nemches", examples: "folder-examples", example: "folder-examples",
  target: "folder-target", ".cargo": "folder-cargo", cargo: "folder-cargo",
  bin: "folder-bin", include: "folder-include", obj: "folder-obj",
  release: "folder-release", installer: "folder-installer",
  sandbox: "folder-sandbox", playground: "folder-playground",
  drafts: "folder-drafts", draft: "folder-drafts",
  infra: "folder-infra", infrastructure: "folder-infra",
  docker: "folder-docker",
  translations: "folder-translations", translation: "folder-translations",
  localization: "folder-localization", locale: "folder-localization", locales: "folder-localization",
  styles: "folder-styles", style: "folder-styles", css: "folder-css",
  modules: "folder-modules", module: "folder-modules",
  plugins: "folder-plugins", plugin: "folder-plugins",
  extensions: "folder-extensions", extension: "folder-extensions",
  packages: "folder-packages", package: "folder-packages",
  dev: "folder-dev", ".devcontainer": "folder-devcontainer", devcontainer: "folder-devcontainer",
  gnome: "folder-gnome", kitty: "folder-kitty",
  terminal: "folder-terminal", konsole: "folder-konsole", powershell: "folder-powershell",
  mods: "folder-mods", mod: "folder-mods",
};

// Language IDs
const languageIds = {
  javascript: "js", typescript: "ts",
  javascriptreact: "jsx", typescriptreact: "tsx", mdx: "mdx",
  css: "css", scss: "scss", sass: "sass", less: "less", stylus: "stylus",
  html: "html", json: "json", jsonc: "json",
  python: "python", markdown: "markdown",
  php: "php", java: "java",
  c: "c", cpp: "cpp",
  go: "go", rust: "rust", ruby: "ruby",
  csharp: "csharp", kotlin: "kotlin", swift: "swift",
  sql: "sql", shellscript: "bash", dart: "dart",
  scala: "scala", perl: "perl", r: "r",
  "objective-c": "objectivec", matlab: "matlab",
  haskell: "haskell", elixir: "elixir",
  yaml: "yaml", xml: "xml", csv: "csv",
  dockerfile: "docker", dockercompose: "docker",
  powershell: "powershell", lua: "lua", cobol: "cobol",
  vue: "vue", svelte: "svelte", astro: "astro",
  graphql: "graphql", prisma: "prisma",
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
console.log(`Test manifest written: ${path.relative(ROOT, MANIFEST)}`);
console.log(`  iconDefinitions: ${Object.keys(iconDefinitions).length}`);
console.log(`  fileExtensions:  ${Object.keys(fileExtensions).length}`);
console.log(`  fileNames:       ${Object.keys(fileNames).length}`);
console.log(`  folderNames:     ${Object.keys(folderNames).length}`);
console.log(`  languageIds:     ${Object.keys(languageIds).length}`);
