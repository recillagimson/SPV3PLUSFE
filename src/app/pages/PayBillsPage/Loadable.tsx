/**
 * Asynchronously loads the component for PayBillsPage
 */

import { lazyLoad } from 'utils/loadable';

export const PayBillsPage = lazyLoad(
  () => import('./newindex'),
  module => module.PayBillsPage,
);
