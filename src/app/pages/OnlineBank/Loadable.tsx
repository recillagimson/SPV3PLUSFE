/**
 * Asynchronously loads the component for LandingPage
 */

import { lazyLoad } from 'utils/loadable';

export const OnlineBank = lazyLoad(
  () => import('./index'),
  module => module.OnlineBank,
);
