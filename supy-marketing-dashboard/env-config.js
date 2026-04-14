// ============================================================
// env-config.js — Environment Configuration Loader
// ============================================================
// In a real Node/server setup, this reads from .env using dotenv.
// For this pure-frontend project, this file holds the non-secret
// config values. SECRETS (API keys, IDs) stay in .env only.
//
// HOW IT WORKS:
//   1. .env holds your real secrets (gitignored)
//   2. This file holds public config safe to commit
//   3. dashboard.html reads CONFIG from this file
//   4. Sensitive values are injected at runtime only
// ============================================================

const CONFIG = {

  // ── API ENDPOINTS ────────────────────────────────────────
  // The actual URL is loaded from .env — this is just the template
  // In production, a build step would inject APPS_SCRIPT_EXEC_URL here
  api: {
    // Replace this with your APPS_SCRIPT_EXEC_URL from .env
    // Never hardcode real deployment IDs in committed files
    appsScriptUrl: "REPLACE_WITH_APPS_SCRIPT_EXEC_URL_FROM_ENV",

    // Public APIs (no secrets needed)
    openFoodFacts: "https://world.openfoodfacts.org/cgi/search.pl",
    restCountries:  "https://restcountries.com/v3.1",
    gccCountryCodes: ["AE", "SA", "QA", "KW", "BH", "OM"],
  },

  // ── GOOGLE SHEETS CONFIG ─────────────────────────────────
  sheets: {
    // Replace with GSHEET_SPREADSHEET_ID from .env
    spreadsheetId: "REPLACE_WITH_GSHEET_SPREADSHEET_ID_FROM_ENV",
    sheetName: "Sheet1",
  },

  // ── DASHBOARD SETTINGS ───────────────────────────────────
  dashboard: {
    title:   "Supy Marketing Automation Dashboard",
    author:  "Valiveti Aiswarya Akanksha",
    version: "1.0.0",
    refreshOnLoad: false,   // set true to auto-fetch on open
    logMaxLines: 20,
  },

};

// ── ENV LOADER (for Node / build environments) ──────────────
// If running with Node.js + dotenv, this block loads .env values
// and overrides the placeholders above.
//
// Usage: node load-env.js  (or via your build script)
//
// require('dotenv').config();
// CONFIG.api.appsScriptUrl   = process.env.APPS_SCRIPT_EXEC_URL;
// CONFIG.sheets.spreadsheetId = process.env.GSHEET_SPREADSHEET_ID;

// Export for use in other scripts
if (typeof module !== 'undefined') module.exports = CONFIG;
