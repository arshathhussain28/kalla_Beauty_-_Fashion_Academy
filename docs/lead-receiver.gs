/**
 * KALA — enquiry receiver for Google Sheets (Google Apps Script).
 *
 * This is the no-cost, no-extra-account option: enquiries land in a Google Sheet you own, and
 * you get an email the moment one arrives. Setup takes about ten minutes and is described in
 * docs/OPERATIONS.md, "Option B — Google Sheet".
 *
 * ── One important limitation, stated plainly ──────────────────────────────────────────────
 * An Apps Script web app CANNOT read request headers. The site signs every delivery with an
 * HMAC in `X-KALA-Signature`, and that signature is invisible here, so this receiver cannot
 * verify it. Instead it checks a shared secret passed in the URL (?token=…).
 *
 * That is weaker than the signature: anyone who learns the URL can post a fake enquiry. It
 * cannot read your sheet or do anything else, and the URL travels only over https between
 * Vercel and Google — but if you would rather have the stronger check, use an automation tool
 * (Make / Zapier / n8n) instead, where the signature is verifiable. See OPERATIONS.md.
 *
 * Apps Script also answers every POST with a 302 redirect, after the script has already run.
 * That is why the site needs LEADS_WEBHOOK_ACCEPTS_REDIRECT=1 for this option.
 */

// Set these in Apps Script under Project Settings → Script properties:
//   LEAD_TOKEN   the same random string you put at the end of LEADS_WEBHOOK_URL (?token=…)
//   NOTIFY_EMAIL where to send the "new enquiry" email (optional; blank = no email)
const HEADERS = [
  "Received at",
  "Name",
  "Phone / WhatsApp",
  "Interest",
  "Goal",
  "Preferred time",
  "Came from",
  "Course",
  "Lead id",
  "Status",
];

function doPost(e) {
  try {
    const props = PropertiesService.getScriptProperties();
    const expected = props.getProperty("LEAD_TOKEN");

    // Reject anything without the shared token. Compared at equal length so a wrong token
    // cannot be guessed one character at a time by timing the response.
    const given = (e && e.parameter && e.parameter.token) || "";
    if (!expected || !safeEquals(given, expected)) {
      return json({ ok: false, error: "unauthorised" });
    }

    const lead = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Write the header row once, so a fresh sheet is readable without any setup.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      lead.name || "",
      // Leading apostrophe: without it Sheets reads a phone number as a number and drops
      // any leading zero.
      lead.phone ? "'" + lead.phone : "",
      lead.interest || "",
      lead.goal || "",
      lead.preferredContactTime || "",
      lead.source || "",
      lead.courseSlug || "",
      lead.id || "",
      "new",
    ]);

    const notify = props.getProperty("NOTIFY_EMAIL");
    if (notify) {
      MailApp.sendEmail({
        to: notify,
        subject: "New KALA enquiry — " + (lead.name || "no name"),
        body:
          "A new enquiry just came in through the website.\n\n" +
          "Name:      " + (lead.name || "-") + "\n" +
          "Phone:     " + (lead.phone || "-") + "\n" +
          "Interest:  " + (lead.interest || "-") + "\n" +
          "Goal:      " + (lead.goal || "-") + "\n" +
          "Best time: " + (lead.preferredContactTime || "any") + "\n" +
          "From page: " + (lead.source || "-") + "\n\n" +
          "It is already saved in the enquiries sheet.",
      });
    }

    return json({ ok: true });
  } catch (err) {
    // Returning 200 with ok:false would make the site think the lead was stored. Throwing
    // makes Apps Script answer 500, so the site correctly shows the WhatsApp fallback.
    throw err;
  }
}

function safeEquals(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
