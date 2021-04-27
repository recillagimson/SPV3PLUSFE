/**
 * Footer Component
 */
import * as React from 'react';

import Wrapper from './Wrapper';

export default function FooterComponent() {
  return (
    <Wrapper className="site-footer">
      <p>&copy; {new Date().getFullYear()} SquidPay Technology Inc.</p>
    </Wrapper>
  );
}
