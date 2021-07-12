/**
 * Asynchronously loads the component for PayBillsPage
 */

import { lazyLoad } from 'utils/loadable';

export const DataPrivacyConsent = lazyLoad(
  () => import('./index'),
  module => module.DataPrivacyConsent,
);
