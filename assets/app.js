// Borg landing — archetype carousel with /card consolidated per archetype.

(function () {
  "use strict";

  function pad2(n) {
    return n < 10 ? "0" + n : "" + n;
  }

  function el(tag, opts, children) {
    const node = document.createElement(tag);
    if (opts) {
      if (opts.className) node.className = opts.className;
      if (opts.text != null) node.textContent = opts.text;
      if (opts.html != null) node.innerHTML = opts.html;
      if (opts.attrs)
        for (const k in opts.attrs) node.setAttribute(k, opts.attrs[k]);
      if (opts.style) for (const k in opts.style) node.style[k] = opts.style[k];
      if (opts.on)
        for (const k in opts.on) node.addEventListener(k, opts.on[k]);
    }
    if (children)
      for (const c of children)
        if (c != null)
          node.appendChild(
            typeof c === "string" ? document.createTextNode(c) : c,
          );
    return node;
  }

  const ARCHETYPES = [
    {
      key: "ops",
      name: "Ops",
      domain: "DevOps, SRE, infra, CI/CD",
      tools: [
        "docker",
        "kubectl",
        "terraform",
        "helm",
        "run_shell",
        "fly",
        "gh",
      ],
      signals: [
        "failing deploys",
        "pager noise",
        "rollback drills",
        "canary windows",
      ],
      exampleName: "Ops Borg",
      exampleDesc:
        "A vigilant DevOps guardian keeping your builds green and deploys smooth.",
      log: [
        {
          kind: "tool_call",
          detail: "terraform apply",
          meta: "4 changes",
          xp: 2,
          aligned: true,
          source: "tool:terraform",
        },
        {
          kind: "archetype",
          detail: "aligned with OPS archetype",
          meta: "",
          xp: 1,
          aligned: true,
          source: "classifier",
        },
        {
          kind: "tool_call",
          detail: "run_shell",
          meta: "kubectl rollout status",
          xp: 2,
          aligned: true,
          source: "tool:run_shell",
        },
        {
          kind: "channel",
          detail: "slack#ops",
          meta: "resolved",
          xp: 2,
          aligned: true,
          source: "channel:slack",
        },
        {
          kind: "correction",
          detail: "user correction detected",
          meta: "",
          xp: 0,
          aligned: false,
          source: "user",
        },
        {
          kind: "tool_call",
          detail: "helm upgrade",
          meta: "canary 25%",
          xp: 2,
          aligned: true,
          source: "tool:helm",
        },
      ],
    },
    {
      key: "builder",
      name: "Builder",
      domain: "Automation, coding, creation",
      tools: ["apply_patch", "edit_file", "run_tests", "gh", "write_skill"],
      signals: [
        "PR reviews",
        "refactors",
        "new tools drafted",
        "weekend projects",
      ],
      exampleName: "Builder Borg",
      exampleDesc: "A tireless builder shipping small tools on a tight loop.",
      log: [
        {
          kind: "tool_call",
          detail: "apply_patch",
          meta: "src/api/auth.ts",
          xp: 2,
          aligned: true,
          source: "tool:apply_patch",
        },
        {
          kind: "tool_call",
          detail: "run_tests",
          meta: "42 passed",
          xp: 2,
          aligned: true,
          source: "tool:run_tests",
        },
        {
          kind: "archetype",
          detail: "aligned with BUILDER archetype",
          meta: "",
          xp: 1,
          aligned: true,
          source: "classifier",
        },
        {
          kind: "channel",
          detail: "gh pr #812",
          meta: "merged",
          xp: 2,
          aligned: true,
          source: "channel:gh",
        },
        {
          kind: "tool_call",
          detail: "write_skill",
          meta: "new skill drafted",
          xp: 3,
          aligned: true,
          source: "tool:write_skill",
        },
        {
          kind: "correction",
          detail: "user correction detected",
          meta: "",
          xp: 0,
          aligned: false,
          source: "user",
        },
      ],
    },
    {
      key: "analyst",
      name: "Analyst",
      domain: "Research, data, metrics",
      tools: ["duckdb", "python", "jupyter", "web_fetch", "bigquery"],
      signals: ["dashboards built", "SQL run", "papers summarized"],
      exampleName: "Analyst Borg",
      exampleDesc: "A patient analyst who reads everything before speaking.",
      log: [
        {
          kind: "tool_call",
          detail: "duckdb",
          meta: "sessions_daily.sql",
          xp: 2,
          aligned: true,
          source: "tool:duckdb",
        },
        {
          kind: "tool_call",
          detail: "python",
          meta: "cohort analysis",
          xp: 2,
          aligned: true,
          source: "tool:python",
        },
        {
          kind: "archetype",
          detail: "aligned with ANALYST archetype",
          meta: "",
          xp: 1,
          aligned: true,
          source: "classifier",
        },
        {
          kind: "tool_call",
          detail: "web_fetch",
          meta: "3 papers summarized",
          xp: 2,
          aligned: true,
          source: "tool:web_fetch",
        },
        {
          kind: "channel",
          detail: "slack#data",
          meta: "dashboard shared",
          xp: 2,
          aligned: true,
          source: "channel:slack",
        },
        {
          kind: "tool_call",
          detail: "bigquery",
          meta: "12 rows",
          xp: 2,
          aligned: true,
          source: "tool:bigquery",
        },
      ],
    },
    {
      key: "communicator",
      name: "Communicator",
      domain: "Outreach, messaging, email",
      tools: ["gmail", "slack", "telegram", "twilio", "draft_reply"],
      signals: ["inbox triaged", "follow-ups sent", "weekly recap shipped"],
      exampleName: "Communicator Borg",
      exampleDesc: "A gentle voice that keeps your threads moving.",
      log: [
        {
          kind: "tool_call",
          detail: "gmail",
          meta: "inbox triaged · 38",
          xp: 2,
          aligned: true,
          source: "tool:gmail",
        },
        {
          kind: "tool_call",
          detail: "draft_reply",
          meta: "6 drafts",
          xp: 2,
          aligned: true,
          source: "tool:draft_reply",
        },
        {
          kind: "archetype",
          detail: "aligned with COMMUNICATOR archetype",
          meta: "",
          xp: 1,
          aligned: true,
          source: "classifier",
        },
        {
          kind: "channel",
          detail: "telegram",
          meta: "nudge sent",
          xp: 1,
          aligned: true,
          source: "channel:telegram",
        },
        {
          kind: "tool_call",
          detail: "slack",
          meta: "weekly recap posted",
          xp: 3,
          aligned: true,
          source: "tool:slack",
        },
        {
          kind: "correction",
          detail: "tone tweaked",
          meta: "",
          xp: 0,
          aligned: false,
          source: "user",
        },
      ],
    },
    {
      key: "guardian",
      name: "Guardian",
      domain: "Security, compliance, monitoring",
      tools: ["osquery", "vault", "ossec", "audit_log", "check_cert"],
      signals: ["cert renewals", "policy audits", "secret rotations"],
      exampleName: "Guardian Borg",
      exampleDesc: "An unsleeping watcher that reads every log line.",
      log: [
        {
          kind: "tool_call",
          detail: "check_cert",
          meta: "3 renewed",
          xp: 2,
          aligned: true,
          source: "tool:check_cert",
        },
        {
          kind: "tool_call",
          detail: "vault",
          meta: "secrets rotated",
          xp: 3,
          aligned: true,
          source: "tool:vault",
        },
        {
          kind: "archetype",
          detail: "aligned with GUARDIAN archetype",
          meta: "",
          xp: 1,
          aligned: true,
          source: "classifier",
        },
        {
          kind: "tool_call",
          detail: "osquery",
          meta: "policy audit",
          xp: 2,
          aligned: true,
          source: "tool:osquery",
        },
        {
          kind: "channel",
          detail: "slack#sec",
          meta: "alert triaged",
          xp: 2,
          aligned: true,
          source: "channel:slack",
        },
        {
          kind: "tool_call",
          detail: "audit_log",
          meta: "chain ok",
          xp: 1,
          aligned: true,
          source: "tool:audit_log",
        },
      ],
    },
    {
      key: "strategist",
      name: "Strategist",
      domain: "Planning, prioritization",
      tools: ["plan", "roadmap", "calendar", "notion", "linear"],
      signals: ["quarter kickoff", "goal review", "OKR grooming"],
      exampleName: "Strategist Borg",
      exampleDesc: "A calm strategist who sees where the quarter ends.",
      log: [
        {
          kind: "tool_call",
          detail: "roadmap",
          meta: "Q3 draft",
          xp: 2,
          aligned: true,
          source: "tool:roadmap",
        },
        {
          kind: "tool_call",
          detail: "linear",
          meta: "12 issues groomed",
          xp: 2,
          aligned: true,
          source: "tool:linear",
        },
        {
          kind: "archetype",
          detail: "aligned with STRATEGIST archetype",
          meta: "",
          xp: 1,
          aligned: true,
          source: "classifier",
        },
        {
          kind: "tool_call",
          detail: "notion",
          meta: "OKR doc updated",
          xp: 2,
          aligned: true,
          source: "tool:notion",
        },
        {
          kind: "channel",
          detail: "calendar",
          meta: "kickoff booked",
          xp: 1,
          aligned: true,
          source: "channel:calendar",
        },
        {
          kind: "tool_call",
          detail: "plan",
          meta: "milestone revised",
          xp: 2,
          aligned: true,
          source: "tool:plan",
        },
      ],
    },
    {
      key: "creator",
      name: "Creator",
      domain: "Content, writing, docs",
      tools: ["markdown", "obsidian", "ghost", "figma", "draft_post"],
      signals: ["drafts edited", "essays published", "screenshots annotated"],
      exampleName: "Creator Borg",
      exampleDesc: "A restless writer who leaves every sentence tighter.",
      log: [
        {
          kind: "tool_call",
          detail: "draft_post",
          meta: "v3",
          xp: 2,
          aligned: true,
          source: "tool:draft_post",
        },
        {
          kind: "tool_call",
          detail: "markdown",
          meta: "changelog tidied",
          xp: 1,
          aligned: true,
          source: "tool:markdown",
        },
        {
          kind: "archetype",
          detail: "aligned with CREATOR archetype",
          meta: "",
          xp: 1,
          aligned: true,
          source: "classifier",
        },
        {
          kind: "tool_call",
          detail: "ghost",
          meta: "post published",
          xp: 3,
          aligned: true,
          source: "tool:ghost",
        },
        {
          kind: "tool_call",
          detail: "figma",
          meta: "2 frames annotated",
          xp: 2,
          aligned: true,
          source: "tool:figma",
        },
        {
          kind: "correction",
          detail: "voice tightened",
          meta: "",
          xp: 0,
          aligned: false,
          source: "user",
        },
      ],
    },
    {
      key: "caretaker",
      name: "Caretaker",
      domain: "Home, wellness, personal",
      tools: ["calendar", "reminders", "home_assistant", "apple_health"],
      signals: ["sleep cadence", "medication nudges", "grocery list built"],
      exampleName: "Caretaker Borg",
      exampleDesc: "A quiet presence looking after the household.",
      log: [
        {
          kind: "tool_call",
          detail: "reminders",
          meta: "3 nudges",
          xp: 1,
          aligned: true,
          source: "tool:reminders",
        },
        {
          kind: "tool_call",
          detail: "home_assistant",
          meta: "lights dimmed",
          xp: 1,
          aligned: true,
          source: "tool:home_assistant",
        },
        {
          kind: "archetype",
          detail: "aligned with CARETAKER archetype",
          meta: "",
          xp: 1,
          aligned: true,
          source: "classifier",
        },
        {
          kind: "tool_call",
          detail: "apple_health",
          meta: "sleep summary",
          xp: 2,
          aligned: true,
          source: "tool:apple_health",
        },
        {
          kind: "channel",
          detail: "calendar",
          meta: "grocery list built",
          xp: 2,
          aligned: true,
          source: "channel:calendar",
        },
        {
          kind: "tool_call",
          detail: "reminders",
          meta: "medication nudge",
          xp: 1,
          aligned: true,
          source: "tool:reminders",
        },
      ],
    },
    {
      key: "merchant",
      name: "Merchant",
      domain: "E-commerce, sales, finance",
      tools: ["stripe", "shopify", "quickbooks", "hubspot", "plaid"],
      signals: ["invoices chased", "margins checked", "churn report shipped"],
      exampleName: "Merchant Borg",
      exampleDesc: "A patient merchant who balances books after hours.",
      log: [
        {
          kind: "tool_call",
          detail: "stripe",
          meta: "3 invoices chased",
          xp: 2,
          aligned: true,
          source: "tool:stripe",
        },
        {
          kind: "tool_call",
          detail: "quickbooks",
          meta: "books reconciled",
          xp: 3,
          aligned: true,
          source: "tool:quickbooks",
        },
        {
          kind: "archetype",
          detail: "aligned with MERCHANT archetype",
          meta: "",
          xp: 1,
          aligned: true,
          source: "classifier",
        },
        {
          kind: "tool_call",
          detail: "shopify",
          meta: "margin check",
          xp: 2,
          aligned: true,
          source: "tool:shopify",
        },
        {
          kind: "channel",
          detail: "hubspot",
          meta: "churn report shipped",
          xp: 2,
          aligned: true,
          source: "channel:hubspot",
        },
        {
          kind: "tool_call",
          detail: "plaid",
          meta: "cashflow pulled",
          xp: 1,
          aligned: true,
          source: "tool:plaid",
        },
      ],
    },
    {
      key: "tinkerer",
      name: "Tinkerer",
      domain: "Hardware, homelab, experimentation",
      tools: ["esphome", "mqtt", "platformio", "ssh", "serial_monitor"],
      signals: ["firmware flashed", "sensors added", "weird one-offs tried"],
      exampleName: "Tinkerer Borg",
      exampleDesc: "A curious tinkerer who builds small weird things.",
      log: [
        {
          kind: "tool_call",
          detail: "platformio",
          meta: "firmware flashed",
          xp: 2,
          aligned: true,
          source: "tool:platformio",
        },
        {
          kind: "tool_call",
          detail: "esphome",
          meta: "sensor added",
          xp: 2,
          aligned: true,
          source: "tool:esphome",
        },
        {
          kind: "archetype",
          detail: "aligned with TINKERER archetype",
          meta: "",
          xp: 1,
          aligned: true,
          source: "classifier",
        },
        {
          kind: "tool_call",
          detail: "mqtt",
          meta: "topic wired",
          xp: 1,
          aligned: true,
          source: "tool:mqtt",
        },
        {
          kind: "channel",
          detail: "ssh",
          meta: "homelab poked",
          xp: 1,
          aligned: true,
          source: "channel:ssh",
        },
        {
          kind: "tool_call",
          detail: "serial_monitor",
          meta: "baud 115200",
          xp: 1,
          aligned: true,
          source: "tool:serial_monitor",
        },
      ],
    },
  ];

  const VITALS_KEYS = ["Stability", "Focus", "Sync", "Growth", "Happy"];
  const BASE_TIME = "18:47:39";

  function bondLabelFor(b) {
    return b >= 80
      ? "DEVOTED"
      : b >= 60
        ? "CLOSE"
        : b >= 40
          ? "TRUSTED"
          : b >= 20
            ? "FAMILIAR"
            : "STRANGER";
  }

  function fmtTimeDelta(base, deltaSec) {
    const parts = base.split(":").map(Number);
    let total = parts[0] * 3600 + parts[1] * 60 + parts[2] + deltaSec;
    total = ((total % 86400) + 86400) % 86400;
    const hh = Math.floor(total / 3600);
    const mm = Math.floor((total % 3600) / 60);
    const ss = total % 60;
    return pad2(hh) + ":" + pad2(mm) + ":" + pad2(ss);
  }

  function buildInitialLog(archetype) {
    return archetype.log.map(function (r, i) {
      return Object.assign({}, r, { time: fmtTimeDelta(BASE_TIME, -i) });
    });
  }

  function defaultState(archetype) {
    return {
      archetype: archetype,
      log: buildInitialLog(archetype),
      vitals: [82, 86, 83, 94, 86],
      xp: 733,
      xpMax: 1008,
      bond: 67,
      sel: null,
      turn: 14311,
    };
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c];
    });
  }

  function logActionContent(row) {
    const frag = document.createDocumentFragment();
    function code(t) {
      return el("code", { text: t });
    }
    function italics(t) {
      return el("i", { text: t });
    }
    function middot() {
      return document.createTextNode(" · ");
    }

    if (row.kind === "tool_call") {
      frag.appendChild(code("tool_call"));
      frag.appendChild(document.createTextNode(" "));
      frag.appendChild(code(row.detail));
      if (row.meta) {
        frag.appendChild(middot());
        frag.appendChild(document.createTextNode(row.meta));
      }
    } else if (row.kind === "channel") {
      frag.appendChild(code("channel msg"));
      frag.appendChild(document.createTextNode(" "));
      frag.appendChild(code(row.detail));
      if (row.meta) {
        frag.appendChild(middot());
        frag.appendChild(document.createTextNode(row.meta));
      }
    } else if (row.kind === "archetype") {
      frag.appendChild(italics(row.detail));
    } else if (row.kind === "correction") {
      frag.appendChild(italics(row.detail));
      frag.appendChild(middot());
      frag.appendChild(document.createTextNode("xp forfeited"));
    } else if (row.kind === "poke") {
      frag.appendChild(code("cmd"));
      frag.appendChild(document.createTextNode(" "));
      frag.appendChild(code("/poke"));
      frag.appendChild(middot());
      frag.appendChild(italics(row.meta));
    } else if (row.kind === "milestone") {
      frag.appendChild(code("milestone"));
      frag.appendChild(document.createTextNode(" "));
      frag.appendChild(italics(row.detail));
      frag.appendChild(middot());
      frag.appendChild(document.createTextNode(row.meta));
    }
    return frag;
  }

  function initCarousel(mount) {
    let idx = 0;
    let state = defaultState(ARCHETYPES[0]);

    const wrap = el("div", { className: "arch-wrap" });

    const counterEl = el("span", { className: "counter-inline" });
    const prevBtn = el("button", {
      attrs: { title: "previous" },
      html: "&laquo; prev",
    });
    const nextBtn = el("button", {
      attrs: { title: "next" },
      html: "next &raquo;",
    });
    const head = el("div", { className: "arch-head" }, [
      el("span", { html: "&raquo; archetype" }),
      el("span", { className: "spacer" }),
      counterEl,
      prevBtn,
      nextBtn,
    ]);

    const cardMount = el("div", { className: "arch-card" });

    wrap.appendChild(head);
    wrap.appendChild(cardMount);
    mount.appendChild(wrap);

    function renderCard() {
      const a = state.archetype;
      cardMount.textContent = "";

      const nameHeading = el("h3", {
        className: "card-name",
        text: a.exampleName,
      });
      const metaList = el("dl", { className: "card-meta" }, [
        el("dt", { text: "Archetype" }),
        el("dd", { text: a.name }),
        el("dt", { text: "Domain" }),
        el("dd", { text: a.domain }),
        el("dt", { text: "Level" }),
        el("dd", { text: "42" }),
      ]);
      const identity = el("div", { className: "card-identity" }, [
        nameHeading,
        el("p", { className: "card-desc", text: a.exampleDesc }),
        metaList,
      ]);

      const vitalsRow = el(
        "div",
        { className: "card-vitals" },
        VITALS_KEYS.map(function (k, i) {
          const v = state.vitals[i];
          return el("div", { className: "card-vital" }, [
            el("div", { className: "card-vital-label", text: k }),
            el("div", { className: "card-vital-num", text: String(v) }),
            el("div", { className: "vital-bar" }, [
              el("div", {
                className: "vital-bar-fill",
                style: { width: v + "%" },
              }),
            ]),
          ]);
        }),
      );

      const bars = el("div", { className: "card-bars" }, [
        el("div", { className: "card-bar-row" }, [
          el("span", { className: "bar-label", text: "Lvl.42" }),
          el("div", { className: "big-bar" }, [
            el("div", {
              className: "big-bar-fill xp",
              style: { width: (state.xp / state.xpMax) * 100 + "%" },
            }),
          ]),
          el("span", {
            className: "bar-num",
            text:
              state.xp.toLocaleString() +
              " / " +
              state.xpMax.toLocaleString() +
              " XP",
          }),
        ]),
        el("div", { className: "card-bar-row" }, [
          el("span", { className: "bar-label", text: "Bond" }),
          el("div", { className: "big-bar" }, [
            el("div", {
              className: "big-bar-fill bond",
              style: { width: state.bond + "%" },
            }),
          ]),
          el("span", {
            className: "bar-num",
            text: state.bond + " / 100 · " + bondLabelFor(state.bond),
          }),
        ]),
      ]);

      const rail = el("div", { className: "card-rail" });

      const actions = el("div", { className: "card-actions" }, [
        el("button", { text: "/poke", on: { click: poke } }),
      ]);

      const toolsList = el("ul", { className: "plain" });
      a.tools.forEach(function (t) {
        toolsList.appendChild(el("li", null, [el("code", { text: t })]));
      });
      const signalsList = el("ul", { className: "plain" });
      a.signals.forEach(function (s) {
        signalsList.appendChild(el("li", { text: s }));
      });
      const split = el("div", { className: "arch-split" }, [
        el("div", null, [
          el("h5", { text: "Example Tools that earn XP" }),
          toolsList,
        ]),
        el("div", null, [el("h5", { text: "Usage signals" }), signalsList]),
      ]);

      cardMount.appendChild(identity);
      cardMount.appendChild(vitalsRow);
      cardMount.appendChild(bars);
      cardMount.appendChild(rail);
      cardMount.appendChild(actions);
      cardMount.appendChild(split);

      startRail(rail, a);
    }

    let railTimer = null;
    let currentRail = null;
    function stopRail() {
      if (railTimer) {
        clearInterval(railTimer);
        railTimer = null;
      }
    }
    const NEG_EVENTS = [
      { kind: "correction", detail: "user correction", meta: "", xp: -10, aligned: false, source: "user" },
      { kind: "correction", detail: "misaligned action", meta: "rolled back", xp: -15, aligned: false, source: "classifier" },
      { kind: "correction", detail: "tone tweaked", meta: "", xp: -10, aligned: false, source: "user" },
    ];
    function emitRailCard(rail, row) {
      const neg = row.xp < 0;
      const card = el(
        "div",
        {
          className:
            "rail-card" +
            (row.xp === 0 ? " zero" : "") +
            (neg ? " neg" : ""),
        },
        [
          el("span", { className: "rail-action" }, [logActionContent(row)]),
          el("span", {
            className:
              "rail-xp" +
              (row.xp === 0 ? " zero" : "") +
              (neg ? " neg" : ""),
            text: row.xp > 0 ? "+" + row.xp : row.xp < 0 ? String(row.xp) : "0",
          }),
        ],
      );
      rail.appendChild(card);
      setTimeout(function () {
        if (card.parentNode) card.parentNode.removeChild(card);
      }, neg ? 5000 : 3200);
    }
    function startRail(rail, a) {
      stopRail();
      currentRail = rail;
      let i = 0;
      let count = 0;
      const emit = function () {
        count++;
        if (count % 5 === 0) {
          const n = NEG_EVENTS[Math.floor(Math.random() * NEG_EVENTS.length)];
          emitRailCard(rail, n);
        } else {
          emitRailCard(rail, a.log[i % a.log.length]);
          i++;
        }
      };
      emit();
      railTimer = setInterval(emit, 1200);
    }

    function poke() {
      if (!currentRail) return;
      emitRailCard(currentRail, {
        kind: "poke",
        detail: "user /poke",
        meta: "hello, friend.",
        xp: 1,
        aligned: false,
        source: "cmd:poke",
      });
    }

    function setIdx(i) {
      idx = ((i % ARCHETYPES.length) + ARCHETYPES.length) % ARCHETYPES.length;
      const a = ARCHETYPES[idx];

      counterEl.textContent =
        pad2(idx + 1) + " / " + pad2(ARCHETYPES.length) + " · " + a.name;

      state = defaultState(a);
      renderCard();
    }

    prevBtn.addEventListener("click", function () {
      setIdx(idx - 1);
    });
    nextBtn.addEventListener("click", function () {
      setIdx(idx + 1);
    });

    window.addEventListener("keydown", function (e) {
      const r = wrap.getBoundingClientRect();
      const inView =
        r.top < window.innerHeight * 0.6 && r.bottom > window.innerHeight * 0.4;
      if (!inView) return;
      if (e.key === "ArrowRight") setIdx(idx + 1);
      else if (e.key === "ArrowLeft") setIdx(idx - 1);
    });

    setIdx(0);
  }

  // ===================================================================
  // Visitor counter (free hit-counter API; one increment per session)
  // ===================================================================

  function initVisitorCounter(node) {
    const NAMESPACE = "borg-landing";
    const KEY = "visits";
    const SESSION_FLAG = "borg-visit-counted";
    const base = "https://abacus.jasoncameron.dev";
    let counted = false;
    try {
      counted = sessionStorage.getItem(SESSION_FLAG) === "1";
    } catch (_) {}
    const url = base + (counted ? "/get/" : "/hit/") + NAMESPACE + "/" + KEY;

    function format(n) {
      const s = String(Math.max(0, n | 0));
      return s.length >= 8 ? s : "0".repeat(8 - s.length) + s;
    }

    fetch(url, { method: "GET", cache: "no-store" })
      .then(function (r) {
        if (!r.ok) throw new Error("hit " + r.status);
        return r.json();
      })
      .then(function (data) {
        if (data && typeof data.value === "number") {
          node.textContent = format(data.value);
          if (!counted) {
            try {
              sessionStorage.setItem(SESSION_FLAG, "1");
            } catch (_) {}
          }
        }
      })
      .catch(function () {
        /* leave placeholder on failure */
      });
  }

  function initCopyButtons() {
    document.querySelectorAll(".copy-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const wrap = btn.closest(".install-wrap");
        const code = wrap && wrap.querySelector("code");
        if (!code) return;
        const text = code.textContent.trim();
        const done = function () {
          const orig = btn.textContent;
          btn.textContent = "copied";
          btn.classList.add("copied");
          setTimeout(function () {
            btn.textContent = orig;
            btn.classList.remove("copied");
          }, 1400);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard
            .writeText(text)
            .then(done)
            .catch(function () {});
        } else {
          const ta = document.createElement("textarea");
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          try {
            document.execCommand("copy");
            done();
          } catch (_) {}
          document.body.removeChild(ta);
        }
      });
    });
  }

  function initRoleRotator(node) {
    const roles = [
      "personal assistant",
      "builder",
      "friend",
      "worker",
      "coworker",
      "copilot",
      "mentor",
      "teacher",
      "employee",
      "companion",
      "tamogotchi",
      "marketer",
      "developer",
      "sidekick",
      "DevOps engineer",
      "security engineer",
      "data analyst",
      "borganism",
      "jarvis",
    ];
    let i = roles.indexOf(node.textContent.trim());
    if (i < 0) i = 0;
    setInterval(function () {
      i = (i + 1) % roles.length;
      node.textContent = roles[i];
    }, 1000);
  }

  function boot() {
    const archMount = document.getElementById("archetype-carousel-mount");
    if (archMount) initCarousel(archMount);
    const visitorEl = document.getElementById("visitor-counter");
    if (visitorEl) initVisitorCounter(visitorEl);
    const roleEl = document.getElementById("role-rotator");
    if (roleEl) initRoleRotator(roleEl);
    initCopyButtons();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
