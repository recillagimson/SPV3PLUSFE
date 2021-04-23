// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly
import { GlobalState } from 'app/App/slice/types';

// pages
import { LoginState } from 'app/pages/LoginPage/slice/types';
import { RegisterState } from 'app/pages/RegisterPage/slice/types';
import { ForgotPasswordState } from 'app/pages/ForgotPasswordPage/slice/types';
import { ProfileState } from 'app/pages/ProfilePage/slice/types';

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
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
