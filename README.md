# Smart Prompt Engineer (ئەندازیاری پرۆمتی زیرەک)

سیستەمی پێشکەوتووی ئەندازیاری و داڕشتنی پرۆمتی ستاندارد بۆ ژیری دەستکرد (Claude, ChatGPT, Midjourney, Cursor, Gemini).

---

## ⚡ خزمەتگوزاری دژە وەستان (Anti-Pause / 24/7 Keep-Alive)

سێرڤەرە بێبەرامبەرەکان (وەک Render، Koyeb، Cloud Run، Railway) دوای ١٠ بۆ ١٥ خولەک لە نەبوونی بەکارهێنەر ئەچنە دۆخی **Sleep / Pause** (دەکوژێنەوە تا سەردانکەری نوێ دێت، کە دەبێتە هۆی ساردی و وەستانی زۆر).

بۆ چارەسەرکردنی ئەم کێشەیە، **دوو سیستەمی دژە-وەستان** لەم پرۆژەیەدا جێگیر کراوە:

### ١. سیستەمی خۆکاری ناوخۆیی (Server Keep-Alive Self-Ping)
لە ناو `server.ts`دا کۆدی خۆکار هەموو **٨ خولەک جارێک** پینگی تەندروستی (`/api/health`) ئەنێرێت تا پرۆسێسی نۆد چالاک بمێنێتەوە:
- تەنها گۆڕاوی `APP_URL` لە سێرڤەرەکەت دابنێ (بۆ نموونە: `https://my-app.onrender.com`).
- ئەگەر `APP_URL` نەبێت، سێرڤەر بە ناوخۆیی خۆی گەرم ڕادەگرێت.

### ٢. سیستەمی GitHub Actions (هەرگیز ناوەستێت تەنانەت بە ٠ بەکارهێنەریش!)
فایلی فەرمی `.github/workflows/keep-alive.yml` ئامادە کراوە:
- هەموو **١٠ خولەک جارێک** بە بێبەرامبەر لە سێرڤەرەکانی گیتهەبەوە داواکاری (curl) بۆ ماڵپەڕەکەت دەنێرێت.
- بۆ چالاککردنی لە گیتهەب:
  1. پڕۆژەکەت بنێرە بۆ گیتهەب (`git push`).
  2. لە لاپەڕەی پرۆژەکەت لە گیتهەب، بڕۆ بەشی:
     **Settings** ➔ **Secrets and variables** ➔ **Actions**
  3. کلیک لە **New repository secret** بکە:
     - **Name**: `APP_URL`
     - **Value**: بەستەری ماڵپەڕەکەت (وەک: `https://your-app.onrender.com` یان بەستەری Cloud Run)
  4. ئیتر ڕۆبۆتی گیتهەب ٢٤ کاتژمێر بەردەوام پرۆژەکەت بە بەخەبەری دەهێڵێتەوە تەنانەت ئەگەر هیچ سەردانکەرێکیش نەبێت!

### ٣. خزمەتگوزاری بەدیل (Alternative Free Uptime Monitors)
دەتوانیت لە ڕێگەی یەکێک لەم خزمەتگوزارییە خۆڕاییانەشەوە بەستەری ماڵپەڕەکەت دابنێیت:
- [UptimeRobot](https://uptimerobot.com) (بێبەرامبەر پینگی 5 خولەکی)
- [Cron-job.org](https://cron-job.org) (بێبەرامبەر بۆ پینگی بەردەوام بۆ `/api/health`)

---

## 🚀 دامەزراندن و کارپێکردن لە کۆمپیوتەری خۆت (Local Setup)

```bash
# دامەزراندنی پاکێجەکان
npm install

# کارپێکردن لە دۆخی گەشەپێدان
npm run dev

# بیناکردن بۆ بەرهەمهێنان (Production Build)
npm run build
npm start
```

## 🔑 گۆڕاوە ژینگەییەکان (.env)

```env
GEMINI_API_KEY="your-gemini-api-key"
APP_URL="https://your-deployed-domain.com"
KEEP_ALIVE_INTERVAL_MS=480000
```
