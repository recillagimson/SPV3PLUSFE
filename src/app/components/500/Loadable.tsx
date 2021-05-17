/**
 * Asynchronously loads the component
 */

import { lazyLoad } from 'utils/loadable';

export const Page500 = lazyLoad(
  () => import('./index'),
  module => module.Page500,
);
