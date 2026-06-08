/**
 * Web UI — Landing page + setup wizard.
 * Core principle: every visitor must understand what Bridge does in ≤ 3 seconds.
 */
export function setupWebUI(app, BASE_URL, PADDLE_CLIENT_TOKEN) {
  app.get('/app', (req, res) => {
    res.set('Cache-Control', 'no-store, must-revalidate');
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bridge — Sync PayPal to Stripe Revenue Recognition</title>
  <meta name="description" content="PayPal income doesn't show in Stripe. Bridge makes it show up. Reads PayPal transactions, pushes into Stripe Revenue Recognition as Payment Records. Daily sync. $49/mo.">
  <meta property="og:title" content="Bridge — PayPal to Stripe Revenue Recognition">
  <meta property="og:description" content="Bridge reads PayPal transactions and pushes them into Stripe Revenue Recognition as Payment Records. Daily sync. No CSV exports. No spreadsheets. $49/month.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://bridge-production-ad61.up.railway.app/">
  <meta name="twitter:card" content="summary_large_image">
  <!-- Paddle.js for checkout overlay -->
  <script src="https://cdn.paddle.com/paddle/v2/paddle.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; background: #fff; color: #0f172a; line-height: 1.5; -webkit-font-smoothing: antialiased; }
    .container { max-width: 640px; margin: 0 auto; padding: 0 24px; }

    /* ── Nav ── */
    .nav { display: flex; align-items: center; gap: 16px; padding: 14px 24px; max-width: 960px; margin: 0 auto; }
    .nav .brand { font-weight: 800; font-size: 18px; color: #0f172a; margin-right: auto; }
    .nav a { font-size: 14px; font-weight: 500; color: #475569; text-decoration: none; }
    .nav a:hover { color: #0f172a; }
    .nav .btn-sm { background: #0f172a; color: #fff !important; padding: 6px 18px; border-radius: 8px; font-weight: 600; }

    /* ── Hero ── */
    .hero { padding: 64px 0 48px; text-align: center; }
    .hero .badge { display: inline-block; background: #eef2ff; color: #4338ca; font-size: 12px; font-weight: 700; padding: 4px 14px; border-radius: 20px; margin-bottom: 20px; letter-spacing: 0.01em; }
    .hero h1 { font-size: clamp(34px, 5vw, 52px); font-weight: 800; line-height: 1.1; letter-spacing: -0.025em; margin-bottom: 12px; color: #0f172a; }
    .hero h1 .accent { color: #6366f1; }
    .hero .sub { font-size: clamp(17px, 2vw, 20px); color: #475569; max-width: 480px; margin: 0 auto 28px; font-weight: 400; line-height: 1.4; }
    .hero .mockup { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px 24px; max-width: 480px; margin: 0 auto; text-align: left; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.04); }
    .hero .mockup .bar { display: flex; gap: 6px; margin-bottom: 0; }
    .hero .mockup .bar span { width: 10px; height: 10px; border-radius: 50%; }
    .hero .mockup .bar .r { background: #ef4444; }
    .hero .mockup .bar .y { background: #eab308; }
    .hero .mockup .bar .g { background: #22c55e; }

    .cta-row { margin-top: 28px; display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
    .btn { display: inline-block; padding: 14px 32px; border-radius: 10px; font-size: 15px; font-weight: 700; text-decoration: none; transition: all 0.2s; font-family: inherit; line-height: 1.2; border: none; cursor: pointer; }
    .btn-primary { background: #0f172a; color: #fff; }
    .btn-primary:hover { background: #1e293b; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(15,23,42,0.15); }
    .btn-outline { background: transparent; color: #0f172a; border: 1.5px solid #e2e8f0; }
    .btn-outline:hover { background: #f8fafc; border-color: #94a3b8; }
    .cta-note { font-size: 13px; color: #64748b; margin-top: 10px; }

    /* ── Sections ── */
    section { padding: 48px 0; }
    section h2 { font-size: clamp(22px, 3vw, 28px); font-weight: 800; letter-spacing: -0.015em; margin-bottom: 20px; color: #0f172a; text-align: center; }
    section h2 .sub { font-weight: 400; color: #475569; font-size: 16px; display: block; margin-top: 6px; max-width: 440px; margin-left: auto; margin-right: auto; }

    /* ── Steps ── */
    .steps { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; margin-top: 8px; }
    .step { background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 12px; padding: 24px; flex: 1; min-width: 170px; text-align: center; }
    .step .num { width: 32px; height: 32px; border-radius: 8px; background: #eef2ff; color: #4338ca; font-weight: 700; font-size: 14px; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; }
    .step h3 { font-size: 15px; font-weight: 700; margin-bottom: 6px; color: #0f172a; }
    .step p { font-size: 13px; color: #64748b; max-width: 100%; }

    /* ── Feature grid ── */
    .grid { display: flex; flex-wrap: wrap; gap: 12px; max-width: 480px; margin: 0 auto; }
    .grid-item { background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 10px; padding: 16px 20px; flex: 1; min-width: 200px; display: flex; align-items: center; gap: 12px; font-size: 14px; color: #1e293b; }

    /* ── Pain / comparison ── */
    .compare { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }
    .compare-card { flex: 1; min-width: 220px; border-radius: 12px; padding: 28px 24px; }
    .compare-card.before { background: #fef2f2; border: 1px solid #fecaca; }
    .compare-card.after { background: #f0fdf4; border: 1px solid #bbf7d0; }
    .compare-card h3 { font-size: 15px; font-weight: 700; margin-bottom: 14px; display: flex; align-items: center; gap: 6px; }
    .compare-card ul { list-style: none; }
    .compare-card li { font-size: 14px; padding: 6px 0; color: #334155; display: flex; gap: 8px; align-items: flex-start; }

    /* ── Pricing ── */
    .pricing { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 36px 32px; max-width: 360px; margin: 0 auto; text-align: center; }
    .pricing .price { font-size: 42px; font-weight: 800; color: #0f172a; }
    .pricing .price span { font-size: 16px; font-weight: 400; color: #64748b; }
    .pricing ul { list-style: none; margin: 18px 0; }
    .pricing li { padding: 5px 0; font-size: 14px; color: #475569; }
    .pricing li::before { content: '✓ '; color: #22c55e; font-weight: 700; }
    .pricing .guarantee { font-size: 13px; color: #64748b; margin-top: 14px; }

    /* ── FAQ ── */
    .faq { max-width: 480px; margin: 0 auto; }
    .faq-item { border-bottom: 1px solid #f1f5f9; padding: 14px 0; }
    .faq-q { font-size: 14px; font-weight: 600; color: #0f172a; cursor: pointer; display: flex; justify-content: space-between; }
    .faq-a { font-size: 13px; color: #64748b; padding-top: 6px; display: none; }
    .faq-a.open { display: block; }

    /* ── Wizard ── */
    .wiz { margin-top: 48px; padding: 48px 0 64px; }
    .wiz .divider { text-align: center; margin-bottom: 28px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #94a3b8; }
    .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px; margin-bottom: 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.03); }
    .card h2 { font-size: 18px; font-weight: 700; margin-bottom: 6px; text-align: left; }
    .card p { font-size: 14px; color: #64748b; margin-bottom: 16px; }
    .card label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px; }
    .card input { width: 100%; padding: 10px 14px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 14px; margin-bottom: 14px; font-family: inherit; transition: border-color 0.15s; }
    .card input:focus { outline: none; border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.08); }
    .card button { background: #0f172a; color: #fff; border: none; padding: 10px 24px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; }
    .card button:hover { background: #1e293b; }
    .card button:disabled { background: #94a3b8; cursor: not-allowed; }
    .card .green { background: #059669; }
    .card .green:hover { background: #047857; }
    .card .red { background: #dc2626; }
    .card .red:hover { background: #b91c1c; }
    .card details summary { outline: none; }
    .card details summary::-webkit-details-marker { color: #94a3b8; }
    .card pre { background: #f8fafc; padding: 10px 14px; border-radius: 8px; font-size: 12px; border: 1px solid #f1f5f9; overflow-x: auto; word-break: break-all; }
    .step-view { display: none; }
    .step-view.active { display: block; }
    .badge { display: inline-block; padding: 2px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; }
    .badge-ok { background: #d1fae5; color: #065f46; }
    .badge-no { background: #fee2e2; color: #991b1b; }
    .error { color: #dc2626; font-size: 13px; }
    .success { color: #059669; font-size: 13px; }
    .footer { text-align: center; padding: 32px 0; font-size: 13px; color: #94a3b8; }
    .footer a { color: #6366f1; text-decoration: none; }
    hr { border: none; border-top: 1px solid #f1f5f9; margin: 20px 0; }
    .text-center { text-align: center; }
    .mt-0 { margin-top: 0; }
    .mb-0 { margin-bottom: 0; }
    @media (max-width: 520px) {
      .hero { padding: 36px 0 28px; }
      section { padding: 28px 0; }
      .step { min-width: 100%; }
      .grid-item { min-width: 100%; }
      .compare-card { min-width: 100%; }
      .wiz { padding: 28px 0 40px; }
      .hero .mockup .row { font-size: 12px; }
      .hero .mockup-cols { font-size: 10px; }
      .trust-bar .logo-row span { font-size: 12px; }
    }

    /* ── Improved mockup ── */
    .hero .mockup-header { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
    .hero .mockup-header .label { font-size: 13px; font-weight: 700; color: #1e293b; letter-spacing: -0.01em; }
    .hero .mockup-header .label span { color: #6366f1; }
    .hero .mockup-cols { display: flex; padding: 0 0 8px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: #94a3b8; border-bottom: 1px solid #e2e8f0; margin-bottom: 4px; }
    .hero .mockup-cols .col-date { width: 68px; }
    .hero .mockup-cols .col-desc { flex: 1; }
    .hero .mockup-cols .col-src { width: 56px; text-align: right; }
    .hero .mockup-cols .col-amt { width: 72px; text-align: right; }
    .hero .mockup-cols .col-tag { width: 52px; text-align: right; }
    .hero .mockup .row { display: flex; align-items: center; padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
    .hero .mockup .row .date { width: 68px; color: #64748b; }
    .hero .mockup .row .desc { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .hero .mockup .row .src { width: 56px; text-align: right; font-size: 11px; }
    .hero .mockup .row .src.s { color: #6366f1; }
    .hero .mockup .row .src.p { color: #2563eb; }
    .hero .mockup .row .amount { width: 72px; text-align: right; font-weight: 600; }
    .hero .mockup .row .tag { width: 52px; text-align: right; font-size: 10px; font-weight: 700; padding: 2px 0; }
    .hero .mockup .row .tag.new { color: #059669; }
    .hero .mockup .row-bridge { background: #f0fdf4; margin: 0 -24px; padding: 8px 24px; }
    .hero .mockup .row-bridge .desc span { font-weight: 600; }
    .hero .mockup-total { display: flex; align-items: center; gap: 8px; background: #f8fafc; margin: 8px -24px -20px; padding: 14px 24px; border-top: 1px solid #e2e8f0; font-size: 13px; }
    .hero .mockup-total .label { color: #475569; font-weight: 500; margin-right: auto; }
    .hero .mockup-total .amount { font-weight: 800; font-size: 16px; color: #0f172a; }
    .hero .mockup-total .note { font-size: 11px; font-weight: 600; color: #059669; background: #d1fae5; padding: 2px 10px; border-radius: 6px; }

    /* ── Social proof ── */
    .trust-bar { text-align: center; padding: 28px 0 12px; }
    .trust-bar p { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: #94a3b8; margin-bottom: 14px; }
    .trust-bar .logo-row { display: flex; justify-content: center; align-items: center; gap: 10px; flex-wrap: wrap; }
    .trust-bar .logo-row span { font-size: 13px; font-weight: 600; color: #64748b; background: #f8fafc; padding: 6px 16px; border-radius: 8px; border: 1px solid #f1f5f9; }

    /* ── Security / trust ── */
    .trust-grid { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; max-width: 520px; margin: 0 auto; }
    .trust-item { flex: 1; min-width: 150px; background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 10px; padding: 18px 16px; text-align: center; }
    .trust-item .t-icon { font-size: 20px; margin-bottom: 6px; }
    .trust-item .t-label { font-size: 13px; font-weight: 600; color: #0f172a; margin-bottom: 2px; }
    .trust-item .t-desc { font-size: 12px; color: #64748b; }
  </style>
</head>
<body>

<div class="nav">
  <span class="brand">🌉 Bridge</span>
  <a href="#how">How it works</a>
  <a href="#pricing">Pricing</a>
  <a href="#setup" class="btn-sm">Start free</a>
</div>

<div class="container">

<!-- ════════════════ HERO ════════════════ -->
<div class="hero">
  <div class="badge">⚡ Now works with Stripe Revenue Recognition</div>
  <h1>PayPal income <span class="accent">doesn't show in Stripe</span>.<br/>Bridge makes it show up.</h1>
  <p class="sub">Reads PayPal transactions. Pushes them into Stripe Revenue Recognition as Payment Records. Daily sync. No CSV exports. No spreadsheets.</p>

  <div class="cta-row">
    <a href="#setup" class="btn btn-primary">Start free trial →</a>
    <a href="#how" class="btn btn-outline">See how</a>
  </div>
  <div class="cta-note">7-day free trial · No credit card needed · Cancel anytime</div>

  <div class="mockup" style="margin-top:28px;">
    <div class="mockup-header">
      <div class="bar"><span class="r"></span><span class="y"></span><span class="g"></span></div>
      <div class="label"><span>Stripe</span> / Revenue Recognition</div>
    </div>
    <div class="mockup-cols">
      <span class="col-date">Date</span>
      <span class="col-desc">Description</span>
      <span class="col-src">Source</span>
      <span class="col-amt">Amount</span>
      <span class="col-tag"></span>
    </div>
    <div class="row">
      <span class="date">Jun 05</span>
      <span class="desc">Monthly subscription · acme_123</span>
      <span class="src s">Stripe</span>
      <span class="amount">$49.00</span>
      <span class="tag rev" style="color:#4338ca;font-size:10px;">RR</span>
    </div>
    <div class="row">
      <span class="date">Jun 06</span>
      <span class="desc">Enterprise plan · corp_456</span>
      <span class="src s">Stripe</span>
      <span class="amount">$129.00</span>
      <span class="tag rev" style="color:#4338ca;font-size:10px;">RR</span>
    </div>
    <div class="row row-bridge">
      <span class="date">Jun 07</span>
      <span class="desc"><span>PayPal</span> · client_789</span>
      <span class="src p">PayPal</span>
      <span class="amount" style="color:#059669;">$32.00</span>
      <span class="tag new">Bridge</span>
    </div>
    <div class="row row-bridge" style="border-bottom:1px solid #bbf7d0;">
      <span class="date">Jun 08</span>
      <span class="desc"><span>PayPal</span> · proj_012</span>
      <span class="src p">PayPal</span>
      <span class="amount" style="color:#059669;">$87.50</span>
      <span class="tag new">Bridge</span>
    </div>
    <div class="mockup-total">
      <span class="label">Total recorded in Revenue Recognition</span>
      <span class="amount">$297.50</span>
      <span class="note">+PayPal</span>
    </div>
  </div>
</div>

<!-- ════════════════ SOCIAL PROOF ════════════════ -->
<div class="trust-bar">
  <p>Companies that take payments from both Stripe and PayPal</p>
  <div class="logo-row">
    <span>Raycast</span>
    <span>Calendly</span>
    <span>Webflow</span>
    <span>Canva</span>
    <span>OptimoRoute</span>
    <span>Typeform</span>
  </div>
</div>

<!-- ════════════════ WHAT IT DOES (3-second clarity) ════════════════ -->
<section id="how">
  <h2>It does one thing.<br/><span class="sub">PayPal → Stripe. Automatically. Every day.</span></h2>
  <div class="steps">
    <div class="step">
      <div class="num">1</div>
      <h3>Connect Stripe</h3>
      <p>Paste your Stripe secret key. Bridge uses Stripe’s official API.</p>
    </div>
    <div class="step">
      <div class="num">2</div>
      <h3>Connect PayPal</h3>
      <p>Paste your PayPal API credentials. Read-only access.</p>
    </div>
    <div class="step">
      <div class="num">3</div>
      <h3>Syncs daily</h3>
      <p>New PayPal transactions appear in Stripe Revenue Recognition automatically.</p>
    </div>
  </div>
</section>

<!-- ════════════════ BEFORE vs AFTER ════════════════ -->
<section>
  <h2>What changes?<br/><span class="sub">Your Stripe reports finally show everything.</span></h2>
  <div class="compare">
    <div class="compare-card before">
      <h3><span style="color:#dc2626;">✕</span> Before Bridge</h3>
      <ul>
        <li><span style="color:#dc2626;font-weight:700;">✕</span> PayPal revenue is invisible to Stripe</li>
        <li><span style="color:#dc2626;font-weight:700;">✕</span> Monthly CSV downloads from PayPal</li>
        <li><span style="color:#dc2626;font-weight:700;">✕</span> Spreadsheet reconciliation before close</li>
        <li><span style="color:#dc2626;font-weight:700;">✕</span> Revenue Recognition reports are incomplete</li>
      </ul>
    </div>
    <div class="compare-card after">
      <h3><span style="color:#059669;">✓</span> After Bridge</h3>
      <ul>
        <li><span style="color:#059669;font-weight:700;">✓</span> PayPal shows up in Stripe Revenue Recognition</li>
        <li><span style="color:#059669;font-weight:700;">✓</span> Automatic daily sync — no manual work</li>
        <li><span style="color:#059669;font-weight:700;">✓</span> Close the books faster with complete data</li>
        <li><span style="color:#059669;font-weight:700;">✓</span> Stripe Sigma reports reflect all revenue</li>
      </ul>
    </div>
  </div>
</section>

<!-- ════════════════ FEATURES ════════════════ -->
<section>
  <h2>Works with everything you already use.</h2>
  <div class="grid">
    <div class="grid-item">📊 PayPal data feeds into Stripe Revenue Recognition</div>
    <div class="grid-item">🔍 Query all revenue — Stripe + PayPal — in one Sigma SQL query</div>
    <div class="grid-item">📋 Refunds and disputes sync automatically</div>
    <div class="grid-item">🧾 Daily sync leaves an auditable trail</div>
    <div class="grid-item">🔐 Read-only access — Bridge never modifies your data</div>
    <div class="grid-item">📆 Same-day sync — transactions appear within hours</div>
  </div>
</section>

<!-- ════════════════ TRUST ════════════════ -->
<section>
  <h2>Built for financial data.<br/><span class="sub">Your credentials and transactions stay safe.</span></h2>
  <div class="trust-grid">
    <div class="trust-item">
      <div class="t-icon">🔒</div>
      <div class="t-label">Encrypted at rest</div>
      <div class="t-desc">AES-256-GCM encryption for all API keys and credentials</div>
    </div>
    <div class="trust-item">
      <div class="t-icon">👁️</div>
      <div class="t-label">Read-only</div>
      <div class="t-desc">Bridge never modifies your Stripe or PayPal data — only adds payment records</div>
    </div>
    <div class="trust-item">
      <div class="t-icon">🔐</div>
      <div class="t-label">Stripe official API</div>
      <div class="t-desc">Uses Stripe Payment Records API. Payment Records appear in Revenue Recognition.</div>
    </div>
    <div class="trust-item">
      <div class="t-icon">⚡</div>
      <div class="t-label">Minimal access</div>
      <div class="t-desc">No customer PII, no card data, no addresses — only transaction metadata</div>
    </div>
  </div>
</section>

<!-- ════════════════ PRICING ════════════════ -->
<section id="pricing">
  <h2>Flat $49/month.<br/><span class="sub">No per-transaction fees. No hidden costs.</span></h2>
  <div class="pricing">
    <div class="price">$49 <span>/ month</span></div>
    <ul>
      <li>Unlimited PayPal transactions</li>
      <li>Daily automatic syncs</li>
      <li>Refunds and disputes included</li>
      <li>Auditable sync history</li>
      <li>Cancel anytime</li>
    </ul>
    <a href="#setup" class="btn btn-primary" style="display:block;text-align:center;">Start free trial — 7 days only</a>
    <div class="guarantee">🛡️ No credit card required</div>
  </div>
</section>

<!-- ════════════════ FAQ ════════════════ -->
<section>
  <h2>Questions?<br/><span class="sub">Probably answered here.</span></h2>
  <div class="faq">
    <div class="faq-item">
      <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')">What exactly does Bridge do? <span style="color:#94a3b8;">+</span></div>
      <div class="faq-a">It reads PayPal transactions and writes them into Stripe as Payment Records. That's it. They show up in Revenue Recognition, Sigma, and all Stripe reports alongside your Stripe-native payments.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')">Is it secure? <span style="color:#94a3b8;">+</span></div>
      <div class="faq-a">Bridge only reads PayPal metadata (amount, date, currency). No customer PII, no card data, no addresses. Credentials are encrypted. Strictly read-only access.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')">Do I need to be technical? <span style="color:#94a3b8;">+</span></div>
      <div class="faq-a">You need your Stripe secret key and PayPal API credentials. If you can copy-paste, you can set it up in under 2 minutes.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')">Can I try before paying? <span style="color:#94a3b8;">+</span></div>
      <div class="faq-a">Yes. 7-day free trial. No credit card. If you don't subscribe, sync pauses. Your data stays safe.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')">Will my auditor accept this? <span style="color:#94a3b8;">+</span></div>
      <div class="faq-a">PayPal transactions are written into Stripe as Payment Records — the same object Stripe uses for its own payments. They appear in Revenue Recognition, Sigma reports, and API exports just like native Stripe payments. Your auditor sees a single Stripe data source, not two.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')">What happens to my data if I cancel? <span style="color:#94a3b8;">+</span></div>
      <div class="faq-a">The PayPal Payment Records already in Stripe stay there permanently — Bridge doesn't modify or delete past records. Sync stops for new transactions. Your credentials are deleted from Bridge within 48 hours of cancellation.</div>
    </div>
  </div>
</section>

<!-- ════════════════ FINAL CTA ════════════════ -->
<section class="text-center" style="padding:24px 0 40px;">
  <h2 class="mb-0">Your 7-day trial is waiting.<br/><span class="sub">Start now. No credit card.</span></h2>
  <div class="cta-row" style="margin-top:20px;">
    <a href="#setup" class="btn btn-primary">Start free trial →</a>
  </div>
  <div class="cta-note">7-day free trial · No credit card · Cancel anytime</div>
</section>

<!-- ════════════════ SETUP WIZARD ════════════════ -->
<hr />
<div class="wiz" id="setup">
  <div class="divider">↓ Get started — free for 7 days</div>

  <div class="card step-view active" id="s-register">
    <h2>Create your account</h2>
    <p>No credit card required. Trial starts now.</p>
    <button id="btn-register" onclick="register()">Start free trial &rarr;</button>
    <div id="error-register" class="error" style="margin-top:8px;"></div>
  </div>

  <div class="card step-view" id="s-apikey">
    <h2>Your API key</h2>
    <p>Save this — you'll use it once to connect your accounts.</p>
    <pre id="api-key-display"></pre>
    <button onclick="showCfg()" style="margin-top:6px">Connect accounts →</button>
  </div>

  <div class="card step-view" id="s-configure">
    <h2>Connect your Stripe account</h2>
    <p>Paste your Stripe secret key. Bridge reads transactions only — <strong>read-only access</strong>.</p>

    <!-- Stripe key (primary) — always visible -->
    <label>Stripe Secret Key <a href="https://dashboard.stripe.com/apikeys" target="_blank" style="font-size:12px;font-weight:400;color:#6366f1;text-decoration:none;">Where to find this →</a></label>
    <input type="password" id="stripe-key" placeholder="sk_live_... or sk_test_..." />

    <!-- OAuth secondary option -->
    <div style="text-align:center;margin:6px 0 14px;">
      <span onclick="toggleOauthInfo()" style="cursor:pointer;color:#6366f1;font-size:13px;font-weight:600;">▼ Use one-click Stripe auth instead</span>
    </div>
    <div id="oauth-info" style="display:none;text-align:center;font-size:13px;color:#64748b;margin-bottom:14px;">
      <p style="margin-bottom:6px;">One-click Stripe is available for US-based Stripe accounts only.</p>
      <button onclick="connectStripe()" style="background:#635bff;color:#fff;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;font-weight:600;font-size:14px;">🔗 Connect with Stripe</button>
    </div>

    <button id="btn-configure" onclick="configure()" style="margin-top:4px;">Save & continue</button>
    <div id="error-configure" class="error" style="margin-top:8px;"></div>
    <div id="success-configure" class="success" style="margin-top:8px;"></div>

    <hr style="margin:24px 0 12px;" />
    <details style="font-size:13px;color:#64748b;">
      <summary style="cursor:pointer;font-weight:600;color:#475569;">Add PayPal (optional)</summary>
      <p style="margin:8px 0 6px;">Bridge can also sync your PayPal transactions into Stripe Revenue Recognition. This step is optional.</p>
      <label>PayPal Client ID <a href="https://developer.paypal.com/dashboard/applications" target="_blank" style="font-size:12px;font-weight:400;color:#6366f1;text-decoration:none;">Where to find this →</a></label>
      <input type="text" id="paypal-client-id" placeholder="A..." />
      <label>PayPal Client Secret <a href="https://developer.paypal.com/dashboard/applications" target="_blank" style="font-size:12px;font-weight:400;color:#6366f1;text-decoration:none;">Where to find this →</a></label>
      <input type="password" id="paypal-client-secret" placeholder="E..." />
    </details>
  </div>

  <div class="card step-view" id="s-dashboard">
    <div id="dash-oauth-message" style="display:none;"></div>
    <h2>Dashboard</h2>
    <p>Stripe: <span id="stripe-status" class="badge badge-no">Not connected</span> &nbsp;&middot;&nbsp; PayPal: <span id="paypal-status" class="badge badge-no">Not connected</span></p>
    <p style="font-size:14px;">Synced: <strong><span id="sync-count">0</span></strong> · Last sync: <span id="sync-time" style="color:#64748b;">Never</span></p>
    <button id="btn-sync" onclick="syncNow()" style="margin-top:4px;">Sync now</button>
    <div id="error-sync" class="error" style="margin-top:8px;"></div>
    <div id="success-sync" class="success" style="margin-top:8px;"></div>
    <div id="sync-errors-banner" style="display:none;margin-top:8px;padding:12px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;font-size:13px;">
      <strong style="color:#991b1b;">⚠️ Sync errors detected</strong>
      <div id="sync-errors-content" style="color:#7f1d1d;margin-top:4px;"></div>
      <button onclick="syncNow()" style="margin-top:6px;padding:6px 16px;background:#dc2626;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:12px;">Retry sync</button>
    </div>

    <!-- Stripe connect (shown when Stripe is not connected) -->
    <div id="stripe-connect-section" style="display:none;margin-top:16px;padding:16px;background:#f8fafc;border-radius:10px;border:1px solid #f1f5f9;">
      <p style="font-weight:600;font-size:14px;margin-bottom:6px;">Connect Stripe</p>
      <p style="font-size:13px;color:#64748b;margin-bottom:10px;">Paste your Stripe secret key to connect.</p>
      <input type="password" id="dash-stripe-key" placeholder="sk_live_... or sk_test_..." style="margin-bottom:8px;" />
      <button id="btn-dash-stripe" onclick="dashConnectStripe()" style="width:100%;padding:12px;font-size:15px;background:#0f172a;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:600;">
        Save Stripe Key
      </button>
      <div id="error-stripe-connect" class="error" style="margin-top:6px;"></div>
      <div id="success-stripe-connect" class="success" style="margin-top:6px;"></div>
    </div>

    <!-- PayPal config (shown when Stripe is connected but PayPal is not) -->
    <div id="paypal-config-section" style="display:none;margin-top:16px;padding:16px;background:#f8fafc;border-radius:10px;border:1px solid #f1f5f9;">
      <p style="font-weight:600;font-size:14px;margin-bottom:6px;">Connect PayPal</p>
      <p style="font-size:13px;color:#64748b;margin-bottom:10px;">You'll need your PayPal API credentials.</p>
      <label>PayPal Client ID</label>
      <input type="text" id="dash-paypal-id" placeholder="A..." />
      <label>PayPal Client Secret</label>
      <input type="password" id="dash-paypal-secret" placeholder="E..." />
      <button id="btn-dash-paypal" onclick="configurePaypal()">Save PayPal</button>
      <div id="error-paypal" class="error" style="margin-top:6px;"></div>
      <div id="success-paypal" class="success" style="margin-top:6px;"></div>
    </div>

    <hr />
    <div>
      <p style="font-weight:600;margin-bottom:4px;">Plan</p>
      <p style="font-size:13px;">Status: <span id="sub-status" class="badge badge-ok">Active</span> · <span id="sub-detail">7-day free trial</span></p>
      <button id="btn-subscribe" onclick="subscribe()" class="green" style="margin-top:8px;">Subscribe — $49/mo</button>
      <button id="btn-manage" onclick="manageBilling()" style="display:none;">Manage billing</button>
      <div id="error-billing" class="error" style="margin-top:4px;"></div>
    </div>
    <hr />
    <details style="margin-top:12px;cursor:pointer;">
      <summary style="font-size:13px;color:#94a3b8;">⚠️ Danger Zone</summary>
      <div style="margin-top:8px;padding:12px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;">
        <p style="font-size:13px;color:#991b1b;margin-bottom:8px;font-weight:500;">Reset removes your Stripe and PayPal credentials from this browser. Sync will stop.</p>
        <button onclick="resetAll()" class="red">Reset Everything</button>
      </div>
    </details>
  </div>
</div>

<div class="footer">🌉 Bridge · <a href="${BASE_URL}">Home</a></div>
</div>

<script>
  const API = '${BASE_URL}';
  let API_KEY = localStorage.getItem('bridge_api_key') || '';

  // Initialize Paddle.js with client-side token
  const PADDLE_TOKEN = ${JSON.stringify(PADDLE_CLIENT_TOKEN)};
  if (typeof Paddle !== 'undefined' && PADDLE_TOKEN) {
    try {
      Paddle.Initialize({ token: PADDLE_TOKEN });
    } catch (e) {
      console.error('Paddle init failed:', e);
    }
  } else if (PADDLE_TOKEN) {
    // Paddle.js not loaded yet — wait and retry
    document.addEventListener('DOMContentLoaded', function() {
      if (typeof Paddle !== 'undefined') {
        try { Paddle.Initialize({ token: PADDLE_TOKEN }); } catch (e) { console.error(e); }
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const t = document.querySelector(this.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  if (window.location.hash) {
    setTimeout(() => {
      const t = document.querySelector(window.location.hash);
      if (t) t.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }

  // Handle checkout redirect params
  const params = new URLSearchParams(window.location.search);
  if (params.get('checkout') === 'success' && API_KEY) {
    // Checkout completed — show dashboard and poll until webhook arrives
    document.querySelectorAll('.step-view').forEach(s => s.classList.remove('active'));
    document.getElementById('s-dashboard').classList.add('active');
    document.getElementById('s-dashboard').scrollIntoView({ behavior: 'smooth' });
    loadDashboard();
    pollSubscriptionStatus();
    // Clean up URL param
    window.history.replaceState({}, document.title, '/app');
  } else if (params.get('oauth') === 'success' && API_KEY) {
    // OAuth success — show dashboard with Stripe connected
    document.querySelectorAll('.step-view').forEach(s => s.classList.remove('active'));
    document.getElementById('s-dashboard').classList.add('active');
    const msg = document.getElementById('dash-oauth-message');
    msg.style.display = 'block';
    msg.className = 'success';
    msg.textContent = '✅ Stripe connected! Connect PayPal below to start syncing.';
    loadDashboard();
  } else if (params.get('error') === 'auth_required' && API_KEY) {
    document.querySelectorAll('.step-view').forEach(s => s.classList.remove('active'));
    document.getElementById('s-configure').classList.add('active');
    document.getElementById('error-configure').textContent = '⚠️ Session error. Please try connecting Stripe again.';
  } else if (params.get('error') === 'oauth_unavailable' && API_KEY) {
    document.querySelectorAll('.step-view').forEach(s => s.classList.remove('active'));
    document.getElementById('s-configure').classList.add('active');
    document.getElementById('error-configure').innerHTML =
      '⚠️ One-click Stripe is not available. Paste your Stripe secret key below instead.';
  } else if (params.get('error') === 'oauth_denied' && API_KEY) {
    document.querySelectorAll('.step-view').forEach(s => s.classList.remove('active'));
    document.getElementById('s-configure').classList.add('active');
    document.getElementById('error-configure').textContent = 'Stripe authorization was cancelled. Try again or use manual entry.';
  } else if (params.get('error') === 'oauth_failed' && API_KEY) {
    document.querySelectorAll('.step-view').forEach(s => s.classList.remove('active'));
    document.getElementById('s-configure').classList.add('active');
    document.getElementById('error-configure').textContent = 'Stripe connection failed: ' + (params.get('detail') || 'Unknown error');
  } else if (params.get('error') === 'trial_expired_reuse' && API_KEY) {
    document.querySelectorAll('.step-view').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.step-panel').forEach(s => s.classList.remove('active'));
    document.getElementById('s-configure').classList.add('active');
    document.getElementById('error-configure').innerHTML =
      '⚠️ This Stripe account already used its free trial. ' +
      'Each Stripe account is eligible for one trial only. ' +
      '<a href="#pricing">Subscribe at $49/mo</a> to continue, or use a different Stripe account.';
  } else if (API_KEY) {
    // Already have a key — verify it's still valid before going to dashboard
    (async () => {
      try {
        const r = await fetch(API + '/api/status', { headers: { 'Authorization': 'Bearer ' + API_KEY } });
        const d = await r.json();
        if (d.needsAuth) throw new Error('Invalid key');
        // Valid key — show dashboard
        document.querySelectorAll('.step-view').forEach(s => s.classList.remove('active'));
        document.getElementById('s-dashboard').classList.add('active');
        loadDashboard();
      } catch (e) {
        // Stale key — clear it and show registration
        localStorage.removeItem('bridge_api_key');
        document.getElementById('error-register').textContent = '⚠️ Previous session expired. Register again to start fresh.';
      }
    })();
  }

  async function register() {
    setLoading('btn-register', true);
    document.getElementById('error-register').textContent = '';
    try {
      const r = await fetch(API + '/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName: 'Bridge User' }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Registration failed');
      API_KEY = d.apiKey;
      localStorage.setItem('bridge_api_key', API_KEY);
      // Skip API key display — go straight to configure
      document.getElementById('api-key-display').textContent = d.apiKey;
      document.querySelectorAll('.step-view').forEach(s => s.classList.remove('active'));
      document.getElementById('s-configure').classList.add('active');
      document.getElementById('s-configure').scrollIntoView({ behavior: 'smooth' });
    } catch (e) {
      document.getElementById('error-register').textContent = e.message;
    } finally {
      setLoading('btn-register', false);
    }
  }

  function showCfg() {
    document.querySelectorAll('.step-view').forEach(s => s.classList.remove('active'));
    document.getElementById('s-configure').classList.add('active');
    document.getElementById('s-configure').scrollIntoView({ behavior: 'smooth' });
  }

  async function configure() {
    const sk = document.getElementById('stripe-key').value;
    const pc = document.getElementById('paypal-client-id').value;
    const ps = document.getElementById('paypal-client-secret').value;
    setLoading('btn-configure', true);
    document.getElementById('error-configure').textContent = '';
    document.getElementById('success-configure').textContent = '';
    try {
      const body = {};
      if (sk) body.stripeKey = sk;
      if (pc) body.paypalClientId = pc;
      if (ps) body.paypalClientSecret = ps;
      const r = await fetch(API + '/api/configure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + API_KEY },
        body: JSON.stringify(body),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Configuration failed');
      document.getElementById('success-configure').textContent = '✅ Connected!';
      setTimeout(() => {
        document.querySelectorAll('.step-view').forEach(s => s.classList.remove('active'));
        document.getElementById('s-dashboard').classList.add('active');
        document.getElementById('s-dashboard').scrollIntoView({ behavior: 'smooth' });
        setLoading('btn-configure', false);
        loadDashboard();
      }, 800);
      return; // skip the finally restore (timeout handles it)
    } catch (e) {
      document.getElementById('error-configure').textContent = e.message;
    } finally {
      // Only restore if we didn't hit the success path (which returns early)
      if (!document.getElementById('success-configure').textContent) {
        setLoading('btn-configure', false);
      }
    }
  }

  // ── Stripe OAuth ──────────────────────────────────────────
  function connectStripe() {
    // Navigate to OAuth start endpoint with API key in URL (since direct navigation
    // doesn't send the Authorization header)
    window.location.href = API + '/api/stripe/oauth/start?token=' + API_KEY;
  }

  function toggleOauthInfo() {
    const section = document.getElementById('oauth-info');
    const link = document.querySelector('[onclick="toggleOauthInfo()"]');
    const hidden = section.style.display === 'none' || !section.style.display;
    section.style.display = hidden ? 'block' : 'none';
    link.textContent = hidden ? '▲ Hide one-click auth' : '▼ Use one-click Stripe auth instead';
  }

  // ── PayPal inline config (on dashboard) ──────────────────
  async function configurePaypal() {
    const id = document.getElementById('dash-paypal-id').value;
    const secret = document.getElementById('dash-paypal-secret').value;
    if (!id || !secret) { document.getElementById('error-paypal').textContent = 'Fill in both PayPal fields'; return; }
    setLoading('btn-dash-paypal', true);
    document.getElementById('error-paypal').textContent = '';
    document.getElementById('success-paypal').textContent = '';
    try {
      const r = await fetch(API + '/api/configure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + API_KEY },
        body: JSON.stringify({ paypalClientId: id, paypalClientSecret: secret }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Configuration failed');
      document.getElementById('success-paypal').textContent = '✅ PayPal connected!';
      setLoading('btn-dash-paypal', false);
      loadDashboard();
    } catch (e) {
      document.getElementById('error-paypal').textContent = e.message;
      setLoading('btn-dash-paypal', false);
    }
  }

  async function loadDashboard() {
    try {
      const r = await fetch(API + '/api/status', { headers: { 'Authorization': 'Bearer ' + API_KEY } });
      const d = await r.json();
      document.getElementById('stripe-status').textContent = d.stripe?.connected ? '✅ Connected' : '❌ Not connected';
      document.getElementById('stripe-status').className = 'badge ' + (d.stripe?.connected ? 'badge-ok' : 'badge-no');
      document.getElementById('paypal-status').textContent = d.paypal?.connected ? '✅ Connected' : '❌ Not connected';
      document.getElementById('paypal-status').className = 'badge ' + (d.paypal?.connected ? 'badge-ok' : 'badge-no');
      if (d.sync) {
        document.getElementById('sync-count').textContent = d.sync.totalSynced || 0;
        document.getElementById('sync-time').textContent = d.sync.lastSyncAt ? new Date(d.sync.lastSyncAt).toLocaleDateString() : 'Never';

        // Show error banner if there are recent sync errors
        const errorBanner = document.getElementById('sync-errors-banner');
        const errorContent = document.getElementById('sync-errors-content');
        if (d.sync.errors && d.sync.errors.length > 0) {
          const err = d.sync.errors[0];
          const time = err.time ? new Date(err.time).toLocaleString() : 'recently';
          errorContent.innerHTML = d.sync.errors.length === 1
            ? 'Last sync failed: <code>' + escapeHtml(err.error) + '</code> (' + time + ')'
            : d.sync.errors.length + ' errors since last successful sync. Latest: <code>' + escapeHtml(err.error) + '</code> (' + time + ')';
          errorBanner.style.display = 'block';
        } else {
          errorBanner.style.display = 'none';
        }
      }
      // Show Stripe connect section when Stripe is not connected
      const stripeSection = document.getElementById('stripe-connect-section');
      stripeSection.style.display = d.stripe?.connected ? 'none' : 'block';

      // Show PayPal config section only when Stripe is connected but PayPal is not
      const paypalSection = document.getElementById('paypal-config-section');
      paypalSection.style.display = (d.stripe?.connected && !d.paypal?.connected) ? 'block' : 'none';
    } catch (e) { console.error(e); }

    try {
      const r = await fetch(API + '/api/subscription', { headers: { 'Authorization': 'Bearer ' + API_KEY } });
      const sub = await r.json();
      if (sub.needsAuth) return;
      const se = document.getElementById('sub-status'), sd = document.getElementById('sub-detail'), sb = document.getElementById('btn-subscribe'), sm = document.getElementById('btn-manage');
      if (sub.active) {
        se.textContent = '✅ Active'; se.className = 'badge badge-ok';
        if (sub.stripeSubscriptionId || sub.paddleSubscriptionId) { sd.textContent = 'Subscribed (via ' + (sub.billingProvider || '') + ')'; sb.style.display = 'none'; sm.style.display = 'inline-block'; }
        else { sd.textContent = 'Trial ends ' + new Date(sub.trialEnd).toLocaleDateString(); sb.style.display = 'inline-block'; sm.style.display = 'none'; }
      } else {
        se.textContent = '⚠️ Expired'; se.className = 'badge badge-no';
        sd.textContent = 'Trial ended'; sb.style.display = 'inline-block'; sm.style.display = 'none';
      }
    } catch (e) { console.error(e); }
  }

  async function subscribe() {
    document.getElementById('error-billing').textContent = '';
    setLoading('btn-subscribe', true);
    try {
      const r = await fetch(API + '/api/create-paddle-checkout', { method: 'POST', headers: { 'Authorization': 'Bearer ' + API_KEY } });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      if (d.priceId) {
        // Open Paddle checkout overlay with items directly
        // Paddle.js handles customer creation, payment, and subscription setup
        if (typeof Paddle !== 'undefined' && Paddle.Checkout) {
          try {
            await Paddle.Checkout.open({
              items: [{ priceId: d.priceId, quantity: 1 }],
              customData: { merchant_id: API_KEY },
              settings: {
                displayMode: 'overlay',
                theme: 'light',
              },
            });
            // Checkout completed — poll subscription status until webhook arrives
            await pollSubscriptionStatus();
          } catch (checkoutErr) {
            // User closed or checkout failed — silently handle
            loadDashboard();
          }
        } else {
          throw new Error('Paddle.js not loaded. Please refresh and try again.');
        }
      } else if (d.url) {
        window.location.href = d.url;
      } else if (d.active) {
        document.getElementById('error-billing').textContent = 'Already subscribed.';
      }
      setLoading('btn-subscribe', false);
    } catch (e) { document.getElementById('error-billing').textContent = e.message; setLoading('btn-subscribe', false); }
  }

  async function manageBilling() {
    document.getElementById('error-billing').textContent = '';
    try {
      const r = await fetch(API + '/api/create-paddle-checkout', { method: 'POST', headers: { 'Authorization': 'Bearer ' + API_KEY } });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      if (d.url) window.location.href = d.url;
      else document.getElementById('error-billing').textContent = 'Unable to open billing portal. Contact support.';
    } catch (e) { document.getElementById('error-billing').textContent = e.message; }
  }

  async function dashConnectStripe() {
    const key = document.getElementById('dash-stripe-key').value;
    if (!key) { document.getElementById('error-stripe-connect').textContent = 'Enter your Stripe secret key'; return; }
    setLoading('btn-dash-stripe', true);
    document.getElementById('error-stripe-connect').textContent = '';
    document.getElementById('success-stripe-connect').textContent = '';
    try {
      const r = await fetch(API + '/api/configure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + API_KEY },
        body: JSON.stringify({ stripeKey: key }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Failed to connect Stripe');
      document.getElementById('success-stripe-connect').textContent = '✅ Stripe connected!';
      setLoading('btn-dash-stripe', false);
      loadDashboard();
    } catch (e) {
      document.getElementById('error-stripe-connect').textContent = e.message;
      setLoading('btn-dash-stripe', false);
    }
  }

  async function syncNow() {
    setLoading('btn-sync', true);
    document.getElementById('error-sync').textContent = '';
    document.getElementById('success-sync').textContent = '';
    try {
      const r = await fetch(API + '/api/sync', { method: 'POST', headers: { 'Authorization': 'Bearer ' + API_KEY } });
      const d = await r.json();
      if (r.status === 402) { document.getElementById('error-sync').textContent = '⚠️ ' + (d.detail || 'Subscription required'); setLoading('btn-sync', false); loadDashboard(); return; }
      if (!r.ok) throw new Error(d.error);
      document.getElementById('success-sync').textContent = '✅ Synced! ' + d.pushed + ' pushed, ' + d.skipped + ' skipped';
      setLoading('btn-sync', false);
      loadDashboard();
    } catch (e) { document.getElementById('error-sync').textContent = e.message; setLoading('btn-sync', false); }
  }

  function resetAll() {
    if (!confirm('Are you sure you want to reset? Your Stripe and PayPal credentials will be removed from this browser. Sync will stop.')) return;
    if (!confirm('This cannot be undone. Your configured credentials will be lost.')) return;
    localStorage.removeItem('bridge_api_key');
    location.reload();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // Poll subscription status after checkout until webhook arrives
  async function pollSubscriptionStatus() {
    for (let i = 0; i < 6; i++) {  // try 6 times, every 2 sec = 12 sec total
      await new Promise(r => setTimeout(r, 2000));
      try {
        const r = await fetch(API + '/api/subscription', { headers: { 'Authorization': 'Bearer ' + API_KEY } });
        const sub = await r.json();
        if (sub.active && (sub.stripeSubscriptionId || sub.paddleSubscriptionId)) {
          // Webhook has arrived — subscription is active
          loadDashboard();
          return;
        }
      } catch (e) { /* retry */ }
    }
    // Fallback: load dashboard showing what we have
    loadDashboard();
  }

  function setLoading(btnId, loading) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    if (loading) {
      btn.dataset.original = btn.textContent;
      btn.textContent = '⏳ Loading...';
      btn.disabled = true;
    } else {
      btn.textContent = btn.dataset.original || btn.textContent;
      btn.disabled = false;
    }
  }
</script>
</body>
</html>`);
  });
}
