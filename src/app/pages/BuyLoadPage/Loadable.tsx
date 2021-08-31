/**
 * Asynchronously loads the component for LandingPage
 */

import { lazyLoad } from 'utils/loadable';

export const BuyLoadIndexPage = lazyLoad(
  () => import('./index'),
  module => module.BuyLoadIndexPage,
);

export const BuyLoadPage = lazyLoad(
  () => import('./Load'),
  module => module.BuyLoadPage,
);

export const BuyEpinsPage = lazyLoad(
  () => import('./EPins'),
  module => module.BuyEpinsPage,
);
