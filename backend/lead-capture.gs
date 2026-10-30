/**
 * NCPL website – lead capture backend (Google Apps Script, free)
 * Receives Quote / Contact / Partnership submissions from site-widgets.js,
 * saves them to a Google Sheet, emails the team and (optionally) sends a WhatsApp alert.
 *
 * SETUP (5 minutes, done once by the account owner):
 * 1. Create a Google Sheet "NCPL Website Leads" -> Extensions -> Apps Script.
 * 2. Paste this file, set NOTIFY_EMAIL below. Save.
 * 3. Deploy -> New deployment -> Type: Web app
 *      Execute as: Me   |   Who has access: Anyone
 *    Copy the Web app URL.
 * 4. Put that URL in website/site-widgets.js -> CONFIG.LEAD_ENDPOINT
 * Optional WhatsApp alert: set WHATSAPP_ALERT_URL to your provider's API
 * (e.g. Meta WhatsApp Cloud API / Gupshup / Interakt / CallMeBot). Keep secrets in
 * Script Properties (Project Settings -> Script properties), never in the website code.
 */
var NOTIFY_EMAIL = 'info@neurosynaptic.com';
var SHEET_NAME = 'Leads';

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents || '{}');
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) sh.appendRow(['Received', 'Type', 'Reference', 'Message', 'Page']);
    sh.appendRow([new Date(), d.type || '', d.ref || '', d.message || '', d.page || '']);

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: '[NCPL website] New ' + (d.type || 'lead') + ' – ' + (d.ref || ''),
      body: d.message || JSON.stringify(d, null, 2)
    });

    var waUrl = PropertiesService.getScriptProperties().getProperty('WHATSAPP_ALERT_URL');
    if (waUrl) {
      UrlFetchApp.fetch(waUrl.replace('{TEXT}', encodeURIComponent((d.message || '').slice(0, 900))), { muteHttpExceptions: true });
    }
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  }
}
