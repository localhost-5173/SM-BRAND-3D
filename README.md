# SM BRAND — Industrial Strapping & Packaging Solutions

Premium international-grade static website with real **Three.js 3D Hero Experience**, **GSAP ScrollTrigger**, **Lenis Smooth Scroll**, **Lucide Icons**, and robust backend API integration.

---

## Visual Design System

- **Main Background:** `#08090C` (Deep industrial obsidian)
- **Secondary Background:** `#101216` (Charcoal surface)
- **Card Background:** `#15181F` (Dark glassmorphic elevation)
- **Primary Accent:** `#FF6B16` (High-visibility safety orange)
- **Secondary Accent:** `#FF8C32` (Warm amber glow)
- **Primary Text:** `#F5F5F5` (High-contrast crisp white)
- **Secondary Text:** `#A1A1AA` (Muted technical slate)
- **Borders & Highlights:** Subtle translucency (`rgba(255,255,255,0.08)`) with dynamic orange perimeter glow on hover

---

## 3D & Motion Technology

1. **Three.js Interactive 3D Hero (`assets/js/sm-hero-3d.js`)**:
   - High-fidelity procedural 3D model of an Industrial Automatic Strapping Machine (SM-801 Auto Arch).
   - Features: Industrial cabinet with orange brand accents, stainless steel roller bed, structural overhead arch with inner track channel, dual-segment status beacon tower (Run/Ready), side-mounted strap dispenser reel with translucent flanges & orange PP coil, operator control console with glowing backlit LCD and industrial start/e-stop buttons, strapped corrugated carton box on the work table.
   - Cinematic 3-point lighting + intense orange rim contour spotlight (`#FF6B16`) + soft floor contact shadow plane + floating ambient dust particles.
   - Smooth mouse parallax tilt with lerp damping, continuous idle floating/breathing, and interactive strapping cycle simulation.
   - Automatic WebGL capability detection with lightweight static fallback card for non-WebGL devices.

2. **GSAP & ScrollTrigger (`assets/js/vendor/gsap.min.js`, `ScrollTrigger.min.js`)**:
   - Word-by-word staggered heading reveals (`data-split`).
   - Viewport-triggered section reveals with scale and translateY transforms (`data-reveal`).
   - Staggered product cards entrance (`data-stagger`).
   - Dynamic metric counters with easing (`data-count`).
   - Velocity-responsive marquee ticker acceleration.
   - 3D card tilt and magnetic button physics (`data-tilt`, `data-magnetic`).
   - Full accessibility support: respects `prefers-reduced-motion: reduce`.

3. **Lenis Smooth Scroll (`assets/js/vendor/lenis.min.js`)**:
   - Ultra-smooth inertial scrolling synchronized with the GSAP ticker and ScrollTrigger updates.

4. **Lucide Icons (`assets/js/vendor/lucide.min.js`)**:
   - Consistent, modern, crisp vector iconography across all navigation, cards, specs, and CTAs.

---

## Pages Overview

| File | Description |
|---|---|
| `index.html` | Homepage: Three.js 3D hero, live marquee ticker, key metrics, interactive bento catalogue, ready stock grid, 3-step timeline, smart machine finder wizard, verified plant manager reviews, high-impact CTA |
| `machines.html` | Strapping machines catalog with category filters (Semi-Auto / Auto Arch / High-Speed) + full specification comparison matrix |
| `rolls.html` | Virgin PP & high-tensile PET strapping rolls (12/15/19mm), 11 color swatches, metal seals, buckles, bulk discounts |
| `tools.html` | Cordless battery-powered friction-weld tools & heavy-duty manual tensioners, sealers, and spare blades |
| `service.html` | Engineering service, on-site commissioning, emergency repair helpline, and ready-to-ship spare parts table |
| `contact.html` | Direct quotation builder (with live field validation, WhatsApp routing, and backend API lead capture) + warehouse coordinates |
| `product.html` | Dynamic product detail view loaded via `?slug=...` query parameter with sticky image plate, specifications table, and quote triggers |

---

## Folder Structure

```
sm-brand-website/
├── index.html
├── machines.html
├── rolls.html
├── tools.html
├── service.html
├── contact.html
├── product.html
├── README.md
└── assets/
    ├── css/
    │   └── sm.css                 # Complete design system & responsive styling
    ├── img/
    │   ├── machine-auto.jpg       # Automatic strapping machine
    │   ├── machine-semi.jpg       # Semi-automatic strapping machine
    │   ├── rolls.jpg              # Strapping roll dispenser & coils
    │   ├── tool-battery.jpg       # Cordless battery strapping tool
    │   └── tool-hand.jpg          # Manual tensioner & sealer tools
    └── js/
        ├── sm-config.js           # API configuration (SM_API_BASE)
        ├── sm-data.js             # High-resolution offline fallback catalog (18+ items)
        ├── sm-hero-3d.js          # Three.js 3D industrial strapping machine experience
        ├── sm.js                  # Motion, Lenis scroll, filters, finder, form validation
        └── vendor/
            ├── three.min.js       # Three.js r128 (local bundle)
            ├── gsap.min.js        # GSAP 3 (local bundle)
            ├── ScrollTrigger.min.js
            ├── lenis.min.js       # Lenis smooth scroll
            └── lucide.min.js      # Lucide icons (local bundle)
```

---

## Backend Integration

Configuration is located in `assets/js/sm-config.js`:

```javascript
window.SM_API_BASE = "https://your-backend.example.com";
```

- When `SM_API_BASE` is left as `""` (empty string), the website runs completely standalone using the built-in catalog in `assets/js/sm-data.js`.
- When configured, the site interfaces with:
  - `GET  /api/products?category=machines|rolls|battery|hand` — dynamic product listings.
  - `GET  /api/products/:slug` — individual product detail queries.
  - `POST /api/leads` — quote form submissions with payload: `{ name, whatsapp, city, need, message, source_page }`.
- If the backend is unreachable or takes longer than 5 seconds, it automatically falls back gracefully to `SM_FALLBACK`.

---

## Business Contacts & Configuration

- **WhatsApp & Phone:** `+92 310 2261760`
- **Email:** `ar7776845@gmail.com`
- **Depot & Offices:**
  - Karachi: Plot 14, S.I.T.E Industrial Area
  - Lahore: Sundar Industrial Estate
  - Faisalabad: Khurrianwala Industrial Corridor
- **Operating Hours:** Monday–Saturday, 9:00 AM – 9:00 PM PKT

---

## Local Preview

Run any local HTTP server (recommended for ES module and smooth asset loading):

```bash
# Python 3
python -m http.server 8000

# or Node.js npx
npx serve .
```

Open `http://localhost:8000` in your browser.
