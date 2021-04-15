/**
 * Asynchronously loads the component for TransactionHistoryPage
 */

import { lazyLoad } from 'utils/loadable';

export const TransactionHistoryPage = lazyLoad(
  () => import('./index'),
  module => module.TransactionHistoryPage,
);
