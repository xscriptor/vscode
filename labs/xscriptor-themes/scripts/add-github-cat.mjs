import fs from "fs";
import path from "path";

const BASE = path.join(process.cwd(), "themes/xscriptor-themes/icons");

// Cat face SVG — recognizable GitHub-style octocat silhouette
function githubSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
  <rect x="0" y="0" width="24" height="24" fill="#1b1f23" rx="4" ry="4"/>
  <ellipse cx="12" cy="14" rx="5" ry="4.5" fill="#f0f6fc"/>
  <polygon points="7.5,10 8.5,5 10,9" fill="#f0f6fc"/>
  <polygon points="14,9 15.5,5 16.5,10" fill="#f0f6fc"/>
  <circle cx="10" cy="13.5" r="1.2" fill="#1b1f23"/>
  <circle cx="14" cy="13.5" r="1.2" fill="#1b1f23"/>
  <ellipse cx="12" cy="15.5" rx="0.6" ry="0.4" fill="#1b1f23"/>
  <path d="M10.5,16 Q12,17 13.5,16" fill="none" stroke="#1b1f23" stroke-width="0.5"/>
  <line x1="6" y1="14" x2="9" y2="14.5" stroke="#1b1f23" stroke-width="0.4"/>
  <line x1="6" y1="15" x2="9" y2="15" stroke="#1b1f23" stroke-width="0.4"/>
  <line x1="15" y1="14.5" x2="18" y2="14" stroke="#1b1f23" stroke-width="0.4"/>
  <line x1="15" y1="15" x2="18" y2="15" stroke="#1b1f23" stroke-width="0.4"/>
</svg>\n`;
}

function folderGithubSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
  <path d="M2 6h20v14a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" fill="#1b1f23"/>
  <path d="M2 4a2 2 0 012-2h5l2 2h9a2 2 0 012 2v2H2V4z" fill="#33383d"/>
  <ellipse cx="12" cy="15" rx="3.5" ry="3" fill="#f0f6fc"/>
  <polygon points="9,12 9.5,9 10.5,11.5" fill="#f0f6fc"/>
  <polygon points="13.5,11.5 14.5,9 15,12" fill="#f0f6fc"/>
  <circle cx="10.5" cy="14.5" r="0.8" fill="#1b1f23"/>
  <circle cx="13.5" cy="14.5" r="0.8" fill="#1b1f23"/>
  <ellipse cx="12" cy="15.8" rx="0.4" ry="0.3" fill="#1b1f23"/>
  <path d="M11,16 Q12,16.8 13,16" fill="none" stroke="#1b1f23" stroke-width="0.4"/>
</svg>\n`;
}

// All icon theme directories
const dirs = fs.readdirSync(BASE).filter(d => {
  const full = path.join(BASE, d);
  return fs.statSync(full).isDirectory() && fs.existsSync(path.join(BASE, d + ".json"));
});

// Also handle Colors specially
if (!dirs.includes("colors") && fs.existsSync(path.join(BASE, "colors"))) {
  dirs.push("colors");
}

console.log("Adding GitHub cat icon to " + dirs.length + " themes...\n");

for (const dir of dirs) {
  const dirPath = path.join(BASE, dir);
  if (!fs.existsSync(dirPath)) continue;

  // Write github.svg
  fs.writeFileSync(path.join(dirPath, "github.svg"), githubSvg());

  // Write folder-github.svg (overwrite if exists)
  fs.writeFileSync(path.join(dirPath, "folder-github.svg"), folderGithubSvg());

  // Update manifest
  const manifestPath = path.join(BASE, dir + ".json");
  if (!fs.existsSync(manifestPath)) { console.log("  " + dir + ": no manifest"); continue; }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

  // Add github icon definition
  manifest.iconDefinitions["github"] = { iconPath: `./${dir}/github.svg` };
  manifest.iconDefinitions["folder-github"] = { iconPath: `./${dir}/folder-github.svg` };

  // Update fileNames: .gitignore → github, .gitattributes → github
  manifest.fileNames[".gitignore"] = "github";
  manifest.fileNames[".gitattributes"] = "github";
  if (!manifest.fileNames[".gitignore"]) manifest.fileNames[".gitignore"] = "github";

  // Update folderNames: .github → folder-github (already should be, but ensure)
  manifest.folderNames[".github"] = "folder-github";
  manifest.folderNamesExpanded[".github"] = "folder-github";

  // Also map .git folder to folder-github
  manifest.folderNames[".git"] = "folder-github";
  if (manifest.folderNamesExpanded) manifest.folderNamesExpanded[".git"] = "folder-github";

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log("  " + dir);
}

console.log("\nDone.");
