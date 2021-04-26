/**
 * Asynchronously loads the component for HelpCenterPage
 */

import { lazyLoad } from 'utils/loadable';

export const HelpCenterPage = lazyLoad(
  () => import('./index'),
  module => module.HelpCenterPage,
);
