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
  // if we have a payload body response on error
  if (err.json) {
    const error = new Error('Fetch failed');
    const body = await err.json();
    // @ts-ignore
    error.message = JSON.stringify(body);

    // log the 401 and 422 as info only, else all are error
    if (err.status === 401 || err.status === 404 || err.status === 422) {
      Sentry.addBreadcrumb({
        category: 'fetch error',
        data: {
          url: err.url.match(/\/\/[^\/]+\/([^\.]+)/)[1], // eslint-disable-line no-useless-escape
          message: body.message,
          errors: JSON.stringify(body.errors ? body.errors : ''),
        },
        level: Sentry.Severity.Info,
      });
      Sentry.captureMessage('Fetch failed');
    } else {
      Sentry.addBreadcrumb({
        category: 'fetch error',
        data: {
          url: err.url.match(/\/\/[^\/]+\/([^\.]+)/)[1], // eslint-disable-line no-useless-escape
          message: body.message,
          errors: JSON.stringify(body.errors ? body.errors : ''),
        },
        level: Sentry.Severity.Warning,
      });
      Sentry.captureMessage('Fetch failed');
    }

    return; // return immediately
  }

  Sentry.captureException(err);
};

// set the user_id
export const setSentryUser = (id: string) => {
  Sentry.setUser({ id });
};

// remove user
export const removeSentryUser = () => {
  Sentry.configureScope(scope => scope.setUser(null));
};
