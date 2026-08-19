// Google Apps Script Web App for Court of Love
// Deploy this script as a Web App and paste the Web App URL into
// script.js (GOOGLE_SHEET_WEB_APP_URL).

// IMPORTANT: Replace SHEET_ID with your Google Sheet ID (the long id in the sheet URL)
const SHEET_ID = '14r1NhywbRrYcnSpsqssEkxPz2LjWU-hgLGTWehSOtmk';

function doGet(e) {
  // If a payload query parameter is provided, treat this like a POST (useful for image-beacon / simple GET submissions)
  try {
    if (e && e.parameter && e.parameter.payload) {
      var raw = e.parameter.payload;
      try {
        var data = JSON.parse(raw);
        _appendRowFromPayload(data);
        return ContentService
          .createTextOutput(JSON.stringify({status: 'ok', message: 'Appended via GET payload'}))
          .setMimeType(ContentService.MimeType.JSON);
      } catch (parseErr) {
        return ContentService
          .createTextOutput(JSON.stringify({status: 'error', message: 'Invalid JSON in payload'}))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService
    .createTextOutput(JSON.stringify({status: 'ok', message: 'Court of Love Apps Script is reachable'}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var data = null;

    // 1) If the POST body is raw JSON (application/json), e.postData.contents will be JSON
    if (e.postData && e.postData.type && e.postData.type.indexOf('application/json') !== -1 && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        // fall through to next methods
      }
    }

    // 2) If body is form-encoded (payload=<encoded-json>), Apps Script provides e.parameter.payload
    if (!data && e.parameter && e.parameter.payload) {
      try {
        data = JSON.parse(e.parameter.payload);
      } catch (formErr) {
        // ignore
      }
    }

    // 3) Some environments set e.postData.contents to a urlencoded string like 'payload=%7B...%7D'
    if (!data && e.postData && e.postData.contents) {
      var raw = e.postData.contents;
      // Try to extract payload=... pattern
      var match = raw.match(/payload=(.*)/);
      if (match && match[1]) {
        try {
          var decoded = decodeURIComponent(match[1]);
          data = JSON.parse(decoded);
        } catch (decErr) {
          // ignore
        }
      }
    }

    // 4) Last resort: build from parameters directly
    if (!data) {
      data = { timestamp: new Date().toISOString(), sessionId: '', answers: {} };
      if (e.parameter) {
        for (var key in e.parameter) {
          if (key === 'timestamp') data.timestamp = e.parameter[key];
          else if (key === 'sessionId') data.sessionId = e.parameter[key];
          else data.answers[key] = e.parameter[key];
        }
      }
    }

    _appendRowFromPayload(data);

    return ContentService
      .createTextOutput(JSON.stringify({status: 'ok'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({status: 'error', message: String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Helper to append a row from the normalized payload object
function _appendRowFromPayload(data) {
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

  const timestamp = (data && data.timestamp) ? data.timestamp : new Date().toISOString();
  const sessionId = (data && data.sessionId) ? data.sessionId : '';
  const answers = (data && data.answers) ? data.answers : {};

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
}
