/**
 * Asynchronously loads the component for LandingPage
 */

import { lazyLoad } from 'utils/loadable';

export const AddMoneyViaBPIPage = lazyLoad(
  () => import('./index'),
  module => module.AddMoneyViaBPIPage,
);

export const AddMoneyViaBPIAccountSelect = lazyLoad(
  () => import('./SelectAccount'),
  module => module.BPISelectAccountPage,
);

export const AddMoneyViaBPIVerification = lazyLoad(
  () => import('./Verification'),
  module => module.BPIVerificationPage,
);
