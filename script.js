// =========================================
// GEMYTECH — script.js
// =========================================

// ===== LAPTOP INVENTORY DATA =====
const laptops = [
  {
    id: 1,
    brand: "hp",
    model: "HP ZBook 17 G3",
    processor: "Intel Core i7-6700HQ 2.60GHz",
    ram: "16GB",
    storage: "SSD 250GB + HDD 750GB (1TB Total)",
    price: 700,
    type: "Workstation",
    hot: true,
    badge: "WORKSTATION"
  },
  {
    id: 2,
    brand: "toshiba",
    model: "Toshiba Satellite P55w-C5200x",
    processor: "Intel Core i5-5200U 2.20GHz",
    ram: "8GB",
    storage: "HDD 1TB",
    price: 280,
    type: "Laptop"
  },
  {
    id: 3,
    brand: "dell",
    model: "Dell Latitude E6530",
    processor: "Intel Core i5 2.5GHz",
    ram: "8GB",
    storage: "HDD 500GB",
    price: 250,
    type: "Business",
    badge: "GREAT DEAL"
  },
  {
    id: 4,
    brand: "lenovo",
    model: "Lenovo ThinkPad E540",
    processor: "Intel Core i3-4000M 2.40GHz",
    ram: "6GB",
    storage: "HDD 500GB",
    price: 190,
    type: "Laptop"
  },
  {
    id: 5,
    brand: "asus",
    model: "ASUS F556U",
    processor: "Intel Core i7-6500U 2.5GHz",
    ram: "8GB",
    storage: "HDD 1TB",
    price: 280,
    type: "Laptop",
    badge: "BEST VALUE"
  },
  {
    id: 6,
    brand: "asus",
    model: "ASUS K55A",
    processor: "Intel Core i5-3210M 2.5GHz",
    ram: "8GB",
    storage: "SSD 250GB",
    price: 260,
    type: "Laptop"
  },
  {
    id: 7,
    brand: "lenovo",
    model: "Lenovo IdeaPad 100-15IBY",
    processor: "Intel Celeron 2.16GHz",
    ram: "8GB",
    storage: "HDD 250GB",
    price: 190,
    type: "Budget",
    badge: "BUDGET PICK"
  },
  {
    id: 8,
    brand: "lenovo",
    model: "Lenovo IdeaPad Z580",
    processor: "Intel Core i5 2.5GHz",
    ram: "8GB",
    storage: "HDD 750GB",
    price: 240,
    type: "Laptop"
  },
  {
    id: 9,
    brand: "hp",
    model: "HP 255 G1",
    processor: "AMD A4-5000 1.5GHz",
    ram: "6GB",
    storage: "SSD 120GB",
    price: 180,
    type: "Budget"
  },
  {
    id: 10,
    brand: "dell",
    model: "Dell Inspiron 3531",
    processor: "Intel Celeron 2.16GHz",
    ram: "4GB",
    storage: "SSD 120GB",
    price: 180,
    type: "Budget"
  },
  {
    id: 11,
    brand: "hp",
    model: "HP 15-f010dx",
    processor: "Intel Core i3 1.7GHz",
    ram: "8GB",
    storage: "HDD 500GB",
    price: 220,
    type: "Touchscreen",
    badge: "TOUCH SCREEN"
  },
  {
    id: 12,
    brand: "lenovo",
    model: "Lenovo B50-45",
    processor: "AMD E1-6010",
    ram: "8GB",
    storage: "SSD 120GB",
    price: 200,
    type: "Budget"
  },
  {
    id: 13,
    brand: "lenovo",
    model: "Lenovo IdeaPad 100S-11IBY",
    processor: "Intel Atom 1.33GHz",
    ram: "2GB",
    storage: "eMMC 32GB",
    price: 120,
    type: "Ultra-Budget",
    badge: "LOWEST PRICE"
  },
  {
    id: 14,
    brand: "hp",
    model: "HP Pavilion 17-f001dx",
    processor: "AMD A8-6410 2.0GHz (Radeon R5)",
    ram: "8GB",
    storage: "SSD 128GB",
    price: 200,
    type: "17-inch",
    badge: "17 INCH"
  },
  {
    id: 15,
    brand: "dell",
    model: "Dell Latitude 3330",
    processor: "Intel Core i3-2375M 1.50GHz",
    ram: "8GB",
    storage: "HDD 1TB",
    price: 200,
    type: "13-inch",
    badge: "13 INCH"
  }
];

// ===== BADGE COLORS =====
function getBadgeStyle(badge) {
  // Use CSS variables so badge colors follow the site's branding tokens
  const styles = {
    "WORKSTATION":  "background:var(--blue);color:var(--white)",
    "GREAT DEAL":   "background:var(--blue);color:var(--white)",
    "BEST VALUE":   "background:var(--gold);color:var(--dark)",
    "BUDGET PICK":  "background:rgba(222,222,220,0.06);color:var(--dark);border:1px solid rgba(222,222,220,0.06)",
    "LOWEST PRICE": "background:var(--red);color:var(--white)",
    "TOUCH SCREEN": "background:var(--navy);color:var(--sky);border:1px solid var(--sky)",
    "17 INCH":      "background:var(--navy);color:var(--gray);border:1px solid var(--gray)",
    "13 INCH":      "background:var(--navy);color:var(--gray);border:1px solid var(--gray)"
  };
  return styles[badge] || "background:var(--navy);color:var(--gray)";
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
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--gray)">
      <div style="font-size:48px;margin-bottom:16px">🔍</div>
      <p style="font-size:18px">No laptops found in this filter. <a href="tel:+16824455080" style="color:var(--blue)">Call us</a> — we may have more!</p>
    </div>`;
    return;
  }

  filtered.forEach((l, i) => {
    const card = document.createElement("div");
    card.className = "laptop-card reveal";
    card.style.animationDelay = `${i * 0.07}s`;

    const badgeHtml = l.badge
      ? `<span style="position:absolute;top:14px;right:14px;font-size:10px;font-weight:700;letter-spacing:0.8px;padding:4px 10px;border-radius:4px;${getBadgeStyle(l.badge)}">${l.badge}</span>`
      : "";

    const hotTag = l.hot
      ? `<span style="display:inline-block;background:var(--red);color:var(--white);font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px;margin-left:8px;vertical-align:middle">🔥 HOT</span>`
      : "";

    card.innerHTML = `
      ${badgeHtml}
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
        <a href="tel:+16824455080" class="card-cta-btn">📞 Inquire</a>
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

  // Close when nav link clicked
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.querySelectorAll("span").forEach(s => { s.style.transform = ""; s.style.opacity = ""; });
    });
  });
}

// ===== SMOOTH SCROLL for anchor links =====
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
    btn.textContent = "✅ Message Sent!";
    btn.style.background = "#27ae60";
    btn.style.borderColor = "#27ae60";
    setTimeout(() => {
      btn.textContent = "Send Message";
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
  const counters = [
    { id: null, query: ".stat-number", targets: [15, 120, 6], prefixes: ["", "$", ""], suffixes: ["+", "", ""] }
  ];
  const statNumbers = document.querySelectorAll(".stat-number");
  const targets = [15, 120, 6];
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

// ===== ACTIVE NAV LINK on scroll =====
function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute("href") === `#${current}` ? "var(--white)" : "";
    });
  });
}

// ===== INIT ALL =====
document.addEventListener("DOMContentLoaded", () => {
  renderInventory("all");
  initFilters();
  initNavbar();
  initHamburger();
  initSmoothScroll();
  initReveal();
  initContactForm();
  initCounters();
  initActiveNav();
});
