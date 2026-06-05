/**
 * Web UI — Landing page + setup wizard served from the Express backend.
 * Uses buyer psychology: pain → agitation → solution → proof → pricing.
 */
export function setupWebUI(app, BASE_URL) {
  app.get('/app', (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bridge — PayPal sync for Stripe Revenue Recognition</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; background: #f8fafc; color: #0f172a; line-height: 1.6; -webkit-font-smoothing: antialiased; }

    .container { max-width: 680px; margin: 0 auto; padding: 0 24px; }

    /* ── Navigation ── */
    .nav { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; max-width: 960px; margin: 0 auto; }
    .nav-brand { font-size: 20px; font-weight: 700; color: #0f172a; text-decoration: none; display: flex; align-items: center; gap: 8px; }
    .nav-cta { background: #0f172a; color: white; padding: 8px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; transition: background 0.2s; }
    .nav-cta:hover { background: #1e293b; }

    /* ── Hero ── */
    .hero { padding: 80px 0 40px; text-align: center; }
    .hero-badge { display: inline-block; background: #eef2ff; color: #4338ca; font-size: 13px; font-weight: 600; padding: 4px 14px; border-radius: 20px; margin-bottom: 20px; letter-spacing: 0.01em; }
    .hero h1 { font-size: clamp(32px, 5vw, 48px); font-weight: 800; line-height: 1.15; letter-spacing: -0.02em; margin-bottom: 16px; color: #0f172a; }
    .hero h1 .highlight { background: linear-gradient(135deg, #4338ca, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .hero p { font-size: clamp(16px, 2vw, 19px); color: #475569; max-width: 520px; margin: 0 auto 24px; }
    .hero-visual { background: linear-gradient(135deg, #eef2ff, #e0e7ff); border-radius: 16px; padding: 40px 24px; margin: 32px auto 0; max-width: 560px; position: relative; border: 1px solid #c7d2fe; }
    .hero-visual .comparison { display: flex; gap: 16px; justify-content: center; align-items: flex-start; flex-wrap: wrap; }
    .hero-visual .col { flex: 1; min-width: 180px; text-align: center; }
    .hero-visual .col-label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; color: #6366f1; }
    .hero-visual .col-before { background: white; border-radius: 10px; padding: 20px 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
    .hero-visual .col-after { background: #0f172a; border-radius: 10px; padding: 20px 16px; box-shadow: 0 4px 12px rgba(99,102,241,0.2); }
    .hero-visual .col-after .col-label { color: #a5b4fc; }
    .hero-visual .revenue-item { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; border-bottom: 1px solid #f1f5f9; }
    .hero-visual .col-after .revenue-item { border-color: #334155; color: #cbd5e1; }
    .hero-visual .revenue-item:last-child { border-bottom: none; }
    .hero-visual .revenue-item .label { color: #64748b; }
    .hero-visual .col-after .revenue-item .label { color: #94a3b8; }
    .hero-visual .revenue-item .amount { font-weight: 600; color: #0f172a; }
    .hero-visual .col-after .revenue-item .amount { color: #e2e8f0; }
    .hero-visual .badge-new { display: inline-block; background: #22c55e; color: white; font-size: 10px; font-weight: 700; padding: 1px 8px; border-radius: 10px; margin-left: 6px; }
    .hero-visual .arrow-icon { font-size: 28px; color: #6366f1; align-self: center; padding: 0 4px; }

    .cta-group { margin-top: 32px; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
    .btn-primary { display: inline-block; background: #0f172a; color: white; padding: 16px 36px; border-radius: 10px; font-size: 16px; font-weight: 700; text-decoration: none; transition: all 0.2s; border: none; cursor: pointer; font-family: inherit; line-height: 1.2; }
    .btn-primary:hover { background: #1e293b; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(15,23,42,0.15); }
    .btn-secondary { display: inline-block; background: transparent; color: #0f172a; padding: 16px 36px; border-radius: 10px; font-size: 16px; font-weight: 600; text-decoration: none; border: 1.5px solid #e2e8f0; transition: all 0.2s; cursor: pointer; font-family: inherit; line-height: 1.2; }
    .btn-secondary:hover { background: #f8fafc; border-color: #94a3b8; }
    .cta-micro { font-size: 13px; color: #64748b; margin-top: 10px; }

    /* ── Sections ── */
    section { padding: 64px 0; }
    .section-label { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #6366f1; margin-bottom: 8px; }
    section h2 { font-size: clamp(24px, 3.5vw, 32px); font-weight: 800; letter-spacing: -0.015em; margin-bottom: 16px; color: #0f172a; line-height: 1.2; }
    section h2 .sub { font-weight: 400; color: #475569; font-size: clamp(16px, 2vw, 18px); display: block; margin-top: 8px; letter-spacing: 0; }
    section p { font-size: 16px; color: #475569; max-width: 520px; }

    /* ── Pain section ── */
    .pain { background: #fff; border-radius: 16px; padding: 40px 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); border: 1px solid #f1f5f9; margin: 0 auto; max-width: 600px; }
    .pain-item { display: flex; gap: 14px; padding: 14px 0; border-bottom: 1px solid #f8fafc; align-items: flex-start; }
    .pain-item:last-child { border-bottom: none; }
    .pain-icon { flex-shrink: 0; width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; }
    .pain-icon.red { background: #fef2f2; }
    .pain-icon.green { background: #f0fdf4; }
    .pain-text { font-size: 15px; color: #334155; }
    .pain-text strong { color: #0f172a; }

    /* ── How it works ── */
    .steps-grid { display: flex; gap: 20px; margin-top: 32px; flex-wrap: wrap; }
    .step-card { flex: 1; min-width: 180px; background: white; border-radius: 12px; padding: 28px 24px; border: 1px solid #f1f5f9; box-shadow: 0 1px 2px rgba(0,0,0,0.04); }
    .step-number { display: inline-block; width: 32px; height: 32px; border-radius: 8px; background: #eef2ff; color: #4338ca; font-weight: 700; font-size: 14px; text-align: center; line-height: 32px; margin-bottom: 14px; }
    .step-card h3 { font-size: 16px; font-weight: 700; margin-bottom: 8px; color: #0f172a; }
    .step-card p { font-size: 14px; color: #64748b; margin-bottom: 0; max-width: 100%; }
    .step-card .step-sub { font-size: 12px; color: #94a3b8; margin-top: 8px; }

    /* ── Proof / Stats ── */
    .proof-bar { display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; padding: 32px 0; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; margin: 32px auto 0; max-width: 500px; }
    .proof-stat { text-align: center; }
    .proof-stat .number { font-size: 28px; font-weight: 800; color: #0f172a; }
    .proof-stat .label { font-size: 13px; color: #64748b; }

    /* ── Pricing ── */
    .pricing-card { background: white; border-radius: 16px; padding: 40px 32px; border: 2px solid #e2e8f0; max-width: 400px; margin: 24px auto 0; text-align: center; transition: border-color 0.2s; }
    .pricing-card:hover { border-color: #6366f1; }
    .pricing-card .price { font-size: 44px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; }
    .pricing-card .price span { font-size: 16px; font-weight: 400; color: #64748b; }
    .pricing-card .perks { margin: 20px 0; }
    .pricing-card .perk { padding: 8px 0; font-size: 15px; color: #334155; }
    .pricing-card .perk::before { content: '✓ '; color: #22c55e; font-weight: 700; }
    .pricing-card .perk.muted { color: #94a3b8; }
    .pricing-card .perk.muted::before { content: '— '; color: #94a3b8; }

    .guarantee { display: flex; align-items: center; gap: 10px; justify-content: center; margin-top: 16px; font-size: 14px; color: #475569; }
    .guarantee .icon { font-size: 20px; }

    /* ── FAQ ── */
    .faq-list { max-width: 520px; margin: 24px auto 0; }
    .faq-item { border-bottom: 1px solid #f1f5f9; padding: 16px 0; }
    .faq-q { font-size: 15px; font-weight: 600; color: #0f172a; cursor: pointer; display: flex; justify-content: space-between; align-items: center; }
    .faq-q .toggle { font-size: 18px; color: #94a3b8; transition: transform 0.2s; }
    .faq-q.open .toggle { transform: rotate(45deg); }
    .faq-a { font-size: 14px; color: #475569; padding-top: 8px; display: none; }
    .faq-a.open { display: block; }

    /* ── Footer ── */
    .footer { text-align: center; padding: 40px 0; font-size: 13px; color: #94a3b8; }
    .footer a { color: #6366f1; text-decoration: none; }

    /* ── Setup Wizard (below fold, same as before) ── */
    .wizard-section { padding: 64px 0 80px; }
    .wizard-section .divider { text-align: center; margin-bottom: 32px; }
    .wizard-section .divider span { background: #f8fafc; padding: 0 16px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; }
    .wizard-section .divider-line { border: none; border-top: 1px solid #e2e8f0; margin: 0; }
    .wizard-card { background: white; border-radius: 12px; padding: 32px; margin-bottom: 16px; border: 1px solid #f1f5f9; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
    .wizard-card h2 { font-size: 18px; font-weight: 700; margin-bottom: 8px; color: #0f172a; }
    .wizard-card p { font-size: 14px; color: #64748b; margin-bottom: 16px; max-width: 100%; }
    .wizard-card label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px; color: #0f172a; }
    .wizard-card input { width: 100%; padding: 10px 14px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 14px; margin-bottom: 14px; font-family: inherit; transition: border-color 0.15s; }
    .wizard-card input:focus { outline: none; border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
    .wizard-card button { background: #0f172a; color: white; border: none; padding: 10px 24px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; transition: background 0.2s; }
    .wizard-card button:hover { background: #1e293b; }
    .wizard-card button:disabled { background: #94a3b8; cursor: not-allowed; }
    .wizard-card .btn-green { background: #059669; }
    .wizard-card .btn-green:hover { background: #047857; }
    .wizard-card .btn-red { background: #dc2626; }
    .wizard-card .btn-red:hover { background: #b91c1c; }
    .badge { display: inline-block; padding: 2px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; }
    .badge-ok { background: #d1fae5; color: #065f46; }
    .badge-no { background: #fee2e2; color: #991b1b; }
    .error { color: #dc2626; font-size: 13px; margin-bottom: 8px; }
    .success { color: #059669; font-size: 13px; margin-bottom: 8px; }
    .step { display: none; }
    .step.active { display: block; }
    .wizard-card pre { background: #f8fafc; padding: 10px 14px; border-radius: 8px; font-size: 12px; border: 1px solid #f1f5f9; overflow-x: auto; word-break: break-all; }

    @media (max-width: 600px) {
      .hero { padding: 48px 0 24px; }
      section { padding: 40px 0; }
      .hero-visual { padding: 24px 16px; }
      .hero-visual .comparison { flex-direction: column; }
      .hero-visual .arrow-icon { transform: rotate(90deg); }
      .wizard-section { padding: 40px 0; }
      .nav-cta { display: none; }
      .pricing-card { padding: 28px 20px; }
    }
  </style>
</head>
<body>

<!-- ── Navigation ── -->
<div class="nav">
  <a href="/app" class="nav-brand">🌉 Bridge</a>
  <a href="#setup" class="nav-cta">Start Free Trial</a>
</div>

<!-- ── HERO ── -->
<div class="container">
  <div class="hero">
    <div class="hero-badge">⚡ Official Stripe Partner API</div>
    <h1>Your Stripe dashboard should show <span class="highlight">all</span> your revenue.<br/>Not just Stripe payments.</h1>
    <p>If you accept PayPal alongside Stripe, those transactions are invisible in Revenue Recognition. Bridge pushes every PayPal transaction into Stripe automatically. One dashboard. Complete picture.</p>

    <!-- Visual comparison: Before vs After -->
    <div class="hero-visual">
      <div class="comparison">
        <div class="col">
          <div class="col-label">❌ Without Bridge</div>
          <div class="col-before">
            <div class="revenue-item"><span class="label">Stripe payments</span><span class="amount">$12,430</span></div>
            <div class="revenue-item"><span class="label">PayPal payments</span><span class="amount" style="color:#94a3b8;">?</span></div>
            <div class="revenue-item"><span class="label" style="color:#dc2626;">Missing revenue</span><span class="amount" style="color:#dc2626;">-$3,210</span></div>
          </div>
        </div>
        <div class="arrow-icon">→</div>
        <div class="col">
          <div class="col-label">✅ With Bridge</div>
          <div class="col-after">
            <div class="revenue-item"><span class="label">Stripe payments</span><span class="amount">$12,430</span></div>
            <div class="revenue-item"><span class="label">PayPal payments</span><span class="amount" style="color:#22c55e;">$3,210 <span class="badge-new">NEW</span></span></div>
            <div class="revenue-item"><span class="label" style="color:#22c55e;">Total revenue</span><span class="amount" style="color:#22c55e;font-size:15px;">$15,640</span></div>
          </div>
        </div>
      </div>
    </div>

    <div class="cta-group">
      <a href="#setup" class="btn-primary">Start Free Trial →</a>
      <a href="#how-it-works" class="btn-secondary">How It Works</a>
    </div>
    <div class="cta-micro">7-day free trial · No credit card required · Cancel anytime</div>
  </div>

  <!-- ── Social Proof ── -->
  <div class="proof-bar">
    <div class="proof-stat"><div class="number" id="stat-synced">2</div><div class="label">transactions synced</div></div>
    <div class="proof-stat"><div class="number">2</div><div class="label">payment processors</div></div>
    <div class="proof-stat"><div class="number">7</div><div class="label">day free trial</div></div>
  </div>

  <!-- ── THE PAIN ── -->
  <section id="pain">
    <div class="section-label">The Problem</div>
    <h2>Your revenue picture has a blind spot.<br><span class="sub">Stripe Revenue Recognition only sees Stripe transactions. Every PayPal payment is invisible.</span></h2>
    <div class="pain">
      <div class="pain-item">
        <div class="pain-icon red">😤</div>
        <div class="pain-text"><strong>Monthly PayPal CSV exports.</strong> You log into PayPal, download settlement reports, and manually reconcile them against Stripe. Every. Single. Month.</div>
      </div>
      <div class="pain-item">
        <div class="pain-icon red">😰</div>
        <div class="pain-text"><strong>Spreadsheet errors cost time and money.</strong> One wrong formula, one missing transaction, and your revenue reports are wrong. Your accountant catches it — after hours of backtracking.</div>
      </div>
      <div class="pain-item">
        <div class="pain-icon red">😐</div>
        <div class="pain-text"><strong>Your Stripe dashboard is incomplete.</strong> Revenue Recognition, Sigma reports, and your payout reconciliation all miss PayPal data. You're paying for tools that only see half your business.</div>
      </div>
      <div class="pain-item">
        <div class="pain-icon green">✅</div>
        <div class="pain-text"><strong>Bridge fixes this.</strong> Connect once. Every PayPal transaction is automatically pushed into Stripe as a Payment Record. Your dashboard finally shows everything.</div>
      </div>
    </div>
  </section>

  <!-- ── HOW IT WORKS ── -->
  <section id="how-it-works">
    <div class="section-label">How It Works</div>
    <h2>Three steps. Set it once. Done.<br><span class="sub">No ongoing work. No manual exports. No spreadsheets.</span></h2>
    <div class="steps-grid">
      <div class="step-card">
        <div class="step-number">1</div>
        <h3>Connect Stripe</h3>
        <p>Bridge uses Stripe's official API to create Payment Records for off-Stripe transactions.</p>
        <div class="step-sub">Takes 30 seconds</div>
      </div>
      <div class="step-card">
        <div class="step-number">2</div>
        <h3>Connect PayPal</h3>
        <p>Bridge reads your PayPal transaction history via the PayPal REST API.</p>
        <div class="step-sub">Takes 30 seconds</div>
      </div>
      <div class="step-card">
        <div class="step-number">3</div>
        <h3>Sync runs automatically</h3>
        <p>Every 24 hours, Bridge fetches new PayPal transactions and pushes them into Stripe. They appear in Revenue Recognition — automatically.</p>
        <div class="step-sub">Zero ongoing work</div>
      </div>
    </div>
  </section>

  <!-- ── FEATURES ── -->
  <section>
    <div class="section-label">What You Get</div>
    <h2>Everything in Stripe, now with PayPal.<br><span class="sub">Your existing tools just started working harder.</span></h2>
    <div class="pain" style="margin-top:24px;">
      <div class="pain-item">
        <div class="pain-icon green">📊</div>
        <div class="pain-text"><strong>Revenue Recognition sees PayPal.</strong> ASC 606 and IFRS 15 reports now include all revenue — not just Stripe-native payments.</div>
      </div>
      <div class="pain-item">
        <div class="pain-icon green">📋</div>
        <div class="pain-text"><strong>Sigma reports are complete.</strong> Query all your payment data in one place. Your analytics finally reflect reality.</div>
      </div>
      <div class="pain-item">
        <div class="pain-icon green">🔍</div>
        <div class="pain-text"><strong>Payout reconciliation works.</strong> Match payouts from both processors against your bank statements without manual CSV matching.</div>
      </div>
      <div class="pain-item">
        <div class="pain-icon green">🛡️</div>
        <div class="pain-text"><strong>Read-only access.</strong> Bridge only reads PayPal transactions and writes Payment Records to Stripe. Your data never leaves your control.</div>
      </div>
    </div>
  </section>

  <!-- ── PRICING ── -->
  <section id="pricing">
    <div class="section-label">Pricing</div>
    <h2>Less than one hour of manual reconciliation.<br><span class="sub">Bridge pays for itself in the first month.</span></h2>
    <div class="pricing-card">
      <div class="price">$49 <span>/ month</span></div>
      <div class="perks">
        <div class="perk">Unlimited transaction syncing</div>
        <div class="perk">Automatic daily syncs</div>
        <div class="perk">Stripe Revenue Recognition integration</div>
        <div class="perk">Multiple processor support</div>
        <div class="perk muted">No setup fees</div>
        <div class="perk muted">Cancel anytime</div>
      </div>
      <a href="#setup" class="btn-primary" style="display:block;text-align:center;">Start 7-Day Free Trial</a>
      <div class="guarantee">
        <span class="icon">🛡️</span> No credit card required. Cancel in one click.
      </div>
    </div>
  </section>

  <!-- ── FAQ ── -->
  <section>
    <div class="section-label">FAQ</div>
    <h2>Common questions.<br><span class="sub">If you're wondering, someone else already asked.</span></h2>
    <div class="faq-list">
      <div class="faq-item">
        <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')">Is this secure? <span class="toggle">+</span></div>
        <div class="faq-a">Bridge never stores your customers' PII or payment details. We only read PayPal transaction metadata (amount, date, currency) and write it to Stripe's Payment Records API. Your Stripe and PayPal credentials are encrypted at rest in PostgreSQL.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')">What about refunds? <span class="toggle">+</span></div>
        <div class="faq-a">Bridge can also push PayPal refunds into Stripe as negative Payment Records, so your revenue reports stay accurate. This happens automatically during sync.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')">Do I need to be technical? <span class="toggle">+</span></div>
        <div class="faq-a">You'll need your Stripe secret key and PayPal API credentials. If you can copy-paste, you can set up Bridge in under 2 minutes. No code required.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')">What happens after the trial? <span class="toggle">+</span></div>
        <div class="faq-a">On day 8, sync pauses until you subscribe at $49/month. Your data stays safe. Subscribe, sync resumes. No data is ever deleted.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')">Can I cancel anytime? <span class="toggle">+</span></div>
        <div class="faq-a">Yes. One click. No calls. No forms. Your data stays for 30 days in case you return.</div>
      </div>
    </div>
  </section>

  <!-- ── FINAL CTA ── -->
  <section style="text-align:center;padding:32px 0 48px;">
    <h2 style="margin-bottom:8px;">Stop reconciling PayPal manually.<br/><span class="sub">Let Bridge do it. Start free.</span></h2>
    <div class="cta-group" style="margin-top:24px;">
      <a href="#setup" class="btn-primary">Start Free Trial →</a>
    </div>
    <div class="cta-micro">7-day free trial · No credit card · Cancel anytime</div>
  </section>

  <!-- ── ── ── ── ── ── ── ── ── ── ── ── ── ── -->
  <!-- ── SETUP WIZARD (below the fold) ── ── ── ── ── ── -->
  <!-- ── ── ── ── ── ── ── ── ── ── ── ── ── ── -->

  <hr class="divider-line" />
  <div class="wizard-section" id="setup">

    <!-- Step 1: Register -->
    <div class="wizard-card step active" id="step-register">
      <h2>Create your free account</h2>
      <p>No credit card required. Your 7-day trial starts now.</p>
      <label for="display-name">Business name (optional)</label>
      <input type="text" id="display-name" placeholder="My Business" />
      <button id="btn-register" onclick="register()">Start Free Trial →</button>
      <div id="error-register" class="error" style="margin-top:8px;"></div>
    </div>

    <!-- Step 2: API Key shown -->
    <div class="wizard-card step" id="step-apikey">
      <h2>Your API key is ready</h2>
      <p>Save this key — you'll use it once to connect your accounts.</p>
      <pre id="api-key-display"></pre>
      <button onclick="showConfigure()" style="margin-top:8px">Connect My Accounts →</button>
    </div>

    <!-- Step 3: Configure -->
    <div class="wizard-card step" id="step-configure">
      <h2>Connect your accounts</h2>
      <p>Enter your Stripe and PayPal credentials. <a href="https://docs.stripe.com/keys" target="_blank" rel="noopener" style="color:#6366f1;">Where do I find these?</a></p>
      <label for="stripe-key">Stripe Secret Key</label>
      <input type="password" id="stripe-key" placeholder="sk_live_..." />
      <label for="paypal-client-id">PayPal Client ID</label>
      <input type="text" id="paypal-client-id" placeholder="A..." />
      <label for="paypal-client-secret">PayPal Client Secret</label>
      <input type="password" id="paypal-client-secret" placeholder="E..." />
      <button id="btn-configure" onclick="configure()">Save & Connect</button>
      <div id="error-configure" class="error" style="margin-top:8px;"></div>
      <div id="success-configure" class="success" style="margin-top:8px;"></div>
    </div>

    <!-- Step 4: Dashboard -->
    <div class="wizard-card step" id="step-dashboard">
      <h2>Dashboard</h2>
      <div id="status-display">
        <p>Stripe: <span id="stripe-status" class="badge badge-no">Not connected</span>&emsp;PayPal: <span id="paypal-status" class="badge badge-no">Not connected</span></p>
      </div>
      <div style="margin:16px 0;">
        <p style="font-size:14px;margin-bottom:4px;">Synced: <strong><span id="sync-count">0</span></strong> transactions &middot; Last sync: <span id="sync-time" style="color:#64748b;">Never</span></p>
      </div>
      <button id="btn-sync" onclick="syncNow()">Sync Now</button>
      <div id="error-sync" class="error" style="margin-top:8px;"></div>
      <div id="success-sync" class="success" style="margin-top:8px;"></div>
      <hr style="margin:20px 0;border:none;border-top:1px solid #f1f5f9;" />

      <!-- Billing -->
      <div id="billing-display">
        <h3 style="font-size:15px;font-weight:700;margin-bottom:8px;">Plan</h3>
        <p>Status: <span id="sub-status" class="badge badge-ok">Active</span></p>
        <p id="sub-detail" style="font-size:13px;color:#64748b;margin-bottom:12px;">7-day free trial</p>
        <button id="btn-subscribe" onclick="subscribe()" class="btn-green">Subscribe — $49/mo</button>
        <button id="btn-manage-billing" onclick="manageBilling()" style="display:none;">Manage Billing</button>
        <div id="error-billing" class="error" style="margin-top:4px;"></div>
      </div>
      <hr style="margin:20px 0;border:none;border-top:1px solid #f1f5f9;" />
      <button onclick="resetAll()" class="btn-red">Reset & Start Over</button>
    </div>

    <p style="text-align:center;font-size:12px;color:#94a3b8;margin-top:24px;">By registering, you agree to Bridge's terms of service.</p>
  </div>

  <div class="footer">
    🌉 Bridge &mdash; Built by Yashoraj &middot; <a href="${BASE_URL}">Home</a>
  </div>
</div>

<script>
  const API = '${BASE_URL}';
  let API_KEY = localStorage.getItem('bridge_api_key') || '';

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── Handle direct hash on load ──
  if (window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }

  // ── Check if already registered ──
  if (API_KEY) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById('step-dashboard').classList.add('active');
    loadDashboard();
  }

  // ── Registration ──
  async function register() {
    const name = document.getElementById('display-name').value;
    document.getElementById('btn-register').disabled = true;
    document.getElementById('error-register').textContent = '';
    try {
      const r = await fetch(API + '/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName: name || 'Bridge User' }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Registration failed');
      API_KEY = d.apiKey;
      localStorage.setItem('bridge_api_key', API_KEY);
      document.getElementById('api-key-display').textContent = d.apiKey;
      document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
      document.getElementById('step-apikey').classList.add('active');
      window.scrollTo({ top: document.getElementById('step-apikey').offsetTop - 40, behavior: 'smooth' });
    } catch (e) {
      document.getElementById('error-register').textContent = e.message;
    } finally {
      document.getElementById('btn-register').disabled = false;
    }
  }

  function showConfigure() {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById('step-configure').classList.add('active');
    window.scrollTo({ top: document.getElementById('step-configure').offsetTop - 40, behavior: 'smooth' });
  }

  async function configure() {
    const sk = document.getElementById('stripe-key').value;
    const pc = document.getElementById('paypal-client-id').value;
    const ps = document.getElementById('paypal-client-secret').value;
    document.getElementById('btn-configure').disabled = true;
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
      document.getElementById('success-configure').textContent = '✅ Accounts connected!';
      setTimeout(() => {
        document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
        document.getElementById('step-dashboard').classList.add('active');
        window.scrollTo({ top: document.getElementById('step-dashboard').offsetTop - 40, behavior: 'smooth' });
        loadDashboard();
      }, 1000);
    } catch (e) {
      document.getElementById('error-configure').textContent = e.message;
    } finally {
      document.getElementById('btn-configure').disabled = false;
    }
  }

  async function loadDashboard() {
    try {
      const r = await fetch(API + '/api/status', {
        headers: { 'Authorization': 'Bearer ' + API_KEY },
      });
      const d = await r.json();
      if (d.stripe?.connected) {
        document.getElementById('stripe-status').textContent = '✅ Connected';
        document.getElementById('stripe-status').className = 'badge badge-ok';
      }
      if (d.paypal?.connected) {
        document.getElementById('paypal-status').textContent = '✅ Connected';
        document.getElementById('paypal-status').className = 'badge badge-ok';
      }
      if (d.sync) {
        document.getElementById('sync-count').textContent = d.sync.totalSynced || 0;
        // Update stat at top of page too
        document.getElementById('stat-synced').textContent = d.sync.totalSynced || 0;
        document.getElementById('sync-time').textContent = d.sync.lastSyncAt ? new Date(d.sync.lastSyncAt).toLocaleDateString() : 'Never';
      }
    } catch (e) {
      console.error('Dashboard load failed:', e);
    }

    try {
      const r = await fetch(API + '/api/subscription', {
        headers: { 'Authorization': 'Bearer ' + API_KEY },
      });
      const sub = await r.json();
      if (sub.needsAuth) return;

      const statusEl = document.getElementById('sub-status');
      const detailEl = document.getElementById('sub-detail');
      const subBtn = document.getElementById('btn-subscribe');
      const mgmtBtn = document.getElementById('btn-manage-billing');

      if (sub.active) {
        statusEl.textContent = '✅ Active';
        statusEl.className = 'badge badge-ok';
        if (sub.stripeSubscriptionId) {
          detailEl.textContent = 'Subscription active.';
          subBtn.style.display = 'none';
          mgmtBtn.style.display = 'inline-block';
        } else {
          const trialEnd = new Date(sub.trialEnd);
          detailEl.textContent = 'Trial expires ' + trialEnd.toLocaleDateString();
          subBtn.style.display = 'inline-block';
          mgmtBtn.style.display = 'none';
        }
      } else {
        statusEl.textContent = '⚠️ Expired';
        statusEl.className = 'badge badge-no';
        detailEl.textContent = 'Trial ended. Subscribe to continue syncing.';
        subBtn.style.display = 'inline-block';
        mgmtBtn.style.display = 'none';
      }
    } catch (e) {
      console.error('Subscription load failed:', e);
    }
  }

  async function subscribe() {
    document.getElementById('error-billing').textContent = '';
    document.getElementById('btn-subscribe').disabled = true;
    try {
      const r = await fetch(API + '/api/create-checkout', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + API_KEY },
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Checkout failed');
      window.location.href = d.url;
    } catch (e) {
      document.getElementById('error-billing').textContent = e.message;
      document.getElementById('btn-subscribe').disabled = false;
    }
  }

  async function manageBilling() {
    document.getElementById('error-billing').textContent = '';
    try {
      const r = await fetch(API + '/api/create-checkout', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + API_KEY },
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Portal failed');
      window.location.href = d.url;
    } catch (e) {
      document.getElementById('error-billing').textContent = e.message;
    }
  }

  async function syncNow() {
    document.getElementById('btn-sync').disabled = true;
    document.getElementById('error-sync').textContent = '';
    document.getElementById('success-sync').textContent = '';
    try {
      const r = await fetch(API + '/api/sync', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + API_KEY },
      });
      const d = await r.json();
      if (r.status === 402) {
        document.getElementById('error-sync').textContent = '⚠️ ' + (d.detail || 'Subscription required');
        loadDashboard();
        return;
      }
      if (!r.ok) throw new Error(d.error || 'Sync failed');
      document.getElementById('success-sync').textContent = '✅ Synced! ' + d.pushed + ' pushed, ' + d.skipped + ' skipped';
      loadDashboard();
    } catch (e) {
      document.getElementById('error-sync').textContent = e.message;
    } finally {
      document.getElementById('btn-sync').disabled = false;
    }
  }

  function resetAll() {
    localStorage.removeItem('bridge_api_key');
    location.reload();
  }
</script>
</body>
</html>`);
  });
}
