/**
 * Asynchronously loads the component for PayBillsPage
 */

import { lazyLoad } from 'utils/loadable';

export const Dragonpay = lazyLoad(
  () => import('./index'),
  module => module.Dragonpay,
);
