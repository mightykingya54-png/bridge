/**
 * Web UI — Landing page + setup wizard.
 * Core principle: every visitor must understand what Bridge does in ≤ 3 seconds.
 */
export function setupWebUI(app, BASE_URL) {
  app.get('/app', (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bridge — Sync PayPal to Stripe</title>
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
    .hero .mockup .bar { display: flex; gap: 6px; margin-bottom: 14px; }
    .hero .mockup .bar span { width: 10px; height: 10px; border-radius: 50%; }
    .hero .mockup .bar .r { background: #ef4444; }
    .hero .mockup .bar .y { background: #eab308; }
    .hero .mockup .bar .g { background: #22c55e; }
    .hero .mockup .row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .hero .mockup .row:last-child { border-bottom: none; }
    .hero .mockup .row .src { color: #64748b; display: flex; align-items: center; gap: 8px; }
    .hero .mockup .row .src .dot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; }
    .hero .mockup .row .src .dot.s { background: #6366f1; }
    .hero .mockup .row .src .dot.p { background: #2563eb; }
    .hero .mockup .row .amt { font-weight: 600; }
    .hero .mockup .row .tag { font-size: 11px; font-weight: 600; padding: 1px 8px; border-radius: 6px; }
    .hero .mockup .row .tag.new { background: #d1fae5; color: #065f46; }
    .hero .mockup .row .tag.rev { background: #eef2ff; color: #4338ca; }
    .hero .highlight-row { background: #f0fdf4; margin: 0 -24px -20px; padding: 16px 24px; border-top: 1px solid #bbf7d0; }
    .hero .highlight-row .row { border-bottom: none; font-weight: 600; }
    .hero .highlight-row .row .amt { color: #059669; font-size: 16px; }

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
      .mockup .row { font-size: 12px; flex-wrap: wrap; }
    }
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
  <div class="badge">⚡ Pushing PayPal transactions into Stripe Revenue Recognition</div>
  <h1>Stripe is <span class="accent">missing your PayPal revenue</span>.<br/>Bridge fills it in automatically.</h1>
  <p class="sub">Every PayPal transaction is pushed into Stripe as a Payment Record — automatically, daily, with zero manual work. Revenue Recognition, Sigma, and all your Stripe reports finally show your complete revenue.</p>

  <div class="cta-row">
    <a href="#setup" class="btn btn-primary">Start free trial →</a>
    <a href="#how" class="btn btn-outline">See how</a>
  </div>
  <div class="cta-note">7-day free trial · No credit card · Cancel anytime</div>

  <!-- Live mockup: Stripe-style table -->
  <div class="mockup" style="margin-top:28px;">
    <div class="bar"><span class="r"></span><span class="y"></span><span class="g"></span></div>
    <div class="row"><span class="src"><span class="dot s"></span> Stripe payment</span><span class="amt">$49.00</span><span class="tag rev">Revenue Recognition</span></div>
    <div class="row"><span class="src"><span class="dot s"></span> Stripe payment</span><span class="amt">$129.00</span><span class="tag rev">Revenue Recognition</span></div>
    <div class="row" style="background:#f0fdf4;margin:0 -24px;padding:10px 24px;"><span class="src"><span class="dot p"></span> <strong>PayPal payment</strong></span><span class="amt" style="color:#059669;">$32.00</span><span class="tag new">Synced by Bridge</span></div>
    <div class="row" style="background:#f0fdf4;margin:0 -24px;padding:10px 24px;border-bottom:1px solid #bbf7d0;"><span class="src"><span class="dot p"></span> <strong>PayPal payment</strong></span><span class="amt" style="color:#059669;">$87.50</span><span class="tag new">Synced by Bridge</span></div>
    <div class="highlight-row"><div class="row"><span class="src" style="font-weight:600;">Total visible in Stripe</span><span class="amt">$297.50</span><span class="tag rev">Includes PayPal</span></div></div>
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
      <h3>❌ Before Bridge</h3>
      <ul>
        <li>🔴 PayPal revenue missing from Stripe</li>
        <li>🔴 Manual CSV downloads each month</li>
        <li>🔴 Spreadsheet reconciliation errors</li>
        <li>🔴 Incomplete Revenue Recognition reports</li>
      </ul>
    </div>
    <div class="compare-card after">
      <h3>✅ After Bridge</h3>
      <ul>
        <li>🟢 PayPal payments in Stripe dashboard</li>
        <li>🟢 Automatic daily sync — no manual work</li>
        <li>🟢 Revenue Recognition includes all revenue</li>
        <li>🟢 Sigma reports reflect actual totals</li>
      </ul>
    </div>
  </div>
</section>

<!-- ════════════════ FEATURES ════════════════ -->
<section>
  <h2>Works with the tools you already use.</h2>
  <div class="grid">
    <div class="grid-item">🟢 PayPal appears in Revenue Recognition</div>
    <div class="grid-item">🔵 Query all revenue in one SQL query</div>
    <div class="grid-item">🟢 PayPal payouts show in Stripe</div>
    <div class="grid-item">🟢 One dashboard for all revenue</div>
    <div class="grid-item">🟢 Auditable sync trail</div>
    <div class="grid-item">🟢 Refunds sync automatically</div>
  </div>
</section>

<!-- ════════════════ PRICING ════════════════ -->
<section id="pricing">
  <h2>Flat $49/month.<br/><span class="sub">No per-transaction fees. No hidden costs.</span></h2>
  <div class="pricing">
    <div class="price">$49 <span>/ month</span></div>
    <ul>
      <li>Unlimited transactions</li>
      <li>Automatic daily syncs</li>
      <li>All payment processors</li>
      <li>Refund syncing</li>
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
    <button id="btn-register" onclick="register()">Start free trial →</button>
    <div id="error-register" class="error" style="margin-top:8px;"></div>
  </div>

  <div class="card step-view" id="s-apikey">
    <h2>Your API key</h2>
    <p>Save this — you'll use it once to connect your accounts.</p>
    <pre id="api-key-display"></pre>
    <button onclick="showCfg()" style="margin-top:6px">Connect accounts →</button>
  </div>

  <div class="card step-view" id="s-configure">
    <h2>Connect your accounts</h2>
    <p>Bridge needs access to your payment processors. Start with Stripe — one click.</p>

    <!-- Stripe OAuth (primary) -->
    <label>Stripe</label>
    <button id="btn-stripe-oauth" onclick="connectStripe()" style="width:100%;padding:12px;font-size:15px;background:#635bff;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:600;margin-bottom:4px;">
      🔗 Connect with Stripe
    </button>
    <p style="font-size:12px;color:#64748b;margin-bottom:14px;">One-click · Stripe handles auth · Read-only access</p>

    <!-- Manual Stripe fallback -->
    <div onclick="toggleManualStripe()" style="cursor:pointer;color:#6366f1;font-size:13px;font-weight:600;text-align:center;margin:8px 0 14px;" id="toggle-manual-text">
      ▼ Advanced: Paste secret key
    </div>
    <div id="manual-stripe-section" style="display:none;">
      <label>Stripe Secret Key</label>
      <input type="password" id="stripe-key" placeholder="sk_live_..." />
    </div>

    <label>PayPal Client ID</label>
    <input type="text" id="paypal-client-id" placeholder="A..." />
    <label>PayPal Client Secret</label>
    <input type="password" id="paypal-client-secret" placeholder="E..." />
    <button id="btn-configure" onclick="configure()">Save & continue</button>
    <div id="error-configure" class="error" style="margin-top:8px;"></div>
    <div id="success-configure" class="success" style="margin-top:8px;"></div>
  </div>

  <div class="card step-view" id="s-dashboard">
    <div id="dash-oauth-message" style="display:none;"></div>
    <h2>Dashboard</h2>
    <p>Stripe: <span id="stripe-status" class="badge badge-no">Not connected</span> &nbsp;&middot;&nbsp; PayPal: <span id="paypal-status" class="badge badge-no">Not connected</span></p>
    <p style="font-size:14px;">Synced: <strong><span id="sync-count">0</span></strong> · Last sync: <span id="sync-time" style="color:#64748b;">Never</span></p>
    <button id="btn-sync" onclick="syncNow()" style="margin-top:4px;">Sync now</button>
    <div id="error-sync" class="error" style="margin-top:8px;"></div>
    <div id="success-sync" class="success" style="margin-top:8px;"></div>

    <!-- PayPal config (shown when PayPal is not connected) -->
    <div id="paypal-config-section" style="display:none;margin-top:16px;padding:16px;background:#f8fafc;border-radius:10px;border:1px solid #f1f5f9;">
      <p style="font-weight:600;font-size:14px;margin-bottom:6px;">Connect PayPal</p>
      <p style="font-size:13px;color:#64748b;margin-bottom:10px;">You'll need your PayPal API credentials.</p>
      <label>PayPal Client ID</label>
      <input type="text" id="dash-paypal-id" placeholder="A..." />
      <label>PayPal Client Secret</label>
      <input type="password" id="dash-paypal-secret" placeholder="E..." />
      <button onclick="configurePaypal()">Save PayPal</button>
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
    <button onclick="resetAll()" class="red">Reset</button>
  </div>
</div>

<div class="footer">🌉 Bridge · Built by Yashoraj · <a href="${BASE_URL}">Home</a></div>
</div>

<script>
  const API = '${BASE_URL}';
  let API_KEY = localStorage.getItem('bridge_api_key') || '';

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

  // Handle OAuth redirect params
  const params = new URLSearchParams(window.location.search);
  if (params.get('oauth') === 'success' && API_KEY) {
    // OAuth success — show dashboard with Stripe connected
    document.querySelectorAll('.step-view').forEach(s => s.classList.remove('active'));
    document.getElementById('s-dashboard').classList.add('active');
    const msg = document.getElementById('dash-oauth-message');
    msg.style.display = 'block';
    msg.className = 'success';
    msg.textContent = '✅ Stripe connected! Connect PayPal below to start syncing.';
    loadDashboard();
  } else if (params.get('error') === 'oauth_denied' && API_KEY) {
    document.querySelectorAll('.step-view').forEach(s => s.classList.remove('active'));
    document.getElementById('s-configure').classList.add('active');
    document.getElementById('error-configure').textContent = 'Stripe authorization was cancelled. Try again or use manual entry.';
  } else if (params.get('error') === 'oauth_failed' && API_KEY) {
    document.querySelectorAll('.step-view').forEach(s => s.classList.remove('active'));
    document.getElementById('s-configure').classList.add('active');
    document.getElementById('error-configure').textContent = 'Stripe connection failed: ' + (params.get('detail') || 'Unknown error');
  } else if (API_KEY) {
    // Already registered — go to dashboard
    document.querySelectorAll('.step-view').forEach(s => s.classList.remove('active'));
    document.getElementById('s-dashboard').classList.add('active');
    loadDashboard();
  }

  async function register() {
    document.getElementById('btn-register').disabled = true;
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
      document.getElementById('btn-register').disabled = false;
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
      document.getElementById('success-configure').textContent = '✅ Connected!';
      setTimeout(() => {
        document.querySelectorAll('.step-view').forEach(s => s.classList.remove('active'));
        document.getElementById('s-dashboard').classList.add('active');
        document.getElementById('s-dashboard').scrollIntoView({ behavior: 'smooth' });
        loadDashboard();
      }, 800);
    } catch (e) {
      document.getElementById('error-configure').textContent = e.message;
    } finally {
      document.getElementById('btn-configure').disabled = false;
    }
  }

  // ── Stripe OAuth ──────────────────────────────────────────
  function connectStripe() {
    window.location.href = API + '/api/stripe/oauth/start';
  }

  function toggleManualStripe() {
    const section = document.getElementById('manual-stripe-section');
    const text = document.getElementById('toggle-manual-text');
    const hidden = section.style.display === 'none' || !section.style.display;
    section.style.display = hidden ? 'block' : 'none';
    text.textContent = hidden ? '▲ Hide manual entry' : '▼ Advanced: Paste secret key';
  }

  // ── PayPal inline config (on dashboard) ──────────────────
  async function configurePaypal() {
    const id = document.getElementById('dash-paypal-id').value;
    const secret = document.getElementById('dash-paypal-secret').value;
    if (!id || !secret) { document.getElementById('error-paypal').textContent = 'Fill in both PayPal fields'; return; }
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
      loadDashboard();
    } catch (e) {
      document.getElementById('error-paypal').textContent = e.message;
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
      }
      // Show PayPal config card only when Stripe is connected but PayPal is not
      const paypalSection = document.getElementById('paypal-config-section');
      if (d.stripe?.connected && !d.paypal?.connected) {
        paypalSection.style.display = 'block';
      } else {
        paypalSection.style.display = 'none';
      }
    } catch (e) { console.error(e); }

    try {
      const r = await fetch(API + '/api/subscription', { headers: { 'Authorization': 'Bearer ' + API_KEY } });
      const sub = await r.json();
      if (sub.needsAuth) return;
      const se = document.getElementById('sub-status'), sd = document.getElementById('sub-detail'), sb = document.getElementById('btn-subscribe'), sm = document.getElementById('btn-manage');
      if (sub.active) {
        se.textContent = '✅ Active'; se.className = 'badge badge-ok';
        if (sub.stripeSubscriptionId) { sd.textContent = 'Subscribed'; sb.style.display = 'none'; sm.style.display = 'inline-block'; }
        else { sd.textContent = 'Trial ends ' + new Date(sub.trialEnd).toLocaleDateString(); sb.style.display = 'inline-block'; sm.style.display = 'none'; }
      } else {
        se.textContent = '⚠️ Expired'; se.className = 'badge badge-no';
        sd.textContent = 'Trial ended'; sb.style.display = 'inline-block'; sm.style.display = 'none';
      }
    } catch (e) { console.error(e); }
  }

  async function subscribe() {
    document.getElementById('error-billing').textContent = '';
    document.getElementById('btn-subscribe').disabled = true;
    try {
      const r = await fetch(API + '/api/create-checkout', { method: 'POST', headers: { 'Authorization': 'Bearer ' + API_KEY } });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      window.location.href = d.url;
    } catch (e) { document.getElementById('error-billing').textContent = e.message; document.getElementById('btn-subscribe').disabled = false; }
  }

  async function manageBilling() {
    document.getElementById('error-billing').textContent = '';
    try {
      const r = await fetch(API + '/api/create-checkout', { method: 'POST', headers: { 'Authorization': 'Bearer ' + API_KEY } });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      window.location.href = d.url;
    } catch (e) { document.getElementById('error-billing').textContent = e.message; }
  }

  async function syncNow() {
    document.getElementById('btn-sync').disabled = true;
    document.getElementById('error-sync').textContent = '';
    document.getElementById('success-sync').textContent = '';
    try {
      const r = await fetch(API + '/api/sync', { method: 'POST', headers: { 'Authorization': 'Bearer ' + API_KEY } });
      const d = await r.json();
      if (r.status === 402) { document.getElementById('error-sync').textContent = '⚠️ ' + (d.detail || 'Subscription required'); loadDashboard(); return; }
      if (!r.ok) throw new Error(d.error);
      document.getElementById('success-sync').textContent = '✅ Synced! ' + d.pushed + ' pushed, ' + d.skipped + ' skipped';
      loadDashboard();
    } catch (e) { document.getElementById('error-sync').textContent = e.message; }
    finally { document.getElementById('btn-sync').disabled = false; }
  }

  function resetAll() { localStorage.removeItem('bridge_api_key'); location.reload(); }
</script>
</body>
</html>`);
  });
}
