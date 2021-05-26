/**
 * Privacy Policy
 * for import only
 */
import * as React from 'react';

import Box from 'app/components/Box';

export default function PrivacyPolicy() {
  return (
    <Box title="Privacy Policy" titleBorder withPadding>
      <iframe
        src="https://squidpay.ph/privacypolicy"
        title="Privacy Policy"
        style={{
          paddingTop: 30,
          width: '100%',
          height: '85vh',
        }}
      />
    </Box>
  );
}
