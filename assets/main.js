/* ------------------------------------------------------------------
   Site config: edit these once and every page picks them up.
------------------------------------------------------------------- */
const SITE = {
  email: "maitreyeeshri@gmail.com",
  linkedin: "https://www.linkedin.com/in/maitreyee-srivastava/",
  twitter: "https://x.com/maitreyeesri",
};

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

/* ---------- wire config links ---------- */
document.querySelectorAll("[data-link]").forEach((a) => {
  const k = a.dataset.link;
  if (k === "email") a.href = "mailto:" + SITE.email;
  else if (SITE[k]) a.href = SITE[k];
  if (k !== "email") { a.target = "_blank"; a.rel = "noopener"; }
});
document.querySelectorAll("[data-email-text]").forEach((el) => (el.textContent = SITE.email));
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

/* ---------- nav ---------- */
// Clean URLs: show /about instead of /about.html, and / instead of /index.html.
if (/\.html$/.test(location.pathname)) {
  const clean = location.pathname.replace(/index\.html$/, "").replace(/\.html$/, "");
  history.replaceState(null, "", clean + location.search + location.hash);
}
const here = location.pathname.replace(/\/$/, "").split("/").pop() || "";
document.querySelectorAll(".nav a").forEach((a) => {
  const target = a.getAttribute("href").replace(/^\//, "");
  if (target === here) a.setAttribute("aria-current", "page");
});
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
menuBtn?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.textContent = open ? "close" : "menu";
  menuBtn.setAttribute("aria-expanded", open);
});

/* ---------- day / night toggle (about) ---------- */
document.querySelectorAll("[data-mode-btn]").forEach((b) => {
  b.addEventListener("click", () => {
    const box = document.querySelector(".daynight");
    document.querySelectorAll("[data-mode-btn]").forEach((x) => x.setAttribute("aria-pressed", x === b));
    box.dataset.show = b.dataset.modeBtn;
    root.classList.toggle("night", b.dataset.modeBtn === "night");
  });
});

/* ---------- entrance + page leave ---------- */
requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add("ready")));
const supportsVT = "startViewTransition" in document && CSS.supports("view-transition-name: none");
document.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (!a || reduce || supportsVT) return;
  const url = new URL(a.href, location.href);
  if (a.target === "_blank" || url.origin !== location.origin || a.hasAttribute("download") || e.metaKey || e.ctrlKey) return;
  if (url.pathname === location.pathname && url.hash) return;
  e.preventDefault();
  document.body.classList.add("leaving");
  setTimeout(() => (location.href = a.href), 380);
});
window.addEventListener("pageshow", () => document.body.classList.remove("leaving"));

/* ---------- scroll reveal ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
}, { rootMargin: "0px 0px -8% 0px" });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ---------- card spotlight + magnetic buttons ---------- */
document.addEventListener("pointermove", (e) => {
  const card = e.target.closest?.(".card");
  if (card) {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--cx", e.clientX - r.left + "px");
    card.style.setProperty("--cy", e.clientY - r.top + "px");
  }
});
if (!reduce && matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll(".btn").forEach((b) => {
    b.addEventListener("pointermove", (e) => {
      const r = b.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.18;
      const y = (e.clientY - r.top - r.height / 2) * 0.3;
      b.style.transform = `translate(${x}px, ${y}px)`;
    });
    b.addEventListener("pointerleave", () => (b.style.transform = ""));
  });
}

/* ---------- lantern + backdrop ---------- */
const mouse = { x: innerWidth * 0.5, y: innerHeight * 0.35, lx: innerWidth * 0.5, ly: innerHeight * 0.35, active: false };
const onMove = (x, y) => { mouse.x = x; mouse.y = y; mouse.active = true; };
addEventListener("pointermove", (e) => onMove(e.clientX, e.clientY), { passive: true });
addEventListener("touchmove", (e) => onMove(e.touches[0].clientX, e.touches[0].clientY), { passive: true });

const canvas = document.getElementById("backdrop");
const root = document.documentElement;
let ctx, W, H, pts = [];
function resize() {
  if (!canvas) return;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  W = innerWidth; H = innerHeight;
  canvas.width = W * dpr; canvas.height = H * dpr;
  canvas.style.width = W + "px"; canvas.style.height = H + "px";
  ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const n = Math.min(140, Math.round((W * H) / 15000));
  pts = Array.from({ length: n }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    r: Math.random() * 1.3 + 0.3,
    vx: (Math.random() - 0.5) * 0.06, vy: -(Math.random() * 0.12 + 0.02),
    t: Math.random() * Math.PI * 2, s: Math.random() * 0.015 + 0.004,
  }));
  if (reduce) draw(false);
}
const R = 190;
function draw(animate = true) {
  mouse.lx += (mouse.x - mouse.lx) * 0.08;
  mouse.ly += (mouse.y - mouse.ly) * 0.08;
  root.style.setProperty("--lx", mouse.lx + "px");
  root.style.setProperty("--ly", mouse.ly + "px");
  if (ctx) {
    ctx.clearRect(0, 0, W, H);
    const lit = [];
    for (const p of pts) {
      if (animate) {
        p.x += p.vx; p.y += p.vy; p.t += p.s;
        if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
        if (p.x < -5) p.x = W + 5; else if (p.x > W + 5) p.x = -5;
      }
      const d = Math.hypot(p.x - mouse.lx, p.y - mouse.ly);
      const near = Math.max(0, 1 - d / R);
      const tw = 0.5 + 0.5 * Math.sin(p.t);
      const a = 0.1 + tw * 0.22 + near * 0.75;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + near * 0.9, 0, Math.PI * 2);
      ctx.fillStyle = near > 0.05 ? `rgba(243,201,75,${a})` : `rgba(236,233,224,${a * 0.7})`;
      ctx.fill();
      if (near > 0.15) lit.push([p, near]);
    }
    // constellation: only visible inside the lantern
    for (let i = 0; i < lit.length; i++) {
      for (let j = i + 1; j < lit.length; j++) {
        const [p, a] = lit[i], [q, b] = lit[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 120) {
          ctx.strokeStyle = `rgba(243,201,75,${0.35 * Math.min(a, b) * (1 - d / 120)})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
    }
  }
  updateSecrets();
  if (animate) requestAnimationFrame(() => draw(true));
}
addEventListener("resize", resize);
resize();
if (!reduce) requestAnimationFrame(() => draw(true));

/* ---------- invisible ink: the life goal, written in the dark ----------
   Letters sit almost invisible. The lantern makes them glow; once every
   letter has been lit, the sentence ignites and the full message opens. */
const toast = document.querySelector(".toast");
let toastTimer;
function showToast(html, ms = 4200) {
  if (!toast) return;
  toast.innerHTML = html; toast.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("show"), ms);
}

const ink = document.querySelector(".ink-goal");
let chars = [], inkRects = [];
if (ink) {
  const text = ink.textContent.trim();
  let n = 0;
  ink.innerHTML = text.split(" ").map((w) => `<span class="w" aria-hidden="true">${[...w].map((c) => `<span class="ch" style="--i:${n++}">${c}</span>`).join("")}</span>`).join(" ");
  chars = [...ink.querySelectorAll(".ch")].map((el) => ({ el, g: 0 }));
  const measure = () => { inkRects = chars.map((c) => { const r = c.el.getBoundingClientRect(); return [r.left + r.width / 2 + scrollX, r.top + r.height / 2 + scrollY]; }); };
  measure();
  addEventListener("resize", measure);
  document.fonts?.ready.then(measure);
  setTimeout(measure, 1200);
}

/* Letters are invisible until the light passes over them, then fade back. */
function updateSecrets() {
  if (!ink) return;
  const R = 170;
  const box = ink.getBoundingClientRect();
  ink.style.setProperty("--gx", (mouse.lx - box.left) + "px");
  ink.style.setProperty("--gy", (mouse.ly - box.top) + "px");
  const inside = mouse.active && mouse.lx > box.left - 120 && mouse.lx < box.right + 120 && mouse.ly > box.top - 120 && mouse.ly < box.bottom + 120;
  ink.classList.toggle("glow", inside);
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    const [x, y] = inkRects[i] || [0, 0];
    const d = Math.hypot(x - scrollX - mouse.lx, y - scrollY - mouse.ly);
    const near = mouse.active ? Math.min(1, Math.max(0, 1 - d / R) * 1.6) : 0;
    c.g += (near - c.g) * (near > c.g ? 0.2 : 0.05); // quick to light, slow to fade
    c.el.style.setProperty("--o", c.g.toFixed(3));
    c.el.style.setProperty("--b", ((1 - c.g) * 5).toFixed(2) + "px");
    c.el.style.setProperty("--y", ((1 - c.g) * 4).toFixed(2) + "px");
    c.el.style.setProperty("--g", c.g.toFixed(3));
  }
}
