# Changelog — Xscriptor Themes

All important modifications to this VSCode theme collection will be documented in this file.

---
## [1.1.1] - 2026-04-02
### Fixed
- Tokio theme: Fixed tab bar background color to match tab panel color (#191919 instead of #0a0a0a)
- Tokio & X themes: Refined tab styling with transparent borders and golden icon colors

### Changed
- Rebuilt Product Icon Theme from scratch as `x` using a custom SVG set (16x16, filled shapes) with an integrated X marker on every glyph
- Added local generation pipeline with Node + Fantasticon, plus HTML preview, and replaced previous default product icon theme mapping

## [1.1.0] - 2026-04-01
### Added
- Enhanced visual hierarchy with bracket pair guides (6 nesting levels) using palette colors
- Modern UI features: sticky scroll, inlay hints, terminal command decorations
- Colorful border combinations using theme palette definitions for improved visual consistency

### Changed
- Improved contrast and readability across all themes
- Enhanced terminal decorations with theme-specific color combinations
- Updated bracket pair highlighting for better code navigation

### Fixed
- Corrected invisible borders to use palette-based colors
- Improved UI consistency across all interface elements

## [1.0.8] - 2025-12-31
- Update docs.
- Update package.json.
- Add icons.
- Refactor: Improved file structure and renamed files for better consistency across the collection.

## [1.0.3] - 2025-10-16
- Update docs.
- Update package.json.


## [1.0.2] - 2025-10-04 
- Improve and update Product Icon Theme support (Dev)
- Update documentation
- Clean up unnecessary files and folders.
- Update Product Icon Theme font.
- Update compilation method for the extension.
- Update Support Version. (VSCode 1.85.0)

## [1.0.1] - 2025-09-26
- Add minimalist Product Icon Theme support (Dev)
- Update documentation

## [1.0.0] - 2025-09-22
- Big update, added new themes:
  - X Retro
  - X Sense
- Deleted themes:
  - X Tropical Neon
  - X Old Tropical Neon
- Removed high contrast Themes and add new standard Colors.
- Cursive Consolidation on Xscriptor Theme.
- Improve Xscriptor Theme, names and colors in general.

## [0.0.9] - 2025-09-18
- Update icons: adding persistence in folders.
- X Plain Text removed, Xgreyscale takes its place.

## [0.0.8] - 2025-09-16
- Update: X Summer Night Is the new Xscriptor Theme without cursive, cursive font added to Xscriptor Theme.

- X Summer Day deleted better you can use Xscriptor Theme Inverted.

- Xscriptor GrayScale Icons update.

## [0.0.7] - 2025-09-10
- Added new **Xscriptor Icons** theme featuring distinctive icons with an 'X' mark in the center
- Each icon uses the characteristic color of its corresponding language or file type
- Updated README.md with information about the new icon theme.

## [0.0.6] - 2025-09-05
- Xscriptor theme upgrade, including icons for xscriptor theme and xscriptor greyscale theme.
- Xscriptor Greyscale theme optimized.
- Xscriptor Greyscale Inverted theme optimized.

## [0.0.5] - 2025-09-05
- Xscriptor theme upgrade.

## [0.0.4] - 2025-09-05
- **Add Xscriptor Theme**

## [0.0.3] – 2025-01-22
### Added
- **8 new themes** added to the collection:
  - X Nord (dark theme inspired by arctic colors)
  - X Nord Inverted (light version of Nord theme)
  - X Summer Night (dark theme with warm summer night palette)
  - X Summer Day (bright and energetic light theme)
  - X Greyscale (elegant monochromatic dark theme)
  - X Greyscale Inverted (monochromatic light theme)
  - X Plain Text (ultra-minimalist monochromatic theme)
- **Complete README.md** in English with detailed descriptions of all themes
- **Proper uiTheme configurations** for each theme (vs-dark/vs-light)
### Changed
- **Extension name** changed from "X Dark Colors" to "Xscriptor Themes"
- **X Dark Colors theme** updated with very dark gray background (#1A1A1A)
- **Project structure** reorganized to support multiple themes

## [0.0.1] – 2025-07-01
### Added
- **Custom icon** visible in VSCode theme selector.
- **Golden color** in active and inactive tab file names.

## [0.0.1] - 2025-07-01
### Initial
- First version of `X Dark Colors Theme`.
- Dark base (`vs-dark`), designed to improve focus and reduce eye strain.
- Established file structure:
  - `package.json`
  - `themes/xdarkcolors.json`
- Custom colors in:
  - `editor.background`, `editor.foreground`
  - `sideBar.background`, `titleBar.activeBackground`
