import React from 'react';
import {
  Box,
  Heading,
  Text,
  Link,
} from '@stripe/ui-extension-sdk/ui';

// Bridge backend URL — update this to your production URL before deploying.
const BRIDGE_URL = 'https://bridge.onrender.com/app';

/**
 * Bridge Stripe App — Launcher.
 * Renders a link to the full Bridge web app.
 * No window.open() — just uses Stripe's Link component (safe in iframe).
 */
const App = () => {
  return (
    <Box css={{ padding: 'large' }}>
      <Heading size="xlarge">Bridge</Heading>
      <Box css={{ marginTop: 'medium' }}>
        <Text>Sync PayPal transactions into Stripe Payment Records.</Text>
      </Box>
      <Box css={{ marginTop: 'xlarge' }}>
        <Link href={BRIDGE_URL} target="_blank">
          Open Bridge Dashboard
        </Link>
      </Box>
      <Box css={{ marginTop: 'xlarge' }}>
        <Text size="small" css={{ color: 'secondary' }}>
          Bridge automatically syncs PayPal transactions to Stripe daily.
          Configure your credentials in the web dashboard.
        </Text>
      </Box>
    </Box>
  );
};

export default App;
