/**
 * School Clubs Registration Redirect (Google Apps Script)
 *
 * Goal:
 * - Student fills a form hosted by this Apps Script
 * - Data saved into a Google Sheet
 * - Student is redirected to: /thanks.html?club=<clubId>
 *
 * Setup:
 * 1) Create a Google Sheet
 * 2) Extensions → Apps Script
 * 3) Paste this file into Code.gs
 * 4) In Project Settings, set SCRIPT_PROPERTIES:
 *    - SHEET_ID = your Google Sheet ID
 *    - THANKS_URL_BASE = full URL to thanks.html (e.g. https://yourschool.org/clubs/thanks.html)
 * 5) Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone in your domain (recommended) OR Anyone (if needed)
 *
 * Link students to:
 *   https://script.google.com/macros/s/XXXXX/exec?club=robotics
 */

const CLUBS = {
  robotics: { whatsapp: "REPLACE_WITH_WHATSAPP_INVITE_LINK", clubName: "Robotics Club" },
  debate:   { whatsapp: "REPLACE_WITH_WHATSAPP_INVITE_LINK", clubName: "Debate & Public Speaking" },
  art:      { whatsapp: "REPLACE_WITH_WHATSAPP_INVITE_LINK", clubName: "Art & Design" },
};

function doGet(e) {
  const club = (e.parameter.club || "").toLowerCase();
  const clubObj = CLUBS[club];

  if (!clubObj) {
    return HtmlService.createHtmlOutput("<p>Club not found. Check the link.</p>");
  }

  const t = HtmlService.createTemplateFromFile("Form");
  t.clubId = club;
  t.clubName = clubObj.clubName;
  return t.evaluate().setTitle("Club Registration");
}

function doPost(e) {
  const club = (e.parameter.clubId || "").toLowerCase();
  const clubObj = CLUBS[club];

  if (!clubObj) {
    return HtmlService.createHtmlOutput("<p>Club not found. Please go back and try again.</p>");
  }

  const sheetId = PropertiesService.getScriptProperties().getProperty("SHEET_ID");
  const thanksBase = PropertiesService.getScriptProperties().getProperty("THANKS_URL_BASE");

  if (!sheetId || !thanksBase) {
    return HtmlService.createHtmlOutput("<p>Admin setup incomplete: missing SHEET_ID or THANKS_URL_BASE.</p>");
  }

  const ss = SpreadsheetApp.openById(sheetId);
  const sh = ss.getSheetByName("Registrations") || ss.insertSheet("Registrations");

  // Header
  if (sh.getLastRow() === 0) {
    sh.appendRow(["Timestamp","Club","Student Name","Year Group","Email","Notes"]);
  }

  const ts = new Date();
  sh.appendRow([
    ts,
    club,
    e.parameter.studentName || "",
    e.parameter.yearGroup || "",
    e.parameter.email || "",
    e.parameter.notes || ""
  ]);

  // Redirect to thanks page (WhatsApp link shown there from clubs.json, OR you can redirect to WhatsApp directly)
  const url = thanksBase + "?club=" + encodeURIComponent(club);

  const html = `
    <html>
      <head>
        <meta http-equiv="refresh" content="0;url=${url}">
        <script>window.location.replace(${JSON.stringify(url)});</script>
      </head>
      <body>
        <p>Registration submitted. Redirecting…</p>
      </body>
    </html>
  `;
  return HtmlService.createHtmlOutput(html);
}
