import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateFonts } from 'fantasticon';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const themeRoot = path.resolve(__dirname, '..', '..');

const codiconsIconsDir = path.join(themeRoot, 'node_modules', '@vscode', 'codicons', 'src', 'icons');
const codiconsMappingPath = path.join(themeRoot, 'node_modules', '@vscode', 'codicons', 'src', 'template', 'mapping.json');

const productIconsRoot = path.join(themeRoot, 'icons', 'product icons');
const fontsOutDir = path.join(productIconsRoot, 'fonts');

const VIEWBOX = '0 0 16 16';

const VARIANTS = [
  {
    key: 'x-min',
    fontName: 'x-min',
    fontId: 'x-min',
    badgeMode: 'min',
    svgOutDir: path.join(productIconsRoot, 'svg-x-min'),
    previewPath: path.join(productIconsRoot, 'preview-x-min.html'),
    productThemePath: path.join(themeRoot, 'icons', 'x-min-product-icon-theme.json'),
    fontPath: './product icons/fonts/x-min.woff'
  },
  {
    key: 'x',
    fontName: 'x',
    fontId: 'x',
    badgeMode: 'max',
    svgOutDir: path.join(productIconsRoot, 'svg-x'),
    previewPath: path.join(productIconsRoot, 'preview-x.html'),
    productThemePath: path.join(themeRoot, 'icons', 'x-product-icon-theme.json'),
    fontPath: './product icons/fonts/x.woff'
  }
];

function hashName(name) {
  let hash = 0;
  for (const ch of name) {
    hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  }
  return hash;
}

function xBadgePaths(variant) {
  // Filled geometry only (no stroke): all badges are 4x4 px and remain inside 16x16.
  const variants = [
    {
      bars: [
        'M11 1 L12 1 L15 4 L14 4 Z',
        'M14 1 L15 1 L12 4 L11 4 Z'
      ]
    },
    {
      bars: [
        'M1 1 L2 1 L5 4 L4 4 Z',
        'M4 1 L5 1 L2 4 L1 4 Z'
      ]
    },
    {
      bars: [
        'M11 11 L12 11 L15 14 L14 14 Z',
        'M14 11 L15 11 L12 14 L11 14 Z'
      ]
    },
    {
      bars: [
        'M1 11 L2 11 L5 14 L4 14 Z',
        'M4 11 L5 11 L2 14 L1 14 Z'
      ]
    },
    {
      bars: [
        'M6 1 L7 1 L10 4 L9 4 Z',
        'M9 1 L10 1 L7 4 L6 4 Z'
      ]
    },
    {
      bars: [
        'M6 11 L7 11 L10 14 L9 14 Z',
        'M9 11 L10 11 L7 14 L6 14 Z'
      ]
    }
  ];

  return variants[variant % variants.length].bars;
}

function xBadgePathsLarge(variant) {
  // 200% size vs x-min (linear scale) for the default variant.
  const variants = [
    {
      bars: [
        'M3 0 L6 0 L21 15 L18 15 Z',
        'M18 0 L21 0 L6 15 L3 15 Z'
      ]
    },
    {
      bars: [
        'M0 0 L3 0 L18 15 L15 15 Z',
        'M15 0 L18 0 L3 15 L0 15 Z'
      ]
    },
    {
      bars: [
        'M3 9 L6 9 L21 24 L18 24 Z',
        'M18 9 L21 9 L6 24 L3 24 Z'
      ]
    },
    {
      bars: [
        'M0 9 L3 9 L18 24 L15 24 Z',
        'M15 9 L18 9 L3 24 L0 24 Z'
      ]
    },
    {
      bars: [
        'M4 1 L7 1 L20 14 L17 14 Z',
        'M17 1 L20 1 L7 14 L4 14 Z'
      ]
    },
    {
      bars: [
        'M4 10 L7 10 L20 23 L17 23 Z',
        'M17 10 L20 10 L7 23 L4 23 Z'
      ]
    }
  ];

  return variants[variant % variants.length].bars;
}

function xBadgePathsTerminalLarge() {
  // Place X directly above underscore in >_ so it stays visible in terminal icons.
  return [
    'M4 5 L7 5 L19 17 L16 17 Z',
    'M16 5 L19 5 L7 17 L4 17 Z'
  ];
}

function parseViewBox(svg) {
  const match = svg.match(/viewBox\s*=\s*['\"]\s*([^'\"]+)\s*['\"]/i);
  if (!match) {
    return { minX: 0, minY: 0, width: 16, height: 16 };
  }

  const nums = match[1]
    .trim()
    .split(/\s+/)
    .map((v) => Number(v));

  if (nums.length !== 4 || nums.some((v) => Number.isNaN(v))) {
    return { minX: 0, minY: 0, width: 16, height: 16 };
  }

  return {
    minX: nums[0],
    minY: nums[1],
    width: nums[2],
    height: nums[3]
  };
}

function extractPathElements(svg) {
  const matches = svg.match(/<path\b[^>]*>/g);
  return matches ?? [];
}

function forcePathFill(pathTag) {
  if (/\sfill=/.test(pathTag)) {
    return pathTag.replace(/fill=(['\"]).*?\1/g, 'fill="#000"');
  }
  return pathTag.replace('/>', ' fill="#000"/>');
}

function buildSvg(paths, badgeBars, viewBox) {
  const iconPaths = paths.map(forcePathFill).join('\n  ');
  const badgePaths = badgeBars.map((d) => `<path d="${d}" fill="#000"/>`).join('\n    ');

  const scaleX = viewBox.width / 16;
  const scaleY = viewBox.height / 16;
  const transform = `translate(${viewBox.minX} ${viewBox.minY}) scale(${scaleX} ${scaleY})`;

  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}">\n  ${iconPaths}\n  <g transform="${transform}">\n    ${badgePaths}\n  </g>\n</svg>\n`;
}

function renderPreview(iconNames, variantName, svgFolderName) {
  const cards = iconNames
    .map((name) => `      <div class="card"><img src="${svgFolderName}/${name}.svg" alt="${name}"/><span>${name}</span></div>`)
    .join('\n');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${variantName} Product Icons Preview</title>
  <style>
    :root {
      --bg: #121212;
      --panel: #1b1b1b;
      --text: #f1f1f1;
      --accent: #fce566;
      --muted: #8d8d8d;
      --line: #2a2a2a;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: radial-gradient(circle at top, #1a1a1a 0%, var(--bg) 55%);
      color: var(--text);
      font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    header {
      padding: 20px;
      border-bottom: 1px solid var(--line);
      position: sticky;
      top: 0;
      background: #121212ee;
      backdrop-filter: blur(8px);
    }
    h1 {
      margin: 0;
      font-size: 18px;
      color: var(--accent);
    }
    p {
      margin: 6px 0 0;
      color: var(--muted);
      font-size: 13px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 10px;
      padding: 16px;
    }
    .card {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 10px;
      min-height: 96px;
      padding: 12px 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 10px;
    }
    .card img {
      width: 16px;
      height: 16px;
      filter: brightness(0) saturate(100%) invert(89%) sepia(32%) saturate(644%) hue-rotate(345deg) brightness(103%) contrast(97%);
    }
    .card span {
      font-size: 11px;
      color: var(--muted);
      text-align: center;
      line-height: 1.2;
      word-break: break-word;
    }
  </style>
</head>
<body>
  <header>
    <h1>${variantName} Product Icons</h1>
    <p>Custom SVG glyph set with integrated X markers, designed on a 16x16 filled-grid.</p>
  </header>
  <main class="grid">
${cards}
  </main>
</body>
</html>
`;
}

async function cleanDirectory(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        await fs.rm(fullPath, { recursive: true, force: true });
      } else {
        await fs.unlink(fullPath);
      }
    })
  );
}

function isTerminalIcon(iconId) {
  return iconId === 'terminal' || iconId.startsWith('terminal-');
}

function selectBadgeBars(iconId, variant, badgeMode) {
  if (badgeMode === 'max') {
    if (isTerminalIcon(iconId)) {
      return xBadgePathsTerminalLarge();
    }
    return xBadgePathsLarge(variant);
  }
  return xBadgePaths(variant);
}

async function buildVariant({
  mapping,
  sourceIconIds,
  badgeMode,
  svgOutDir,
  previewPath,
  productThemePath,
  fontName,
  fontId,
  fontPath,
  key
}) {
  await cleanDirectory(svgOutDir);

  const generated = [];

  for (const iconId of sourceIconIds) {
    const sourceSvgPath = path.join(codiconsIconsDir, `${iconId}.svg`);
    let sourceSvg;

    try {
      sourceSvg = await fs.readFile(sourceSvgPath, 'utf8');
    } catch {
      continue;
    }

    const paths = extractPathElements(sourceSvg);
    if (paths.length === 0) {
      continue;
    }

    const viewBox = parseViewBox(sourceSvg);
    const badge = selectBadgeBars(iconId, hashName(iconId), badgeMode);
    const out = buildSvg(paths, badge, viewBox);
    const outPath = path.join(svgOutDir, `${iconId}.svg`);
    await fs.writeFile(outPath, out, 'utf8');
    generated.push(iconId);
  }

  const generatedSet = new Set(generated);
  const filteredIconIds = sourceIconIds.filter((id) => generatedSet.has(id));

  const result = await generateFonts({
    inputDir: svgOutDir,
    outputDir: fontsOutDir,
    name: fontName,
    fontTypes: ['woff'],
    assetTypes: ['json'],
    codepoints: undefined,
    normalize: true,
    fontHeight: 1000,
    round: 1e12,
    descent: 120,
    formatOptions: {
      json: {
        indent: 2
      }
    }
  });

  const codepoints = result.codepoints;
  const iconDefinitions = {};

  for (const [, aliases] of Object.entries(mapping)) {
    if (!Array.isArray(aliases) || aliases.length === 0) {
      continue;
    }

    const sourceName = aliases.find((alias) => Boolean(codepoints[alias]));
    if (!sourceName) {
      continue;
    }

    const cp = codepoints[sourceName];
    for (const alias of aliases) {
      iconDefinitions[alias] = {
        fontCharacter: `\\${cp.toString(16)}`,
        fontId
      };
    }
  }

  const productTheme = {
    fonts: [
      {
        id: fontId,
        src: [
          {
            path: fontPath,
            format: 'woff'
          }
        ],
        weight: 'normal',
        style: 'normal',
        size: '100%'
      }
    ],
    iconDefinitions
  };

  await fs.writeFile(productThemePath, `${JSON.stringify(productTheme, null, 2)}\n`, 'utf8');
  await fs.writeFile(previewPath, renderPreview(filteredIconIds, key, path.basename(svgOutDir)), 'utf8');

  return {
    glyphs: filteredIconIds.length,
    mapped: Object.keys(iconDefinitions).length,
    fontName,
    productThemePath,
    previewPath
  };
}

async function main() {
  const mapping = JSON.parse(await fs.readFile(codiconsMappingPath, 'utf8'));
  const sourceEntries = await fs.readdir(codiconsIconsDir, { withFileTypes: true });
  const sourceIconIds = sourceEntries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.svg'))
    .map((entry) => entry.name.replace(/\.svg$/i, ''))
    .sort();

  await cleanDirectory(fontsOutDir);

  for (const variant of VARIANTS) {
    const result = await buildVariant({
      mapping,
      sourceIconIds,
      ...variant
    });

    console.log(`[${variant.key}] Generated ${result.glyphs} SVG glyphs.`);
    console.log(`[${variant.key}] Mapped ${result.mapped} icon ids.`);
    console.log(`[${variant.key}] Built font: ${path.relative(themeRoot, path.join(fontsOutDir, `${result.fontName}.woff`))}`);
    console.log(`[${variant.key}] Theme file: ${path.relative(themeRoot, result.productThemePath)}`);
    console.log(`[${variant.key}] Preview: ${path.relative(themeRoot, result.previewPath)}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
