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
        &copy; {new Date().getFullYear()} SquidPay Technology Inc.
        {process.env.REACT_APP_SENTRY_ENV !== 'release' && (
          <span className="small">
            (v{process.env.REACT_APP_VERSION} build: {build.build_no})
          </span>
        )}
      </p>
    </Wrapper>
  );
}
