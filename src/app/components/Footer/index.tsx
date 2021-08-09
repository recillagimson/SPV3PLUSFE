/**
 * Footer Component
 */
import * as React from 'react';
import build from 'build.json';

import Wrapper from './Wrapper';

export default function FooterComponent() {
  return (
    <Wrapper className="site-footer">
      <p>
        &copy; {new Date().getFullYear()} SquidPay Technology Inc. -{' '}
        <span>(Build: {build.build_no})</span>
      </p>
    </Wrapper>
  );
}
