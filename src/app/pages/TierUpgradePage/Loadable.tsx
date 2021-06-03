/**
 * Asynchronously loads the component
 */

import { lazyLoad } from 'utils/loadable';

export const TiersPage = lazyLoad(
  () => import('./index'),
  module => module.TiersPage,
);

export const TierUpgradePage = lazyLoad(
  () => import('./TierUpgrade'),
  module => module.TierUpgradePage,
);
