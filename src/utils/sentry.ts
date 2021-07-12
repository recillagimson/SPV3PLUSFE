/**
 * Sentry IO integration
 */

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

export const initSentry = () => {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_SENTRY_ENV,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: process.env.NODE_ENV !== 'production' ? 1 : 0.2,
    release: process.env.REACT_APP_VERSION,
  });
};

export const captureException = async (err: any) => {
  const body = await err.json();
  const error = new Error('Fetch failed');

  // @ts-ignore
  error.message = JSON.stringify(body);

  Sentry.captureException(error);
};

// set the user_id
export const setSentryUser = (id: string) => {
  Sentry.setUser({ id });
};

// remove user
export const removeSentryUser = () => {
  Sentry.configureScope(scope => scope.setUser(null));
};
