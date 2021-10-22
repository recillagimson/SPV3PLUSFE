/**
 * Asynchronously loads the component for LandingPage
 */

import { lazyLoad } from 'utils/loadable';

export const MyQrCodePage = lazyLoad(
  () => import('./index'),
  module => module.MyQrCodePage,
);
