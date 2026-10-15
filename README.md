# Code & Cupcakes 🧁 — Yadnesh's Developer Portfolio

> **“Code & Cupcakes — thoughtfully crafted software.”**  
> A memorable, professional developer portfolio for **Yadnesh**, an aspiring software engineer specializing in **Java**, **React**, and modular system design.

---

## 🌟 Creative Concept & Design Highlights

- **Theme & Identity:** Blends a high-contrast dark palette (`#080B14`, `#101625`) with signature violet (`#8B5CF6`) and cyan (`#06B6D4`) lighting, accentuated by subtle dessert nuances (lavender frosting `#C4B5FD`, soft strawberry `#F472B6`, and rich chocolate brown `#3D2314`).
- **Interactive Procedural 3D Cupcake:** Built with vanilla **Three.js** (no heavy external 3D models or bulky loaders). Features:
  - Tapered fluted paper wrapper with 32 pleated ridges.
  - Procedural swirling frosting with tapered `TubeGeometry`.
  - Glossy cherry with curved stem.
  - Instanced sprinkles rendered in a single draw call.
  - Flavor switcher buttons (**Violet Velvet**, **Strawberry Cream**, **Cyan Glaze**).
  - Idle bobbing & rotation with interactive mouse/pointer drag & tilt.
  - Pause/Play motion controls and seamless 2D SVG fallback.
- **Microinteractions & Aesthetics:**
  - Dynamic reading-progress bar at the top of the viewport.
  - Floating pill navigation bar with active section indicator and blur backdrop.
  - Asymmetric recipe cards and clean section-divider frosting waves.
  - 3D perspective mouse tilt on cards (fine pointer devices only).
  - Staggered scroll reveals and accessible disclosure accordions.
- **Honest Engineering Standards:**
  - Missing or placeholder links trigger an honest modal notice instead of broken URLs or `#`.
  - Missing résumé triggers an accessible informative dialog without pretending a file was delivered.
  - Contact form features an honest **"Open Email Draft"** mailto action and **"Copy Message Text"** clipboard helper.

---

## 🛠️ Lightweight Tech Stack

- **Vite** — Fast, modern build tool and dev server.
- **Vanilla JavaScript (ES Modules)** — Clean, maintainable, modular structure.
- **Vanilla CSS** — CSS variables, flexbox, CSS grid, glassmorphism, native smooth scrolling, and reduced-motion queries.
- **Lucide Icons** — Lightweight vector iconography (importing strictly the used icons).
- **Three.js** — Procedural 3D hero cupcake only (lazy-loaded in a separate chunk).
- **Zero Heavy Frameworks:** No React, Next.js, Tailwind, Bootstrap, GSAP, Framer Motion, or jQuery.

---

## 📁 Project Structure

```text
Yadnesh_Portfolio/
├── index.html                  # Semantic HTML5 with SEO & OpenGraph tags
├── package.json                # npm dependencies & build scripts
├── README.md                   # Documentation & configuration guide
├── public/
│   ├── favicon.svg             # Custom cupcake & code bracket SVG icon
│   └── assets/
│       └── README.md           # Instructions for placing resume.pdf
└── src/
    ├── main.js                 # App initialization, dynamic rendering, Lucide icons
    ├── styles.css              # Design tokens, responsive styles, animations
    ├── data.js                 # Single source of truth for personal data & links
    ├── interactions.js         # Navigation, filter tabs, accordions, tilt, modals
    └── cupcake-scene.js        # Procedural Three.js 3D cupcake centerpiece
```

---

## 🚀 Setup & Local Development

### Prerequisites
- Node.js (v18+ recommended)
- npm or npx

### Commands

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Local Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

3. **Create Production Bundle:**
   ```bash
   npm run build
   ```
   The compiled static files will be generated in `dist/`.

4. **Preview Production Build:**
   ```bash
   npm run preview
   ```

---

## ✏️ Customization & Content Editing

All portfolio data, links, skills, and projects are centralized in [`src/data.js`](src/data.js).

### 1. Adding Real Profile & Social Links
Open `src/data.js` and edit `portfolioData.links`:
```javascript
links: {
  github: "https://github.com/your-username",       // Your verified GitHub URL
  linkedin: "https://linkedin.com/in/your-profile",  // Your verified LinkedIn URL
  leetcode: "https://leetcode.com/u/your-handle",    // Your LeetCode handle
  email: "your.actual.email@example.com",           // Your email for inquiries
  resumePdf: "/assets/resume.pdf"                    // Path to your PDF file
}
```
*Note: Any link left empty (`""`) will automatically trigger the honest modal dialog instead of breaking.*

### 2. Adding Your Real Résumé PDF
1. Place your compiled PDF file inside the `public/assets/` directory and name it `resume.pdf`.
2. In `src/data.js`, set:
   ```javascript
   links: {
     resumePdf: "/assets/resume.pdf"
   }
   ```
3. Clicking **"Résumé"** in the navigation bar or hero will now open your PDF directly.

### 3. Adding or Updating Projects
In `src/data.js`, update or add entries to `portfolioData.projects`:
- `title`: Project name
- `type`: Category (e.g. `Desktop Application`, `Web Architecture Concept`)
- `status`: Honest current status (e.g. `Completed Academic Project`, `Concept`, `Prototype`)
- `tagline`: Concise summary
- `technologies`: Array of strings
- `repoUrl`: GitHub repository URL (leave `""` for unlinked projects)
- `caseStudy`: Object containing `problem`, `approach`, `mainFeatures`, `implementationStatus`, and `whatILearned`.

---

## 🚢 Static Deployment Instructions

### Deploying to Vercel

1. **Via Vercel CLI:**
   ```bash
   npx vercel
   ```
   Follow the CLI prompts:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`

2. **Via Git Integration (GitHub / GitLab):**
   - Push your repository to GitHub.
   - Go to [vercel.com](https://vercel.com) and import the repository.
   - Framework preset is automatically detected as `Vite`.
   - Click **Deploy**.

---

### Deploying to Netlify

1. **Via Netlify Drop:**
   - Run `npm run build` locally.
   - Drag and drop the generated `dist/` folder into [app.netlify.com/drop](https://app.netlify.com/drop).

2. **Via Git Integration:**
   - Connect your repository in Netlify.
   - Set **Build command**: `npm run build`
   - Set **Publish directory**: `dist`
   - Click **Deploy site**.

---

## ✅ Quality & Verification Summary

- **Production Build:** `npm run build` compiles cleanly with code splitting (`dist/assets/cupcake-scene-*.js` lazy-loaded).
- **Responsive Layout:** Tested across desktop, tablet, and mobile widths with no horizontal overflow.
- **Accessibility:** Includes skip-to-content link, keyboard focus rings (`:focus-visible`), ARIA tabs, ARIA disclosure accordions, semantic landmarks, and full `prefers-reduced-motion` compliance.
- **Lightweight 3D:** Three.js scene utilizes procedural geometries (sub-1,000 vertices), instanced sprinkles (single draw call), and automatically pauses rendering when out of viewport or when tab is hidden.
- **Graceful Fallback:** Automatic vector SVG fallback on mobile devices, unsupported WebGL, or reduced-motion environments.
