// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly
import { GlobalState } from 'app/App/slice/types';

// pages
import { LoginState } from 'app/pages/LoginPage/slice/types';
import { RegisterState } from 'app/pages/RegisterPage/slice/types';

// components
import { UpdatePasswordState } from 'app/components/UpdatePassword/slice/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  global?: GlobalState;
  login?: LoginState;
  register?: RegisterState;
  updatePassword?: UpdatePasswordState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
