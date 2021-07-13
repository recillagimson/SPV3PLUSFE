/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import FontFaceObserver from 'fontfaceobserver';
import * as Sentry from '@sentry/react';

// initial sentry
import { initSentry } from './utils/sentry';
// error boundary
import { ErrorFallback } from './utils/errorBoundary';

// font awesome library
import 'utils/faLibrary';

// Use consistent styling
import 'sanitize.css/sanitize.css';

// Import root app
import { App } from 'app/App';

import { HelmetProvider } from 'react-helmet-async';

import { configureAppStore } from 'store/configureStore';

import reportWebVitals from 'reportWebVitals';

// Initialize languages
import './locales/i18n';

// Initialize firebase
import './utils/firebase';

// session timeout

// Observer font loading for custom font
const fontObserver = new FontFaceObserver('Museo Sans', {});

// When font is loaded, inject class in the body to reflect new font
fontObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

initSentry(); // initialize sentry;
const publicURL = process.env.PUBLIC_URL || '';
const store = configureAppStore();
const MOUNT_NODE = document.getElementById('appMain') as HTMLElement;

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      <React.StrictMode>
        <BrowserRouter basename={publicURL !== '' ? publicURL : undefined}>
          <Sentry.ErrorBoundary fallback={ErrorFallback}>
            <App />
          </Sentry.ErrorBoundary>
        </BrowserRouter>
      </React.StrictMode>
    </HelmetProvider>
  </Provider>,
  MOUNT_NODE,
);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
