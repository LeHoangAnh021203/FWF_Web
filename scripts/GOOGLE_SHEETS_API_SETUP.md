# Google Sheets API — setup nhanh cho tab Web (FWF_Web)

Dùng Sheets API thay Apps Script để ghi booking nhanh hơn (~0.5–1s).

## 1) Google Cloud
1. Vào https://console.cloud.google.com/
2. Tạo project (hoặc chọn project có sẵn)
3. **APIs & Services → Library** → bật **Google Sheets API**
4. **APIs & Services → Credentials → Create credentials → Service account**
5. Đặt tên ví dụ `fwf-web-sheets` → Create → Done
6. Vào service account vừa tạo → tab **Keys → Add key → Create new key → JSON**
7. Tải file JSON về (giữ bí mật, không commit)

## 2) Share Google Sheet
1. Mở sheet **Ghi nhận khách đặt lịch**
2. **Share** → thêm email trong JSON (`client_email`, dạng `...@....iam.gserviceaccount.com`)
3. Quyền: **Editor**

## 3) Điền `.env.local` (FWF_Web)

```env
GOOGLE_SHEETS_ID=1Q-FlAnp591WKhE9qJoKH-yI92yl7gY1zQrg-YqRkwyM
GOOGLE_SHEETS_TAB=Web
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-sa@your-project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

Lấy từ file JSON:
- `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `private_key` → `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` (giữ nguyên `\n`, bọc trong dấu `"..."`)

## 4) Restart
```bash
# dừng npm run dev rồi chạy lại
npm run dev
```

## 5) Kiểm tra
Gửi form banner → API trả `"via":"sheets-api"` là đang đi Sheets API.
Nếu thiếu env, hệ thống tự fallback sang `BOOKING_APPS_SCRIPT_URL`.
