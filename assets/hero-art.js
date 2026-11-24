/* ------------------------------------------------------------------
   Hero art: a tangled line that keeps untangling into a simple circle.
   It's a Fourier curve: the circle is the base harmonic, the tangle is
   the higher harmonics. Simplifying = fading those harmonics out.
   Hover it to simplify on demand.
------------------------------------------------------------------- */
(() => {
  const fig = document.querySelector(".hero-art");
  if (!fig) return;
  const cv = fig.querySelector("canvas");
  const ctx = cv.getContext("2d");
  const knob = fig.querySelector(".art-knob");
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Seeded harmonics so the tangle looks the same on every visit.
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const H = [2, 3, 5, 7, 9, 13].map((k, i) => ({
    k, ax: (0.55 / (i + 1.2)) * (0.6 + rnd() * 0.6), ay: (0.55 / (i + 1.2)) * (0.6 + rnd() * 0.6),
    px: rnd() * 6.28, py: rnd() * 6.28, sp: (rnd() - 0.5) * 0.25,
  }));

  let W = 0, D = 1;
  const fit = () => {
    D = Math.min(devicePixelRatio || 1, 2);
    W = fig.clientWidth;
    cv.width = cv.height = W * D;
    cv.style.width = cv.style.height = W + "px";
    ctx.setTransform(D, 0, 0, D, 0, 0);
  };
  fit();
  addEventListener("resize", fit);

  let hover = false;
  fig.addEventListener("pointerenter", () => (hover = true));
  fig.addEventListener("pointerleave", () => (hover = false));

  // Timeline (seconds): hold tangled, untangle, hold simple, re-tangle.
  const CYCLE = [2.2, 2.8, 2.6, 2.4];
  const total = CYCLE.reduce((a, b) => a + b);
  const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const auto = (s) => {
    let u = s % total;
    if (u < CYCLE[0]) return 0; u -= CYCLE[0];
    if (u < CYCLE[1]) return ease(u / CYCLE[1]); u -= CYCLE[1];
    if (u < CYCLE[2]) return 1; u -= CYCLE[2];
    return 1 - ease(u / CYCLE[3]);
  };

  let t = 0;
  const N = 420;
  function frame(ms) {
    const s = ms / 1000;
    const target = hover ? 1 : auto(s);
    t += (target - t) * (hover ? 0.06 : 0.12);
    const c = W / 2, R = W * 0.3, mess = 1 - t;

    ctx.clearRect(0, 0, W, W);

    // faint guide: the simple answer, always there underneath
    ctx.beginPath();
    ctx.arc(c, c, R, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(236,233,224,0.06)";
    ctx.setLineDash([2, 6]); ctx.lineWidth = 1; ctx.stroke(); ctx.setLineDash([]);

    // the line
    ctx.beginPath();
    for (let i = 0; i <= N; i++) {
      const a = (i / N) * Math.PI * 2;
      let x = Math.cos(a), y = Math.sin(a);
      for (const h of H) {
        x += mess * h.ax * Math.cos(h.k * a + h.px + s * h.sp);
        y += mess * h.ay * Math.sin(h.k * a + h.py + s * h.sp);
      }
      const px = c + x * R, py = c + y * R;
      i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
    }
    const g = Math.round(233 + (201 - 233) * t), b = Math.round(224 + (75 - 224) * t);
    ctx.strokeStyle = `rgba(${236 + Math.round(7 * t)},${g},${b},${0.55 + 0.4 * t})`;
    ctx.lineWidth = 1.2 + t * 0.8;
    ctx.shadowColor = "rgba(243,201,75,0.8)";
    ctx.shadowBlur = t * 18;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // a point travelling the path, like attention moving through a problem
    const a = (s * 0.5) % (Math.PI * 2);
    let x = Math.cos(a), y = Math.sin(a);
    for (const h of H) {
      x += mess * h.ax * Math.cos(h.k * a + h.px + s * h.sp);
      y += mess * h.ay * Math.sin(h.k * a + h.py + s * h.sp);
    }
    ctx.beginPath();
    ctx.arc(c + x * R, c + y * R, 3.2, 0, Math.PI * 2);
    ctx.fillStyle = "#f3c94b";
    ctx.shadowColor = "#f3c94b"; ctx.shadowBlur = 14;
    ctx.fill(); ctx.shadowBlur = 0;

    if (knob) knob.style.setProperty("--t", t.toFixed(3));
    fig.classList.toggle("is-simple", t > 0.92);
    if (!still) requestAnimationFrame(frame);
  }
  if (still) { t = 0.35; frame(0); } else requestAnimationFrame(frame);
})();
