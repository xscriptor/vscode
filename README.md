<h1 align="center">VSCode Xscriptor</h1>

<div align="center"> 

![antigravity](https://xscriptor.github.io/badges/ide/antigravity.svg) ![cursor](https://xscriptor.github.io/badges/editors/cursor.svg) ![code-oss](https://xscriptor.github.io/badges/editors/code-oss.svg) ![trae](https://xscriptor.github.io/badges/ide/trae-ai.svg) ![vscode](https://xscriptor.github.io/badges/editors/vscode.svg) ![vscodium](https://xscriptor.github.io/badges/editors/vscodium.svg) ![mit](https://xscriptor.github.io/badges/licenses/mit.svg) ![css](https://xscriptor.github.io/badges/languages/css.svg) ![javascript](https://xscriptor.github.io/badges/languages/javascript.svg) ![c#](https://xscriptor.github.io/badges/languages/csharp.svg)


Improve accessibility and customization in Visual Studio Code with the Xscriptor ecosystem — themes, icons, snippets, and lightweight UI tweaks.

</div>

<p align="center"><img src="./assets/icon.png" width="100" alt="Xscriptor logo" /></p>



## Structure

This repository contains several packages:

- `themes/` — Theme collections: `xscriptor-themes`, `x-dark-colors`.
- `extensions/` — `xglass` transparency UI extension.
- `snippets/` — Predefined code snippets for common stacks.
- `ui-mods/` — Small UI adjustments and customizations.
- `assets/` — Screenshots, previews, and branding.

## Previews

<p align="center">
    <img alt="Preview 1" width="" src="./themes/xscriptor-themes/screenshots/xtvsc02.jpg" />
    <img alt="Preview 2" width="" src="./themes/xscriptor-themes/screenshots/xtvsc04.jpg" />
    <img alt="Preview 3" width="" src="./assets/previews/preview3.jpg" />
    <img alt="Preview 3" width="" src="./assets/previews/preview4.jpg" />
</p>

## Install

- Marketplace: search for `Xscriptor` in the Extensions view to install themes and `Xglass`.
- From source: open a package folder in VS Code and use `F5` (Run Extension) or install a built `.vsix` via `Extensions: Install from VSIX`.

## Usage

- Color Theme: open `Preferences → Color Theme` and select any Xscriptor theme (e.g., Dark Xscriptor, X Dark Colors).
- Icon Theme: open `Preferences → File Icon Theme` and choose an Xscriptor icon set.
- Xglass: run commands `xglass: Enable Transparency Mode`, `+ transparency`, `- transparency`, or configure `xglass.alpha` and `xglass.step` in `Settings`.

## Compatibility

Extensions and themes are compatible with `VS Code`, `VS Code Insiders`, and forks of VS Code such as `VSCodium`, `Code - OSS`, `OpenVSCode Server`, `code-server`, `Cursor`, `Void Editor`, `Antigravity`, and `Trae`.

## Development

- Each package is a standalone VS Code extension folder.
- Use the `Run and Debug` panel to launch an Extension Development Host.
- Place screenshots under `assets/` and reference them in the Previews section.

## Contributing

Issues and pull requests are welcome. Please open tickets for bugs or requests in the repository issues.

## License

This repository contains multiple packages with different licensing terms. 

* **Default License:** Unless otherwise specified, the code in this repository (including `xglass` and `ui-mods`) is licensed under the **MIT License**. See the root [LICENSE](./LICENSE) file for details.

* **Themes:** The themes located in the `themes/` directory (e.g., `x-dark-colors`, `xscriptor-themes`) are provided under the **Xscriptor Personal Use License**. Redistribution, modification for resale, or commercial use is strictly prohibited. See the `LICENSE` file within each theme's directory for full terms.


