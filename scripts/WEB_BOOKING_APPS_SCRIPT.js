/**
 * Google Apps Script — FWF Web (banner đặt lịch nhanh)
 * Chỉ ghi tab map (cột A–I), cùng chỗ với đặt lịch cửa hàng.
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
  MAP_SHEET_NAME: "map",
};

function doGet() {
  return json_({
    ok: true,
    message: "FWF Web booking is running",
    tab: CONFIG.MAP_SHEET_NAME,
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
    var email = String((data && data.email) || "").trim();
    var note = String((data && data.note) || "").trim();
    var branchName = String(
      (data && (data.branchName || data.branch)) || ""
    ).trim();
    var isQuote = String((data && data.requestType) || "") === "quote";

    if (!fullName || !phone) {
      return json_({
        ok: false,
        success: false,
        error: "Missing required fields: fullName, phone",
      });
    }

    if (isQuote) {
      return json_({
        ok: true,
        success: true,
        message: "Quote skipped sheet write",
        tab: null,
      });
    }

    var lastRow = appendMapRow_(fullName, phone, email, note, branchName);
    if (!lastRow) {
      return json_({
        ok: false,
        success: false,
        error: "Tab map not found",
      });
    }

    return json_({
      ok: true,
      success: true,
      message: "Saved",
      tab: CONFIG.MAP_SHEET_NAME,
      lastRow: lastRow,
    });
  } catch (err) {
    return json_({ ok: false, success: false, error: String(err) });
  }
}

function appendMapRow_(fullName, phone, email, note, branchName) {
  var ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  var sheet = ss.getSheetByName(CONFIG.MAP_SHEET_NAME);
  if (!sheet) return null;

  var now = new Date();
  sheet.appendRow([
    branchName || "Website",
    fullName,
    "'" + phone,
    email || "",
    Utilities.formatDate(now, "Asia/Ho_Chi_Minh", "yyyy-MM-dd"),
    Utilities.formatDate(now, "Asia/Ho_Chi_Minh", "HH:mm"),
    1,
    note || "web",
    now,
  ]);

  var lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 5).setNumberFormat("yyyy-mm-dd");
  sheet.getRange(lastRow, 6).setNumberFormat("hh:mm");
  sheet.getRange(lastRow, 9).setNumberFormat("yyyy-mm-dd hh:mm:ss");
  return lastRow;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
