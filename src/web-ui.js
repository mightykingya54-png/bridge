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
  <title>Bridge — Setup</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f6f9fc; color: #1a1f36; line-height: 1.5; }
    .container { max-width: 480px; margin: 60px auto; padding: 0 20px; }
    .card { background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); padding: 32px; margin-bottom: 16px; }
    h1 { font-size: 24px; font-weight: 600; margin-bottom: 4px; }
    h2 { font-size: 18px; font-weight: 600; margin-bottom: 16px; }
    p { color: #425466; margin-bottom: 16px; }
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
  </style>
</head>
<body>
  <div class="container">
    <div class="card" style="text-align:center">
      <h1>🌉 Bridge</h1>
      <p>Sync PayPal transactions into Stripe Revenue Recognition</p>
    </div>

    <!-- Step 1: Register -->
    <div class="card step active" id="step-register">
      <h2>Create your account</h2>
      <p>Register to get your API key. You'll use it to authenticate with Bridge.</p>
      <label>Business name (optional)</label>
      <input type="text" id="display-name" placeholder="My Business" />
      <button id="btn-register" onclick="register()">Register</button>
      <div id="error-register" class="error"></div>
    </div>

    <!-- Step 2: API Key shown -->
    <div class="card step" id="step-apikey">
      <h2>API Key Created</h2>
      <p>Save this key securely. You won't see it again.</p>
      <pre id="api-key-display"></pre>
      <button onclick="showConfigure()" style="margin-top:8px">Continue to Configure</button>
    </div>

    <!-- Step 3: Configure -->
    <div class="card step" id="step-configure">
      <h2>Connect your accounts</h2>
      <p>Enter your Stripe and PayPal API credentials below.</p>
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
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #e6eef8;" />
      <div id="billing-display" style="margin-bottom:16px">
        <h2 style="font-size:16px;margin-bottom:8px">Plan</h2>
        <p>Status: <span id="sub-status" class="badge badge-ok">Active</span></p>
        <p id="sub-detail">7-day free trial</p>
        <button id="btn-subscribe" onclick="subscribe()" style="margin-top:8px;background:#059669">Subscribe — $49/mo</button>
        <button id="btn-manage-billing" onclick="manageBilling()" style="margin-top:8px;display:none">Manage Billing</button>
        <div id="error-billing" class="error" style="margin-top:4px"></div>
      </div>
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #e6eef8;" />
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
        // Redirect to Stripe Checkout
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
