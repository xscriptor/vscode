<h1>Product Icon Generation Guide</h1>

<p>
  This document explains how the Xscriptor Themes Product Icon Theme is generated,
  how the SVG source set is structured, and what to do if you need to rebuild the
  font and the theme files from scratch.
</p>

<h2>Menu</h2>
<ul>
  <li><a href="#overview">Overview</a></li>
  <li><a href="#source-model">Source Model</a></li>
  <li><a href="#build-pipeline">Build Pipeline</a></li>
  <li><a href="#rebuild-steps">Rebuild Steps</a></li>
  <li><a href="#output-artifacts">Output Artifacts</a></li>
  <li><a href="#notes">Notes</a></li>
</ul>

<h2 id="overview">Overview</h2>
<p>
  The repository generates a custom Product Icon Theme from codicon-inspired SVG
  sources. The build process keeps the icons single-color, converts them into a
  font, and writes a VS Code Product Icon Theme JSON file that maps each VS Code
  icon identifier to a glyph in that font.
</p>

<h2 id="source-model">Source Model</h2>
<p>
  The source icons live under <code>icons/product icons/svg-x-min/</code> and
  <code>icons/product icons/svg-x/</code>. Each SVG is built from the codicon
  source set and then customized with an X badge overlay. The SVGs are filled
  shapes, not stroked outlines, so they are compatible with font conversion.
</p>
<p>
  The current repository keeps the compact build as the shipped theme entry. The
  theme definition in <code>icons/x-min-product-icon-theme.json</code> is the one
  exposed through the extension manifest as <code>X</code>.
</p>

<h2 id="build-pipeline">Build Pipeline</h2>
<p>
  The generator is implemented in <code>icons/scripts/build-product-icons.mjs</code>.
  It does the following:
</p>
<ol>
  <li>Reads the codicon source SVG files from <code>@vscode/codicons</code>.</li>
  <li>Extracts the paths from each SVG and forces filled black geometry.</li>
  <li>Adds the custom X badge paths on top of the original icon shape.</li>
  <li>Writes SVG output into variant folders under <code>icons/product icons/</code>.</li>
  <li>Runs Fantasticon to convert the SVG set into WOFF fonts.</li>
  <li>Writes the Product Icon Theme JSON file with the generated code points.</li>
</ol>

<h2 id="rebuild-steps">Rebuild Steps</h2>
<p><strong>1. Install dependencies</strong></p>
<pre><code>npm install</code></pre>

<p><strong>2. Regenerate the product icons</strong></p>
<pre><code>npm run build:product-icons</code></pre>

<p><strong>3. Verify the output</strong></p>
<p>
  After the build finishes, confirm that the expected WOFF files and JSON files
  exist in <code>icons/product icons/fonts/</code> and <code>icons/</code>.
</p>

<h2 id="output-artifacts">Output Artifacts</h2>
<ul>
  <li><code>icons/product icons/fonts/x-min.woff</code>: compact font build.</li>
  <li><code>icons/x-min-product-icon-theme.json</code>: Product Icon Theme mapped to the compact build.</li>
  <li><code>icons/product icons/svg-x-min/</code>: compact SVG source set.</li>
  <li><code>icons/product icons/preview-x-min.html</code>: compact preview page.</li>
  <li><code>icons/product icons/fonts/x.woff</code>: alternate generated font build.</li>
  <li><code>icons/x-product-icon-theme.json</code>: alternate Product Icon Theme JSON.</li>
  <li><code>icons/product icons/svg-x/</code>: alternate SVG source set.</li>
  <li><code>icons/product icons/preview-x.html</code>: alternate preview page.</li>
</ul>

<h2 id="notes">Notes</h2>
<ul>
  <li>VS Code Product Icon Themes are single-color glyph fonts.</li>
  <li>Font color is controlled by the active VS Code color theme.</li>
  <li>If icons appear stale, reload the window after rebuilding the font.</li>
  <li>If you want to ship a different build as the default, update the Product Icon Theme entry in <code>package.json</code> to point at the desired JSON file.</li>
</ul>
