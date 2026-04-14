# 📊 Supy Marketing Automation Dashboard

[![Status](https://img.shields.io/badge/status-active-2de89b?style=flat-square)](.)
[![Free Tier](https://img.shields.io/badge/cost-$0%20free%20tier-f0a500?style=flat-square)](.)
[![No Dependencies](https://img.shields.io/badge/dependencies-zero-4dabf7?style=flat-square)](.)
[![Google Apps Script](https://img.shields.io/badge/API-Google%20Apps%20Script-ff5c3a?style=flat-square)](https://script.google.com)

> A live marketing analytics dashboard built for **[Supy.io](https://supy.io)** — an AI-powered platform helping global restaurant brands manage inventory, procurement, and business intelligence across the GCC.
>
> Fetches real campaign data from **Google Drive** via a **Google Apps Script REST API**, parses JSON, and renders KPIs, charts, and regional breakdowns — zero dependencies, zero cost, one HTML file.

---

## 🏗️ Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────────────┐
│  Google Drive   │────▶│  Google Sheets   │────▶│  Google Apps Script     │
│  (CSV file)     │     │  (data source)   │     │  (free REST API /exec)  │
└─────────────────┘     └──────────────────┘     └────────────┬────────────┘
                                                               │
                                                          HTTP GET
                                                               │
                                                  ┌────────────▼────────────┐
                                                  │    Browser fetch()      │
                                                  │    JSON Parser          │
                                                  │    KPI Aggregation      │
                                                  └────────────┬────────────┘
                                                               │
                                                  ┌────────────▼────────────┐
                                                  │   Live Dashboard        │
                                                  │   (HTML + Canvas + JS)  │
                                                  └─────────────────────────┘
```

**Every layer is free.** No servers, no paid APIs, no frameworks, no build tools.

---

## 📁 Project Structure

```
supy-marketing-dashboard/
│
├── dashboard.html          # Main dashboard — open in browser to run
├── apps-script-api.gs      # Google Apps Script backend code
├── env-config.js           # Public config (non-secret settings)
├── supy_campaigns.csv      # Synthetic GCC campaign dataset (15 rows)
│
├── .env                    # 🔒 YOUR SECRETS — never committed (gitignored)
├── .env.example            # ✅ Safe template — commit this
├── .gitignore              # Ignores .env and other sensitive files
└── README.md               # This file
```

---

## ✨ Features

| Feature | Description |
|---|---|
| 📡 **Live API Fetch** | Calls Google Apps Script `/exec` endpoint on manual trigger |
| ☁️ **Google Drive as database** | CSV in Drive → Google Sheet → read by Apps Script API |
| 🧮 **5 KPI Cards** | Total budget, leads, avg ROAS, conversions, active campaigns |
| 📊 **Bar Chart** | Lead volume per campaign on HTML5 Canvas (no chart library) |
| 📋 **Campaign Table** | All rows rendered dynamically from API JSON response |
| 📺 **Channel Breakdown** | Spend split across Google Ads, LinkedIn, Email, Meta, TikTok |
| 🌍 **Regional Analysis** | Budget breakdown by GCC market (UAE 🇦🇪, Saudi Arabia 🇸🇦) |
| 🔁 **Pipeline Flow Diagram** | Live visual of each step in the data pipeline |
| 🪵 **Execution Log** | Timestamped log of every API call, parse, and render event |
| 🐛 **Raw Response Viewer** | Shows raw JSON from API for debugging |
| ▶️ **Manual Trigger** | User controls when data fetches — no auto-polling |
| 🔐 **Secrets in .env** | All API keys and IDs stored in .env, never in code |

---

## 🚀 Quick Start

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/supy-marketing-dashboard.git
cd supy-marketing-dashboard
```

### 2. Set up your environment
```bash
cp .env.example .env
```
Open `.env` and fill in your values (see [Environment Variables](#-environment-variables) below).

### 3. Set up the data source

**a) Upload CSV to Google Drive**
- Upload `supy_campaigns.csv` to your Google Drive
- Right-click → **Open with → Google Sheets**
- Copy the **Spreadsheet ID** from the URL:
  ```
  https://docs.google.com/spreadsheets/d/THIS_IS_YOUR_ID/edit
  ```
- Paste it into `.env` as `GSHEET_SPREADSHEET_ID`

### 4. Deploy the Apps Script API

1. Go to [script.google.com](https://script.google.com) → **New Project**
2. Copy the contents of `apps-script-api.gs` into the editor
3. Replace `REPLACE_WITH_GSHEET_SPREADSHEET_ID_FROM_ENV` with your actual Spreadsheet ID
4. Click **Deploy → New Deployment**
   - Type: `Web app`
   - Execute as: `Me`
   - Who has access: `Anyone`
5. Copy the `/exec` URL
6. Paste it into `.env` as `APPS_SCRIPT_EXEC_URL`

### 5. Run the Dashboard

Open `dashboard.html` in your browser — click **▶ Run Pipeline**.

That's it. Your Google Drive CSV data will appear live in the dashboard.

---

## 🔐 Environment Variables

All secrets are stored in `.env` (never committed). Copy `.env.example` to get started.

| Variable | Description | Where to get it |
|---|---|---|
| `APPS_SCRIPT_EXEC_URL` | Your Apps Script Web App URL | script.google.com → Deploy |
| `APPS_SCRIPT_DEPLOYMENT_ID` | Deployment ID only | From the /exec URL |
| `GDRIVE_FOLDER_ID` | Google Drive folder ID | From folder URL |
| `GDRIVE_FILE_ID` | CSV file ID in Drive | From file URL |
| `GSHEET_SPREADSHEET_ID` | Google Sheets document ID | From spreadsheet URL |
| `GSHEET_SHEET_NAME` | Tab name in the sheet | Default: `Sheet1` |
| `GOOGLE_CLIENT_ID` | OAuth Client ID (optional) | console.cloud.google.com |
| `GOOGLE_CLIENT_SECRET` | OAuth Secret (optional) | console.cloud.google.com |
| `HUBSPOT_API_KEY` | HubSpot CRM key (optional) | HubSpot developer portal |
| `JSONBIN_API_KEY` | JSONBin key (optional) | jsonbin.io |

> ⚠️ **Never paste real secrets into `env-config.js` or `dashboard.html`.** Those files are committed to GitHub. Only `.env` holds real values, and `.env` is gitignored.

---

## 📄 Dataset

`supy_campaigns.csv` — 15 synthetic GCC restaurant SaaS marketing campaigns.

| Field | Type | Description |
|---|---|---|
| `campaign_id` | string | Unique ID (C001–C015) |
| `campaign_name` | string | Campaign name |
| `channel` | string | Google Ads / LinkedIn / Email / Meta Ads / TikTok |
| `status` | string | `active` / `completed` / `planned` |
| `start_date` | date | Campaign start |
| `end_date` | date | Campaign end |
| `budget_usd` | number | Allocated budget |
| `spend_usd` | number | Amount spent |
| `impressions` | number | Total impressions |
| `clicks` | number | Total clicks |
| `leads` | number | Leads generated |
| `conversions` | number | Deals closed |
| `ctr_pct` | number | Click-through rate % |
| `conv_rate_pct` | number | Conversion rate % |
| `roas` | number | Return on ad spend |
| `cpc_usd` | number | Cost per click |
| `region` | string | UAE / Saudi Arabia / GCC |

---

## 🔌 API Reference

**Endpoint:** `GET https://script.google.com/macros/s/{DEPLOYMENT_ID}/exec`

**Response:**
```json
{
  "status": "success",
  "source": "Google Drive → Google Sheets → Apps Script REST API",
  "spreadsheet": "your_spreadsheet_id",
  "sheet": "Sheet1",
  "total_rows": 15,
  "fetched_at": "2025-04-15T10:32:00.000Z",
  "data": [
    {
      "campaign_id": "C001",
      "campaign_name": "Supy Inventory Launch",
      "channel": "Google Ads",
      "status": "completed",
      "budget_usd": 5000,
      "spend_usd": 4820,
      "leads": 187,
      "conversions": 42,
      "roas": 4.8,
      "region": "UAE"
    }
  ]
}
```

**Error response:**
```json
{
  "status": "error",
  "message": "Sheet 'Sheet1' not found",
  "time": "2025-04-15T10:32:00.000Z"
}
```

---

## 🛠️ Tech Stack

| Layer | Technology | Cost |
|---|---|---|
| Data storage | Google Drive + Google Sheets | Free |
| API backend | Google Apps Script (Web App) | Free |
| HTTP request | Browser `fetch()` API | Free |
| Frontend | Vanilla HTML5 + CSS3 + JavaScript | Free |
| Charts | HTML5 Canvas (no library) | Free |
| Fonts | Google Fonts (Syne + DM Mono) | Free |
| Secrets management | `.env` file + `.gitignore` | Free |
| **Total** | | **$0 / month** |

---

## 💡 How This Maps to Supy's Requirements

| Supy Internship Requirement | This Project |
|---|---|
| ✅ Built automation / project | Full data pipeline: Drive → Sheets → API → Dashboard |
| ✅ Basic Python or JavaScript | Entire frontend + data logic in vanilla JavaScript |
| ✅ Comfort working with APIs and JSON | REST endpoint, `fetch()`, JSON parsing, error handling |
| ✅ Build dashboards and data pipelines | Live dashboard with 5 KPIs, chart, table, regional breakdown |
| ✅ Automate repetitive marketing tasks | Apps Script auto-reads Drive CSV and exposes it as REST API |
| ✅ Analyze data (SEO, campaigns, CRM) | Campaign CTR, ROAS, conversion rate, channel spend analysis |
| ✅ SEO / marketing analytics knowledge | Campaign performance metrics across GCC restaurant SaaS market |

---

## 🐛 Troubleshooting

| Problem | Cause | Fix |
|---|---|---|
| `CORS error` | Apps Script not set to "Anyone" | Deploy → Manage → set access to **Anyone** |
| `0 rows returned` | Wrong sheet tab name | Change `SHEET_NAME` in `apps-script-api.gs` to match your tab |
| `not valid JSON` | Old deployment cached | Create a **New Deployment** (not update existing) |
| `HTTP 401` | Sheet is private | Make sure the Google Sheet is accessible to **Anyone with the link** |
| `fetch failed` | URL is wrong | Check `APPS_SCRIPT_EXEC_URL` ends in `/exec` not `/dev` |

---

## 📸 Dashboard Preview

```
┌─────────────────────────────────────────────────────────┐
│  SUpyIQ          ● LIVE   10:32:15     [▶ Run Pipeline] │
├─────────────────────────────────────────────────────────┤
│  Google Drive API Pipeline                               │
│  ☁️ Drive → 📊 Sheets → ⚡ API → 🔄 Parse → 📈 Render  │
├──────────┬──────────┬──────────┬──────────┬─────────────┤
│ $58,600  │  1,921   │  5.2x    │   418    │      5      │
│ Budget   │  Leads   │  ROAS    │  Conv.   │   Active    │
├──────────┴──────────┴──────────┴──────────┴─────────────┤
│  Campaign Table          │  Spend by Channel             │
│  ─────────────────────── │  Google Ads ████████  $28k   │
│  C001  Inventory Launch  │  Email      █████     $2k    │
│  C002  AI Platform       │  LinkedIn   ████      $9k    │
│  ...                     │  Meta       ██        $4k    │
├──────────────────────────┴───────────────────────────────┤
│  Lead Volume Chart       │  Budget by Region             │
│  ▐█  ▐█ ▐██ ▐█ ▐██      │  🇦🇪 UAE          $28,200   │
│  ▐█  ▐█ ▐██ ▐█ ▐██      │  🇸🇦 Saudi Arabia $15,700   │
│                          │  🌍 GCC           $14,700   │
└──────────────────────────┴───────────────────────────────┘
```

---

## 👩‍💻 Author

**Valiveti Aiswarya Akanksha**
B.E. Computer Science — BITS Pilani, Dubai Campus (Expected 2026)

📧 [aiswarya.akanksha@gmail.com](mailto:aiswarya.akanksha@gmail.com)
🔗 [LinkedIn](https://linkedin.com/in/aiswarya-akanksha-valiveti-b01530364)

---

## 📝 License

MIT License — feel free to use, modify, and distribute.

---

*Built as an application project for the Supy.io Marketing Automation Internship, Dubai 2025.*
