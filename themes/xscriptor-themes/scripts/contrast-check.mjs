import fs from "fs";
import path from "path";

const args = parseArgs(process.argv.slice(2));
const format = args.format || "json";
const minNormal = toNumber(args.min, 4.5);
const minLarge = toNumber(args["min-large"], 3.0);
const outPath = args.out || "";

if (args.help) {
  printHelp();
  process.exit(0);
}

if (format !== "json") {
  console.error("Only --format json is supported right now.");
  process.exit(1);
}

const root = process.cwd();
const themesDir = path.join(root, "themes");
const themeFiles = listThemeFiles(themesDir);

const pairs = [
  { label: "button", bg: "button.background", fg: "button.foreground" },
  { label: "button.secondary", bg: "button.secondaryBackground", fg: "button.secondaryForeground" },
  { label: "extensionButton.prominent", bg: "extensionButton.prominentBackground", fg: "extensionButton.prominentForeground" },
  { label: "badge", bg: "badge.background", fg: "badge.foreground" },
  { label: "activityBarBadge", bg: "activityBarBadge.background", fg: "activityBarBadge.foreground" },
  { label: "list.activeSelection", bg: "list.activeSelectionBackground", fg: "list.activeSelectionForeground" },
  { label: "list.inactiveSelection", bg: "list.inactiveSelectionBackground", fg: "list.inactiveSelectionForeground" },
  { label: "list.hover", bg: "list.hoverBackground", fg: "list.hoverForeground" },
  { label: "editor", bg: "editor.background", fg: "editor.foreground" },
  { label: "editorLineNumber", bg: "editor.background", fg: "editorLineNumber.foreground" },
  { label: "editorLineNumber.active", bg: "editor.background", fg: "editorLineNumber.activeForeground" },
  { label: "input", bg: "input.background", fg: "input.foreground" },
  { label: "dropdown", bg: "dropdown.background", fg: "dropdown.foreground" },
  { label: "panelTitle.active", bg: "panel.background", fg: "panelTitle.activeForeground" },
  { label: "panelTitle.inactive", bg: "panel.background", fg: "panelTitle.inactiveForeground" },
  { label: "notification", bg: "notifications.background", fg: "notifications.foreground" },
];

const report = buildReport(themeFiles, pairs, { minNormal, minLarge });
const output = JSON.stringify(report, null, 2);

if (outPath) {
  const targetDir = path.dirname(outPath);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(outPath, output, "utf8");
} else {
  process.stdout.write(output + "\n");
}

function buildReport(files, pairs, thresholds) {
  const results = [];
  let totalPairs = 0;
  let totalFailures = 0;

  for (const file of files) {
    const theme = readTheme(file);
    if (!theme) continue;

    const colors = theme.colors || {};
    const base = resolveColor(colors, "editor.background", null, null) || { r: 0, g: 0, b: 0, a: 1 };

    const pairResults = [];
    const failures = [];
    const missing = [];

    for (const pair of pairs) {
      const bg = resolveColor(colors, pair.bg, base, null);
      if (!bg) {
        missing.push({ pair: pair.label, missing: pair.bg });
        continue;
      }

      const fg = resolveColor(colors, pair.fg, base, bg);
      if (!fg) {
        missing.push({ pair: pair.label, missing: pair.fg });
        continue;
      }

      const contrast = contrastRatio(fg, bg);
      const passAA = contrast >= thresholds.minNormal;
      const passLargeAA = contrast >= thresholds.minLarge;

      const item = {
        pair: pair.label,
        foreground: colors[pair.fg],
        background: colors[pair.bg],
        contrast: round(contrast, 2),
        passAA,
        passLargeAA,
      };

      pairResults.push(item);
      totalPairs += 1;

      if (!passAA) {
        failures.push(item);
        totalFailures += 1;
      }
    }

    results.push({
      name: theme.name || path.basename(file),
      file: toPosix(path.relative(root, file)),
      pairs: pairResults,
      failures,
      missing,
    });
  }

  return {
    generatedAt: new Date().toISOString(),
    thresholds,
    summary: {
      themesChecked: results.length,
      totalPairs,
      totalFailures,
    },
    themes: results,
  };
}

function listThemeFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => path.join(dir, file));
}

function readTheme(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Failed to read ${filePath}: ${error.message}`);
    return null;
  }
}

function resolveColor(colors, key, base, under) {
  const raw = colors[key];
  if (!raw) return null;
  const parsed = parseHexColor(raw);
  if (!parsed) return null;

  const underneath = under || base || { r: 0, g: 0, b: 0, a: 1 };
  if (parsed.a < 1) {
    return blend(parsed, underneath);
  }
  return parsed;
}

function parseHexColor(value) {
  if (typeof value !== "string" || !value.startsWith("#")) return null;
  const hex = value.slice(1);

  if (hex.length === 3 || hex.length === 4) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    const a = hex.length === 4 ? parseInt(hex[3] + hex[3], 16) / 255 : 1;
    return { r, g, b, a };
  }

  if (hex.length === 6 || hex.length === 8) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1;
    return { r, g, b, a };
  }

  return null;
}

function blend(fg, bg) {
  const a = fg.a + bg.a * (1 - fg.a);
  if (a === 0) return { r: 0, g: 0, b: 0, a: 0 };

  return {
    r: Math.round((fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / a),
    g: Math.round((fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / a),
    b: Math.round((fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / a),
    a,
  };
}

function contrastRatio(fg, bg) {
  const L1 = relativeLuminance(fg);
  const L2 = relativeLuminance(bg);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

function relativeLuminance(color) {
  const toLinear = (c) => {
    const srgb = c / 255;
    return srgb <= 0.03928 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4);
  };

  const r = toLinear(color.r);
  const g = toLinear(color.g);
  const b = toLinear(color.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function parseArgs(list) {
  const parsed = {};
  for (let i = 0; i < list.length; i += 1) {
    const item = list[i];
    if (!item.startsWith("--")) continue;
    const key = item.slice(2);
    const next = list[i + 1];
    if (!next || next.startsWith("--")) {
      parsed[key] = true;
    } else {
      parsed[key] = next;
      i += 1;
    }
  }
  return parsed;
}

function toNumber(value, fallback) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function round(value, digits) {
  const factor = Math.pow(10, digits);
  return Math.round(value * factor) / factor;
}

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function printHelp() {
  console.log("Usage: node scripts/contrast-check.mjs --format json [--out path] [--min 4.5] [--min-large 3.0]");
}
