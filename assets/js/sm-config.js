/* ------------------------------------------------------------------
   SM BRAND — site config
   If you already have a working sm-config.js, keep YOUR value of
   SM_API_BASE and leave the rest. Pages use only these 3 globals.
   Leave SM_API_BASE as "" to run fully standalone (built-in product list).
   ------------------------------------------------------------------ */
window.SM_API_BASE = window.SM_API_BASE || "";            // e.g. "https://your-backend.example.com"
window.SM_ASSET_URL = window.SM_ASSET_URL || function (p) {
  if (!p) return "";
  if (/^(https?:|data:|\/)/.test(p)) return p;             // absolute / data URL
  return p;                                                // relative to the page, e.g. assets/img/rolls.jpg
};
window.SM_PRODUCT_URL = window.SM_PRODUCT_URL || function (slug) {
  return "product.html?slug=" + encodeURIComponent(slug);
};
