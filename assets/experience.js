/* ------------------------------------------------------------------
   Experience: one source for the Work page and the home page's
   "3 biggest problems". Each item = what I solved, why it mattered,
   how I did it, and the impact. featured: true puts it on the home page.
------------------------------------------------------------------- */
const EXPERIENCE = [
  {
    co: "WeDoGood",
    blurb: "NGO-sector org building products for the under-served. INR 2 Cr+ revenue.",
    role: "Product Lead · 1st product hire, leading 0 → 1",
    when: "May 2025 – now",
    items: [
      {
        id: "thinkwith", product: "ThinkWith", tags: ["ai", "zero"], featured: true,
        title: "Getting under-served youth to the right mentor, over WhatsApp",
        metric: "0 → 1", label: "AI-led mentoring, built from scratch",
        why: "Young people from under-served backgrounds often can't name the help they need, and they drop off between sign-up and a first conversation. Matching them to volunteer mentors by hand didn't scale.",
        how: [
          "Built on WhatsApp, the app mentees already use, instead of asking them to download one more.",
          "Designed an intelligence layer: an AI assistant that interviews the mentee in plain conversation, builds a structured profile of their need, and asks only for what's missing.",
          "Turned that profile into match-ready input for volunteer mentors, with a human takeover path and support escalation when the AI shouldn't answer.",
          "Designed the ops console, with condition-based nudges, so drop-offs get a follow-up without someone watching a spreadsheet.",
          "Building evals so the AI's prompts improve from evidence, not gut feel.",
        ],
        impact: "A mentoring programme that runs on conversation, not forms.",
      },
      {
        id: "givo", product: "Givo", tags: ["zero"],
        title: "A donation platform NGOs can actually trust and run",
        metric: "0 → 1", label: "payments, 80G receipts, NGO verification",
        why: "Small NGOs collecting donations juggle payment links, hand-made 80G tax receipts and donor trust. Compliance is where they lose the most time and make the riskiest mistakes.",
        how: [
          "Owned the product 0 → 1, from discovery to launch.",
          "Integrated Razorpay for payments and built 80G tax-receipt workflows so receipts go out automatically and correctly.",
          "Added NGO verification so donors know who they're giving to.",
          "Shaped discovery, roadmap and prioritisation through direct conversations with NGO teams.",
        ],
        impact: "Donation collection and compliance in one place, instead of four tools and a spreadsheet.",
      },
    ],
  },
  {
    co: "HireQuotient",
    blurb: "AI platform for end-to-end hiring and business development. USD 2M+ ARR.",
    role: "Product Manager · owned core product EasySource",
    when: "Sep 2023 – May 2025",
    items: [
      {
        id: "matching", product: "EasySource", tags: ["ai"], featured: true,
        title: "Making the AI pick candidates recruiters actually want",
        metric: "+55%", label: "candidate-matching accuracy",
        why: "Recruiters didn't trust the AI's matches. Job descriptions turned into loose search filters, and when recruiters rejected a candidate, the model never learned why.",
        how: [
          "Rebuilt the JD-to-search-filter logic so a job description became sharper, more relevant searches.",
          "Evaluated AI screening models side by side instead of picking one on faith.",
          "Automated recruiter feedback loops, so every accept or reject refined candidate scoring.",
        ],
        impact: "Matching accuracy up 55%, and a model that keeps getting better from everyday use.",
      },
      {
        id: "outreach", product: "EasySource", tags: ["ai"],
        title: "Outreach candidates reply to, and answers they get instantly",
        metric: "AI", label: "personalised outreach + assistants",
        why: "Generic outreach got ignored, and recruiters spent hours answering the same factual questions from candidates.",
        how: [
          "Built AI-personalised outreach based on each candidate's role fit and career relevance.",
          "Added intent-classifying AI assistants: factual questions answered on the spot, subjective ones escalated to a recruiter.",
        ],
        impact: "Higher candidate engagement, and recruiters only pulled in when a human answer matters.",
      },
      {
        id: "no-signin", product: "EasySource", tags: ["growth"],
        title: "Bringing hiring managers in without making them sign up",
        metric: "+78%", label: "active users",
        why: "Only recruiters used the product. Hiring managers and interviewers, who make the final calls, stayed in email threads.",
        how: [
          "Designed no-sign-in workflows for hiring managers and interviewers to review candidates and leave feedback.",
          "Kept it seamless: open a link, review, decide, done.",
        ],
        impact: "Active users up 78% as the product spread beyond recruiters to the whole hiring team.",
      },
      {
        id: "ats", product: "EasySource", tags: ["growth"], featured: true,
        title: "Plugging into the ATS so customers didn't have to leave it",
        metric: "$500K+", label: "revenue retained and won",
        why: "Customers lived in their ATS. If screening inbound applicants meant leaving it, they would eventually leave us.",
        how: [
          "Integrated the core product with leading ATS platforms.",
          "Automated screening of inbound applicants inside the hiring workflows customers already had.",
        ],
        impact: "$300K+ revenue retained and $200K+ new revenue.",
      },
    ],
  },
  {
    co: "HireQuotient",
    blurb: "Pre-launch to launch of the core product.",
    role: "Product and GTM",
    when: "Sep 2022 – Sep 2023",
    items: [
      {
        id: "prelaunch", product: "EasySource launch", tags: ["growth"],
        title: "Building demand before the product existed",
        metric: "1,500+", label: "pre-launch sign-ups",
        why: "A new product with no users and no proof needed a waiting list and a clear story.",
        how: [
          "Ran webinars, a Product Hunt launch and targeted email and LinkedIn campaigns.",
          "Refined positioning based on what actually converted and what customers said.",
        ],
        impact: "1,500+ sign-ups before launch, and positioning tested against real acquisition data.",
      },
      {
        id: "lead-quality", product: "Revenue funnel", tags: ["growth"],
        title: "Fewer no-shows, fewer lost deals",
        metric: "+40%", label: "lead show rate · 30% less business loss",
        why: "Sales time went to leads that never showed up, while good ones slipped through.",
        how: ["Introduced intent-based lead qualification and prioritisation across the revenue funnel."],
        impact: "Lead show rates up 40% and business loss down 30%.",
      },
      {
        id: "icp", product: "Market expansion", tags: ["growth"],
        title: "Finding the customers we weren't looking for",
        metric: "+200%", label: "relevant leads",
        why: "The pipeline was narrow: one segment, a few markets.",
        how: ["Identified mid-market ICPs and expanded into LATAM, Europe and APAC."],
        impact: "Relevant leads up 200%.",
      },
      {
        id: "data-partners", product: "Data integrations", tags: ["growth"],
        title: "Better contact data through the right partners",
        metric: "5+", label: "data and outreach partnerships",
        why: "Outreach is only as good as the contact data behind it.",
        how: ["Led integration partnerships with Crunchbase, Apollo, RocketReach, ContactOut and Twilio."],
        impact: "More accurate data feeding the core platform.",
      },
    ],
  },
  {
    co: "Standard Chartered GBS",
    blurb: "Global bank's services arm. Joined after a pre-placement offer.",
    role: "Software Developer · Internal Cyber Security",
    when: "Jul 2021 – Jul 2022",
    items: [
      {
        id: "segmentation", product: "Network security", tags: ["infra"],
        title: "Breaking one point of failure into 25",
        metric: "25+", label: "distributed filtering systems",
        why: "All transactions went through a single filtering system: a security and performance bottleneck.",
        how: ["Led the move from one transaction-filtering system to 25+ separate, distributed ones."],
        impact: "Better security and performance across the transaction network.",
      },
      {
        id: "passwords", product: "Database security", tags: ["infra"],
        title: "Passwords that change themselves",
        metric: "85+", label: "server connections protected",
        why: "Static database credentials are a standing risk.",
        how: ["Rolled out auto-rotating passwords for 20 databases behind a firewall."],
        impact: "85+ server connections protected.",
      },
    ],
  },
];

const TAGS = { ai: "AI", growth: "Growth", zero: "0 → 1", infra: "Security" };
const allItems = EXPERIENCE.flatMap((g) => g.items.map((it) => ({ ...it, co: g.co })));
const esc = (s) => s.replace(/\[(.+?)\]/g, '<span class="todo">[$1]</span>');

/* ---------- work page ---------- */
const xpRoot = document.getElementById("experience");
if (xpRoot) {
  let n = 0;
  xpRoot.innerHTML = EXPERIENCE.map((g) => `
    <div class="co reveal">
      <div class="co-head">
        <h2 class="co-name">${g.co}</h2>
        <p class="co-role">${g.role}</p>
        <p class="co-when">${g.when}</p>
        <p class="co-blurb">${g.blurb}</p>
      </div>
      <ul class="xps">
        ${g.items.map((it) => `
        <li class="xp" id="${it.id}" data-tags="${it.tags.join(" ")}">
          <button class="xp-head" aria-expanded="false">
            <span class="num">${String(++n).padStart(2, "0")}</span>
            <span class="xp-main"><span class="t">${it.title}</span><span class="meta">${it.product} · ${it.tags.map((t) => TAGS[t]).join(" / ")}</span></span>
            <span class="m"><b>${it.metric}</b><span>${it.label}</span></span>
            <span class="plus" aria-hidden="true"></span>
          </button>
          <div class="xp-body"><div class="xp-inner">
            <div><h3>Why</h3><p>${it.why}</p></div>
            <div><h3>How</h3><ul>${it.how.map((h) => `<li>${h}</li>`).join("")}</ul></div>
            <div><h3>Impact</h3><p>${esc(it.impact)}</p></div>
          </div></div>
        </li>`).join("")}
      </ul>
    </div>`).join("");

  const toggle = (li, open) => {
    li.classList.toggle("open", open);
    li.querySelector(".xp-head").setAttribute("aria-expanded", open);
  };
  xpRoot.querySelectorAll(".xp").forEach((li) => {
    li.querySelector(".xp-head").addEventListener("click", () => toggle(li, !li.classList.contains("open")));
  });
  xpRoot.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  const openFromHash = () => {
    const li = location.hash && document.getElementById(location.hash.slice(1));
    if (li && li.classList.contains("xp")) {
      toggle(li, true);
      setTimeout(() => li.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" }), 350);
    }
  };
  openFromHash();
  addEventListener("hashchange", openFromHash);

  document.querySelectorAll("[data-filter]").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach((c) => c.setAttribute("aria-pressed", c === chip));
      const f = chip.dataset.filter;
      xpRoot.querySelectorAll(".xp").forEach((li) => li.classList.toggle("hide", f !== "all" && !li.dataset.tags.includes(f)));
      xpRoot.querySelectorAll(".co").forEach((co) => co.classList.toggle("hide", !co.querySelector(".xp:not(.hide)")));
    });
  });
}

/* ---------- home: 3 biggest problems ---------- */
const topRoot = document.getElementById("top-problems");
if (topRoot) {
  topRoot.innerHTML = allItems.filter((i) => i.featured).slice(0, 3).map((it, i) => `
    <a class="card problem reveal" style="--d:${i * 0.08}s" href="/work/#${it.id}">
      <span class="k">${String(i + 1).padStart(2, "0")} / ${it.co}</span>
      <b class="pm">${it.metric}</b>
      <span class="pl">${it.label}</span>
      <h3>${it.title}</h3>
      <div class="ph"><p>${it.why}</p></div>
      <span class="more">How I did it →</span>
    </a>`).join("");
  topRoot.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

/* ---------- home: how I think ---------- */
document.querySelectorAll(".think").forEach((box) => {
  const items = box.querySelectorAll(".principle");
  const panel = box.querySelector(".practice");
  const show = (p) => {
    items.forEach((x) => x.setAttribute("aria-selected", x === p));
    panel.classList.remove("swap"); void panel.offsetWidth; panel.classList.add("swap");
    panel.querySelector(".pr-text").innerHTML = p.dataset.practice;
    panel.querySelector(".pr-metric").textContent = p.dataset.metric;
    panel.querySelector(".pr-mlabel").textContent = p.dataset.mlabel || "";
    panel.querySelector(".pr-link").href = "/work/#" + p.dataset.ref;
  };
  items.forEach((p) => {
    p.addEventListener("mouseenter", () => show(p));
    p.addEventListener("focus", () => show(p));
    p.addEventListener("click", () => show(p));
  });
  show(items[0]);
});
