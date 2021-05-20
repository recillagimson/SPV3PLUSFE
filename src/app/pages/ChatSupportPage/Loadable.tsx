/**
 * Asynchronously loads the component
 */

import { lazyLoad } from 'utils/loadable';

export const ChatSupportPage = lazyLoad(
  () => import('./index'),
  module => module.ChatSupportPage,
);
