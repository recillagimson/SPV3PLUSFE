/**
 * Asynchronously loads the component for LandingPage
 */

import { lazyLoad } from 'utils/loadable';

export const SendToBank = lazyLoad(
  () => import('./index'),
  module => module.SendToBank,
);
