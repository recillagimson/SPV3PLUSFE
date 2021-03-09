/**
 * Asynchronously loads the component for CardMemberAgreementPage
 */

import { lazyLoad } from 'utils/loadable';

export const CardMemberAgreementPage = lazyLoad(
  () => import('./index'),
  module => module.CardMemberAgreementPage,
);
