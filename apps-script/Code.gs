// Google Apps Script Web App for Court of Love
// Deploy this script as a Web App and paste the Web App URL into
// script.js (GOOGLE_SHEET_WEB_APP_URL).

// IMPORTANT: Replace SHEET_ID with your Google Sheet ID (the long id in the sheet URL)
const SHEET_ID = '14r1NhywbRrYcnSpsqssEkxPz2LjWU-hgLGTWehSOtmk';

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({status: 'ok', message: 'Court of Love Apps Script is reachable'}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Open the spreadsheet
    var ss;
    if (SHEET_ID && SHEET_ID.indexOf('PUT_') === -1) {
      ss = SpreadsheetApp.openById(SHEET_ID);
    } else {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    }
    var sheet = ss.getSheets()[0];

    // Ensure header row exists (first time setup)
    var lastCol = sheet.getLastColumn();
    var header = [];
    if (lastCol && lastCol > 0) {
      header = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    }

    if (!header || header.length === 0 || (header.length === 1 && header[0] === '')) {
      var headerRow = [
        'Timestamp',
        'Session ID',
        'forgiveness',
        'secondChance',
        'missMe',
        'phoneName',
        'hug',
        'special',
        'magicHug',
        'beautifulMemory',
        'makeSmile',
        'chooseUsAgain',
        'dinner'
      ];
      sheet.appendRow(headerRow);
    }

    const timestamp = data.timestamp || new Date().toISOString();
    const sessionId = data.sessionId || '';
    const answers = data.answers || {};

    const row = [
      timestamp,
      sessionId,
      answers.forgiveness || '',
      answers.secondChance || '',
      answers.missMe || '',
      answers.phoneName || '',
      answers.hug || '',
      answers.special || '',
      answers.magicHug || '',
      answers.beautifulMemory || '',
      answers.makeSmile || '',
      answers.chooseUsAgain || '',
      answers.dinner || ''
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({status: 'ok'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
