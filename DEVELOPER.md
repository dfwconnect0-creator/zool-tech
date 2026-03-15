# Zool Tech — Developer Documentation

> **Last Updated:** March 15, 2026  
> **Website:** [https://zool-tech.com](https://zool-tech.com)  
> **Firebase Preview:** [https://zooldfw-670da.web.app](https://zooldfw-670da.web.app)

---

## 📋 Project Overview

**Zool Tech** (زول تك) is a single-page Arabic (RTL) website for a laptop repair and refurbished laptop business based in Dallas, Texas (DFW area). The site showcases services, inventory, and contact information.

### Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Structure** | HTML5 (semantic, RTL) |
| **Styling** | Vanilla CSS (custom properties, animations, responsive) |
| **Logic** | Vanilla JavaScript (no frameworks) |
| **Font** | [Cairo](https://fonts.google.com/specimen/Cairo) (Arabic) + Roboto Mono |
| **Hosting** | Firebase Hosting |
| **Domain** | `zool-tech.com` (registered at [Name.com](https://www.name.com)) |
| **Version Control** | GitHub |

---

## 🗂️ File Structure

```
GemyTech-Website-AR/
├── index.html          # Main page (all sections)
├── style.css           # All styles, animations, responsive breakpoints
├── script.js           # Inventory data, filtering, form handling, UI logic
├── 404.html            # Custom 404 error page
├── logo.png            # Brand logo
├── ad.jpeg             # Hero section promotional image
├── firebase.json       # Firebase Hosting configuration
├── .firebaserc         # Firebase project alias configuration
└── DEVELOPER.md        # This file
```

---

## 🔧 Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) (for Firebase CLI and local server)
- [Firebase CLI](https://firebase.google.com/docs/cli): `npm install -g firebase-tools`

### Run Locally

```bash
# Option 1: Simple HTTP server
npx http-server -p 8080

# Option 2: Firebase emulator
firebase emulators:start --only hosting
```

Then open `http://localhost:8080` in your browser.

---

## 🚀 Deployment

### Accounts & Access

| Service | Account | Access |
| :--- | :--- | :--- |
| **Firebase Console** | `dfw.connect0@gmail.com` | [Console Link](https://console.firebase.google.com/project/zooldfw-670da/overview) |
| **GitHub Repository** | `dfwconnect0-creator` | [Repo Link](https://github.com/dfwconnect0-creator/zool-tech) |
| **Domain (Name.com)** | `dfw.connect0@gmail.com` | [Name.com](https://www.name.com) |

### Firebase Project Details

| Property | Value |
| :--- | :--- |
| **Project ID** | `zooldfw-670da` |
| **Display Name** | Zooldfw |
| **Default Hosting URL** | `zooldfw-670da.web.app` |
| **Custom Domain** | `zool-tech.com` |

### Deploy to Firebase

```bash
# 1. Authenticate with the correct account
firebase login
# Log in with: dfw.connect0@gmail.com

# 2. Deploy
firebase deploy --only hosting --project zooldfw-670da
```

### Push to GitHub

```bash
git add .
git commit -m "description of changes"
git push origin main
```

> **Note:** If you get authentication errors when pushing, you may need to generate a new [Fine-Grained Personal Access Token](https://github.com/settings/tokens?type=beta) from the `dfwconnect0-creator` GitHub account with `Contents: Read and write` permission scoped to the `zool-tech` repository.

---

## 🌐 Domain & DNS Configuration

The domain `zool-tech.com` is registered at **Name.com** and pointed to Firebase Hosting.

### Current DNS Records (configured March 15, 2026)

| Record Type | Host / Name | Value |
| :--- | :--- | :--- |
| **A** | `@` | `199.36.158.100` |
| **TXT** | `@` | `hosting-site=zooldfw-670da` |

### If You Need to Re-configure DNS

1. Log into [Name.com](https://www.name.com) with `dfw.connect0@gmail.com`.
2. Go to **My Domains** → `zool-tech.com` → **Manage DNS Records**.
3. Ensure the A and TXT records above are present.
4. In the [Firebase Console → Hosting](https://console.firebase.google.com/project/zooldfw-670da/hosting/sites), verify the domain status shows "Connected".

### SSL Certificate

Firebase automatically provisions and renews SSL certificates for custom domains. If SSL is not working:
- Verify DNS records are correctly pointed.
- Wait up to 24 hours for propagation.
- Check the Firebase Hosting console for status.

---

## 📝 Key Sections of the Website

| Section | ID | Description |
| :--- | :--- | :--- |
| **Navbar** | `#navbar` | Sticky navigation with logo, links, CTA button, hamburger menu |
| **Hero** | `#home` | Main banner with stats, CTA buttons, promotional image |
| **Brands Ticker** | `.brands-section` | Auto-scrolling brand logos (HP, Dell, Lenovo, ASUS, Toshiba, Apple) |
| **Services** | `#services` | Three service cards (Repair, Used Laptops, Upgrades) |
| **Inventory** | `#inventory` | Filterable product grid (data lives in `script.js`) |
| **Why Us** | `.why-section` | Six value proposition cards |
| **About** | `#about` | Company story and info badges |
| **Contact** | `#contact` | Contact cards + inquiry form |
| **Footer** | `.footer` | Links, services, contact info |
| **Floating CTA** | `#floatingCta` | Fixed call button (bottom-right) |

---

## 🛒 Updating Inventory

Laptop inventory data is defined in `script.js` in the `laptops` array. Each laptop object has this structure:

```javascript
{
  brand: "hp",              // Used for filtering (lowercase)
  model: "HP ProBook 450",  // Display name
  cpu: "Intel i5-8250U",
  ram: "8 GB DDR4",
  storage: "256 GB SSD",
  screen: '15.6" FHD',
  price: 220,               // USD price (number)
  badge: "⭐ الأكثر مبيعاً",  // Optional badge text
  note: "شاحن مجاني مرفق"    // Optional note
}
```

### To add a new laptop:

1. Open `script.js`.
2. Add a new object to the `laptops` array.
3. If it's a new brand, add a filter button in `index.html` inside `#filterBar`.
4. Deploy.

---

## 🎨 Design System

### Color Palette (CSS Custom Properties in `style.css`)

| Variable | Usage |
| :--- | :--- |
| `--bg-primary` | Main background (dark) |
| `--bg-card` | Card backgrounds |
| `--accent-blue` | Primary accent (links, buttons) |
| `--accent-gold` | Secondary accent (highlights) |
| `--text-primary` | Main text color |
| `--text-secondary` | Muted text |

### Typography

- **Primary Font:** Cairo (Arabic + Latin)
- **Monospace:** Roboto Mono (for prices, stats)

### Responsive Breakpoints

- **Desktop:** > 1024px
- **Tablet:** 768px – 1024px
- **Mobile:** < 768px

---

## 📞 Business Contact Info

| Detail | Value |
| :--- | :--- |
| **Phone** | +1 (682) 445-5080 |
| **Location** | Dallas, Texas (DFW area) |
| **Hours** | Mon–Sat: 9 AM – 7 PM (CST) |

---

## ⚠️ Important Notes

1. **RTL Layout:** The site is entirely in Arabic (right-to-left). When making CSS changes, be mindful of directional properties (`margin-right` vs `margin-left`, etc.).
2. **No Build Step:** This is a static site with no bundler or build process. Edit files directly and deploy.
3. **Form Submissions:** The contact form currently uses `mailto:`. Consider integrating with Firebase Functions or a form service (e.g., Formspree) for production use.
4. **Images:** Optimize any new images before adding. Use WebP format where possible for better performance.
5. **Firebase Plan:** The project is on the **Spark (free)** plan. Firebase Hosting has generous free limits (10 GB storage, 360 MB/day transfer).

---

## 🔄 Typical Workflow

```
1. Make changes locally
2. Test with: npx http-server -p 8080
3. Commit: git add . && git commit -m "description"
4. Push to GitHub: git push origin main
5. Deploy to Firebase: firebase deploy --only hosting --project zooldfw-670da
6. Verify at: https://zool-tech.com
```
