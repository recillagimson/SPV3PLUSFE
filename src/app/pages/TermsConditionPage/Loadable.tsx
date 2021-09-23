/**
 * Asynchronously loads the component for PayBillsPage
 */

import { lazyLoad } from 'utils/loadable';

export const TermsAndConditionPage = lazyLoad(
  () => import('./index'),
  module => module.TermsAndConditionPage,
);
