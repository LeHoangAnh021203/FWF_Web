import { google } from "googleapis"

export type WebBookingRow = {
  fullName: string
  phone: string
}

function getSheetsConfig() {
  const spreadsheetId =
    process.env.GOOGLE_SHEETS_ID?.trim() ||
    process.env.GOOGLE_SHEET_ID?.trim() ||
    ""
  const tab = process.env.GOOGLE_SHEETS_TAB?.trim() || "Web"
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
  const range = `${config.tab}!A:C`

  const appended = await sheets.spreadsheets.values.append({
    spreadsheetId: config.spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          new Date().toLocaleString("sv-SE", { hour12: false }).replace("T", " "),
          row.fullName,
          `'${row.phone}`,
        ],
      ],
    },
  })

  return {
    ok: true as const,
    tab: config.tab,
    updatedRange: appended.data.updates?.updatedRange ?? null,
  }
}
