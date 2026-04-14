// ============================================================
// apps-script-api.gs — Google Apps Script Backend
// ============================================================
// SETUP:
//   1. Go to script.google.com → New Project
//   2. Paste this entire file
//   3. Replace SHEET_ID with your value from .env (GSHEET_SPREADSHEET_ID)
//   4. Deploy → New Deployment → Web App
//      - Execute as: Me
//      - Who has access: Anyone
//   5. Copy the /exec URL → paste into .env as APPS_SCRIPT_EXEC_URL
// ============================================================

// ── CONFIG — load from your .env values ─────────────────────
const SHEET_ID   = 'REPLACE_WITH_GSHEET_SPREADSHEET_ID_FROM_ENV';
const SHEET_NAME = 'Sheet1'; // must match your tab name exactly

// ── MAIN HANDLER ────────────────────────────────────────────
function doGet(e) {
  try {
    const sheet = SpreadsheetApp
      .openById(SHEET_ID)
      .getSheetByName(SHEET_NAME);

    if (!sheet) {
      return errorResponse('Sheet "' + SHEET_NAME + '" not found. Check SHEET_NAME in config.');
    }

    const data    = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows    = data.slice(1).map(row => parseRow(headers, row));

    const response = {
      status:       'success',
      source:       'Google Drive → Google Sheets → Apps Script REST API',
      spreadsheet:  SHEET_ID,
      sheet:        SHEET_NAME,
      total_rows:   rows.length,
      fetched_at:   new Date().toISOString(),
      data:         rows
    };

    return jsonResponse(response);

  } catch (err) {
    return errorResponse(err.toString());
  }
}

// ── PARSE ROW → OBJECT ──────────────────────────────────────
function parseRow(headers, row) {
  const obj = {};
  headers.forEach(function(header, i) {
    const val = row[i];
    // Auto-cast numbers, keep strings as strings
    obj[header] = (val !== '' && !isNaN(val)) ? Number(val) : val;
  });
  return obj;
}

// ── RESPONSE HELPERS ────────────────────────────────────────
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function errorResponse(message) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status:  'error',
      message: message,
      time:    new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── TEST FUNCTION (run manually in Apps Script editor) ───────
function testFetch() {
  const result = doGet({});
  Logger.log(result.getContent());
}
