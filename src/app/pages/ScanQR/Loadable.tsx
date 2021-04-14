/**
 * Asynchronously loads the component for LandingPage
 */

import { lazyLoad } from 'utils/loadable';

export const ScanQR = lazyLoad(
  () => import('./index'),
  module => module.ScanQR,
);
