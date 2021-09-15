/**
 * Asynchronously loads the component for PayBillsPage
 */

import { lazyLoad } from 'utils/loadable';

export const LoansPage = lazyLoad(
  () => import('./index'),
  module => module.LoansPage,
);
