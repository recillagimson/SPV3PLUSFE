/**
 * Asynchronously loads the component for TransactionHistoryPage and TransactionHistoryDetailsPage
 */

import { lazyLoad } from 'utils/loadable';

export const TransactionHistoryPage = lazyLoad(
  () => import('./index'),
  module => module.TransactionHistoryPage,
);

export const TransactionHistoryDetailsPage = lazyLoad(
  () => import('./Details'),
  module => module.TransactionHistoryDetailsPage,
);

export const TransactionRequestPage = lazyLoad(
  () => import('./TransactionRequest'),
  module => module.TransactionRequestPage,
);
