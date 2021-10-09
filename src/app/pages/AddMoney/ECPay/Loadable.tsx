/**
 * Asynchronously loads the component for LandingPage
 */

import { lazyLoad } from 'utils/loadable';

export const ECPay = lazyLoad(
  () => import('./index'),
  module => module.ECPay,
);
