/**
 * Web UI — Landing page + setup wizard.
 * Core principle: every visitor must understand what Bridge does in ≤ 3 seconds.
 */
export function setupWebUI(app, _BASE_URL) {
  app.get('/app', (req, res) => {
    // Dynamically determine base URL from request — works on any hosting domain.
    const proto = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['host'] || _BASE_URL;
    const BASE_URL = `${proto}://${host}`;
    res.set('Cache-Control', 'no-store, must-revalidate');
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bridge — Sync PayPal to Stripe Revenue Recognition</title>
  <meta name="description" content="PayPal income doesn't show in Stripe. Bridge makes it show up. Reads PayPal transactions, pushes into Stripe Revenue Recognition as Payment Records. Daily sync. $49/mo.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${BASE_URL}/">

  <!-- Open Graph -->
  <meta property="og:title" content="Bridge — Sync PayPal to Stripe Revenue Recognition">
  <meta property="og:description" content="PayPal income doesn't show in Stripe Revenue Recognition. Bridge reads PayPal transactions and pushes them in as Payment Records automatically. Daily sync. No spreadsheets.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${BASE_URL}/">
  <meta property="og:site_name" content="Bridge">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Bridge — PayPal to Stripe Revenue Recognition">
  <meta name="twitter:description" content="Bridge reads PayPal transactions and pushes them into Stripe Revenue Recognition automatically. Daily sync. No CSV. No spreadsheets.">
  <!-- OG image — uncomment and add public/og-image.png when you have one -->
  <!-- <meta name="twitter:image" content="${BASE_URL}/og-image.png"> -->
  <!-- <meta property="og:image" content="${BASE_URL}/og-image.png"> -->
  <!-- <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630"> -->

  <!-- JSON-LD Structured Data: SoftwareApplication -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Bridge",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "Syncs PayPal transactions into Stripe Revenue Recognition automatically. Daily sync, no manual CSV exports, no spreadsheets.",
    "url": "${BASE_URL}",
    "offers": {
      "@type": "Offer",
      "price": "49",
      "priceCurrency": "USD",
      "description": "Monthly subscription after 7-day free trial"
    },
    "author": {
      "@type": "Person",
      "name": "Yashoraj"
    }
  }
  </script>

  <!-- Font loading: Inter with display=swap for no FOIT -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700;14..32,800;14..32,900&display=swap" as="style">
  <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700;14..32,800;14..32,900&display=swap" rel="stylesheet">
  <!-- Checkout uses server-redirect (Stripe Checkout) — no client-side payment library needed -->
  <style>
    :root {
      --bg: #fafbfc;
      --surface: #ffffff;
      --text-primary: #09090b;
      --text-secondary: #52525b;
      --text-muted: #a1a1aa;
      --accent: #4f46e5;
      --accent-hover: #4338ca;
      --accent-gradient: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      --accent-soft: rgba(79, 70, 229, 0.08);
      --accent-glow: rgba(79, 70, 229, 0.25);
      --border: #e4e4e7;
      --border-light: #f0f0f3;
      --shadow-xs: 0 1px 2px rgba(0,0,0,0.04);
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
      --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.06), 0 2px 4px -2px rgba(0,0,0,0.04);
      --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04);
      --shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.04);
      --shadow-2xl: 0 25px 50px -12px rgba(0,0,0,0.15);
      --radius-sm: 6px;
      --radius-md: 10px;
      --radius-lg: 14px;
      --radius-xl: 18px;
      --radius-2xl: 24px;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; background: var(--bg); color: var(--text-primary); line-height: 1.6; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    .container { max-width: 720px; margin: 0 auto; padding: 0 28px; }

    /* ── Glass Nav ── */
    .nav-wrapper { position: sticky; top: 0; z-index: 50; backdrop-filter: blur(16px) saturate(1.2); -webkit-backdrop-filter: blur(16px) saturate(1.2); background: rgba(250,251,252,0.8); border-bottom: 1px solid var(--border-light); }
    .nav { display: flex; align-items: center; gap: 12px; padding: 14px 28px; max-width: 960px; margin: 0 auto; flex-wrap: wrap; }
    .nav .brand { font-weight: 800; font-size: 20px; color: var(--text-primary); margin-right: auto; letter-spacing: -0.02em; background: var(--accent-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .nav a { font-size: 14px; font-weight: 500; color: var(--text-secondary); text-decoration: none; transition: color 0.2s; }
    .nav a:hover { color: var(--text-primary); }
    .nav .btn-sm { background: var(--accent-gradient); color: #fff !important; padding: 8px 20px; border-radius: var(--radius-md); font-weight: 600; transition: all 0.2s; -webkit-text-fill-color: #fff; }
    .nav .btn-sm:hover { transform: translateY(-1px); box-shadow: 0 4px 14px var(--accent-glow); }

    /* ── Hero ── */
    .hero { padding: 80px 0 56px; text-align: center; position: relative; }
    .hero::before { content: ''; position: absolute; top: -40%; left: 50%; transform: translateX(-50%); width: 700px; height: 700px; background: radial-gradient(circle, rgba(79,70,229,0.06) 0%, rgba(124,58,237,0.03) 40%, transparent 70%); pointer-events: none; }
    .hero .badge { display: inline-flex; align-items: center; gap: 6px; background: var(--accent-soft); color: var(--accent); font-size: 12px; font-weight: 600; padding: 6px 16px; border-radius: 100px; margin-bottom: 24px; letter-spacing: 0.01em; border: 1px solid rgba(79,70,229,0.1); }
    .hero h1 { font-size: clamp(36px, 5.5vw, 56px); font-weight: 900; line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 16px; color: var(--text-primary); }
    .hero h1 .accent { background: var(--accent-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .hero .sub { font-size: clamp(17px, 2vw, 19px); color: var(--text-secondary); max-width: 520px; margin: 0 auto 32px; font-weight: 400; line-height: 1.6; }

    /* ── Mockup ── */
    .hero .mockup { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-xl); padding: 20px 24px; max-width: 520px; margin: 0 auto; text-align: left; overflow: hidden; box-shadow: var(--shadow-xl), 0 0 0 1px rgba(0,0,0,0.02); }
    .hero .mockup-header { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; padding-bottom: 14px; border-bottom: 1px solid var(--border-light); }
    .hero .mockup-header .bar { display: flex; gap: 6px; }
    .hero .mockup-header .bar span { width: 10px; height: 10px; border-radius: 50%; }
    .hero .mockup-header .bar .r { background: #ef4444; }
    .hero .mockup-header .bar .y { background: #eab308; }
    .hero .mockup-header .bar .g { background: #22c55e; }
    .hero .mockup-header .label { font-size: 13px; font-weight: 600; color: var(--text-secondary); letter-spacing: -0.01em; display: flex; align-items: center; gap: 6px; }
    .hero .mockup-header .label span { color: var(--accent); font-weight: 700; }
    .hero .mockup-header .label .chev { color: var(--text-muted); font-weight: 400; }
    .hero .mockup-cols { display: flex; padding: 0 0 8px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); border-bottom: 1px solid var(--border-light); margin-bottom: 4px; }
    .hero .mockup-cols .col-date { width: 72px; }
    .hero .mockup-cols .col-desc { flex: 1; }
    .hero .mockup-cols .col-src { width: 60px; text-align: right; }
    .hero .mockup-cols .col-amt { width: 76px; text-align: right; }
    .hero .mockup-cols .col-tag { width: 56px; text-align: right; }
    .hero .mockup .row { display: flex; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--border-light); font-size: 13px; }
    .hero .mockup .row .date { width: 72px; color: var(--text-muted); font-size: 12px; }
    .hero .mockup .row .desc { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--text-primary); }
    .hero .mockup .row .src { width: 60px; text-align: right; font-size: 11px; font-weight: 600; }
    .hero .mockup .row .src.s { color: var(--accent); }
    .hero .mockup .row .src.p { color: #2563eb; }
    .hero .mockup .row .amount { width: 76px; text-align: right; font-weight: 600; color: var(--text-primary); }
    .hero .mockup .row .tag { width: 56px; text-align: right; font-size: 10px; font-weight: 700; padding: 2px 0; }
    .hero .mockup .row .tag.new { color: #059669; }
    .hero .mockup .row-bridge { background: rgba(5, 150, 105, 0.04); margin: 0 -24px; padding: 10px 24px; position: relative; }
    .hero .mockup .row-bridge::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: #059669; }
    .hero .mockup .row-bridge .desc span { font-weight: 600; color: #059669; }
    .hero .mockup-total { display: flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); margin: 10px -24px -20px; padding: 16px 24px; border-top: 1px solid var(--border); border-radius: 0 0 var(--radius-xl) var(--radius-xl); }
    .hero .mockup-total .label { color: var(--text-secondary); font-weight: 500; margin-right: auto; font-size: 12px; }
    .hero .mockup-total .amount { font-weight: 800; font-size: 17px; color: var(--text-primary); }
    .hero .mockup-total .note { font-size: 10px; font-weight: 700; color: #059669; background: rgba(5, 150, 105, 0.1); padding: 3px 10px; border-radius: 100px; border: 1px solid rgba(5, 150, 105, 0.15); }

    /* ── Buttons ── */
    .cta-row { margin-top: 32px; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
    .btn { display: inline-flex; align-items: center; gap: 6px; padding: 14px 32px; border-radius: var(--radius-md); font-size: 15px; font-weight: 600; text-decoration: none; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); font-family: inherit; line-height: 1.2; border: none; cursor: pointer; }
    .btn-primary { background: var(--accent-gradient); color: #fff; box-shadow: 0 1px 3px rgba(79,70,229,0.2); }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px var(--accent-glow); }
    .btn-outline { background: transparent; color: var(--text-primary); border: 1.5px solid var(--border); }
    .btn-outline:hover { background: var(--surface); border-color: var(--accent); color: var(--accent); transform: translateY(-1px); box-shadow: var(--shadow-md); }
    .cta-note { font-size: 13px; color: var(--text-muted); margin-top: 12px; }

    /* ── Sections ── */
    section { padding: 72px 0; }
    section h2 { font-size: clamp(24px, 3vw, 30px); font-weight: 800; letter-spacing: -0.02em; margin-bottom: 8px; color: var(--text-primary); text-align: center; }
    section h2 .sub { font-weight: 400; color: var(--text-secondary); font-size: 16px; display: block; margin-top: 8px; max-width: 460px; margin-left: auto; margin-right: auto; line-height: 1.5; }

    /* ── Steps ── */
    .steps { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; margin-top: 12px; }
    .step { background: var(--surface); border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: 28px 24px; flex: 1; min-width: 180px; text-align: center; transition: all 0.25s; box-shadow: var(--shadow-xs); }
    .step:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); border-color: var(--border); }
    .step .num { width: 36px; height: 36px; border-radius: var(--radius-md); background: var(--accent-gradient); color: #fff; font-weight: 700; font-size: 14px; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; box-shadow: 0 4px 10px var(--accent-glow); }
    .step h3 { font-size: 15px; font-weight: 700; margin-bottom: 6px; color: var(--text-primary); }
    .step p { font-size: 13px; color: var(--text-secondary); max-width: 100%; line-height: 1.5; }

    /* ── Feature grid ── */
    .grid { display: flex; flex-wrap: wrap; gap: 14px; max-width: 520px; margin: 0 auto; }
    .grid-item { background: var(--surface); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 16px 20px; flex: 1; min-width: 220px; display: flex; align-items: center; gap: 12px; font-size: 14px; color: var(--text-primary); box-shadow: var(--shadow-xs); transition: all 0.2s; }
    .grid-item:hover { border-color: var(--border); box-shadow: var(--shadow-sm); }

    /* ── Pain / comparison ── */
    .compare { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; }
    .compare-card { flex: 1; min-width: 230px; border-radius: var(--radius-lg); padding: 32px 28px; transition: all 0.25s; }
    .compare-card:hover { transform: translateY(-2px); }
    .compare-card.before { background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border: 1px solid #fecaca; }
    .compare-card.after { background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 1px solid #bbf7d0; }
    .compare-card h3 { font-size: 15px; font-weight: 700; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
    .compare-card ul { list-style: none; }
    .compare-card li { font-size: 14px; padding: 7px 0; color: var(--text-secondary); display: flex; gap: 8px; align-items: flex-start; line-height: 1.4; }

    /* ── Pricing ── */
    .pricing { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-xl); padding: 40px 36px; max-width: 380px; margin: 0 auto; text-align: center; box-shadow: var(--shadow-xl); position: relative; }
    .pricing::before { content: ''; position: absolute; inset: 0; border-radius: var(--radius-xl); padding: 1.5px; background: var(--accent-gradient); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none; }
    .pricing .price { font-size: 46px; font-weight: 900; color: var(--text-primary); letter-spacing: -0.03em; }
    .pricing .price span { font-size: 16px; font-weight: 500; color: var(--text-muted); }
    .pricing ul { list-style: none; margin: 20px 0; }
    .pricing li { padding: 6px 0; font-size: 14px; color: var(--text-secondary); display: flex; align-items: center; gap: 8px; justify-content: center; }
    .pricing li::before { content: '✓'; color: #10b981; font-weight: 800; font-size: 14px; }
    .pricing .btn { margin-top: 4px; width: 100%; justify-content: center; }
    .pricing .guarantee { font-size: 13px; color: var(--text-muted); margin-top: 16px; }

    /* ── FAQ ── */
    .faq { max-width: 520px; margin: 0 auto; }
    .faq-item { border-bottom: 1px solid var(--border-light); padding: 16px 0; }
    .faq-q { font-size: 14px; font-weight: 600; color: var(--text-primary); cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: color 0.2s; padding: 4px 0; }
    .faq-q:hover { color: var(--accent); }
    .faq-q .icon { font-size: 16px; color: var(--text-muted); transition: transform 0.2s; }
    .faq-q.open .icon { transform: rotate(45deg); }
    .faq-a { font-size: 14px; color: var(--text-secondary); padding-top: 8px; display: none; line-height: 1.6; }
    .faq-a.open { display: block; }

    /* ── Wizard ── */
    .wiz { margin-top: 64px; padding: 56px 0 80px; }
    .wiz .divider { text-align: center; margin-bottom: 32px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); }
    .card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 32px; margin-bottom: 16px; box-shadow: var(--shadow-sm); }
    .card h2 { font-size: 18px; font-weight: 700; margin-bottom: 6px; text-align: left; }
    .card p { font-size: 14px; color: var(--text-secondary); margin-bottom: 16px; }
    .card label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px; color: var(--text-primary); }
    .card input { width: 100%; padding: 10px 14px; border: 1.5px solid var(--border); border-radius: var(--radius-sm); font-size: 14px; margin-bottom: 14px; font-family: inherit; transition: all 0.2s; background: var(--bg); }
    .card input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); background: var(--surface); }
    .card button { background: var(--accent-gradient); color: #fff; border: none; padding: 10px 24px; border-radius: var(--radius-sm); font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; transition: all 0.2s; }
    .card button:hover { transform: translateY(-1px); box-shadow: 0 4px 14px var(--accent-glow); }
    .card button:disabled { background: var(--text-muted); cursor: not-allowed; transform: none; box-shadow: none; }
    .card .green { background: linear-gradient(135deg, #059669 0%, #10b981 100%); }
    .card .green:hover { box-shadow: 0 4px 14px rgba(5, 150, 105, 0.3); }
    .card .red { background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); }
    .card .red:hover { box-shadow: 0 4px 14px rgba(220, 38, 38, 0.3); }
    .card details summary { outline: none; cursor: pointer; font-weight: 600; color: var(--text-secondary); }
    .card details summary::-webkit-details-marker { color: var(--text-muted); }
    .card pre { background: var(--bg); padding: 12px 16px; border-radius: var(--radius-sm); font-size: 12px; border: 1px solid var(--border-light); overflow-x: auto; word-break: break-all; font-family: 'SF Mono', 'Fira Code', monospace; }
    .step-view { display: none; }
    .step-view.active { display: block; }
    .badge { display: inline-block; padding: 3px 12px; border-radius: 100px; font-size: 12px; font-weight: 600; }
    .badge-ok { background: rgba(5, 150, 105, 0.1); color: #059669; }
    .badge-no { background: rgba(220, 38, 38, 0.1); color: #dc2626; }
    .error { color: #dc2626; font-size: 13px; }
    .success { color: #059669; font-size: 13px; }
    .footer { text-align: center; padding: 40px 0; font-size: 13px; color: var(--text-muted); }
    .footer a { color: var(--accent); text-decoration: none; }
    hr { border: none; border-top: 1px solid var(--border-light); margin: 24px 0; }

    /* ── Social proof ── */
    .trust-bar { text-align: center; padding: 20px 0 8px; display: none; }

    /* ── Security / trust ── */
    .trust-grid { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; max-width: 540px; margin: 0 auto; }
    .trust-item { flex: 1; min-width: 160px; background: var(--surface); border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: 22px 18px; text-align: center; box-shadow: var(--shadow-xs); transition: all 0.25s; }
    .trust-item:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); border-color: var(--border); }
    .trust-item .t-icon { font-size: 22px; margin-bottom: 8px; display: block; }
    .trust-item .t-label { font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px; }
    .trust-item .t-desc { font-size: 12px; color: var(--text-secondary); line-height: 1.4; }

    /* ── Dashboard: revenue card ── */
    .revenue-card { background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border: 1px solid rgba(5,150,105,0.15); border-radius: var(--radius-lg); padding: 24px; text-align: center; box-shadow: var(--shadow-sm); }
    .revenue-card .rev-label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #059669; margin-bottom: 4px; }
    .revenue-card .rev-amount { font-size: 36px; font-weight: 900; color: var(--text-primary); letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 8px; }
    .revenue-card .rev-meta { display: flex; align-items: center; justify-content: center; gap: 12px; font-size: 13px; color: var(--text-secondary); }
    .revenue-card .btn-sm { background: var(--accent-gradient); color: #fff; border: none; padding: 6px 16px; border-radius: var(--radius-sm); font-size: 12px; font-weight: 600; cursor: pointer; font-family: inherit; transition: all 0.2s; }
    .revenue-card .btn-sm:hover { transform: translateY(-1px); box-shadow: 0 4px 12px var(--accent-glow); }

    /* ── Dashboard: sync history ── */
    .sync-table { border: 1px solid var(--border-light); border-radius: var(--radius-md); overflow: hidden; }
    .sync-table-header { display: flex; background: var(--bg); padding: 10px 16px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); border-bottom: 1px solid var(--border-light); }
    .sync-table-header .col-time { width: 80px; }
    .sync-table-header .col-txns { width: 80px; text-align: center; }
    .sync-table-header .col-revenue { flex: 1; text-align: right; }
    .sync-table-header .col-status { width: 80px; text-align: right; }
    .sync-table-row { display: flex; align-items: center; padding: 10px 16px; border-bottom: 1px solid var(--border-light); font-size: 13px; transition: background 0.15s; }
    .sync-table-row:last-child { border-bottom: none; }
    .sync-table-row:hover { background: var(--bg); }
    .sync-table-row .col-time { width: 80px; color: var(--text-secondary); font-size: 12px; }
    .sync-table-row .col-txns { width: 80px; text-align: center; color: var(--text-primary); }
    .sync-table-row .col-txns span { font-weight: 600; }
    .sync-table-row .col-revenue { flex: 1; text-align: right; font-weight: 600; color: var(--text-primary); }
    .sync-table-row .col-status { width: 80px; text-align: right; }
    .sync-table-row .status-dot { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 500; }
    .sync-table-row .status-dot .dot { width: 7px; height: 7px; border-radius: 50%; display: inline-block; }
    .sync-table-row .status-dot .dot.ok { background: #10b981; }
    .sync-table-row .status-dot .dot.warn { background: #f59e0b; }
    .sync-table-row .status-dot .dot.fail { background: #ef4444; }

    /* ── Status pills ── */
    .status-pill { display: inline-flex; align-items: center; gap: 5px; padding: 4px 12px; border-radius: 100px; font-size: 12px; font-weight: 600; }
    .status-pill.ok { background: rgba(5,150,105,0.08); color: #059669; border: 1px solid rgba(5,150,105,0.12); }
    .status-pill.no { background: rgba(220,38,38,0.06); color: #dc2626; border: 1px solid rgba(220,38,38,0.1); }
    .status-pill .pill-dot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; }
    .status-pill.ok .pill-dot { background: #10b981; }
    .status-pill.no .pill-dot { background: #dc2626; }

    /* ── Text utilities ── */
    .text-center { text-align: center; }
    .mt-0 { margin-top: 0; }
    .mb-0 { margin-bottom: 0; }

    /* ── Responsive ── */
    @media (max-width: 640px) {
      .container { padding: 0 20px; }
      .hero { padding: 56px 0 36px; }
      section { padding: 48px 0; }
      .step { min-width: 100%; }
      .grid-item { min-width: 100%; }
      .compare-card { min-width: 100%; }
      .wiz { padding: 36px 0 48px; }
      .mockup { max-width: 100%; }
      .nav { padding: 12px 20px; gap: 8px; justify-content: center; }
      .nav .brand { margin-right: 0; width: 100%; text-align: center; }
      .hero .mockup .row { font-size: 12px; }
      .hero .mockup .row .date { width: 60px; }
      .hero .mockup .row .amount { width: 64px; }
      .hero .mockup-cols { font-size: 10px; }
      .hero .mockup-cols .col-date { width: 60px; }
      .hero .mockup-cols .col-amt { width: 64px; }
      /* .trust-bar is hidden — no responsive styles needed */
    }
  </style>
</head>
<body>

<div class="nav-wrapper">
<div class="nav">
  <span class="brand">Bridge</span>
  <a href="#how">How it works</a>
  <a href="#pricing">Pricing</a>
  <a href="#setup" class="btn-sm">Start free trial</a>
</div>
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

<!-- ════════════════ SOCIAL PROOF (hidden — add real testimonials when you have customers) ════════════════ -->
<div class="trust-bar">
  <p>Used by businesses that take payments from both Stripe and PayPal</p>
  <div class="logo-row">
    <!-- Replace with real customer logos when you have paying customers -->
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
      <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')">What exactly does Bridge do? <span class="icon">+</span></div>
      <div class="faq-a">It reads PayPal transactions and writes them into Stripe as Payment Records. That's it. They show up in Revenue Recognition, Sigma, and all Stripe reports alongside your Stripe-native payments.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')">Is it secure? <span class="icon">+</span></div>
      <div class="faq-a">Bridge only reads PayPal metadata (amount, date, currency). No customer PII, no card data, no addresses. Credentials are encrypted. Strictly read-only access.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')">Do I need to be technical? <span class="icon">+</span></div>
      <div class="faq-a">You need your Stripe secret key and PayPal API credentials. If you can copy-paste, you can set it up in under 2 minutes.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')">Can I try before paying? <span class="icon">+</span></div>
      <div class="faq-a">Yes. 7-day free trial. No credit card. If you don't subscribe, sync pauses. Your data stays safe.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')">Will my auditor accept this? <span class="icon">+</span></div>
      <div class="faq-a">PayPal transactions are written into Stripe as Payment Records — the same object Stripe uses for its own payments. They appear in Revenue Recognition, Sigma reports, and API exports just like native Stripe payments. Your auditor sees a single Stripe data source, not two.</div>
    </div>
    <div class="faq-item">
      <div class="faq-q" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')">What happens to my data if I cancel? <span class="icon">+</span></div>
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
      <div style="display:flex;gap:8px;margin-bottom:8px;">
        <input type="text" id="paypal-client-id" placeholder="PayPal Client ID" style="flex:1;" />
        <a href="https://developer.paypal.com/dashboard/applications" target="_blank" style="padding:8px 14px;border:1.5px solid var(--border);border-radius:var(--radius-sm);font-size:12px;font-weight:600;color:var(--text-secondary);text-decoration:none;white-space:nowrap;background:var(--bg);display:inline-flex;align-items:center;gap:4px;height:40px;">Find ID →</a>
      </div>
      <div style="display:flex;gap:8px;margin-bottom:8px;">
        <input type="password" id="paypal-client-secret" placeholder="PayPal Client Secret" style="flex:1;" />
        <a href="https://developer.paypal.com/dashboard/applications" target="_blank" style="padding:8px 14px;border:1.5px solid var(--border);border-radius:var(--radius-sm);font-size:12px;font-weight:600;color:var(--text-secondary);text-decoration:none;white-space:nowrap;background:var(--bg);display:inline-flex;align-items:center;gap:4px;height:40px;">Find Secret →</a>
      </div>
      <button id="btn-save-paypal" onclick="savePaypal()" style="margin-top:6px;">Save PayPal</button>
      <div id="error-paypal-setup" class="error" style="margin-top:4px;"></div>
      <div id="success-paypal-setup" class="success" style="margin-top:4px;"></div>
    </details>
  </div>

  <div class="card step-view" id="s-dashboard">
    <div id="dash-oauth-message" style="display:none;"></div>

    <!-- Header: title + status pills -->
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:8px;">
      <h2 style="margin:0;">Dashboard</h2>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">
        <span id="stripe-status" class="status-pill no"><span class="pill-dot"></span> Stripe: Not connected</span>
        <span id="paypal-status" class="status-pill no"><span class="pill-dot"></span> PayPal: Not connected</span>
      </div>
    </div>

    <!-- Revenue impact card -->
    <div class="revenue-card">
      <div class="rev-label">💰 Total PayPal revenue synced to Stripe</div>
      <div class="rev-amount" id="rev-amount">$0.00</div>
      <div class="rev-meta">
        <span id="rev-sync-info">Last sync: Never</span>
        <span>·</span>
        <span id="rev-txn-count">0 transactions</span>
        <span>·</span>
        <button onclick="syncNow()" id="btn-sync" class="btn-sm">Sync now</button>
      </div>
      <div id="error-sync" class="error" style="margin-top:6px;"></div>
      <div id="success-sync" class="success" style="margin-top:6px;"></div>
    </div>

    <!-- Sync error banner -->
    <div id="sync-errors-banner" style="display:none;margin-top:12px;padding:12px;background:#fef2f2;border:1px solid #fecaca;border-radius:10px;font-size:13px;">
      <strong style="color:#991b1b;">⚠️ Recent sync errors</strong>
      <div id="sync-errors-content" style="color:#7f1d1d;margin-top:4px;"></div>
    </div>

    <!-- Sync history -->
    <div id="sync-history-section" style="margin-top:20px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <h3 style="font-size:14px;font-weight:600;color:var(--text-primary);margin:0;">Sync history</h3>
      </div>
      <div id="sync-history-table" class="sync-table">
        <div class="sync-table-header">
          <span class="col-time">Time</span>
          <span class="col-txns">Transactions</span>
          <span class="col-revenue">Revenue</span>
          <span class="col-status">Status</span>
        </div>
        <div id="sync-history-rows">
          <div style="text-align:center;padding:24px;color:var(--text-muted);font-size:13px;">No syncs yet. Click "Sync now" above to start.</div>
        </div>
      </div>
    </div>

    <hr />

    <!-- Plan -->
    <div>
      <p style="font-weight:600;margin-bottom:4px;">Plan</p>
      <p style="font-size:13px;">Status: <span id="sub-status" class="badge badge-ok">Active</span> · <span id="sub-detail">7-day free trial</span></p>
      <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">
        <button id="btn-subscribe" onclick="subscribe()" class="green">Subscribe — $49/mo</button>
        <button id="btn-manage" onclick="manageBilling()" style="display:none;">Manage billing</button>
      </div>
      <div id="error-billing" class="error" style="margin-top:4px;"></div>
    </div>

    <hr />

    <!-- Stripe connect (inline) -->
    <div id="stripe-connect-section" style="display:none;">
      <h3 style="font-size:14px;font-weight:600;margin-bottom:8px;">Connect Stripe</h3>
      <p style="font-size:13px;color:var(--text-secondary);margin-bottom:10px;">Paste your Stripe secret key. Read-only access.</p>
      <div style="display:flex;gap:8px;">
        <input type="password" id="dash-stripe-key" placeholder="sk_live_... or sk_test_..." style="flex:1;margin-bottom:0;" />
        <button id="btn-dash-stripe" onclick="dashConnectStripe()" style="padding:10px 20px;white-space:nowrap;">Connect</button>
      </div>
      <div id="error-stripe-connect" class="error" style="margin-top:6px;"></div>
      <div id="success-stripe-connect" class="success" style="margin-top:6px;"></div>
    </div>

    <!-- PayPal config (inline) -->
    <div id="paypal-config-section" style="display:none;margin-top:16px;">
      <h3 style="font-size:14px;font-weight:600;margin-bottom:8px;">Connect PayPal</h3>
      <p style="font-size:13px;color:var(--text-secondary);margin-bottom:10px;">Enter your PayPal API credentials.</p>
      <div style="display:flex;gap:8px;margin-bottom:8px;">
        <input type="text" id="dash-paypal-id" placeholder="PayPal Client ID" style="flex:1;margin-bottom:0;" />
        <a href="https://developer.paypal.com/dashboard/applications" target="_blank" style="padding:8px 14px;border:1.5px solid var(--border);border-radius:var(--radius-sm);font-size:12px;font-weight:600;color:var(--text-secondary);text-decoration:none;white-space:nowrap;background:var(--bg);display:inline-flex;align-items:center;gap:4px;">Find ID →</a>
      </div>
      <div style="display:flex;gap:8px;margin-bottom:8px;">
        <input type="password" id="dash-paypal-secret" placeholder="PayPal Client Secret" style="flex:1;margin-bottom:0;" />
        <a href="https://developer.paypal.com/dashboard/applications" target="_blank" style="padding:8px 14px;border:1.5px solid var(--border);border-radius:var(--radius-sm);font-size:12px;font-weight:600;color:var(--text-secondary);text-decoration:none;white-space:nowrap;background:var(--bg);display:inline-flex;align-items:center;gap:4px;">Find Secret →</a>
      </div>
      <button id="btn-dash-paypal" onclick="configurePaypal()">Save PayPal</button>
      <div id="error-paypal" class="error" style="margin-top:6px;"></div>
      <div id="success-paypal" class="success" style="margin-top:6px;"></div>
    </div>

    <hr />

    <details style="margin-top:12px;cursor:pointer;">
      <summary style="font-size:13px;color:var(--text-muted);">⚠️ Danger Zone</summary>
      <div style="margin-top:8px;padding:12px;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;">
        <p style="font-size:13px;color:#991b1b;margin-bottom:8px;font-weight:500;">Reset removes your Stripe and PayPal credentials. Sync will stop.</p>
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
      setLoading('btn-register', false);
      // Show the API key so user can copy it before connecting accounts
      document.getElementById('api-key-display').textContent = d.apiKey;
      document.querySelectorAll('.step-view').forEach(s => s.classList.remove('active'));
      document.getElementById('s-apikey').classList.add('active');
      document.getElementById('s-apikey').scrollIntoView({ behavior: 'smooth' });
    } catch (e) {
      document.getElementById('error-register').textContent = friendlyError(e.message);
      setLoading('btn-register', false);
    }
  }

  // Show the configure step (called from API key display step)
  function showCfg() {
    document.querySelectorAll('.step-view').forEach(s => s.classList.remove('active'));
    document.getElementById('s-configure').classList.add('active');
    document.getElementById('s-configure').scrollIntoView({ behavior: 'smooth' });
  }

  // Toggle OAuth info section in setup wizard
  function toggleOauthInfo() {
    const el = document.getElementById('oauth-info');
    if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
  }

  // Initiate Stripe OAuth flow from setup wizard
  async function connectStripe() {
    document.getElementById('error-configure').textContent = '';
    try {
      const r = await fetch(API + '/api/stripe/oauth/start' + (API_KEY ? '?token=' + API_KEY : ''), {
        headers: { 'Authorization': 'Bearer ' + API_KEY },
      });
      if (r.redirected) {
        window.location.href = r.url;
      } else {
        const d = await r.json();
        throw new Error(d.error || 'OAuth redirect failed');
      }
    } catch (e) {
      document.getElementById('error-configure').textContent = friendlyError(e.message);
    }
  }

  // Save Stripe + optional PayPal credentials (called from configure step's "Save & continue")
  async function configure() {
    const stripeKey = document.getElementById('stripe-key').value;
    if (!stripeKey) { document.getElementById('error-configure').textContent = 'Enter your Stripe secret key'; return; }
    setLoading('btn-configure', true);
    document.getElementById('error-configure').textContent = '';
    document.getElementById('success-configure').textContent = '';

    const body = { stripeKey };
    // Check for optional PayPal credentials in the expandable section
    const paypalId = document.getElementById('paypal-client-id').value;
    const paypalSecret = document.getElementById('paypal-client-secret').value;
    if (paypalId && paypalSecret) {
      body.paypalClientId = paypalId;
      body.paypalClientSecret = paypalSecret;
    }

    try {
      const r = await fetch(API + '/api/configure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + API_KEY },
        body: JSON.stringify(body),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Configuration failed');
      setLoading('btn-configure', false);
      // Success — advance to dashboard
      document.querySelectorAll('.step-view').forEach(s => s.classList.remove('active'));
      document.getElementById('s-dashboard').classList.add('active');
      document.getElementById('s-dashboard').scrollIntoView({ behavior: 'smooth' });
      loadDashboard();
    } catch (e) {
      document.getElementById('error-configure').textContent = friendlyError(e.message);
      setLoading('btn-configure', false);
    }
  }

  // Save PayPal credentials from setup wizard (called from "Save PayPal" button in configure step)
  async function savePaypal() {
    const id = document.getElementById('paypal-client-id').value;
    const secret = document.getElementById('paypal-client-secret').value;
    if (!id || !secret) { document.getElementById('error-paypal-setup').textContent = 'Fill in both PayPal fields'; return; }
    setLoading('btn-save-paypal', true);
    document.getElementById('error-paypal-setup').textContent = '';
    document.getElementById('success-paypal-setup').textContent = '';
    try {
      const r = await fetch(API + '/api/configure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + API_KEY },
        body: JSON.stringify({ paypalClientId: id, paypalClientSecret: secret }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Failed to save PayPal');
      document.getElementById('success-paypal-setup').textContent = '✅ PayPal saved! You can now continue to the dashboard.';
      setLoading('btn-save-paypal', false);
    } catch (e) {
      document.getElementById('error-paypal-setup').textContent = friendlyError(e.message);
      setLoading('btn-save-paypal', false);
    }
  }

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
      document.getElementById('error-paypal').textContent = friendlyError(e.message);
      setLoading('btn-dash-paypal', false);
    }
  }

  async function loadDashboard() {
    // Fetch status and sync history concurrently
    const [statusRes, historyRes] = await Promise.allSettled([
      fetch(API + '/api/status', { headers: { 'Authorization': 'Bearer ' + API_KEY } }),
      fetch(API + '/api/sync-history', { headers: { 'Authorization': 'Bearer ' + API_KEY } }),
    ]);

    // ── Status ──
    if (statusRes.status === 'fulfilled') {
      try {
        const d = await statusRes.value.json();

        // Status pills
        const stripePill = document.getElementById('stripe-status');
        const paypalPill = document.getElementById('paypal-status');
        if (d.stripe?.connected) {
          stripePill.className = 'status-pill ok';
          stripePill.innerHTML = '<span class="pill-dot"></span> Stripe: Connected' + (d.stripe.accountId ? ' <span style="font-weight:400;color:var(--text-muted);font-size:11px;">' + d.stripe.accountId.substring(0,10) + '…</span>' : '');
        } else {
          stripePill.className = 'status-pill no';
          stripePill.innerHTML = '<span class="pill-dot"></span> Stripe: Not connected';
        }
        if (d.paypal?.connected) {
          paypalPill.className = 'status-pill ok';
          paypalPill.innerHTML = '<span class="pill-dot"></span> PayPal: Connected';
        } else {
          paypalPill.className = 'status-pill no';
          paypalPill.innerHTML = '<span class="pill-dot"></span> PayPal: Not connected';
        }

        // Sync info in revenue card
        if (d.sync) {
          const syncInfo = document.getElementById('rev-sync-info');
          const txnCount = document.getElementById('rev-txn-count');
          syncInfo.textContent = d.sync.lastSyncAt ? 'Last sync: ' + timeAgo(d.sync.lastSyncAt) : 'Last sync: Never';
          txnCount.textContent = (d.sync.totalSynced || 0) + ' transactions';

          // Error banner
          const errorBanner = document.getElementById('sync-errors-banner');
          const errorContent = document.getElementById('sync-errors-content');
          if (d.sync.errors && d.sync.errors.length > 0) {
            const err = d.sync.errors[0];
            const time = err.time ? timeAgo(err.time) : 'recently';
            errorContent.innerHTML = d.sync.errors.length === 1
              ? 'Last sync failed: <code>' + escapeHtml(err.error) + '</code> (' + time + ')'
              : d.sync.errors.length + ' errors. Latest: <code>' + escapeHtml(err.error) + '</code> (' + time + ')';
            errorBanner.style.display = 'block';
          } else {
            errorBanner.style.display = 'none';
          }
        }

        // Connect sections
        const stripeSection = document.getElementById('stripe-connect-section');
        stripeSection.style.display = d.stripe?.connected ? 'none' : 'block';
        const paypalSection = document.getElementById('paypal-config-section');
        paypalSection.style.display = (d.stripe?.connected && !d.paypal?.connected) ? 'block' : 'none';
      } catch (e) { console.error('Status fetch error:', e); }
    }

    // ── Sync history + revenue ──
    if (historyRes.status === 'fulfilled') {
      try {
        const h = await historyRes.value.json();

        // Revenue card
        document.getElementById('rev-amount').textContent = h.totalRevenueFormatted || '$0.00';

        // History table
        const rowsContainer = document.getElementById('sync-history-rows');
        if (!h.history || h.history.length === 0) {
          rowsContainer.innerHTML = '<div style="text-align:center;padding:24px;color:var(--text-muted);font-size:13px;">No syncs yet. Click "Sync now" above to start.</div>';
        } else {
          rowsContainer.innerHTML = h.history.map(row => {
            const time = new Date(row.synced_at);
            const timeStr = time.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
            const revCents = parseInt(row.total_revenue_cents || '0', 10);
            const revStr = '$' + (revCents / 100).toFixed(2);
            let dotClass = 'ok', statusLabel = 'Success';
            if (row.status === 'failed' || row.status === 'error') { dotClass = 'fail'; statusLabel = 'Failed'; }
            else if (row.status === 'partial') { dotClass = 'warn'; statusLabel = row.transactions_pushed + ' ok, ' + row.total_errors + ' err'; }
            const txns = parseInt(row.transactions_pushed || '0', 10) + parseInt(row.transactions_skipped || '0', 10);
            return '<div class="sync-table-row">'
              + '<span class="col-time">' + timeStr + '</span>'
              + '<span class="col-txns"><span>' + row.transactions_pushed + '</span> / ' + txns + '</span>'
              + '<span class="col-revenue">' + revStr + '</span>'
              + '<span class="col-status"><span class="status-dot"><span class="dot ' + dotClass + '"></span>' + statusLabel + '</span></span>'
              + '</div>';
          }).join('');
        }
      } catch (e) { console.error('History fetch error:', e); }
    }

    // ── Subscription ──
    try {
      const r = await fetch(API + '/api/subscription', { headers: { 'Authorization': 'Bearer ' + API_KEY } });
      const sub = await r.json();
      if (sub.needsAuth) return;
      const se = document.getElementById('sub-status'), sd = document.getElementById('sub-detail'), sb = document.getElementById('btn-subscribe'), sm = document.getElementById('btn-manage');
      if (sub.active) {
        se.textContent = '✅ Active'; se.className = 'badge badge-ok';
        if (sub.stripeSubscriptionId || sub.paddleSubscriptionId) { sd.textContent = 'Subscribed'; sb.style.display = 'none'; sm.style.display = 'inline-block'; }
        else { sd.textContent = 'Trial ends ' + new Date(sub.trialEnd).toLocaleDateString(); sb.style.display = 'inline-block'; sm.style.display = 'none'; }
      } else {
        se.textContent = '⚠️ Expired'; se.className = 'badge badge-no';
        sd.textContent = 'Trial ended'; sb.style.display = 'inline-block'; sm.style.display = 'none';
      }
    } catch (e) { console.error(e); }
  }

  // ── Helper: relative time ──
  function timeAgo(dateStr) {
    const now = Date.now();
    const then = new Date(dateStr).getTime();
    const diff = now - then;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return mins + 'm ago';
    const hours = Math.floor(mins / 60);
    if (hours < 24) return hours + 'h ago';
    const days = Math.floor(hours / 24);
    if (days < 30) return days + 'd ago';
    return new Date(dateStr).toLocaleDateString();
  }

  async function subscribe() {
    document.getElementById('error-billing').textContent = '';
    setLoading('btn-subscribe', true);
    try {
      const r = await fetch(API + '/api/create-paddle-checkout', { method: 'POST', headers: { 'Authorization': 'Bearer ' + API_KEY } });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      if (d.url) {
        // Redirect to Stripe Checkout
        window.location.href = d.url;
      } else if (d.active) {
        document.getElementById('error-billing').textContent = 'Already subscribed.';
        loadDashboard();
      }
      setLoading('btn-subscribe', false);
    } catch (e) { document.getElementById('error-billing').textContent = friendlyError(e.message); setLoading('btn-subscribe', false); }
  }

  async function manageBilling() {
    document.getElementById('error-billing').textContent = '';
    try {
      const r = await fetch(API + '/api/create-paddle-checkout', { method: 'POST', headers: { 'Authorization': 'Bearer ' + API_KEY } });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      if (d.url) window.location.href = d.url;
      else if (d.active) loadDashboard();  // already subscribed, refresh
      else document.getElementById('error-billing').textContent = 'Unable to open billing portal. Contact support.';
    } catch (e) { document.getElementById('error-billing').textContent = friendlyError(e.message); }
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
      document.getElementById('error-stripe-connect').textContent = friendlyError(e.message);
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
      if (r.status === 402) { document.getElementById('error-sync').textContent = friendlyError(d.detail || 'Subscription required'); setLoading('btn-sync', false); loadDashboard(); return; }
      if (!r.ok) throw new Error(d.error);
      document.getElementById('success-sync').textContent = '✅ Synced ' + d.pushed + ' transactions' + (d.skipped > 0 ? ', ' + d.skipped + ' skipped' : '');
      setLoading('btn-sync', false);
      loadDashboard();
    } catch (e) { document.getElementById('error-sync').textContent = friendlyError(e.message); setLoading('btn-sync', false); }
  }

  async function resetAll() {
    if (!confirm('Are you sure you want to reset? Your Stripe and PayPal credentials will be removed from Bridge servers and this browser.')) return;
    if (!confirm('This cannot be undone. All credentials, sync history, and settings will be permanently deleted.')) return;
    try {
      // Call API to delete credentials on server
      if (API_KEY) {
        await fetch(API + '/api/configure', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + API_KEY },
          body: JSON.stringify({ stripeKey: '', paypalClientId: '', paypalClientSecret: '' }),
        });
      }
    } catch (e) {
      // Best-effort — if server is unreachable, still clear local state
      console.error('Failed to clear server-side credentials:', e);
    }
    localStorage.removeItem('bridge_api_key');
    location.reload();
  }

  /**
   * Map raw error strings to user-friendly messages with actionable guidance.
   */
  function friendlyError(msg) {
    if (!msg) return 'Something went wrong. Try again.';
    const m = msg.toLowerCase();

    // Network errors take priority (they may mention other services)
    if (m.includes('network') || m.includes('fetch failed') || m.includes('econnrefused') || m.includes('enotfound') || m.includes('etimedout'))
      return 'Network error — could not reach the server. Check your internet connection and try again.';

    // Auth errors
    if (m.includes('api key') || m.includes('unauthorized') || m.includes('401'))
      return 'Authentication failed. Your session may have expired — try refreshing the page.';

    // Rate limiting
    if (m.includes('rate limit') || m.includes('too many'))
      return 'Too many requests. Please wait a moment and try again.';

    // Not found
    if (m.includes('not found') || m.includes('404'))
      return 'The requested resource was not found. It may have been removed.';

    // Payment processor errors
    if (m.includes('stripe key invalid') || m.includes('stripe rejected'))
      return msg.length > 80 ? msg.substring(0, 80) + '…' : msg;
    if (m.includes('paypal') && (m.includes('invalid') || m.includes('401')))
      return 'PayPal credentials were rejected. Check your Client ID and Secret are correct and from the right environment (sandbox vs live).';

    // Subscription / billing
    if (m.includes('expired') || m.includes('subscription required') || m.includes('402'))
      return 'Your free trial has ended. Subscribe at $49/mo to continue syncing. Head to the Plan section above.';

    // Trial reuse
    if (m.includes('already used') || m.includes('trial'))
      return msg;

    // Stripe-specific (after network/auth checks, so real Stripe errors land here)
    if (m.includes('stripe'))
      return msg.length > 120 ? msg.substring(0, 120) + '…' : msg;

    // Return original but truncate
    return msg.length > 120 ? msg.substring(0, 120) + '…' : msg;
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
