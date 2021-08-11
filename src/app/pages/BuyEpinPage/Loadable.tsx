/**
 * Asynchronously loads the component for LandingPage
 */

import { lazyLoad } from 'utils/loadable';

export const BuyEpins = lazyLoad(
  () => import('./index'),
  module => module.BuyEpins,
);
