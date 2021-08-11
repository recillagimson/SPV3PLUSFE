/**
 * Declare your routes here together with the component
 * for one source of truth in our routes
 * NOTE: this might be extended for feature enable/disable
 *       add your route at the end of the array
 */
/** Import our pages */
import { DashboardPage } from 'app/pages/DashboardPage/Loadable';
import { LoginPage } from 'app/pages/LoginPage/Loadable';
import { RegisterPage } from 'app/pages/RegisterPage/Loadable';
import { ForgotPasswordPage } from 'app/pages/ForgotPasswordPage/Loadable';
import { SendMoney } from 'app/pages/SendMoney/Loadable';
import { ScanQR } from 'app/pages/ScanQR/Loadable';
import { OnlineBank } from 'app/pages/OnlineBank/Loadable';
import { BuyLoad } from 'app/pages/BuyLoadPage/Loadable';
import { UserProfilePage } from 'app/pages/ProfilePage/Loadable';
import { PayBillsPage } from 'app/pages/PayBillsPage/Loadable';
import { BuyEpins } from 'app/pages/BuyEpinPage/Loadable';

type RouteProps = {
  path: string;
  component: any;
  secured: boolean;
  enabled: boolean;
  exact: boolean;
}[];

const pageRoutes: RouteProps = [
  {
    path: '/',
    component: LoginPage,
    secured: false,
    enabled: true,
    exact: true,
  },
  {
    path: '/register',
    component: RegisterPage,
    secured: false,
    enabled: true,
    exact: true,
  },
  {
    path: '/forgotpassword',
    component: ForgotPasswordPage,
    secured: false,
    enabled: true,
    exact: true,
  },
  {
    path: '/dashboard',
    component: DashboardPage,
    secured: true,
    enabled: true,
    exact: false,
  },
  {
    path: '/sendmoney',
    component: SendMoney,
    secured: true,
    enabled: true,
    exact: false,
  },
  {
    path: '/scanqr',
    component: ScanQR,
    secured: true,
    enabled: true,
    exact: false,
  },
  {
    path: '/onlinebank',
    component: OnlineBank,
    secured: true,
    enabled: true,
    exact: false,
  },
  {
    path: '/buyload',
    component: BuyLoad,
    secured: true,
    enabled: true,
    exact: false,
  },
  {
    path: '/buy-epins',
    component: BuyEpins,
    secured: true,
    enabled: true,
    exact: false,
  },
  {
    path: '/profile',
    component: UserProfilePage,
    secured: true,
    enabled: true,
    exact: false,
  },
  {
    path: '/pay-bills',
    component: PayBillsPage,
    secured: true,
    enabled: true,
    exact: false,
  },
];

export default pageRoutes;
