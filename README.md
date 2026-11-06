# SM BRAND — Website (Dark / Orange redesign)

Static website: HTML + CSS + JavaScript. Koi build step zaroori nahi.

## Preview
`index.html` double-click karke kholein. Behtar hai local server se chalayein (smooth scroll aur product page ke liye):

    python3 -m http.server 8000      # phir http://localhost:8000

## Pages
| File | Kaam |
|---|---|
| `index.html` | Home: hero, bento catalogue, ready stock, how it works, machine finder, reviews |
| `machines.html` | Machines + filters (Semi-Auto / Automatic / High-Speed) + compare table |
| `rolls.html` | PP / PET rolls, seals, buckles + filters |
| `tools.html` | Battery tools aur hand tools |
| `service.html` | Service, spare parts table |
| `contact.html` | Quote form (WhatsApp pe bhejta hai) |
| `product.html?slug=...` | Ek product ka detail page |

## Folder structure
    assets/
      css/sm.css            # poora design system (colors, cards, buttons)
      js/sm.js              # animations, filters, finder, form, product loading
      js/sm-config.js       # API address (neeche dekhein)
      js/sm-data.js         # built-in product list (offline / fallback)
      js/vendor/            # GSAP, ScrollTrigger, Lenis (local copies, CDN nahi chahiye)
      img/                  # product photos

## Backend se jodna
`assets/js/sm-config.js` kholein aur ye line badlein:

    window.SM_API_BASE = "https://your-backend.example.com";

Agar aap ke paas pehle se `sm-config.js` hai to uski `SM_API_BASE` value isme copy kar dein.
Khali ("") chhorne par site apni built-in list se chalti hai.

Site ye endpoints use karti hai:
- `GET  /api/products?category=machines|rolls|battery|hand`
- `GET  /api/products/:slug`
- `POST /api/leads` — body: `{name, whatsapp, city, need, message, source_page}`

Product ka format: `slug, name, price_label, spec, badge, tag, category, img`
(optional: `description`, `specs` = `[["Speed","24/min"], ...]`).
Backend na chale ya 5 second se zyada le to site khud built-in list dikha deti hai.

## Content badalna
- **Products (offline list):** `assets/js/sm-data.js`
- **Phone number:** `923102261760` ko `assets/js/sm.js` (top par `WA`) aur HTML files ke `wa.me` links mein badlein.
- **Rang:** `assets/css/sm.css` ke shuru mein `--orange` waghera.
- **Photos:** `assets/img/` mein file badlein (same naam rakhein). White background wali photos behtar lagti hain.
- **Naya product:** `sm-data.js` mein ek entry add karein (ya backend mein).

## Animations band karna
- User ke device par "reduce motion" on ho to khud band ho jati hain.
- Poori tarah band karne ke liye pages se `gsap`, `ScrollTrigger`, `lenis` ke `<script>` hata dein. Site normal chalegi.

## Deploy
Kisi bhi static hosting par folder upload karein (Netlify, Vercel, Cloudflare Pages, GitHub Pages, cPanel). Backend alag host karein aur `SM_API_BASE` mein uska address daalein. Backend mein apni site ka domain CORS mein allow karna na bhoolein.

## Dhyan dein
- Client names, "1400+ factories" aur reviews apni asal maloomat se confirm karein.
- Working hours sab jagah Mon–Sat 9am–9pm hain; zaroorat ho to badlein.
- Product photos mein se kuch par watermark hai; apni photos lagayein.
