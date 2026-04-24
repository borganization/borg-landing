# Borg Landing

Static landing page for Borg — a personal AI assistant that runs locally, remembers you, and evolves through sustained use.

## Structure

```
index.html        # Single-page landing site
assets/
  style.css       # Styles
  app.js          # Client-side behavior
```

## Local development

No build step. Serve the directory with any static server:

```sh
python3 -m http.server 8000
# or
npx serve .
```

Then open http://localhost:8000.

## Deploy

Upload the repository contents to any static host (Netlify, Vercel, GitHub Pages, S3+CloudFront, etc.). There is no build output — `index.html` and `assets/` are shipped as-is.

## Links

- Docs: https://docs.borganization.ai/
- GitHub: https://github.com/borganization/borg
