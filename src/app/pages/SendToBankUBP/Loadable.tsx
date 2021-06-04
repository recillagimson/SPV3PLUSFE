/**
 * Asynchronously loads the component for LandingPage
 */

import { lazyLoad } from 'utils/loadable';

export const SendToBankUBP = lazyLoad(
  () => import('./index'),
  module => module.SendToBankUBP,
);
