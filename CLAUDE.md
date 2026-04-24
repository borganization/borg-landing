# Project: Borg Landing

Static marketing site for Borg. No framework, no build step — plain HTML/CSS/JS served directly.

## Layout

- `index.html` — single-page site; all sections live here and are linked via in-page anchors.
- `assets/style.css` — all styling.
- `assets/app.js` — client-side interactions (deferred script).

## Writing style

Follow this style for all prose in the docs.

- SHOULD use clear, simple language.
- SHOULD use spartan and informative language.
- SHOULD use short, impactful sentences.
- SHOULD use active voice; avoid passive voice.
- SHOULD focus on practical, actionable insights.
- SHOULD use bullet point lists in social media posts.
- SHOULD use data and examples to support claims when possible.
- SHOULD use "you" and "your" to directly address the reader.
- AVOID using em dashes (—) within sentences and prose. It is only fine as bullet point separators.
- AVOID "not just X, but also Y" constructions. Same goes for the sibling pattern "Not X. Y." (e.g. "No LLM call. Pure Rust."). Rewrite as a plain declarative: state what the thing is. If the contrast matters, phrase it as "X instead of Y".
- AVOID metaphors and clichés.
- AVOID generalizations.
- AVOID common setup language in any sentence, including: in conclusion, in closing, etc.
- AVOID output warnings or notes, just the output requested.
- AVOID unnecessary adjectives and adverbs.
- AVOID hashtags.
- AVOID asterisks.
- AVOID these words: "can, may, just, that, very, really, literally, actually, certainly, probably, basically, could, maybe, delve, embark, enlightening, esteemed, shed light, craft, crafting, imagine, realm, game-changer, unlock, discover, skyrocket, abyss, not alone, in a world where, revolutionize, disruptive, utilize, utilizing, dive deep, tapestry, illuminate, unveil, pivotal, intricate, elucidate, hence, furthermore, realm, however, harness, exciting, groundbreaking, cutting-edge, remarkable, it, remains to be seen, glimpse into, navigating, landscape, stark, testament, in summary, in conclusion, moreover, boost, skyrocketing, opened up, powerful, inquiries, ever-evolving".

## Conventions

- Keep it a zero-build static site. Do not introduce bundlers, frameworks, or package managers unless explicitly requested.
- Section IDs in `index.html` are referenced by the sidebar tree and top nav — renaming an ID means updating every anchor that points to it.
- Styling is hand-written CSS; follow existing class naming (kebab-case, scoped by section) rather than adding utility frameworks.
- External links use `target="_blank" rel="noopener"`.

## Testing changes

Serve locally (`python3 -m http.server` or equivalent) and verify in a browser. There is no automated test suite or type checker.
