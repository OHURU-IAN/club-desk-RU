# Riara Clubs — Club Directory & Registration

A club directory and sign-up flow for Riara University student clubs. Students browse clubs, open a club's page and register. After registering they get the link to join the club's WhatsApp group. Club leads see sign-ups in a Google Sheet.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)
![Google Apps Script](https://img.shields.io/badge/Google_Apps_Script-4285F4?logo=google&logoColor=fff)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?logo=githubactions&logoColor=fff)
![GitHub Pages](https://img.shields.io/badge/Hosted_on-GitHub_Pages-222?logo=githubpages&logoColor=fff)

## How it works

```
clubs.html ──► club.html?club=<id> ──► Register
                                         │
                ┌────────────────────────┴───────────────────────┐
         Static flow                                  Apps Script flow
   (registration_url → thanks page)     doGet: render form for <id>
                                        doPost: validate club, append row to
                                                "Registrations" sheet, redirect
                                         │
                                         ▼
                              thanks.html?club=<id>  ──►  Join WhatsApp
```

- **Data-driven:** every club (name, description, meeting time, lead, links) comes from `frontend/data/clubs.json`. Adding a club means editing JSON, not HTML.
- **Serverless backend:** `google-apps-script/Code.gs` serves the registration form and writes submissions to Google Sheets. The sheet ID and redirect URL are kept in Script Properties rather than in the code.
- **CI/CD:** `.github/workflows/deploy-pages.yml` publishes `frontend/` to GitHub Pages on every push to `main`.

## Project structure

```
frontend/
├── index.html, clubs.html   Directory pages
├── club.html                Club detail and Register button (?club=<id>)
├── thanks.html              Post-registration page with WhatsApp link
├── admin.html               Guide for maintainers on managing clubs and links
├── assets/                  CSS and vanilla JS (loads and renders clubs.json)
└── data/clubs.json          Club data
google-apps-script/
├── Code.gs                  doGet / doPost handlers → Google Sheet
└── Form.html                Registration form template
docs/PLAN.md                 Requirements and design trade-offs
```

## Run locally

```bash
cd frontend
python -m http.server 8000   # then open http://localhost:8000
```

## Configure

1. **Clubs:** edit `frontend/data/clubs.json`. Set `registration_url` and `whatsapp_invite_url` for each club.
2. **Apps Script (optional, recommended):**
   1. Create a Google Sheet, then open *Extensions → Apps Script*.
   2. Paste in `Code.gs` and `Form.html`.
   3. Set the Script Properties `SHEET_ID` and `THANKS_URL_BASE`.
   4. Deploy as a web app, and link students to `…/exec?club=<id>`.
3. **Deploy:** push to `main`. GitHub Actions publishes the site.

## Design notes

`docs/PLAN.md` compares a Google-Forms-only approach with the Apps Script approach. The trade-off is how easily the WhatsApp invite links can be found. Currently the links are stored in `clubs.json`, so anyone who reads that file can see them.

## Roadmap

- Move invite links out of `clubs.json` and have `doPost` redirect straight to WhatsApp, so the links are only shown after registering
- Stop duplicate registrations (same email and club)
- Validate `clubs.json` against a JSON Schema in CI
