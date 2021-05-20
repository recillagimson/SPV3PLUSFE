/**
 * Asynchronously loads the component
 */

import { lazyLoad } from 'utils/loadable';

export const MerchantInquiryPage = lazyLoad(
  () => import('./index'),
  module => module.MerchantInquiryPage,
);
