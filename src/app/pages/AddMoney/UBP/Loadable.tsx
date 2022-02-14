/**
 * Asynchronously loads the component for LandingPage
 */

import { lazyLoad } from 'utils/loadable';

export const AddMoneyViaUBPPage = lazyLoad(
  () => import('./index'),
  module => module.AddMoneyViaUBPPage,
);

// export const AddMoneyViaBPIAccountSelect = lazyLoad(
//   () => import('./SelectAccount'),
//   module => module.BPISelectAccountPage,
// );

// export const AddMoneyViaBPIVerification = lazyLoad(
//   () => import('./Verification'),
//   module => module.BPIVerificationPage,
// );
