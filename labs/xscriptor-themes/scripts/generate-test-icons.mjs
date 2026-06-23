import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const BASE = path.join(ROOT, "themes/xscriptor-themes");
const SRC = path.join(BASE, "icons/x");
const DST = path.join(BASE, "icons/test");

const LANGS = [
  { id: "js",      label: "JS",   bg: "#f7df1e", fg: "#000000" },
  { id: "ts",      label: "TS",   bg: "#3178c6", fg: "#ffffff" },
  { id: "jsx",     label: "JSX",  bg: "#61dafb", fg: "#000000" },
  { id: "tsx",     label: "TSX",  bg: "#3178c6", fg: "#ffffff" },
  { id: "mdx",     label: "MDX",  bg: "#1a1a1a", fg: "#f9ac00" },
  { id: "css",     label: "CSS",  bg: "#1572b6", fg: "#ffffff" },
  { id: "html",    label: "H",    bg: "#e34f26", fg: "#ffffff" },
  { id: "json",    label: "{}",   bg: "#5a5a5a", fg: "#ffffff" },
  { id: "python",  label: "PY",   bg: "#3776ab", fg: "#ffde57" },
  { id: "markdown",label: "MD",   bg: "#083fa1", fg: "#ffffff" },
  { id: "php",     label: "PHP",  bg: "#777bb4", fg: "#000000" },
  { id: "java",    label: "JV",   bg: "#b07219", fg: "#ffffff" },
  { id: "c",       label: "C",    bg: "#555555", fg: "#ffffff" },
  { id: "cpp",     label: "C++",  bg: "#00599c", fg: "#ffffff" },
  { id: "go",      label: "GO",   bg: "#00add8", fg: "#000000" },
  { id: "rust",    label: "RS",   bg: "#000000", fg: "#dea584" },
  { id: "ruby",    label: "RB",   bg: "#cc342d", fg: "#ffffff" },
  { id: "csharp",  label: "C#",   bg: "#239120", fg: "#ffffff" },
  { id: "kotlin",  label: "KT",   bg: "#7f52ff", fg: "#ffffff" },
  { id: "swift",   label: "SW",   bg: "#f05138", fg: "#ffffff" },
  { id: "sql",     label: "SQL",  bg: "#336791", fg: "#ffffff" },
  { id: "bash",    label: "SH",   bg: "#4eaa25", fg: "#000000" },
  { id: "dart",    label: "DT",   bg: "#0175c2", fg: "#ffffff" },
  { id: "scala",   label: "SC",   bg: "#dc322f", fg: "#ffffff" },
  { id: "perl",    label: "PL",   bg: "#39457e", fg: "#ffffff" },
  { id: "objectivec",label:"OC",  bg: "#438eff", fg: "#ffffff" },
  { id: "r",       label: "R",    bg: "#276dc3", fg: "#ffffff" },
  { id: "matlab",  label: "M",    bg: "#e16737", fg: "#ffffff" },
  { id: "haskell", label: "HS",   bg: "#5e5086", fg: "#ffffff" },
  { id: "elixir",  label: "EX",   bg: "#4e2a8e", fg: "#ffffff" },
  { id: "yaml",    label: "YML",  bg: "#cb171e", fg: "#ffffff" },
  { id: "docker",  label: "D",    bg: "#2496ed", fg: "#ffffff" },
  { id: "powershell",label:"PS",  bg: "#5391fe", fg: "#ffffff" },
  { id: "lua",     label: "LUA",  bg: "#000080", fg: "#ffffff" },
  { id: "cobol",   label: "COB",  bg: "#02569b", fg: "#ffffff" },
  { id: "vue",     label: "VUE",  bg: "#4fc08d", fg: "#000000" },
  { id: "svelte",  label: "SV",   bg: "#ff3e00", fg: "#ffffff" },
  { id: "astro",   label: "AST",  bg: "#ff5a03", fg: "#ffffff" },
  { id: "scss",    label: "SCS",  bg: "#cc6699", fg: "#ffffff" },
  { id: "sass",    label: "SAS",  bg: "#cc6699", fg: "#ffffff" },
  { id: "less",    label: "LES",  bg: "#1d365d", fg: "#ffffff" },
  { id: "stylus",  label: "STY",  bg: "#333333", fg: "#b3d107" },
  { id: "graphql", label: "GQL",  bg: "#e10098", fg: "#ffffff" },
  { id: "prisma",  label: "PR",   bg: "#2d3748", fg: "#ffffff" },
];

const SPECIALS = [
  { id: "gitignore",      label: "!", bg: "#f05033", fg: "#ffffff" },
  { id: "packagejson",    label: "{}", bg: "#cb3837", fg: "#ffffff" },
  { id: "tsconfig",       label: "TS", bg: "#3178c6", fg: "#ffffff" },
  { id: "readme",         label: "MD", bg: "#083fa1", fg: "#ffffff" },
  { id: "license",        label: "©",  bg: "#5a5a5a", fg: "#ffffff" },
  { id: "env",            label: "ENV",bg: "#ecd53f", fg: "#000000" },
  { id: "env-local",      label: "ENV",bg: "#ecd53f", fg: "#000000" },
  { id: "env-example",    label: "ENV",bg: "#ecd53f", fg: "#000000" },
  { id: "env-development",label: "ENV",bg: "#ecd53f", fg: "#000000" },
  { id: "editorconfig",   label: "EC", bg: "#333333", fg: "#f9f9f9" },
  { id: "eslint",         label: "ES", bg: "#4b32c3", fg: "#ffffff" },
  { id: "prettier",       label: "PR", bg: "#f7b93e", fg: "#000000" },
  { id: "vite",           label: "V",  bg: "#646cff", fg: "#ffffff" },
  { id: "webpack",        label: "WP", bg: "#8dd6f9", fg: "#000000" },
  { id: "nextjs",         label: "N",  bg: "#000000", fg: "#ffffff" },
  { id: "babel",          label: "B",  bg: "#f9dc3e", fg: "#000000" },
  { id: "changelog",      label: "CL", bg: "#5a5a5a", fg: "#ffffff" },
  { id: "packagelock",    label: "{}", bg: "#999999", fg: "#ffffff" },
  { id: "yarn",           label: "Y",  bg: "#2c8ebb", fg: "#ffffff" },
  { id: "pnpm",           label: "PN", bg: "#f69220", fg: "#ffffff" },
  { id: "jsconfig",       label: "JS", bg: "#f7df1e", fg: "#000000" },
  { id: "csv",            label: "CSV",bg: "#217346", fg: "#ffffff" },
  { id: "xml",            label: "XML",bg: "#0060ac", fg: "#ffffff" },
  { id: "svg",            label: "SVG",bg: "#ffb13b", fg: "#000000" },
  { id: "pdf",            label: "PDF",bg: "#dc143c", fg: "#ffffff" },
  { id: "xlsx",           label: "XLS",bg: "#217346", fg: "#ffffff" },
  { id: "docx",           label: "DOC",bg: "#2b579a", fg: "#ffffff" },
  { id: "wasm",           label: "W",  bg: "#654ff0", fg: "#ffffff" },
  { id: "font",           label: "F",  bg: "#555555", fg: "#ffffff" },
  { id: "key",            label: "🔑", bg: "#f9dc3e", fg: "#000000" },
  { id: "conf",           label: "CFG",bg: "#6c6c6c", fg: "#ffffff" },
  { id: "terminal",       label: ">_", bg: "#333333", fg: "#00ff00" },
  { id: "file",           label: "F",  bg: "#444444", fg: "#aaaaaa" },
  { id: "image",          label: "IMG",bg: "#cc6699", fg: "#ffffff" },
];

function svg(opt) {
  const size = 24;
  const m = 0;
  const label = opt.label;
  const bg = opt.bg;
  const fg = opt.fg;

  let fontSize;
  if (label.length <= 2) fontSize = 9;
  else if (label.length === 3) fontSize = 7;
  else fontSize = 5;

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="16" height="16">`,
    `  <rect x="${m}" y="${m}" width="${size - 2 * m}" height="${size - 2 * m}" fill="${bg}" rx="3" ry="3"/>`,
    `  <text x="${size / 2}" y="${size / 2 + fontSize * 0.35}" text-anchor="middle" fill="${fg}" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="bold">${label}</text>`,
    `  <text x="${size - 3}" y="7" text-anchor="middle" fill="${fg}" font-family="Arial, sans-serif" font-size="4" font-weight="bold" opacity="0.7">x</text>`,
    `</svg>`,
  ].join("\n") + "\n";
}

console.log("Generating test icon theme...\n");

fs.mkdirSync(DST, { recursive: true });

// Copy folder SVGs
console.log("1. Copying folder SVGs from X...");
const folderSvg = fs.readdirSync(SRC).filter(f => f.startsWith("folder-") && f.endsWith(".svg"));
for (const f of folderSvg) {
  fs.copyFileSync(path.join(SRC, f), path.join(DST, f));
}
console.log(`   ${folderSvg.length} folder SVGs copied`);

// Generate language SVGs
console.log("2. Generating language SVGs with x marker...");
for (const l of LANGS) {
  const p = path.join(DST, l.id + ".svg");
  fs.writeFileSync(p, svg(l));
}
console.log(`   ${LANGS.length} language SVGs`);

// Generate special file SVGs
console.log("3. Generating special file SVGs...");
for (const s of SPECIALS) {
  const p = path.join(DST, s.id + ".svg");
  fs.writeFileSync(p, svg(s));
}
console.log(`   ${SPECIALS.length} special SVGs`);

// Copy folder.svg and file.svg if not generated
if (!fs.existsSync(path.join(DST, "folder.svg"))) {
  fs.copyFileSync(path.join(SRC, "folder.svg"), path.join(DST, "folder.svg"));
}
if (!fs.existsSync(path.join(DST, "folder.svg")) && fs.existsSync(path.join(SRC, "folder.svg"))) {
  fs.copyFileSync(path.join(SRC, "folder.svg"), path.join(DST, "folder.svg"));
}

console.log("\nDone. SVGs written to icons/test/");
