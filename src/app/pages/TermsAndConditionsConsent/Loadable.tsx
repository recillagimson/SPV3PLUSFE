/**
 * Asynchronously loads the component for PayBillsPage
 */

import { lazyLoad } from 'utils/loadable';

export const TermsAndConditionConsent = lazyLoad(
  () => import('./index'),
  module => module.TermsAndConditionConsent,
);
