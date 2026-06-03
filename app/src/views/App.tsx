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
} from '@stripe/ui-extension-sdk/ui';

const BACKEND_URL = 'http://localhost:3001';

interface SyncStatus {
  connected: boolean;
  lastSyncAt: string | null;
  totalSynced: number;
  processor: string;
}

/**
 * Main view for the Bridge Stripe App.
 * Shows connection status, allows PayPal linking, and shows sync stats.
 */
const App = () => {
  const [status, setStatus] = useState<SyncStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${BACKEND_URL}/api/status`);
      if (!res.ok) throw new Error(`Status check failed: ${res.status}`);
      const data = await res.json();
      setStatus(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleConnectPayPal = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/paypal/auth-url`);
      if (!res.ok) throw new Error('Failed to get auth URL');
      const data = await res.json();
      // Open PayPal OAuth in a new window
      window.open(data.url, 'connect-paypal', 'width=600,height=700');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSyncNow = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_URL}/api/sync`, { method: 'POST' });
      if (!res.ok) throw new Error('Sync failed');
      await fetchStatus();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box css={{ padding: 'large' }}>
      {/* Header */}
      <Box css={{ marginBottom: 'large' }}>
        <Heading size="large">Bridge</Heading>
        <Text>Sync PayPal transactions into Stripe Payment Records</Text>
      </Box>

      {/* Connection Status */}
      <Card css={{ marginBottom: 'medium' }}>
        <Box css={{ padding: 'medium' }}>
          <Heading size="small">Connections</Heading>
          <Divider />

          <Inline css={{ marginTop: 'medium', gap: 'medium', alignItems: 'center' }}>
            <Text>Stripe</Text>
            <Badge type="positive">Connected</Badge>
          </Inline>

          <Inline css={{ marginTop: 'small', gap: 'medium', alignItems: 'center' }}>
            <Text>PayPal</Text>
            {loading ? (
              <Spinner />
            ) : status?.connected ? (
              <Badge type="positive">Connected</Badge>
            ) : (
              <Badge type="warning">Disconnected</Badge>
            )}
          </Inline>

          {!status?.connected && (
            <Box css={{ marginTop: 'medium' }}>
              <Button onPress={handleConnectPayPal} type="primary">
                Connect PayPal
              </Button>
            </Box>
          )}
        </Box>
      </Card>

      {/* Sync Status */}
      <Card css={{ marginBottom: 'medium' }}>
        <Box css={{ padding: 'medium' }}>
          <Heading size="small">Sync Status</Heading>
          <Divider />

          {status ? (
            <>
              <Inline css={{ marginTop: 'medium', gap: 'medium' }}>
                <Text>Transactions synced:</Text>
                <Text>{status.totalSynced}</Text>
              </Inline>
              <Inline css={{ marginTop: 'small', gap: 'medium' }}>
                <Text>Last sync:</Text>
                <Text>
                  {status.lastSyncAt
                    ? new Date(status.lastSyncAt).toLocaleString()
                    : 'Never'}
                </Text>
              </Inline>
              <Inline css={{ marginTop: 'small', gap: 'medium' }}>
                <Text>Processor:</Text>
                <Text>{status.processor || 'None configured'}</Text>
              </Inline>
            </>
          ) : (
            <Text css={{ marginTop: 'medium' }}>No sync data yet.</Text>
          )}

          <Box css={{ marginTop: 'medium' }}>
            <Button onPress={handleSyncNow} disabled={loading || !status?.connected}>
              {loading ? 'Syncing...' : 'Sync Now'}
            </Button>
          </Box>
        </Box>
      </Card>

      {/* Error */}
      {error && (
        <Card css={{ marginBottom: 'medium' }}>
          <Box css={{ padding: 'medium' }}>
            <Text css={{ color: 'critical' }}>Error: {error}</Text>
            <Button onPress={fetchStatus}>Retry</Button>
          </Box>
        </Card>
      )}

      {/* Footer */}
      <Box css={{ marginTop: 'large' }}>
        <Text size="small" css={{ color: 'secondary' }}>
          Bridge syncs your PayPal transactions to Stripe daily.
          Data appears in Stripe Sigma and Revenue Recognition.
        </Text>
        <Link href="https://bridgepay.dev" target="_blank">
          bridgepay.dev
        </Link>
      </Box>
    </Box>
  );
};

export default App;
