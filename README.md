# Portfolio Nguyễn Thế Trọng

React + Vite + Tailwind. Nội dung lấy từ Google Sheet, chatbot dùng Gemini qua hàm serverless trên Vercel.

## Cách hoạt động
- `src/` là giao diện (đã duyệt v3, giữ nguyên màu, font, bố cục). Nội dung do Sheet quyết định, không sửa trong code.
- `api/content.js` đọc các tab Sheet đã publish (CSV), cache 5 phút, bỏ cột `note`. Lỗi thì trang dùng bản chụp `src/data/snapshot.json`.
- `api/chat.js` gọi Gemini, giữ API key ở server, chỉ trả lời theo dữ liệu Sheet (tab `Bot` chứa quy tắc), giới hạn 8 câu hỏi mỗi IP mỗi 10 phút, hết hạn mức thì trang hiện email liên hệ.

## Deploy lên Vercel (Hobby)
1. Vercel, Add New, Project, Import repo này. Framework tự nhận là Vite, giữ mặc định.
2. Settings, Environment Variables, thêm `SHEET_PUB_BASE` và `GEMINI_API_KEY` (xem `.env.example`).
3. Deploy. Sau mỗi lần sửa Sheet, trang cập nhật trong khoảng 5 phút.

## Publish Google Sheet
File, Share, Publish to web. Chọn từng tab (Profile, HeroStats, Cases, CaseMetrics, CreativeSkills, Channels, Experience, Tools, Offer, Bot), định dạng CSV, Publish. Link có dạng
`https://docs.google.com/spreadsheets/d/e/<KEY>/pub?gid=...&single=true&output=csv`. Lấy phần `https://docs.google.com/spreadsheets/d/e/<KEY>/pub` làm `SHEET_PUB_BASE`.
Lưu ý: tab đã publish là công khai. Không để thông tin riêng tư trong các tab này (cột `note` được hàm API loại bỏ, nhưng link CSV gốc vẫn xem được).

## Chạy thử trên máy
```
npm install
npm run dev          # giao diện, dùng bản chụp dữ liệu
npx vercel dev       # chạy cả /api (cần file .env.local)
npm run sync         # cập nhật bản chụp từ Sheet (cần SHEET_PUB_BASE)
```

## Ảnh
Thả file vào `public/images/` rồi ghi đường dẫn vào Sheet (ví dụ `images/c1-dashboard-1.png`). Cột `chart_image` nhận nhiều ảnh ngăn cách bằng dấu chấm phẩy.
