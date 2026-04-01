## Phase 1 · Repository foundation (already done) <!-- phase:foundation -->

- [ ] Consolidate monorepo structure with packages in `extensions/`, `themes/`, and `ui-mods/`
- [ ] Publish root documentation: `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `SUPPORT.md`, `CHANGELOG.md`
- [ ] Normalize package `README.md` files to GitHub-compatible HTML format
- [ ] Define initial visual identity and previews in `assets/` and theme folders
- [ ] Keep per-package licensing strategy (`MIT` for tooling and dedicated licenses for themes)

## Phase 2 · Governance and automation <!-- phase:automation -->

- [ ] Integrate `xgh/github-roadmap-sync` into the main repo flow (`.github/scripts/sync_roadmap.py`)
- [ ] Create `roadmap-sync.yml` workflow to sync `ROADMAP.md` with GitHub Issues
- [ ] Define phase label convention and create baseline labels on GitHub
- [ ] Run local `--dry-run` with authenticated `gh` and validate duplicate prevention
- [ ] Document roadmap sync usage in root documentation

## Phase 3 · Theme quality <!-- phase:themes-quality -->

- [ ] Audit contrast and readability for all themes in `themes/x-dark-colors/themes/*.json`
- [ ] Audit contrast and readability for all themes in `themes/xscriptor-themes/themes/*.json`
- [ ] Normalize naming (accents, city names, variants) across theme labels and docs
- [ ] Review consistency between syntax colors and UI colors (activity bar, status bar, badges)
- [ ] Improve accessibility for transparency combinations with `xglass`
- [ ] Add a visual QA checklist per theme (JS/TS, JSON, Markdown, diff, terminal)

## Phase 4 · Versioning and releases <!-- phase:releases -->

- [ ] Define semantic versioning strategy for `xglass`, `x-dark-colors`, and `xscriptor-themes`
- [ ] Bump version in `extensions/xglass/package.json` with matching changelog notes
- [ ] Bump version in `themes/x-dark-colors/package.json` with matching changelog notes
- [ ] Bump version in `themes/xscriptor-themes/package.json` with matching changelog notes
- [ ] Standardize release notes per package (highlights, breaking changes, migrations)
- [ ] Prepare pipeline/manual process to package `.vsix` for each package

## Phase 5 · XGlass functional improvements <!-- phase:xglass-improvements -->

- [ ] Review `xglass.alpha` and `xglass.step` defaults based on real usage feedback
- [ ] Add clearer validation and error messages for Linux/X11 environments
- [ ] Improve behavior in compositors that ignore opacity
- [ ] Review keybindings for potential conflicts with common shortcuts
- [ ] Expand platform-specific troubleshooting documentation

## Phase 6 · UI Mods and UX improvements <!-- phase:ui-mods -->

- [ ] Align preset structure between `ui-mods/x-ui/` and `ui-mods/xscriptor-ui/`
- [ ] Add before/after previews for each major mod
- [ ] Publish step-by-step installation guide for Custom UI Style
- [ ] Review mod compatibility with newer VS Code releases

## Phase 7 · Ongoing maintenance <!-- phase:maintenance -->

- [ ] Create a monthly routine for issue triage and prioritization
- [ ] Review broken links and missing images across documentation
- [ ] Track user feedback to prioritize new palettes and improvements
- [ ] Keep root `CHANGELOG.md` updated for every release
- [ ] Define acceptance criteria for roadmap task closure
