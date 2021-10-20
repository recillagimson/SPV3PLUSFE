/**
 * Asynchronously loads the component for LandingPage
 */

import { lazyLoad } from 'utils/loadable';

export const QrPages = lazyLoad(
  () => import('./index'),
  module => module.QrPages,
);
