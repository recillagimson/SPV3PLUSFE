/**
 * Footer Component
 */
import * as React from 'react';

import Wrapper from './Wrapper';

export default function FooterComponent() {
  return (
    <Wrapper className="site-footer">
      <p>&copy; SquidPay {new Date().getFullYear()}</p>
    </Wrapper>
  );
}
