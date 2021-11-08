/**
 * Asynchronously loads the component for LandingPage
 */

import { lazyLoad } from 'utils/loadable';

export const AddMoneyViaUBP = lazyLoad(
  () => import('./index'),
  module => module.AddMoneyViaUBP,
);
