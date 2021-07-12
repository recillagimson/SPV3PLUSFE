/**
 * Asynchronously loads the component
 */

import { lazyLoad } from 'utils/loadable';

export const UpdateEmailPage = lazyLoad(
  () => import('./index'),
  module => module.UpdateEmailPage,
);
