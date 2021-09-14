/**
 * Asynchronously loads the component
 */

import { lazyLoad } from 'utils/loadable';

export const PrivacyPolicyPage = lazyLoad(
  () => import('./index'),
  module => module.PrivacyPolicyPage,
);
