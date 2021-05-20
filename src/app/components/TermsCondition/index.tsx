/**
 * Terms and Conditions
 * for import only
 */
import * as React from 'react';

import Box from 'app/components/Box';

export default function PrivacyPolicy() {
  return (
    <Box title="Terms and Conditions" titleBorder withPadding>
      <iframe
        src="https://squidpay.ph/tac"
        title="Terms and Conditions"
        style={{
          paddingTop: 30,
          width: '100%',
          height: '85vh',
        }}
      />
    </Box>
  );
}
