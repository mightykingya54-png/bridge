import React from 'react';
import {
  Box,
  Button,
  Card,
  Heading,
  Text,
  Badge,
  Divider,
  Inline,
  TextField,
  Banner,
} from '@stripe/ui-extension-sdk/ui';

const BACKEND_URL = 'https://bridge-production-ad61.up.railway.app';

const App = () => {
  const [view, setView] = React.useState<'welcome' | 'register' | 'config' | 'done'>('welcome');
  const [error, setError] = React.useState<string | null>(null);
  const [apiKey, setApiKey] = React.useState('');
  const [name, setName] = React.useState('');
  const [sk, setSk] = React.useState('');
  const [pc, setPc] = React.useState('');
  const [ps, setPs] = React.useState('');

  React.useEffect(() => {
    const k = localStorage.getItem('bk');
    if (k) { setApiKey(k); setView('done'); }
  }, []);

  const register = async () => {
    try {
      const r = await fetch(`${BACKEND_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName: name || 'User' }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'fail');
      localStorage.setItem('bk', d.apiKey);
      setApiKey(d.apiKey);
      setView('config');
    } catch (e: any) { setError(e.message); }
  };

  const configure = async () => {
    try {
      const body: any = {};
      if (sk) body.stripeKey = sk;
      if (pc) body.paypalClientId = pc;
      if (ps) body.paypalClientSecret = ps;
      const r = await fetch(`${BACKEND_URL}/api/configure`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify(body),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'fail');
      setView('done');
    } catch (e: any) { setError(e.message); }
  };

  const sync = async () => {
    try {
      const r = await fetch(`${BACKEND_URL}/api/sync`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}` },
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'fail');
      alert(`Synced: ${d.pushed} pushed, ${d.skipped} skipped`);
    } catch (e: any) { alert(e.message); }
  };

  if (view === 'welcome') return (
    <Box css={{ padding: 'large' }}>
      <Heading size="xlarge">Bridge</Heading>
      <Text>PayPal → Stripe Revenue Recognition</Text>
      <Box css={{ marginTop: 'medium' }}>
        <Button type="primary" onPress={() => setView('register')}>Get Started</Button>
      </Box>
    </Box>
  );

  if (view === 'register') return (
    <Box css={{ padding: 'large' }}>
      <Heading size="large">Bridge Setup</Heading>
      <Card css={{ marginTop: 'medium' }}>
        <Box css={{ padding: 'medium' }}>
          <TextField label="Display Name" placeholder="Your business" value={name} onChange={(e: any) => setName(e.target.value)} />
          <Box css={{ marginTop: 'medium' }}>
            <Button type="primary" onPress={register}>Register</Button>
          </Box>
          {error && <Banner type="critical" css={{ marginTop: 'medium' }}>{error}</Banner>}
        </Box>
      </Card>
    </Box>
  );

  if (view === 'config') return (
    <Box css={{ padding: 'large' }}>
      <Heading size="large">Connect Accounts</Heading>
      <Card css={{ marginTop: 'medium' }}>
        <Box css={{ padding: 'medium' }}>
          <TextField label="Stripe Secret Key" type="password" placeholder="sk_live_..." value={sk} onChange={(e: any) => setSk(e.target.value)} />
          <Box css={{ marginTop: 'small' }}>
            <TextField label="PayPal Client ID" placeholder="A..." value={pc} onChange={(e: any) => setPc(e.target.value)} />
          </Box>
          <Box css={{ marginTop: 'small' }}>
            <TextField label="PayPal Client Secret" type="password" placeholder="E..." value={ps} onChange={(e: any) => setPs(e.target.value)} />
          </Box>
          <Box css={{ marginTop: 'medium' }}>
            <Button type="primary" onPress={configure}>Save</Button>
          </Box>
          {error && <Banner type="critical" css={{ marginTop: 'medium' }}>{error}</Banner>}
        </Box>
      </Card>
    </Box>
  );

  return (
    <Box css={{ padding: 'large' }}>
      <Heading size="large">Bridge</Heading>
      <Card css={{ marginTop: 'medium' }}>
        <Box css={{ padding: 'medium' }}>
          <Heading size="small">Sync Status</Heading>
          <Divider />
          <Text>✅ Connected</Text>
          <Box css={{ marginTop: 'medium' }}>
            <Button onPress={sync}>Sync Now</Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default App;
