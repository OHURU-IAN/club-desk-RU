# School Clubs Registration Starter

This is a lightweight starter you can upload to a school website (static hosting) to publish **one link per club**.

## What you get
- A clean **Club Directory** page (`frontend/index.html`)
- A **Club details** page with a **Register** button (`frontend/club.html`)
- A **Thank you / Join WhatsApp** landing page (`frontend/thanks.html`)
- A sample data file you can edit: `frontend/data/clubs.json`
- (Optional) A **Google Apps Script** template that records registrations to a Google Sheet and then redirects to the correct WhatsApp invite link.

## Fast start (static site only)
1. Edit: `frontend/data/clubs.json`
2. Replace:
   - `registration_url` for each club (Google Form or Apps Script web app URL)
   - `whatsapp_invite_url` for each club (WhatsApp invite link)
3. Open locally:
   - Double click `frontend/index.html`
   - Or run a tiny server:
     - Python: `python -m http.server 8000` inside `frontend/`
     - Then open `http://localhost:8000`

## Recommended flow (safer)
If you don’t want WhatsApp invite links visible until after registration:
- Use the Apps Script in `google-apps-script/`.
- Students register through the script URL.
- The script records the registration in a Sheet and then **redirects** to:
  `frontend/thanks.html?club=<clubId>`

## Deploying
- Any static host works:
  - The school website (ask web admin where static files live)
  - GitHub Pages / Netlify / Cloudflare Pages (if allowed)

## Where to put links on the school website
- The simplest: link to `frontend/index.html`
- Or one link per club: `frontend/club.html?club=robotics`

---

Generated: 2025-12-16
