function doGet(e) {
  // ---- CONFIG: paste your Spreadsheet ID here ----
  const SHEET_ID = '1hFVi79XzXGuzaTDnNIU0flGNpyQArXmr_dQN1z6uzsY';
  const SHEET_NAME = 'testfile'; // or whatever your sheet tab is named
  
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    // Convert rows to array of objects
    const rows = data.slice(1).map(row => {
      const obj = {};
      headers.forEach((header, i) => {
        const val = row[i];
        obj[header] = isNaN(val) || val === '' ? val : Number(val);
      });
      return obj;
    });
    
    const response = {
      status: 'success',
      source: 'Google Drive → Google Sheets → Apps Script API',
      spreadsheet_id: SHEET_ID,
      total_rows: rows.length,
      fetched_at: new Date().toISOString(),
      data: rows
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
