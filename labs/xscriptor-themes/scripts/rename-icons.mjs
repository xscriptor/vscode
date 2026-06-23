import fs from "fs";
import path from "path";

const BASE = path.join(process.cwd(), "themes/xscriptor-themes/icons");

// ── Step 1: Expand folder names in test.json ──
console.log("1. Expanding folder names in test manifest...");

const testManifest = JSON.parse(fs.readFileSync(path.join(BASE, "test.json"), "utf8"));

const extraFolders = {
  // Existing expanded
  scripts: "folder-src", script: "folder-src",
  tools: "folder-utils", tool: "folder-utils",
  vendor: "folder-node", vendors: "folder-node",
  views: "folder-components", view: "folder-components",
  layouts: "folder-components", layout: "folder-components",
  data: "folder-database",
  types: "folder-src", type: "folder-src",
  schemas: "folder-models", schema: "folder-models",
  validators: "folder-utils",
  repositories: "folder-database", repository: "folder-database", repo: "folder-database",
  providers: "folder-services",
  listeners: "folder-services",
  commands: "folder-terminal",
  events: "folder-services", event: "folder-services",
  exceptions: "folder-src",
  jobs: "folder-services",
  mail: "folder-contact",
  notifications: "folder-info", notification: "folder-info",
  policies: "folder-security", policy: "folder-security",
  rules: "folder-config", rule: "folder-config",
  subscribers: "folder-services",
  interfaces: "folder-src", interface: "folder-src",
  abstracts: "folder-src",
  traits: "folder-src", trait: "folder-src",
  enums: "folder-src",
  factories: "folder-database", factory: "folder-database",
  observers: "folder-services",
  resources: "folder-assets", resource: "folder-assets",
  lang: "folder-localization",
  storage: "folder-database",
  logs: "folder-out", log: "folder-out",
  backups: "folder-database", backup: "folder-database",
  coverage: "folder-out",
  benchmarks: "folder-tests", benchmark: "folder-tests",
  fixtures: "folder-tests", fixture: "folder-tests",
  mocks: "folder-tests", mock: "folder-tests",
  stubs: "folder-tests", stub: "folder-tests",
  e2e: "folder-tests",
  integration: "folder-tests",
  unit: "folder-tests",
  output: "folder-out", outputs: "folder-out",
  inputs: "folder-src",
  actions: "folder-src",
  reducers: "folder-src",
  slices: "folder-src",
  selectors: "folder-src",
  thunks: "folder-src",
  stories: "folder-screenshots",
  ".storybook": "folder-config",
  ".changeset": "folder-config",
  ".turbo": "folder-build",
  ".nx": "folder-build",
  ".eslintcache": "folder-cache",
  ".terraform": "folder-infra",
  ".kube": "folder-infra",
  ".ssh": "folder-security",
  ".aws": "folder-infra",
  ".azure": "folder-infra",
  ".gcloud": "folder-infra",
  ".bundle": "folder-node",
  ".gem": "folder-node",
  ".pip": "folder-node",
  ".venv": "folder-node",
  ".tox": "folder-node",
  ".mypy_cache": "folder-cache",
  ".pytest_cache": "folder-cache",
  ".ruff_cache": "folder-cache",
  ".hypothesis": "folder-tests",
  ".angular": "folder-config",
  ".expo": "folder-config",
  ".expo-shared": "folder-config",
  ".metro": "folder-config",
  ".svn": "folder-git",
  ".hg": "folder-git",
  ".bzr": "folder-git",
  ".fossil": "folder-git",
  ".npm": "folder-node",
  ".nvm": "folder-node",
  ".pnpm": "folder-node",
  ".yarn": "folder-node",
  ".rush": "folder-node",
  ".lerna": "folder-node",
  ".envs": "folder-config",
  ".ebextensions": "folder-infra",
  ".elasticbeanstalk": "folder-infra",
  ".platform": "folder-infra",
  ".circleci": "folder-github",
  ".travis": "folder-github",
  ".jenkins": "folder-infra",
  ".drone": "folder-infra",
  ".semaphore": "folder-infra",
  ".bitbucket": "folder-github",
  ".gitlab": "folder-github",
  ".devops": "folder-infra",
  ".vscode-test": "folder-vscode",
  ".cursor": "folder-vscode",
  ".windsurf": "folder-vscode",
  ".zed": "folder-vscode",
  ".continue": "folder-vscode",
  ".aider": "folder-vscode",
  ".cline": "folder-vscode",
  ".opencode": "folder-vscode",
  ".agents": "folder-vscode",
  ".roo": "folder-vscode",
  ".gemini": "folder-vscode",
  ".copilot": "folder-vscode",
  ".copilot-ut": "folder-vscode",
  ".codex": "folder-vscode",
  ".tabby": "folder-vscode",
  ".codium": "folder-vscode",
  ".qoder": "folder-vscode",
  ".pearai": "folder-vscode",
  ".void": "folder-vscode",
  ".augment": "folder-vscode",
  ".sourcegraph": "folder-vscode",
  ".supermaven": "folder-vscode",
  ".avante": "folder-vscode",
};

// Also: every folder starting with "." that's not already mapped gets folder-github
Object.assign(testManifest.folderNames, extraFolders);
Object.assign(testManifest.folderNamesExpanded, extraFolders);

// Ensure all dot-prefixed folders that exist in iconDefinitions as folder-* use folder-github
// Add common dot folders not yet mapped
const dotFolders = [
  ".pnpm-store", ".yarnrc", ".npmrc",
  ".envrc", ".direnv",
  ".cmake", ".gradle", ".mvn",
  ".pulumi", ".cdk", ".cdktf",
  ".serverless", ".sam", ".chalice",
  ".netlify", ".vercel", ".firebase",
  ".supabase", ".planetscale",
  ".dvc", ".mlflow", ".wandb",
  ".jupyter", ".ipynb_checkpoints",
  ".streamlit", ".gradio",
  ".openapi", ".redoc",
  ".pnpm-debug", ".npm-debug",
];
for (const d of dotFolders) {
  testManifest.folderNames[d] = "folder-github";
  testManifest.folderNamesExpanded[d] = "folder-github";
}

fs.writeFileSync(path.join(BASE, "test.json"), JSON.stringify(testManifest, null, 2));
console.log(`   folderNames: ${Object.keys(testManifest.folderNames).length} (+${Object.keys(extraFolders).length + dotFolders.length})`);

// ── Step 2: Rename test → x, x → colors ──
console.log("\n2. Renaming test → x and x → colors...");

// 2a. Rename directories (move x → colors, then test → x)
const xDir = path.join(BASE, "x");
const colorsDir = path.join(BASE, "colors");
const testDir = path.join(BASE, "test");

if (fs.existsSync(xDir)) {
  fs.renameSync(xDir, colorsDir);
  console.log("   icons/x/ → icons/colors/");
}
if (fs.existsSync(testDir)) {
  fs.renameSync(testDir, xDir);
  console.log("   icons/test/ → icons/x/");
}

// 2b. Update manifest iconPaths: colors.json (was x.json)
const colorsManifestPath = path.join(BASE, "colors.json");
if (fs.existsSync(path.join(BASE, "x.json"))) {
  fs.renameSync(path.join(BASE, "x.json"), colorsManifestPath);
}
const colorsManifest = JSON.parse(fs.readFileSync(colorsManifestPath, "utf8"));
for (const [id, def] of Object.entries(colorsManifest.iconDefinitions)) {
  if (def.iconPath && def.iconPath.startsWith("./x/")) {
    def.iconPath = def.iconPath.replace("./x/", "./colors/");
  }
}
fs.writeFileSync(colorsManifestPath, JSON.stringify(colorsManifest, null, 2));
console.log("   icons/x.json → icons/colors.json (iconPaths updated)");

// 2c. Update manifest iconPaths: x.json (was test.json)
const xManifestPath = path.join(BASE, "x.json");
if (fs.existsSync(path.join(BASE, "test.json"))) {
  fs.renameSync(path.join(BASE, "test.json"), xManifestPath);
}
const xManifest = JSON.parse(fs.readFileSync(xManifestPath, "utf8"));
for (const [id, def] of Object.entries(xManifest.iconDefinitions)) {
  if (def.iconPath && def.iconPath.startsWith("./test/")) {
    def.iconPath = def.iconPath.replace("./test/", "./x/");
  }
}
fs.writeFileSync(xManifestPath, JSON.stringify(xManifest, null, 2));
console.log("   icons/test.json → icons/x.json (iconPaths updated)");

// 2d. Update package.json
const pkgPath = path.join(process.cwd(), "themes/xscriptor-themes/package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

for (const t of pkg.contributes.iconThemes) {
  if (t.id === "x-icons") {
    t.id = "colors-icons";
    t.label = "Colors";
    t.path = "./icons/colors.json";
  } else if (t.id === "test-icons") {
    t.id = "x-icons";
    t.label = "X";
    t.path = "./icons/x.json";
  }
}
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log("   package.json: test-icons→x-icons, x-icons→colors-icons");

console.log("\nDone.");
