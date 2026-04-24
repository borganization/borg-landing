# Project: Borg Landing

Static marketing site for Borg. No framework, no build step — plain HTML/CSS/JS served directly.

## Layout

- `index.html` — single-page site; all sections live here and are linked via in-page anchors.
- `assets/style.css` — all styling.
- `assets/app.js` — client-side interactions (deferred script).

## Conventions

- Keep it a zero-build static site. Do not introduce bundlers, frameworks, or package managers unless explicitly requested.
- Section IDs in `index.html` are referenced by the sidebar tree and top nav — renaming an ID means updating every anchor that points to it.
- Styling is hand-written CSS; follow existing class naming (kebab-case, scoped by section) rather than adding utility frameworks.
- External links use `target="_blank" rel="noopener"`.

## Testing changes

Serve locally (`python3 -m http.server` or equivalent) and verify in a browser. There is no automated test suite or type checker.
