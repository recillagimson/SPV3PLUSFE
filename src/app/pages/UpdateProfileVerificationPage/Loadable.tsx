/**
 * Asynchronously loads the component for LandingPage
 */

import { lazyLoad } from 'utils/loadable';

export const UpdateProfileVerificationPage = lazyLoad(
  () => import('./index'),
  module => module.UpdateProfileVerificationPage,
);
