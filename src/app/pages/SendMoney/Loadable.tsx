/**
 * Asynchronously loads the component for LandingPage
 */

 import { lazyLoad } from 'utils/loadable';

 export const SendMoney = lazyLoad(
   () => import('./index'),
   module => module.SendMoney,
 );
 