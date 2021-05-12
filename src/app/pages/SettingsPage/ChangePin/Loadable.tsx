/**
 * Asynchronously loads the component
 */

import { lazyLoad } from 'utils/loadable';

export const SettingsChangePasswordPage = lazyLoad(
  () => import('./index'),
  module => module.SettingsChangePasswordPage,
);
