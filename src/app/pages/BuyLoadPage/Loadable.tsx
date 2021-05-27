/**
 * Asynchronously loads the component for LandingPage
 */

import { lazyLoad } from 'utils/loadable';

export const BuyLoad = lazyLoad(
  () => import('./index'),
  module => module.BuyLoad,
);
