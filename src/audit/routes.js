/**
 * Stripe Auditor — Express Routes
 * 
 * Adds audit-specific routes to the existing Bridge server.
 * Reuses the Stripe OAuth infrastructure from server.js.
 * 
 * @param {Object} app - Express app instance
 * @param {Object} deps - Dependencies from server.js
 * @param {Function} deps.createOAuthState - Store OAuth state
 * @param {Function} deps.consumeOAuthState - Verify & consume OAuth state
 * @param {Function} deps.updateMerchantStripeOAuth - Store Stripe token
 * @param {Function} deps.getMerchantByApiKey - Find merchant by API key
 * @param {Function} deps.getMerchant - Find merchant by ID
 * @param {Function} deps.createMerchant - Create new merchant
 */

import { config } from '../config.js';
import Stripe from 'stripe';
import { runAudit, getHealthScore } from './index.js';
import { generateReportHtml } from './report.js';

export function setupAuditRoutes(app, deps) {
  const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

  // ── Landing Page ─────────────────────────────────────────────
  // GET /audit — Simple landing with "Connect Stripe" CTA
  app.get('/audit', (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Stripe Billing Auditor — Free Revenue Leak Scan</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8fafc; color: #0f172a; }
    .container { max-width: 640px; margin: 0 auto; padding: 48px 24px; text-align: center; }
    h1 { font-size: 36px; font-weight: 800; line-height: 1.2; }
    h1 span { color: #6366f1; }
    .subtitle { font-size: 18px; color: #64748b; margin-top: 16px; line-height: 1.5; }
    .benefits { text-align: left; margin: 32px 0; display: inline-block; }
    .benefits li { list-style: none; padding: 8px 0; font-size: 15px; color: #334155; }
    .benefits li::before { content: "✓ "; color: #22c55e; font-weight: 700; }
    .btn { display: inline-block; padding: 16px 48px; background: #6366f1; color: white; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 18px; margin-top: 16px; }
    .btn:hover { background: #4f46e5; }
    .trust { color: #94a3b8; font-size: 13px; margin-top: 16px; }
    .footer { margin-top: 48px; color: #94a3b8; font-size: 13px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Your Stripe is <span>leaking revenue</span> and you don't know it.</h1>
    <p class="subtitle">Free scan finds failed payments, stuck subscriptions, misconfigured retries, and uncollected invoices — with exact dollar amounts.</p>
    <ul class="benefits">
      <li>Read-only scan — I never see your keys</li>
      <li>Finds 3-10% revenue leakage on average</li>
      <li>2 minute setup. Free. No strings.</li>
    </ul>
    <a href="/audit/connect" class="btn">Connect Stripe — Free Scan</a>
    <p class="trust">🔒 Read-only OAuth · Your keys stay with Stripe · No data stored</p>
    <div class="footer">Stripe Auditor by Yashoraj</div>
  </div>
</body>
</html>`);
  });

  // ── Start OAuth ───────────────────────────────────────────────
  // GET /audit/connect — Redirects to Stripe for authorization
  app.get('/audit/connect', async (req, res) => {
    try {
      const clientId = config.stripe.clientId;
      if (!clientId) {
        return res.status(500).send('Stripe OAuth not configured. Contact the developer.');
      }

      // Import crypto inline
      const crypto = await import('crypto');
      
      // Create a temporary merchant or use an existing one
      // For anonymous users, we create a merchant record first
      const merchant = await deps.createMerchant('Stripe Auditor User');
      
      // Prefix state with "audit_" so the existing OAuth callback
      // knows to redirect to the audit dashboard instead of /app
      const state = 'audit_' + crypto.randomBytes(32).toString('hex');
      await deps.createOAuthState(state, merchant.id);

      // Use the existing OAuth callback URI that's already registered
      // in the Stripe dashboard to avoid needing dashboard access
      const redirectUri = `${process.env.BASE_URL || 'https://bridge.onrender.com'}/api/stripe/oauth/callback`;
      const authUrl =
        `https://connect.stripe.com/oauth/authorize` +
        `?response_type=code` +
        `&client_id=${clientId}` +
        `&scope=read_only` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&state=${state}`;

      res.redirect(authUrl);
    } catch (err) {
      console.error('❌ Audit OAuth start error:', err.message);
      res.status(500).send('Failed to start OAuth: ' + err.message);
    }
  });

  // ── Dashboard ─────────────────────────────────────────────────
  // GET /audit/dashboard?merchant=xxx — Shows audit results
  app.get('/audit/dashboard', async (req, res) => {
    try {
      const merchantId = req.query.merchant;
      if (!merchantId) {
        return res.redirect('/audit');
      }

      const merchant = await deps.getMerchant(merchantId);
      if (!merchant) {
        return res.status(404).send('Merchant not found');
      }

      if (!merchant.stripe_key) {
        return res.redirect('/audit?error=no_stripe');
      }

      // Run the audit
      const stripeClient = new Stripe(merchant.stripe_key);
      const auditResult = await runAudit(stripeClient, { merchantId });

      // Get business name
      let businessName = merchant.display_name || 'Your Account';
      try {
        const account = await stripeClient.accounts.retrieve();
        businessName = account.business_profile?.name || account.settings?.dashboard?.display_name || businessName;
      } catch (_) { /* fallback to merchant name */ }

      // Generate and display the report
      const html = generateReportHtml(auditResult, { businessName });
      res.send(html);
    } catch (err) {
      console.error('❌ Audit dashboard error:', err.message);
      res.status(500).send('Audit failed: ' + err.message);
    }
  });

  // ── API: Run Audit ────────────────────────────────────────────
  // POST /api/audit/run — Programmatic audit trigger
  app.post('/api/audit/run', async (req, res) => {
    try {
      const merchant = req.merchant;
      if (!merchant || !merchant.stripe_key) {
        return res.status(401).json({ error: 'Stripe not connected. Go to /audit/connect first.' });
      }

      const stripeClient = new Stripe(merchant.stripe_key);
      const auditResult = await runAudit(stripeClient, { merchantId: merchant.id });

      res.json(auditResult);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // ── Health endpoint ───────────────────────────────────────────
  // GET /api/audit/health — Quick health check
  app.get('/api/audit/health', async (req, res) => {
    try {
      if (!req.merchant || !req.merchant.stripe_key) {
        return res.json({ connected: false, healthScore: null });
      }

      const stripeClient = new Stripe(req.merchant.stripe_key);
      const account = await stripeClient.accounts.retrieve();
      const auditResult = await runAudit(stripeClient, { merchantId: req.merchant.id });
      const score = getHealthScore(auditResult);

      res.json({
        connected: true,
        accountId: account.id,
        businessName: account.business_profile?.name || null,
        healthScore: score,
        issuesFound: auditResult.summary.issuesFound,
        revenueAtRisk: auditResult.summary.totalAtRiskFormatted,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  console.log('✅ Stripe Auditor routes registered');
}
