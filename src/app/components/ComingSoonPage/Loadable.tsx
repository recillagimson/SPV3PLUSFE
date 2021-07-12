/**
 * Asynchronously loads the component for NotFoundPage
 */

import { lazyLoad } from 'utils/loadable';

export const ComingSoonPage = lazyLoad(
  () => import('./index'),
  module => module.ComingSoonPage,
);
