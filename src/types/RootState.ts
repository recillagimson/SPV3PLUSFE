// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly
import { GlobalState } from 'app/App/slice/types';

// pages
import { LoginState } from 'app/pages/LoginPage/slice/types';
import { RegisterState } from 'app/pages/RegisterPage/slice/types';
import { ForgotPasswordState } from 'app/pages/ForgotPasswordPage/slice/types';
import { SendMoneyState } from 'app/pages/SendMoney/slice/types';
import { ProfileState } from 'app/pages/ProfilePage/slice/types';
<<<<<<< HEAD
import { NotificationsState } from 'app/pages/Notification/slice/types';
=======
import { ChangePasswordState } from 'app/pages/SettingsPage/ChangePassword/slice/types';
import { ChangePinState } from 'app/pages/SettingsPage/ChangePin/slice/types';
>>>>>>> 5afa8a0c3ca57203bb3fa14be7cb9585c5ff54bf

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
  sendMoney?: SendMoneyState;
  profile?: ProfileState;
  notifications?: NotificationsState;

  helpCenter?: any;


  changePassword?: ChangePasswordState;
  changePin?: ChangePinState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
