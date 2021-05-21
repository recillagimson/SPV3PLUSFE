/**
 * Asynchronously loads the component
 */

import { lazyLoad } from 'utils/loadable';

export const SettingsChangePinPage = lazyLoad(
  () => import('./index'),
  module => module.SettingsChangePinPage,
);
