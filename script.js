// =========================================
// GEMY GAMAL GEMS — script.js
// Updated: 2026-03-15
// =========================================

// ===== DYNAMIC LAPTOP INVENTORY LOADER (HEADLESS CMS) =====
let laptops = [];

async function loadInventory() {
  try {
    const response = await fetch('content/laptops/manifest.json');
    const manifest = await response.json();
    
    // Filter out metadata and fetch all JSON laptop files
    const laptopFiles = manifest.filter(file => file.endsWith('.json') && file !== 'manifest.json');
    
    const laptopPromises = laptopFiles.map(async (file) => {
      const res = await fetch(`content/laptops/${file}`);
      return await res.json();
    });
    
    laptops = await Promise.all(laptopPromises);
    
    // Sort by ID to maintain order
    laptops.sort((a, b) => (a.id || 0) - (b.id || 0));
    
    console.log(`✅ Loaded ${laptops.length} laptops from Headless CMS.`);
    
    // Initialize the UI once data is ready
    initApp();
  } catch (error) {
    console.error("❌ Error loading inventory from CMS:", error);
    // Fallback or error UI message could go here
  }
}

// Call the loader on window load
window.addEventListener('DOMContentLoaded', loadInventory);

// Wrap existing initialization logic in initApp()
function initApp() {
  renderLaptops(laptops);
  updateStats();
  // ... other init logic ...
}

// (Rest of the rendering functions follow...)

// ===== BADGE COLORS =====
function getBadgeStyle(badge) {
  const styles = {
    "WORKSTATION":  "background:var(--blue);color:#fff",
    "GREAT DEAL":   "background:var(--blue);color:#fff",
    "BEST VALUE":   "background:var(--gold);color:#fff",
    "BUDGET PICK":  "background:var(--bg-muted);color:var(--text);border:1px solid var(--border)",
    "LOWEST PRICE": "background:var(--red);color:#fff",
    "TOUCH SCREEN": "background:#0f172a;color:#38bdf8;border:1px solid #38bdf8",
    "17 INCH":      "background:#0f172a;color:#94a3b8;border:1px solid #94a3b8",
    "13 INCH":      "background:#0f172a;color:#94a3b8;border:1px solid #94a3b8",
    "i7 POWER":     "background:#7c3aed;color:#fff",
    "RUGGED":       "background:#065f46;color:#fff",
  };
  return styles[badge] || "background:#0f172a;color:#94a3b8";
}

// ===== RENDER CARDS =====
function renderInventory(filter = "all") {
  const grid = document.getElementById("inventoryGrid");
  grid.innerHTML = "";

  const filtered = laptops.filter(l => {
    if (filter === "all") return true;
    if (filter === "under300") return l.price < 300;
    return l.brand === filter;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--text-muted)">
      <div style="font-size:48px;margin-bottom:16px">🔍</div>
      <p style="font-size:18px">لا توجد لابتوبات في هذا الفلتر. <a href="tel:+16824455080" style="color:var(--blue)">اتصل بنا</a> — قد يكون لدينا المزيد!</p>
    </div>`;
    return;
  }

  filtered.forEach((l, i) => {
    const card = document.createElement("div");
    card.className = "laptop-card reveal";
    card.style.animationDelay = `${i * 0.07}s`;

    const badgeHtml = l.badge
      ? `<span style="position:absolute;top:14px;right:14px;font-size:10px;font-weight:700;letter-spacing:0.8px;padding:4px 10px;border-radius:4px;z-index:2;${getBadgeStyle(l.badge)}">${l.badge}</span>`
      : "";

    const hotTag = l.hot
      ? `<span style="display:inline-block;background:var(--red);color:#fff;font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px;margin-left:8px;vertical-align:middle">🔥 HOT</span>`
      : "";

    // Image: use real image, or a branded placeholder SVG
    const hasImage = l.image && l.image.trim() !== "";
    const imageHtml = hasImage
      ? `<div class="laptop-image-container">
           <img src="${l.image}" alt="${l.model}" class="laptop-img" loading="lazy" />
           ${l.gallery.length > 1 ? `<span class="gallery-count">📷 ${l.gallery.length}</span>` : ""}
         </div>`
      : `<div class="laptop-image-container laptop-no-image">
           <div class="no-image-placeholder">
             <span style="font-size:40px">💻</span>
             <span style="font-size:12px;color:var(--text-muted);font-weight:600">صورة قريباً</span>
           </div>
         </div>`;

    card.innerHTML = `
      ${badgeHtml}
      ${imageHtml}
      <div class="laptop-card-content">
        <div class="laptop-brand-badge brand-${l.brand}">${l.brand.toUpperCase()}</div>
        <h4>${l.model} ${hotTag}</h4>
        <div class="laptop-specs">
          <div class="spec-row">
            <span class="spec-label">CPU</span>
            <span class="spec-value">${l.processor}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">RAM</span>
            <span class="spec-value">${l.ram}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Storage</span>
            <span class="spec-value">${l.storage}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Type</span>
            <span class="spec-value">${l.type}</span>
          </div>
        </div>
        <div class="laptop-price-row">
          <span class="laptop-price">$${l.price}</span>
          <a href="tel:+16824455080" class="card-cta-btn">📞 استفسر</a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Trigger reveal animation
  requestAnimationFrame(() => {
    document.querySelectorAll(".laptop-card.reveal").forEach(el => {
      el.classList.add("visible");
    });
  });
}

// ===== FILTER BUTTONS =====
function initFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderInventory(btn.dataset.filter);
    });
  });
}

// ===== NAVBAR SCROLL =====
function initNavbar() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// ===== HAMBURGER MENU =====
function initHamburger() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const spans = hamburger.querySelectorAll("span");
    if (navLinks.classList.contains("open")) {
      spans[0].style.transform = "translateY(7px) rotate(45deg)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "translateY(-7px) rotate(-45deg)";
    } else {
      spans[0].style.transform = "";
      spans[1].style.opacity = "";
      spans[2].style.transform = "";
    }
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.querySelectorAll("span").forEach(s => { s.style.transform = ""; s.style.opacity = ""; });
    });
  });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const offset = 80;
        window.scrollTo({ top: target.offsetTop - offset, behavior: "smooth" });
      }
    });
  });
}

// ===== SCROLL REVEAL =====
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".service-card, .why-card, .about-badge-card, .contact-card").forEach(el => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}

// ===== CONTACT FORM =====
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = document.getElementById("form-submit-btn");
    btn.textContent = "✅ تم الإرسال!";
    btn.style.background = "#27ae60";
    btn.style.borderColor = "#27ae60";
    setTimeout(() => {
      btn.textContent = "إرسال الرسالة";
      btn.style.background = "";
      btn.style.borderColor = "";
      form.reset();
    }, 3000);
  });
}

// ===== STAT COUNTER ANIMATION =====
function animateCounter(el, target, prefix = "", suffix = "") {
  let start = 0;
  const duration = 1500;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const val = Math.floor(progress * target);
    el.textContent = prefix + val + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = prefix + target + suffix;
  };
  requestAnimationFrame(step);
}

function initCounters() {
  const statNumbers = document.querySelectorAll(".stat-number");
  const targets = [24, 130, 6];
  const prefixes = ["", "$", ""];
  const suffixes = ["+", "", ""];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNumbers.forEach((el, i) => {
          animateCounter(el, targets[i], prefixes[i], suffixes[i]);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector(".hero-stats");
  if (heroStats) observer.observe(heroStats);
}

// ===== ACTIVE NAV LINK =====
function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute("href") === `#${current}` ? "var(--text)" : "";
    });
  });
}

// ===== INIT ALL =====
document.addEventListener("DOMContentLoaded", () => {
  // Inventory is now loaded via loadInventory() which calls initApp()
  initFilters();
  initNavbar();
  initHamburger();
  initSmoothScroll();
  initReveal();
  initContactForm();
  initCounters();
  initActiveNav();
});

// Called automatically inside loadInventory() once data is ready
function initApp() {
  renderInventory("all");
}
