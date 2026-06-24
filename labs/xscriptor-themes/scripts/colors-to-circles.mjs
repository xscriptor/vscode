import fs from "fs";
import path from "path";

const BASE = path.join(process.cwd(), "themes/xscriptor-themes/icons");
const DIR = path.join(BASE, "colors");

// X palette for circle markers
const CIRCLE_COLORS = ["#fc618d", "#7bd88f", "#fce566", "#fd9353", "#948ae3", "#5ad4e6"];

// Language brand colors (same as original lang generation)
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

function makeSvg(bg, fg, label, circleColor) {
  const size = 24;
  let fontSize = label.length <= 2 ? 9 : label.length === 3 ? 7 : 5;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="16" height="16">
  <rect x="0" y="0" width="${size}" height="${size}" fill="${bg}" rx="3" ry="3"/>
  <text x="${size/2}" y="${size/2 + fontSize * 0.35}" text-anchor="middle" fill="${fg}" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="bold">${label}</text>
  <circle cx="${size-4}" cy="5" r="3" fill="${circleColor}"/>
</svg>\n`;
}

// Delete old language/special SVGs (keep folders which are shared)
console.log("Regenerating Colors theme with circle markers...\n");

// Delete only generated language/special SVGs, not folder SVGs
const keepPrefixes = ["folder-", "folder.", "file."];
const existing = fs.readdirSync(DIR).filter(f => f.endsWith(".svg"));
let deleted = 0;
for (const f of existing) {
  if (!keepPrefixes.some(p => f.startsWith(p))) {
    fs.unlinkSync(path.join(DIR, f));
    deleted++;
  }
}
console.log(`  Removed ${deleted} old language/special SVGs`);

// Generate new language SVGs with circles
let ci = 0;
function nextCircle() { return CIRCLE_COLORS[ci++ % CIRCLE_COLORS.length]; }

let count = 0;
for (const [id, [bg, fg, label]] of Object.entries(LANGS)) {
  fs.writeFileSync(path.join(DIR, id + ".svg"), makeSvg(bg, fg, label, nextCircle()));
  count++;
}
console.log(`  Generated ${count} language SVGs`);

count = 0;
for (const [id, [bg, fg, label]] of Object.entries(SPECS)) {
  fs.writeFileSync(path.join(DIR, id + ".svg"), makeSvg(bg, fg, label, nextCircle()));
  count++;
}
console.log(`  Generated ${count} special SVGs`);

// Terminal with >_ prompt and circle
ci++; // skip one for visual variety
fs.writeFileSync(path.join(DIR, "terminal.svg"), makeSvg("#333333", "#00ff00", ">_", nextCircle()));
console.log(`  Generated terminal.svg`);

// Update manifest iconDefinitions
const manifestPath = path.join(BASE, "colors.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const svgs = fs.readdirSync(DIR).filter(f => f.endsWith(".svg")).map(f => f.replace(".svg", ""));
manifest.iconDefinitions = {};
for (const id of svgs) {
  manifest.iconDefinitions[id] = { iconPath: `./colors/${id}.svg` };
}
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`  Updated manifest: ${svgs.length} icon definitions`);

console.log("\nDone. Colors theme now uses circles instead of x markers.");
