import fs from "fs";
import path from "path";

const BASE = path.join(process.cwd(), "themes/xscriptor-themes/icons");
const DIR = path.join(BASE, "colors");

const CIRCLE_COLORS = ["#fc618d", "#7bd88f", "#fce566", "#fd9353", "#948ae3", "#5ad4e6"];

const LANGS = {
  js:["#f7df1e","#000000","JS"], ts:["#3178c6","#ffffff","TS"],
  jsx:["#61dafb","#000000","JSX"], tsx:["#3178c6","#ffffff","TSX"],
  mdx:["#1a1a1a","#f9ac00","MDX"], css:["#1572b6","#ffffff","CSS"],
  html:["#e34f26","#ffffff","H"], json:["#5a5a5a","#ffffff","{}"],
  python:["#3776ab","#ffde57","PY"], markdown:["#083fa1","#ffffff","MD"],
  php:["#777bb4","#000000","PHP"], java:["#b07219","#ffffff","JV"],
  c:["#555555","#ffffff","C"], cpp:["#00599c","#ffffff","C++"],
  go:["#00add8","#000000","GO"], rust:["#000000","#dea584","RS"],
  ruby:["#cc342d","#ffffff","RB"], csharp:["#239120","#ffffff","C#"],
  kotlin:["#7f52ff","#ffffff","KT"], swift:["#f05138","#ffffff","SW"],
  sql:["#336791","#ffffff","SQL"], bash:["#4eaa25","#000000","SH"],
  dart:["#0175c2","#ffffff","DT"], scala:["#dc322f","#ffffff","SC"],
  perl:["#39457e","#ffffff","PL"], objectivec:["#438eff","#ffffff","OC"],
  r:["#276dc3","#ffffff","R"], matlab:["#e16737","#ffffff","M"],
  haskell:["#5e5086","#ffffff","HS"], elixir:["#4e2a8e","#ffffff","EX"],
  yaml:["#cb171e","#ffffff","YML"], docker:["#2496ed","#ffffff","D"],
  powershell:["#5391fe","#ffffff","PS"], lua:["#000080","#ffffff","LUA"],
  cobol:["#02569b","#ffffff","COB"], vue:["#4fc08d","#000000","VUE"],
  svelte:["#ff3e00","#ffffff","SV"], astro:["#ff5a03","#ffffff","AST"],
  scss:["#cc6699","#ffffff","SCS"], sass:["#cc6699","#ffffff","SAS"],
  less:["#1d365d","#ffffff","LES"], stylus:["#333333","#b3d107","STY"],
  graphql:["#e10098","#ffffff","GQL"], prisma:["#2d3748","#ffffff","PR"],
};
const SPECS = {
  gitignore:["#f05033","#ffffff","!"], packagejson:["#cb3837","#ffffff","{}"],
  tsconfig:["#3178c6","#ffffff","TS"], readme:["#083fa1","#ffffff","MD"],
  license:["#5a5a5a","#ffffff","©"], env:["#ecd53f","#000000","ENV"],
  "env-local":["#ecd53f","#000000","ENV"], "env-example":["#ecd53f","#000000","ENV"],
  "env-development":["#ecd53f","#000000","ENV"], editorconfig:["#333333","#f9f9f9","EC"],
  eslint:["#4b32c3","#ffffff","ES"], prettier:["#f7b93e","#000000","PR"],
  vite:["#646cff","#ffffff","V"], webpack:["#8dd6f9","#000000","WP"],
  nextjs:["#000000","#ffffff","N"], babel:["#f9dc3e","#000000","B"],
  changelog:["#5a5a5a","#ffffff","CL"], packagelock:["#999999","#ffffff","{}"],
  yarn:["#2c8ebb","#ffffff","Y"], pnpm:["#f69220","#ffffff","PN"],
  jsconfig:["#f7df1e","#000000","JS"], csv:["#217346","#ffffff","CSV"],
  xml:["#0060ac","#ffffff","XML"], svg:["#ffb13b","#000000","SVG"],
  pdf:["#dc143c","#ffffff","PDF"], xlsx:["#217346","#ffffff","XLS"],
  docx:["#2b579a","#ffffff","DOC"], wasm:["#654ff0","#ffffff","W"],
  font:["#555555","#ffffff","F"], key:["#f9dc3e","#000000","🔑"],
  conf:["#6c6c6c","#ffffff","CFG"], file:["#444444","#aaaaaa","F"],
  image:["#cc6699","#ffffff","IMG"],
};

// Same FEXTS, FNAMES, FOLDERS, LIDS as other themes
const FEXTS={jsx:"jsx",tsx:"tsx",mdx:"mdx",js:"js",mjs:"js",cjs:"js",ts:"ts",mts:"ts",cts:"ts",css:"css",html:"html",htm:"html",json:"json",jsonl:"json",jsonc:"json",py:"python",pyw:"python",md:"markdown",markdown:"markdown",php:"php",phtml:"php",java:"java",class:"java",c:"c",h:"c",cpp:"cpp",cc:"cpp",cxx:"cpp",hpp:"cpp",hxx:"cpp",go:"go",rs:"rust",rb:"ruby",cs:"csharp",kt:"kotlin",kts:"kotlin",swift:"swift",sql:"sql",sh:"terminal",bash:"bash",zsh:"bash",fish:"bash",dart:"dart",scala:"scala",sc:"scala",pl:"perl",pm:"perl",m:"objectivec",mm:"objectivec",r:"r",mat:"matlab",hs:"haskell",lhs:"haskell",ex:"elixir",exs:"elixir",yml:"yaml",yaml:"yaml",toml:"conf",ini:"conf",cfg:"conf",conf:"conf",config:"conf",dockerfile:"docker",ps1:"terminal",psm1:"powershell",psd1:"powershell",lua:"lua",cob:"cobol",cbl:"cobol",cpy:"cobol",vue:"vue",svelte:"svelte",astro:"astro",scss:"scss",sass:"sass",less:"less",styl:"stylus",graphql:"graphql",gql:"graphql",prisma:"prisma",png:"image",jpg:"image",jpeg:"image",gif:"image",svg:"svg",webp:"image",bmp:"image",ico:"image",pdf:"pdf",csv:"csv",xml:"xml",xlsx:"xlsx",xls:"xlsx",docx:"docx",doc:"docx",wasm:"wasm",ttf:"font",otf:"font",woff:"font",woff2:"font",pem:"key",der:"key",key:"key",cert:"key",pub:"key",txt:"markdown",rst:"markdown",adoc:"markdown",log:"markdown",env:"conf"};
const FNAMES={".gitignore":"gitignore","package.json":"packagejson","package-lock.json":"packagelock","yarn.lock":"yarn","pnpm-lock.yaml":"pnpm","tsconfig.json":"tsconfig","jsconfig.json":"jsconfig",".editorconfig":"editorconfig",".env":"env",".env.local":"env-local",".env.example":"env-example",".env.development":"env-development","README.md":"readme","LICENSE":"license","CHANGELOG.md":"changelog",".eslintrc.js":"eslint",".eslintrc.json":"eslint",".prettierrc":"prettier","vite.config.js":"vite","vite.config.ts":"vite","webpack.config.js":"webpack","next.config.js":"nextjs",".babelrc":"babel","index.html":"html","index.js":"js","index.ts":"ts","Dockerfile":"docker","docker-compose.yml":"docker","docker-compose.yaml":"docker",".dockerignore":"docker"};
const FOLDERS={src:"folder-src",source:"folder-src",sources:"folder-src",scripts:"folder-terminal",script:"folder-terminal",tests:"folder-tests",test:"folder-tests","__tests__":"folder-tests",docs:"folder-docs",doc:"folder-docs",documentation:"folder-docs",assets:"folder-assets",images:"folder-images",img:"folder-assets",icons:"folder-icons",icon:"folder-icon",config:"folder-config",conf:"folder-config",settings:"folder-config",node_modules:"folder-node",public:"folder-public",out:"folder-out",dist:"folder-dist",build:"folder-build",screenshots:"folder-screenshots",screenshot:"folder-screenshots",app:"folder-app",api:"folder-api",blog:"folder-blog",components:"folder-components",component:"folder-components",contact:"folder-contact",contacto:"folder-contact",info:"folder-info",terms:"folder-terms",pages:"folder-pages",page:"folder-pages",lib:"folder-lib",libs:"folder-lib",library:"folder-lib",php:"folder-php",fonts:"folder-fonts",font:"folder-fonts",preview:"folder-preview",x:"folder-x",general:"folder-general",basics:"folder-basics",basic:"folder-basics",android:"folder-android",ios:"folder-ios",web:"folder-web",".vscode":"folder-vscode",vscode:"folder-vscode",".github":"folder-github",".git":"folder-git",".husky":"folder-husky",workflows:"folder-workflows",".next":"folder-next",nuxt:"folder-nuxt",".svelte-kit":"folder-sveltekit",".cache":"folder-cache",temp:"folder-temp",tmp:"folder-tmp",middleware:"folder-middleware",server:"folder-server",controllers:"folder-controllers",routes:"folder-routes",terminal:"folder-terminal",shell:"folder-terminal",console:"folder-terminal",utils:"folder-utils",helpers:"folder-helpers",hooks:"folder-hooks",services:"folder-services",context:"folder-context",store:"folder-store",database:"folder-database",db:"folder-db",migrations:"folder-migrations",seeds:"folder-seeds",models:"folder-models",auth:"folder-auth",security:"folder-security",certs:"folder-certs",nemches:"folder-nemches",examples:"folder-examples",example:"folder-examples",target:"folder-target",".cargo":"folder-cargo",cargo:"folder-cargo",bin:"folder-bin",include:"folder-include",obj:"folder-obj",release:"folder-release",installer:"folder-installer",sandbox:"folder-sandbox",playground:"folder-playground",drafts:"folder-drafts",draft:"folder-drafts",infra:"folder-infra",infrastructure:"folder-infra",docker:"folder-docker",translations:"folder-translations",translation:"folder-translations",localization:"folder-localization",locale:"folder-localization",locales:"folder-localization",styles:"folder-styles",style:"folder-styles",css:"folder-css",modules:"folder-modules",module:"folder-modules",plugins:"folder-plugins",plugin:"folder-plugins",extensions:"folder-extensions",extension:"folder-extensions",packages:"folder-packages",package:"folder-packages",dev:"folder-dev",".devcontainer":"folder-devcontainer",devcontainer:"folder-devcontainer",gnome:"folder-gnome",kitty:"folder-kitty",konsole:"folder-terminal",powershell:"folder-terminal",mods:"folder-mods",mod:"folder-mods",tools:"folder-utils",tool:"folder-utils",vendor:"folder-node",vendors:"folder-node",views:"folder-components",view:"folder-components",data:"folder-database",types:"folder-src",type:"folder-src",schemas:"folder-models",schema:"folder-models",events:"folder-services",event:"folder-services",jobs:"folder-services",mail:"folder-contact",notifications:"folder-info",notification:"folder-info",storage:"folder-database",logs:"folder-out",log:"folder-out",".terraform":"folder-github",".kube":"folder-github",".ssh":"folder-security",".aws":"folder-github",".azure":"folder-github",".gcloud":"folder-github",".bundle":"folder-node",".gem":"folder-node",".pip":"folder-node",".venv":"folder-node",".tox":"folder-node",".mypy_cache":"folder-cache",".pytest_cache":"folder-cache",".ruff_cache":"folder-cache",".angular":"folder-config",".expo":"folder-config",".expo-shared":"folder-config",".metro":"folder-config",".svn":"folder-git",".hg":"folder-git",".bzr":"folder-git",".npm":"folder-node",".nvm":"folder-node",".pnpm":"folder-node",".yarn":"folder-node",".rush":"folder-node",".lerna":"folder-node",".envs":"folder-config",".ebextensions":"folder-github",".elasticbeanstalk":"folder-github",".platform":"folder-github",".circleci":"folder-github",".travis":"folder-github",".jenkins":"folder-github",".drone":"folder-github",".semaphore":"folder-github",".bitbucket":"folder-github",".gitlab":"folder-github",".devops":"folder-github",".vscode-test":"folder-vscode",".cursor":"folder-vscode",".windsurf":"folder-vscode",".zed":"folder-vscode",".continue":"folder-vscode",".aider":"folder-vscode",".cline":"folder-vscode",".opencode":"folder-vscode",".agents":"folder-vscode",".roo":"folder-vscode",".gemini":"folder-vscode",".copilot":"folder-vscode",".copilot-ut":"folder-vscode",".codex":"folder-vscode",".tabby":"folder-vscode",".codium":"folder-vscode",".qoder":"folder-vscode",".pearai":"folder-vscode",".void":"folder-vscode",".augment":"folder-vscode",".sourcegraph":"folder-vscode",".supermaven":"folder-vscode",".avante":"folder-vscode",".storybook":"folder-config",".changeset":"folder-config",".turbo":"folder-build",".nx":"folder-build",".eslintcache":"folder-cache",".pnpm-store":"folder-github",".yarnrc":"folder-github",".npmrc":"folder-github",".envrc":"folder-github",".direnv":"folder-github",".cmake":"folder-github",".gradle":"folder-github",".mvn":"folder-github",".pulumi":"folder-github",".cdk":"folder-github",".cdktf":"folder-github",".serverless":"folder-github",".sam":"folder-github",".chalice":"folder-github",".netlify":"folder-github",".vercel":"folder-github",".firebase":"folder-github",".supabase":"folder-github",".planetscale":"folder-github",".dvc":"folder-github",".mlflow":"folder-github",".wandb":"folder-github",".jupyter":"folder-github",".ipynb_checkpoints":"folder-github",".streamlit":"folder-github",".gradio":"folder-github",".openapi":"folder-github",".redoc":"folder-github"};
const LIDS={javascript:"js",typescript:"ts",javascriptreact:"jsx",typescriptreact:"tsx",mdx:"mdx",css:"css",scss:"scss",sass:"sass",less:"less",stylus:"stylus",html:"html",json:"json",jsonc:"json",python:"python",markdown:"markdown",php:"php",java:"java",c:"c",cpp:"cpp",go:"go",rust:"rust",ruby:"ruby",csharp:"csharp",kotlin:"kotlin",swift:"swift",sql:"sql",shellscript:"bash",dart:"dart",scala:"scala",perl:"perl",r:"r","objective-c":"objectivec",matlab:"matlab",haskell:"haskell",elixir:"elixir",yaml:"yaml",xml:"xml",csv:"csv",dockerfile:"docker",dockercompose:"docker",powershell:"powershell",lua:"lua",cobol:"cobol",vue:"vue",svelte:"svelte",astro:"astro",graphql:"graphql",prisma:"prisma"};

function makeSvg(bg, fg, label, circleColor) {
  const size = 24;
  let fontSize = label.length <= 2 ? 9 : label.length === 3 ? 7 : 5;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="16" height="16">
  <rect x="0" y="0" width="${size}" height="${size}" fill="${bg}" rx="3" ry="3"/>
  <text x="${size/2}" y="${size/2 + fontSize * 0.35}" text-anchor="middle" fill="${fg}" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="bold">${label}</text>
  <circle cx="${size-4}" cy="5" r="3" fill="${circleColor}"/>
</svg>\n`;
}

console.log("Creating Colors theme with circle markers...\n");

// Create directory
fs.mkdirSync(DIR, { recursive: true });

// Copy folder SVGs from old-x (original X)
const srcF = path.join(BASE, "old-x");
const folderFiles = fs.readdirSync(srcF).filter(f => f.startsWith("folder-") && f.endsWith(".svg"));
for (const f of folderFiles) {
  fs.copyFileSync(path.join(srcF, f), path.join(DIR, f));
}
// Copy base folder.svg and file.svg
for (const f of ["folder.svg", "file.svg"]) {
  const sp = path.join(srcF, f);
  if (fs.existsSync(sp)) fs.copyFileSync(sp, path.join(DIR, f));
}
console.log(`  ${folderFiles.length + 2} folder SVGs copied`);

// Generate languages with circles
let ci = 0;
function nc() { return CIRCLE_COLORS[ci++ % CIRCLE_COLORS.length]; }

let cnt = 0;
for (const [id, [bg, fg, label]] of Object.entries(LANGS)) {
  fs.writeFileSync(path.join(DIR, id + ".svg"), makeSvg(bg, fg, label, nc()));
  cnt++;
}
console.log(`  ${cnt} language SVGs`);

cnt = 0;
for (const [id, [bg, fg, label]] of Object.entries(SPECS)) {
  fs.writeFileSync(path.join(DIR, id + ".svg"), makeSvg(bg, fg, label, nc()));
  cnt++;
}
console.log(`  ${cnt} special SVGs`);

// Terminal with >_ and circle
fs.writeFileSync(path.join(DIR, "terminal.svg"), makeSvg("#333333", "#00ff00", ">_", nc()));
fs.writeFileSync(path.join(DIR, "folder-terminal.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
  <path d="M2 6h20v14a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" fill="#333333"/>
  <path d="M2 4a2 2 0 012-2h5l2 2h9a2 2 0 012 2v2H2V4z" fill="#333333" opacity="0.7"/>
  <text x="5" y="17" fill="#00ff00" font-family="monospace" font-size="7" font-weight="bold">>_</text>
  <circle cx="20" cy="5" r="3" fill="${nc()}"/>
</svg>\n`);
console.log(`  terminal + folder-terminal`);

// Build manifest
const svgs = fs.readdirSync(DIR).filter(f => f.endsWith(".svg")).map(f => f.replace(".svg", ""));
const idefs = {};
for (const id of svgs) idefs[id] = { iconPath: `./colors/${id}.svg` };

const manifest = {
  showLanguageModeIcons: true,
  iconDefinitions: idefs,
  file: "file",
  folder: "folder",
  folderExpanded: "folder",
  rootFolder: "folder",
  rootFolderExpanded: "folder",
  fileExtensions: FEXTS,
  fileNames: FNAMES,
  folderNames: FOLDERS,
  folderNamesExpanded: FOLDERS,
  languageIds: LIDS,
};

const manifestPath = path.join(BASE, "colors.json");
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`  Manifest: ${svgs.length} icons`);

// Fix package.json: remove duplicates, ensure colors entry exists
const pkgPath = path.join(process.cwd(), "themes/xscriptor-themes/package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

// Remove duplicates
const seen = new Set();
pkg.contributes.iconThemes = pkg.contributes.iconThemes.filter(t => {
  if (seen.has(t.id)) return false;
  seen.add(t.id);
  return true;
});

// Ensure colors-icons entry
if (!pkg.contributes.iconThemes.find(t => t.id === "colors-icons")) {
  pkg.contributes.iconThemes.push({ id: "colors-icons", label: "Colors", path: "./icons/colors.json" });
}

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log(`\n  package.json: ${pkg.contributes.iconThemes.length} themes, no duplicates`);
console.log(`\nDone.`);
