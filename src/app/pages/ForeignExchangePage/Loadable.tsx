/**
 * Asynchronously loads the component for PayBillsPage
 */

import { lazyLoad } from 'utils/loadable';

export const ForeignExchangePage = lazyLoad(
  () => import('./index'),
  module => module.ForeignExchangePage,
);
