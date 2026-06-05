/**
 * Web UI — Simple HTML pages served from the Express backend.
 * Users can access Bridge setup directly via browser without the Stripe App.
 */

export function setupWebUI(app, BASE_URL) {
  // Serve the setup wizard page
  app.get('/app', (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bridge — PayPal sync for Stripe Revenue Recognition</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f6f9fc; color: #1a1f36; line-height: 1.5; }
    .container { max-width: 520px; margin: 60px auto; padding: 0 20px; }
    .wide { max-width: 640px; }
    .card { background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04); padding: 40px; margin-bottom: 20px; border: 1px solid #e6eef8; }
    .hero { background: linear-gradient(135deg, #1a1f36 0%, #2d2a5a 100%); color: white; text-align: center; border: none; }
    .hero h1 { font-size: 32px; font-weight: 700; margin-bottom: 8px; color: white; }
    .hero h2 { font-size: 18px; font-weight: 400; color: #b8b8ff; margin-bottom: 20px; }
    .hero p { color: #c8c8e8; font-size: 15px; margin-bottom: 8px; }
    .hero .highlight { color: #7ee8a0; font-weight: 600; }
    .hero .pricing-tag { display: inline-block; background: rgba(255,255,255,0.1); border-radius: 20px; padding: 8px 20px; font-size: 14px; color: #e0e0ff; margin-top: 16px; }
    h1 { font-size: 26px; font-weight: 700; margin-bottom: 8px; color: #1a1f36; }
    h2 { font-size: 18px; font-weight: 600; margin-bottom: 12px; color: #1a1f36; }
    h3 { font-size: 15px; font-weight: 600; margin-bottom: 8px; color: #1a1f36; }
    p { color: #425466; margin-bottom: 12px; font-size: 15px; line-height: 1.6; }
    .steps { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin: 20px 0; }
    .step-number { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 20px; padding: 6px 16px; font-size: 13px; color: #d0d0ff; }
    .btn-cta { display: inline-block; background: #635bff; color: white; border: none; padding: 14px 32px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; text-decoration: none; margin-top: 16px; transition: background 0.15s; }
    .btn-cta:hover { background: #4e46e5; }
    .btn-cta-secondary { display: inline-block; background: transparent; color: #635bff; border: 1px solid #635bff; padding: 14px 32px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; text-decoration: none; margin-top: 16px; margin-left: 8px; }
    .btn-cta-secondary:hover { background: #f0eeff; }
    .feature-list { list-style: none; padding: 0; }
    .feature-list li { padding: 10px 0; border-bottom: 1px solid #f0f4f8; font-size: 15px; color: #1a1f36; display: flex; align-items: center; gap: 10px; }
    .feature-list li:last-child { border-bottom: none; }
    .feature-icon { flex-shrink: 0; width: 24px; text-align: center; }
    .plan-card { background: #f8faff; border: 2px solid #635bff; border-radius: 12px; padding: 32px; text-align: center; }
    .plan-card .price { font-size: 36px; font-weight: 700; color: #1a1f36; }
    .plan-card .price span { font-size: 16px; font-weight: 400; color: #425466; }
    .plan-card .perks { margin: 16px 0; color: #425466; font-size: 14px; }
    .section-divider { text-align: center; margin: 32px 0 20px; position: relative; }
    .section-divider:before { content: ''; position: absolute; top: 50%; left: 0; right: 0; border-top: 1px solid #e6eef8; }
    .section-divider span { background: #f6f9fc; padding: 0 16px; position: relative; font-size: 13px; color: #8898aa; text-transform: uppercase; letter-spacing: 0.5px; }
    .card-divider { margin: 24px 0; border: none; border-top: 1px solid #e6eef8; }
    label { display: block; font-size: 13px; font-weight: 500; margin-bottom: 4px; color: #1a1f36; }
    input { width: 100%; padding: 10px 12px; border: 1px solid #d9e2ef; border-radius: 6px; font-size: 14px; margin-bottom: 12px; }
    input:focus { outline: none; border-color: #635bff; box-shadow: 0 0 0 2px rgba(99,91,255,0.2); }
    button { background: #635bff; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; }
    button:hover { background: #4e46e5; }
    button:disabled { background: #b8b8b8; cursor: not-allowed; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 500; }
    .badge-ok { background: #d1fae5; color: #065f46; }
    .badge-no { background: #fee2e2; color: #991b1b; }
    .error { color: #dc2626; font-size: 13px; margin-bottom: 8px; }
    .success { color: #059669; font-size: 13px; margin-bottom: 8px; }
    .step { display: none; }
    .step.active { display: block; }
    .footer { text-align: center; font-size: 12px; color: #8898aa; margin-top: 24px; }
    pre { background: #f1f5f9; padding: 8px; border-radius: 4px; font-size: 12px; overflow-x: auto; }
    .text-center { text-align: center; }
    .mb-0 { margin-bottom: 0; }
    @media (max-width: 480px) {
      .container { margin: 20px auto; }
      .card { padding: 24px; }
      .hero h1 { font-size: 24px; }
      .btn-cta, .btn-cta-secondary { display: block; margin-left: 0; }
    }
  </style>
</head>
<body>
  <div class="container wide">
    <!-- ── HERO ────────────────────────────────────────────── -->
    <div class="card hero">
      <h1>🌉 Bridge</h1>
      <h2>PayPal transactions now appear in Stripe Revenue Recognition.</h2>
      <p>If you accept payments through both Stripe and PayPal, your Stripe dashboard only shows <em>Stripe</em> revenue. PayPal payments are invisible there.</p>
      <p>Bridge automatically syncs every PayPal transaction into Stripe as a <span class="highlight">Payment Record</span>. One dashboard. Complete revenue picture.</p>
      <div class="steps">
        <span class="step-number">1. Connect Stripe</span>
        <span class="step-number">2. Connect PayPal</span>
        <span class="step-number">3. Sync runs daily</span>
      </div>
      <div class="pricing-tag">7-day free trial · $49/month · Cancel anytime</div>
      <div>
        <a href="#setup" class="btn-cta" onclick="document.getElementById('step-register').scrollIntoView({behavior:'smooth'})">Get Started Free</a>
      </div>
    </div>

    <!-- ── PROBLEM / SOLUTION ──────────────────────────────── -->
    <div class="card">
      <h2>Your Stripe dashboard is incomplete</h2>
      <p>Stripe Revenue Recognition automatically tracks revenue from Stripe-native payments. But if you also use PayPal, Square, or other processors, those transactions never show up in Stripe.</p>
      <p>The result: manual CSV exports, spreadsheet reconciliation, and a fragmented view of your revenue.</p>
      <ul class="feature-list">
        <li><span class="feature-icon">❌</span> PayPal revenue missing from your Stripe dashboard</li>
        <li><span class="feature-icon">❌</span> Manual CSV downloads and spreadsheet matching</li>
        <li><span class="feature-icon">❌</span> Fragmented revenue reporting across processors</li>
        <li><span class="feature-icon">✅</span> <strong>Bridge fixes this.</strong> One sync. Complete picture.</li>
      </ul>
    </div>

    <!-- ── HOW IT WORKS ────────────────────────────────────── -->
    <div class="card">
      <h2>How it works</h2>
      <p><strong>1. Connect your Stripe account</strong><br/>Bridge uses Stripe's Payment Records API to create entries for off-Stripe transactions.</p>
      <p><strong>2. Connect your PayPal account</strong><br/>Bridge reads your PayPal transaction history via PayPal's REST API.</p>
      <p><strong>3. Sync runs automatically</strong><br/>Every 24 hours, Bridge fetches new PayPal transactions and pushes them into Stripe. They appear in Revenue Recognition alongside your Stripe-native payments.</p>
    </div>

    <!-- ── PRICING ─────────────────────────────────────────── -->
    <div class="card" id="pricing">
      <h2>Simple pricing</h2>
      <div class="plan-card">
        <div class="price">$49 <span>/ month</span></div>
        <div class="perks">
          Unlimited transaction syncing<br/>
          All processors (PayPal + more)<br/>
          Automatic daily syncs<br/>
          Cancel anytime — no lock-in
        </div>
        <a href="#setup" class="btn-cta" onclick="document.getElementById('step-register').scrollIntoView({behavior:'smooth'})">Start 7-Day Free Trial</a>
        <p style="font-size:13px;color:#8898aa;margin-top:12px;margin-bottom:0">No credit card required to start.</p>
      </div>
    </div>

    <!-- ── SETUP WIZARD ────────────────────────────────────── -->
    <div class="section-divider"><span>Get Started</span></div>

    <!-- Step 1: Register -->
    <div class="card step active" id="step-register">
      <h2>Create your account</h2>
      <p>Register to start your free trial. No credit card required.</p>
      <label>Business name (optional)</label>
      <input type="text" id="display-name" placeholder="My Business" />
      <button id="btn-register" onclick="register()">Start Free Trial</button>
      <div id="error-register" class="error"></div>
    </div>

    <!-- Step 2: API Key shown -->
    <div class="card step" id="step-apikey">
      <h2>Your API Key</h2>
      <p>Save this key — you'll need it to connect your accounts.</p>
      <pre id="api-key-display"></pre>
      <button onclick="showConfigure()" style="margin-top:8px">Connect Accounts</button>
    </div>

    <!-- Step 3: Configure -->
    <div class="card step" id="step-configure">
      <h2>Connect your accounts</h2>
      <p>Enter your Stripe and PayPal credentials below. <a href="https://docs.stripe.com/keys" target="_blank" rel="noopener">Where do I find these?</a></p>
      <label>Stripe Secret Key</label>
      <input type="password" id="stripe-key" placeholder="sk_live_..." />
      <label>PayPal Client ID</label>
      <input type="text" id="paypal-client-id" placeholder="A..." />
      <label>PayPal Client Secret</label>
      <input type="password" id="paypal-client-secret" placeholder="E..." />
      <button id="btn-configure" onclick="configure()">Save & Connect</button>
      <div id="error-configure" class="error"></div>
      <div id="success-configure" class="success"></div>
    </div>

    <!-- Step 4: Dashboard -->
    <div class="card step" id="step-dashboard">
      <h2>Dashboard</h2>
      <div id="status-display">
        <p>Stripe: <span id="stripe-status" class="badge badge-no">Not connected</span></p>
        <p>PayPal: <span id="paypal-status" class="badge badge-no">Not connected</span></p>
      </div>
      <div id="sync-display" style="margin-top:16px">
        <p>Synced: <span id="sync-count">0</span> transactions</p>
        <p>Last sync: <span id="sync-time">Never</span></p>
      </div>
      <button id="btn-sync" onclick="syncNow()" style="margin-top:12px">Sync Now</button>
      <div id="error-sync" class="error" style="margin-top:8px"></div>
      <div id="success-sync" class="success" style="margin-top:8px"></div>
      <hr class="card-divider" />
      <div id="billing-display" style="margin-bottom:16px">
        <h3>Plan</h3>
        <p>Status: <span id="sub-status" class="badge badge-ok">Active</span></p>
        <p id="sub-detail" style="font-size:14px">7-day free trial</p>
        <button id="btn-subscribe" onclick="subscribe()" style="margin-top:8px;background:#059669">Subscribe — $49/mo</button>
        <button id="btn-manage-billing" onclick="manageBilling()" style="margin-top:8px;display:none">Manage Billing</button>
        <div id="error-billing" class="error" style="margin-top:4px"></div>
      </div>
      <hr class="card-divider" />
      <button onclick="resetAll()" style="background:#dc2626">Reset & Start Over</button>
    </div>

    <div class="footer">
      Bridge by Yashoraj · <a href="${BASE_URL}">Home</a>
    </div>
  </div>

  <script>
    const API = '${BASE_URL}';
    let API_KEY = localStorage.getItem('bridge_api_key') || '';

    // Check if already registered
    if (API_KEY) {
      document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
      document.getElementById('step-dashboard').classList.add('active');
      loadDashboard();
    }

    // Handle scrolling to setup from CTA buttons
    if (window.location.hash === '#setup' || window.location.hash === '#pricing') {
      setTimeout(() => {
        document.getElementById('step-register').scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }

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
      } catch (e) {
        document.getElementById('error-register').textContent = e.message;
      } finally {
        document.getElementById('btn-register').disabled = false;
      }
    }

    function showConfigure() {
      document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
      document.getElementById('step-configure').classList.add('active');
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
          document.getElementById('stripe-status').textContent = '✅ Connected to ' + d.stripe.accountId;
          document.getElementById('stripe-status').className = 'badge badge-ok';
        }
        if (d.paypal?.connected) {
          document.getElementById('paypal-status').textContent = '✅ Connected';
          document.getElementById('paypal-status').className = 'badge badge-ok';
        }
        if (d.sync) {
          document.getElementById('sync-count').textContent = d.sync.totalSynced || 0;
          document.getElementById('sync-time').textContent = d.sync.lastSyncAt ? new Date(d.sync.lastSyncAt).toLocaleString() : 'Never';
        }
      } catch (e) {
        console.error('Dashboard load failed:', e);
      }

      // Load subscription status
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
          statusEl.textContent = '✅ Active (' + (sub.tier || 'monthly') + ')';
          statusEl.className = 'badge badge-ok';
          if (sub.stripeSubscriptionId) {
            detailEl.textContent = 'Subscription active. Manage from Stripe.';
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
