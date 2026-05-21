# Accessibility

This document summarizes how accessibility is checked for the Xscriptor Themes extension and how you can validate contrast locally.

## Contrast checks

We use an internal script to check contrast ratios for key UI pairs:
- Buttons (primary and secondary)
- Badges and activity bar badges
- Editor text and line numbers
- Lists (selection and hover)
- Inputs and dropdowns
- Panel titles and notifications

The script follows WCAG 2.1 AA thresholds:
- Normal text: 4.5
- Large text: 3.0

Run the report:

```bash
npm run contrast:json
```

Write to a file:

```bash
node scripts/contrast-check.mjs --format json --out reports/contrast.json
```

## Latest report

See the summary and link to the full JSON in docs/accessibility-report.md.

## What the report contains

- Per-theme contrast ratios for each pair.
- AA pass/fail flags.
- Missing tokens (when a color pair is not defined in a theme).

## Manual checks (recommended)

- Verify common surfaces: editor, terminal, sidebar, and activity bar.
- Validate semantic states: error, warning, info, and selection.
- Review focus outlines and hover states.
- Test with long-form code and markdown files.

## Limitations

- The script only evaluates tokens defined in the report list.
- Custom UI or extensions may introduce additional color requirements.
- Typography and font size are not validated automatically.
