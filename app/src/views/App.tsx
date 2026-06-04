import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Heading,
  Text,
  Badge,
  Link,
  Spinner,
  Divider,
  Inline,
  TextField,
  Banner,
} from '@stripe/ui-extension-sdk/ui';

const BACKEND_URL = 'https://bridge-production-ad61.up.railway.app';

type Step = 'register' | 'configure' | 'dashboard';

interface MerchantConfig {
  merchantId: string;
  displayName: string;
  stripeConfigured: boolean;
  paypalConfigured: boolean;
  paypalEnvironment: string;
}

interface SyncStatus {
  stripe: { connected: boolean; accountId?: string };
  paypal: { connected: boolean; email?: string };
  sync: { lastSyncAt: string | null; totalSynced: number; errors: any[] };
}

/**
 * Bridge Stripe App — Setup wizard + dashboard.
 */
const App = () => {
  const [step, setStep] = useState<Step>('register');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Registration
  const [apiKey, setApiKey] = useState<string>('');
  const [displayName, setDisplayName] = useState('');

  // Configuration
  const [config, setConfig] = useState<MerchantConfig | null>(null);
  const [stripeKey, setStripeKey] = useState('');
  const [paypalClientId, setPaypalClientId] = useState('');
  const [paypalClientSecret, setPaypalClientSecret] = useState('');
  const [paypalEnv, setPaypalEnv] = useState('sandbox');

  // Dashboard
  const [status, setStatus] = useState<SyncStatus | null>(null);

  // On mount, check for stored API key
  useEffect(() => {
    const stored = localStorage.getItem('bridge_api_key');
    if (stored) {
      setApiKey(stored);
      setStep('dashboard');
      fetchStatus(stored);
      fetchConfig(stored);
    }
  }, []);

  // ── Registration ───────────────────────────────────────────

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName: displayName || 'Stripe App User' }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `Registration failed: ${res.status}`);
      }
      const data = await res.json();
      localStorage.setItem('bridge_api_key', data.apiKey);
      setApiKey(data.apiKey);
      setSuccess(`Registered! Your API key is saved. Now configure your payment accounts.`);
      setStep('configure');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Configuration ──────────────────────────────────────────

  const fetchConfig = async (key: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/configure`, {
        headers: { Authorization: `Bearer ${key}` },
      });
      if (!res.ok) throw new Error('Failed to load config');
      const data = await res.json();
      setConfig(data);
      if (data.stripeConfigured) setStripeKey('••••••••');
      if (data.paypalConfigured) {
        setPaypalClientId('••••••••');
        setPaypalClientSecret('••••••••');
      }
      if (data.paypalEnvironment) setPaypalEnv(data.paypalEnvironment);
      if (data.stripeConfigured && data.paypalConfigured) {
        setStep('dashboard');
      } else {
        setStep('configure');
      }
    } catch (err: any) {
      console.error('fetchConfig error:', err);
    }
  };

  const handleConfigure = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const body: any = {};
      if (stripeKey && stripeKey !== '••••••••') body.stripeKey = stripeKey;
      if (paypalClientId && paypalClientId !== '••••••••') body.paypalClientId = paypalClientId;
      if (paypalClientSecret && paypalClientSecret !== '••••••••') body.paypalClientSecret = paypalClientSecret;
      body.paypalEnvironment = paypalEnv;

      const res = await fetch(`${BACKEND_URL}/api/configure`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Configuration failed');
      }
      const data = await res.json();
      setConfig(data);
      setSuccess('Credentials saved and verified!');
      setStep('dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Sync ───────────────────────────────────────────────────

  const fetchStatus = async (key: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/status`, {
        headers: { Authorization: `Bearer ${key}` },
      });
      if (!res.ok) throw new Error('Status check failed');
      const data = await res.json();
      setStatus(data);
    } catch (err: any) {
      console.error('Status error:', err);
    }
  };

  const handleSyncNow = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/sync`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Sync failed');
      }
      const data = await res.json();
      setSuccess(`Synced! ${data.pushed} transactions pushed, ${data.skipped} skipped.`);
      fetchStatus(apiKey);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('bridge_api_key');
    setApiKey('');
    setStep('register');
    setConfig(null);
    setStatus(null);
    setError(null);
    setSuccess(null);
  };

  // ── Render ─────────────────────────────────────────────────

  // Step 1: Registration
  if (step === 'register') {
    return (
      <Box css={{ padding: 'large' }}>
        <Box css={{ marginBottom: 'large' }}>
          <Heading size="large">Bridge</Heading>
          <Text>Sync your PayPal transactions into Stripe Revenue Recognition</Text>
        </Box>

        <Card>
          <Box css={{ padding: 'medium' }}>
            <Heading size="small">Get Started</Heading>
            <Divider />
            <Box css={{ marginTop: 'medium' }}>
              <Text>
                Register to get your API key. You will use this key
                to authenticate Bridge with your Stripe account.
              </Text>
            </Box>
            <Box css={{ marginTop: 'medium' }}>
              <TextField
                label="Display name (optional)"
                placeholder="My Business"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </Box>
            <Box css={{ marginTop: 'medium' }}>
              <Button onPress={handleRegister} type="primary" disabled={loading}>
                {loading ? 'Registering...' : 'Register & Get API Key'}
              </Button>
            </Box>
          </Box>
        </Card>

        {error && (
          <Box css={{ marginTop: 'medium' }}>
            <Banner type="critical">{error}</Banner>
          </Box>
        )}

        <Box css={{ marginTop: 'large' }}>
          <Text size="small" css={{ color: 'secondary' }}>
            Already have an API key? Refresh the page or clear storage to re-register.
          </Text>
        </Box>
      </Box>
    );
  }

  // Step 2: Configure credentials
  if (step === 'configure') {
    return (
      <Box css={{ padding: 'large' }}>
        <Box css={{ marginBottom: 'large' }}>
          <Heading size="large">Bridge</Heading>
          <Text>Connect your payment accounts</Text>
        </Box>

        {success && (
          <Box css={{ marginBottom: 'medium' }}>
            <Banner type="default">{success}</Banner>
          </Box>
        )}

        {/* Stripe */}
        <Card css={{ marginBottom: 'medium' }}>
          <Box css={{ padding: 'medium' }}>
            <Heading size="small">Stripe</Heading>
            <Divider />
            <Box css={{ marginTop: 'medium' }}>
              {config?.stripeConfigured ? (
                <Inline css={{ gap: 'medium', alignItems: 'center' }}>
                  <Badge type="positive">Connected</Badge>
                  <Text size="small" css={{ color: 'secondary' }}>Key saved</Text>
                </Inline>
              ) : (
                <>
                  <Text>Enter your Stripe secret key (starts with sk_live_ or sk_test_)</Text>
                  <Box css={{ marginTop: 'small' }}>
                    <TextField
                      label="Stripe Secret Key"
                      placeholder="sk_live_..."
                      type="password"
                      value={stripeKey}
                      onChange={(e) => setStripeKey(e.target.value)}
                    />
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Card>

        {/* PayPal */}
        <Card css={{ marginBottom: 'medium' }}>
          <Box css={{ padding: 'medium' }}>
            <Heading size="small">PayPal</Heading>
            <Divider />
            <Box css={{ marginTop: 'medium' }}>
              {config?.paypalConfigured ? (
                <Inline css={{ gap: 'medium', alignItems: 'center' }}>
                  <Badge type="positive">Connected</Badge>
                  <Text size="small" css={{ color: 'secondary' }}>Keys saved</Text>
                </Inline>
              ) : (
                <>
                  <Text>Enter your PayPal API credentials (from the PayPal Developer Dashboard)</Text>
                  <Box css={{ marginTop: 'small' }}>
                    <TextField
                      label="PayPal Client ID"
                      placeholder="A..."
                      value={paypalClientId}
                      onChange={(e) => setPaypalClientId(e.target.value)}
                    />
                  </Box>
                  <Box css={{ marginTop: 'small' }}>
                    <TextField
                      label="PayPal Client Secret"
                      placeholder="E..."
                      type="password"
                      value={paypalClientSecret}
                      onChange={(e) => setPaypalClientSecret(e.target.value)}
                    />
                  </Box>
                  <Box css={{ marginTop: 'small' }}>
                    <TextField
                      label="PayPal Environment"
                      value={paypalEnv}
                      onChange={(e) => setPaypalEnv(e.target.value)}
                    />
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Card>

        {error && (
          <Box css={{ marginBottom: 'medium' }}>
            <Banner type="critical">{error}</Banner>
          </Box>
        )}

        <Button onPress={handleConfigure} type="primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save & Continue'}
        </Button>

        {apiKey && (
          <Box css={{ marginTop: 'medium' }}>
            <Button onPress={handleLogout} type="secondary">
              Reset (start over)
            </Button>
          </Box>
        )}
      </Box>
    );
  }

  // Step 3: Dashboard
  return (
    <Box css={{ padding: 'large' }}>
      {/* Header */}
      <Box css={{ marginBottom: 'large' }}>
        <Inline css={{ gap: 'medium', alignItems: 'center' }}>
          <Heading size="large">Bridge</Heading>
          {config && (
            <Text size="small" css={{ color: 'secondary' }}>
              {config.displayName}
            </Text>
          )}
        </Inline>
        <Text>PayPal → Stripe Payment Records sync</Text>
      </Box>

      {/* Connection status */}
      <Card css={{ marginBottom: 'medium' }}>
        <Box css={{ padding: 'medium' }}>
          <Heading size="small">Connections</Heading>
          <Divider />

          <Inline css={{ marginTop: 'medium', gap: 'medium', alignItems: 'center' }}>
            <Text>Stripe</Text>
            {status?.stripe?.connected ? (
              <Badge type="positive">Connected</Badge>
            ) : (
              <Badge type="warning">No key configured</Badge>
            )}
          </Inline>

          <Inline css={{ marginTop: 'small', gap: 'medium', alignItems: 'center' }}>
            <Text>PayPal</Text>
            {status?.paypal?.connected ? (
              <Badge type="positive">Connected</Badge>
            ) : (
              <Badge type="warning">No key configured</Badge>
            )}
          </Inline>

          {(!config?.stripeConfigured || !config?.paypalConfigured) && (
            <Box css={{ marginTop: 'medium' }}>
              <Button onPress={() => setStep('configure')} type="secondary">
                Configure Accounts
              </Button>
            </Box>
          )}
        </Box>
      </Card>

      {/* Sync status */}
      <Card css={{ marginBottom: 'medium' }}>
        <Box css={{ padding: 'medium' }}>
          <Heading size="small">Sync Status</Heading>
          <Divider />

          {status ? (
            <>
              <Inline css={{ marginTop: 'medium', gap: 'medium' }}>
                <Text>Transactions synced:</Text>
                <Text>{status.sync.totalSynced}</Text>
              </Inline>
              <Inline css={{ marginTop: 'small', gap: 'medium' }}>
                <Text>Last sync:</Text>
                <Text>
                  {status.sync.lastSyncAt
                    ? new Date(status.sync.lastSyncAt).toLocaleString()
                    : 'Never'}
                </Text>
              </Inline>
              {status.sync.errors.length > 0 && (
                <Box css={{ marginTop: 'small' }}>
                  <Text css={{ color: 'critical' }}>
                    {status.sync.errors.length} recent error(s)
                  </Text>
                  {status.sync.errors.slice(0, 3).map((e: any, i: number) => (
                    <Text key={i} size="small" css={{ color: 'critical' }}>
                      {e.error}
                    </Text>
                  ))}
                </Box>
              )}
            </>
          ) : (
            <Text css={{ marginTop: 'medium' }}>Loading status...</Text>
          )}

          {config?.stripeConfigured && config?.paypalConfigured && (
            <Box css={{ marginTop: 'medium' }}>
              <Button onPress={handleSyncNow} disabled={loading}>
                {loading ? 'Syncing...' : 'Sync Now'}
              </Button>
            </Box>
          )}
        </Box>
      </Card>

      {success && (
        <Box css={{ marginBottom: 'medium' }}>
          <Banner type="default">{success}</Banner>
        </Box>
      )}

      {error && (
        <Box css={{ marginBottom: 'medium' }}>
          <Banner type="critical">{error}</Banner>
        </Box>
      )}

      {/* Footer */}
      <Box css={{ marginTop: 'large' }}>
        <Inline css={{ gap: 'medium', alignItems: 'center' }}>
          <Button onPress={() => { fetchStatus(apiKey); fetchConfig(apiKey); }} type="secondary" disabled={loading}>
            Refresh
          </Button>
          <Button onPress={handleLogout} type="secondary">
            Disconnect
          </Button>
        </Inline>
        <Box css={{ marginTop: 'medium' }}>
          <Text size="small" css={{ color: 'secondary' }}>
            Bridge syncs your PayPal transactions to Stripe daily.
            Data appears in Stripe Sigma and Revenue Recognition.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
