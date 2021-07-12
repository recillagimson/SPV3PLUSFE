/**
 * Sentry IO integration
 */

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

export const _frontmatter = {};

export const initSentry = () => {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_SENTRY_ENV,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1,
  });
};

// set the user_id
export const setSentryUser = (id: string) => {
  Sentry.setUser({ id });
};

// remove user
export const removetSentryUser = () => {
  Sentry.configureScope(scope => scope.setUser(null));
};
