import { TransactionHistoryPage } from 'app/pages/TransactionHistoryPage/Loadable';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly
import { GlobalState } from 'app/App/slice/types';

// pages
import { LoginState } from 'app/pages/LoginPage/slice/types';
import { RegisterState } from 'app/pages/RegisterPage/slice/types';
import { ForgotPasswordState } from 'app/pages/ForgotPasswordPage/slice/types';
import { ProfileState } from 'app/pages/ProfilePage/slice/types';
import { ChangePasswordState } from 'app/pages/SettingsPage/ChangePassword/slice/types';
import { ChangePinState } from 'app/pages/SettingsPage/ChangePin/slice/types';
import { NotificationsState } from 'app/pages/Notification/slice/types';
import { DashboardState } from 'app/pages/DashboardPage/slice/types';
import { TransactionHistoryState } from 'app/pages/TransactionHistoryPage/slice/types';

// components
import { UpdatePasswordState } from 'app/components/UpdatePassword/slice/types';
import { VerifyOTPState } from 'app/components/VerifyOTP/slice/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  global?: GlobalState;
  login?: LoginState;
  register?: RegisterState;
  forgotPassword?: ForgotPasswordState;
  verifyOTP?: VerifyOTPState;
  updatePassword?: UpdatePasswordState;
  profile?: ProfileState;
  notifications?: NotificationsState;

  helpCenter?: any;
  transactionHistory?: TransactionHistoryState;
  changePassword?: ChangePasswordState;
  changePin?: ChangePinState;
  dashboard?: DashboardState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
