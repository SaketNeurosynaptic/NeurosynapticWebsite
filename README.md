# ReMeDi – Website, Tender & Product Docs

Shared workspace for the NCPL ReMeDi website work and ReMeDi IoT / e-Sanjeevani documentation.

## Quick start
1. Clone the repo (or open the shared folder).
2. Open `website/neurosynaptic_site_clone.html` in Chrome (internet required for styling).
3. In the Claude desktop app: create a project "ReMeDi" → **Add folder** → select this folder.
   Claude reads `CLAUDE.md` for shared context.

## Structure
```
website/        18 HTML pages, site-widgets.js, architecture image, explainer video
docs/tender/    Annexure II (ReMeDi IoT), solution architecture (PNG/SVG)
docs/specs/     ReMeDi e-Sanjeevani technical specification (DOCX/PDF)
CLAUDE.md       Shared context & rules for Claude and the team
```

## Git workflow
```
git checkout -b feature/<short-name>
# make changes
git add . && git commit -m "describe change"
git push -u origin feature/<short-name>
# open a Pull Request, ask the other person to review, then merge
git checkout main && git pull
```

## Notes
- The explainer video (~5.7 MB) is committed directly; if files grow, use Git LFS for `*.mp4`.
- Change the temporary WhatsApp number in `website/site-widgets.js` (`WHATSAPP_NUMBER`).
