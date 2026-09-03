import { google } from "googleapis"
import type { sheets_v4 } from "googleapis"

export type WebBookingRow = {
  fullName: string
  phone: string
  email?: string
  note?: string
  branchName?: string
}

function getSheetsConfig() {
  const spreadsheetId =
    process.env.GOOGLE_SHEETS_ID?.trim() ||
    process.env.GOOGLE_SHEET_ID?.trim() ||
    ""
  const tab = process.env.GOOGLE_SHEETS_MAP_TAB?.trim() || "map"
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim() || ""
  const privateKey = (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || "")
    .replace(/^"|"$/g, "")
    .replace(/\\n/g, "\n")
    .trim()

  if (!spreadsheetId || !clientEmail || !privateKey) {
    return null
  }

  return { spreadsheetId, tab, clientEmail, privateKey }
}

export function isGoogleSheetsApiConfigured() {
  return Boolean(getSheetsConfig())
}

function vietnamTimestamp() {
  return new Date()
    .toLocaleString("sv-SE", {
      hour12: false,
      timeZone: "Asia/Ho_Chi_Minh",
    })
    .replace("T", " ")
}

function splitTimestamp(timestamp: string) {
  const [datePart = "", timePart = ""] = timestamp.split(" ")
  return {
    date: datePart,
    time: timePart.slice(0, 5),
  }
}

function mapBookingValues(row: WebBookingRow, timestamp: string) {
  const { date, time } = splitTimestamp(timestamp)

  // map: A chi nhánh | B tên | C SĐT | D email | E ngày hẹn | F giờ hẹn | G số khách | H ghi chú | I thời điểm đặt
  return [
    row.branchName?.trim() || "Website",
    row.fullName,
    `'${row.phone}`,
    row.email?.trim() || "",
    date,
    time,
    1,
    row.note?.trim() || "web",
    timestamp,
  ]
}

async function appendRow(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  range: string,
  values: Array<string | number>,
) {
  return sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [values] },
  })
}

export async function appendWebBookingRow(row: WebBookingRow) {
  const config = getSheetsConfig()
  if (!config) {
    return { ok: false as const, error: "Google Sheets API is not configured." }
  }

  const auth = new google.auth.JWT({
    email: config.clientEmail,
    key: config.privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  })

  const sheets = google.sheets({ version: "v4", auth })
  const timestamp = vietnamTimestamp()

  try {
    const appended = await appendRow(
      sheets,
      config.spreadsheetId,
      `${config.tab}!A:I`,
      mapBookingValues(row, timestamp),
    )

    return {
      ok: true as const,
      tab: config.tab,
      updatedRange: appended.data.updates?.updatedRange ?? null,
    }
  } catch (error) {
    return {
      ok: false as const,
      error: error instanceof Error ? error.message : "Không ghi được Google Sheet.",
    }
  }
}
