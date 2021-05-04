/**
 * Asynchronously loads the component
 */

import { lazyLoad } from 'utils/loadable';

export const SettingsPage = lazyLoad(
  () => import('./index'),
  module => module.SettingsPage,
);
