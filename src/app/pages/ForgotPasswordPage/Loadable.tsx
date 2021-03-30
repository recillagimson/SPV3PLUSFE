/**
 * Asynchronously loads the component for LandingPage
 */

import { lazyLoad } from 'utils/loadable';

export const ForgotPasswordPage = lazyLoad(
  () => import('./index'),
  module => module.ForgotPasswordPage,
);
