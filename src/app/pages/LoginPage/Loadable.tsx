/**
 * Asynchronously loads the component for LandingPage
 */

import { lazyLoad } from 'utils/loadable';

export const LoginPage = lazyLoad(
  () => import('./index'),
  module => module.LoginPage,
);
