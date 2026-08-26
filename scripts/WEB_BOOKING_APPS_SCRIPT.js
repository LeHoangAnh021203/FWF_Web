/**
 * Google Apps Script — FWF Web (banner đặt lịch nhanh)
 * Chỉ ghi: Thời gian | Họ tên | SĐT
 *
 * Setup:
 * 1. Sheet → Tiện ích → Apps Script → dán vào Code.gs
 * 2. Kiểm tra CONFIG.SHEET_ID
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. FWF_Web/.env.local:
 *    BOOKING_APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXX/exec
 * 5. Restart npm run dev
 */

var CONFIG = {
  // docs.google.com/spreadsheets/d/<SHEET_ID>/edit
  SHEET_ID: "1Q-FlAnp591WKhE9qJoKH-yI92yl7gY1zQrg-YqRkwyM",
  SHEET_NAME: "Web",
};

var HEADERS = ["Thời gian", "Họ tên", "SĐT"];

function doGet() {
  return json_({
    ok: true,
    message: "FWF Web booking is running",
    tab: CONFIG.SHEET_NAME,
  });
}

function doPost(e) {
  try {
    var raw = e && e.postData && e.postData.contents;
    if (!raw) {
      return json_({ ok: false, success: false, error: "Empty body" });
    }

    var data = JSON.parse(raw);
    var fullName = String(
      (data && (data.fullName || data.name || data.customerName)) || ""
    ).trim();
    var phone = String(
      (data && (data.phone || data.customerPhone)) || ""
    ).trim();

    if (!fullName || !phone) {
      return json_({
        ok: false,
        success: false,
        error: "Missing required fields: fullName, phone",
      });
    }

    var sheet = getOrCreateSheet_();
    sheet.appendRow([new Date(), fullName, "'" + phone]);

    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1).setNumberFormat("yyyy-mm-dd hh:mm:ss");

    return json_({
      ok: true,
      success: true,
      message: "Saved",
      tab: CONFIG.SHEET_NAME,
      lastRow: lastRow,
    });
  } catch (err) {
    return json_({ ok: false, success: false, error: String(err) });
  }
}

function getOrCreateSheet_() {
  var ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
