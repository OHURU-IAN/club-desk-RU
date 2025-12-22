Project: School Clubs Links (Website → Registration → WhatsApp)

Target workflow:
1) School website lists clubs (with brief descriptions).
2) Student clicks a club → sees club details.
3) Student registers (mandatory) so club heads can see numbers.
4) After registering, student gets the WhatsApp group link (preferably by redirect, not publicly listed).

Two implementation options:
A) Simple + fast (static):
- Club page links directly to Google Form.
- After form submission, student sees WhatsApp link on a separate page (manual instruction).
Downside: WhatsApp link may be discoverable.

B) Safer + still simple (Apps Script):
- Student registers via Apps Script form (stored to Google Sheet).
- Script redirects to thanks.html?club=<id>.
- You can also choose to redirect directly to WhatsApp.

Operational notes:
- Use school domain access restrictions if possible.
- Rotate WhatsApp invite links if they leak.
- Keep club data (descriptions and links) in clubs.json for easy maintenance.
