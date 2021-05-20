/**
 * Asynchronously loads the component for LandingPage
 */

import { lazyLoad } from 'utils/loadable';

export const GenerateQR = lazyLoad(
  () => import('./index'),
  module => module.GenerateQR,
);
