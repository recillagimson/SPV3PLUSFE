/**
 * Asynchronously loads the component for LandingPage
 */

import { lazyLoad } from 'utils/loadable';

export const AddMoneyViaBPI = lazyLoad(
  () => import('./index'),
  module => module.AddMoneyViaBPI,
);
