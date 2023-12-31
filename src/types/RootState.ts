// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly
import { GlobalState } from 'app/App/slice/types';

// pages
import { LoginState } from 'app/pages/LoginPage/slice/types';
import { RegisterState } from 'app/pages/RegisterPage/slice/types';
import { ForgotPasswordState } from 'app/pages/ForgotPasswordPage/slice/types';
import { SendMoneyState } from 'app/pages/SendMoney/slice/types';
import { GenerateQRState } from 'app/pages/GenerateQR/slice/types';
import { BuyEpinsState } from 'app/pages/BuyLoadPage/EPins/slice/types';
import { BuyLoadState } from 'app/pages/BuyLoadPage/Load/slice/types';
import { ProfileState } from 'app/pages/ProfilePage/slice/types';
import { NotificationsState } from 'app/pages/Notification/slice/types';
import { AddMoneyDragonpayState } from 'app/pages/AddMoney/Dragonpay/slice/types';
import { AddMoneyBpiState } from './../app/pages/AddMoney/AddMoneyViaBPIPage/slice/types';
import { AddMoneyECPayState } from './../app/pages/AddMoney/ECPay/slice/types';
import { AddMoneyUbpState } from './../app/pages/AddMoney/AddMoneyViaUBPPage/slice/types';
import { ChangePasswordState } from 'app/pages/SettingsPage/ChangePassword/slice/types';
import { ChangePinState } from 'app/pages/SettingsPage/ChangePin/slice/types';
import { DashboardState } from 'app/pages/DashboardPage/slice/types';
import { TransactionHistoryState } from 'app/pages/TransactionHistoryPage/slice/types';
import { ForeignExchangeState } from 'app/pages/ForeignExchangePage/slice/types';
import { PayBillsState } from 'app/pages/OldPayBillsPage/slice/types';
import { TierUpgradeState } from 'app/pages/TierUpgradePage/slice/types';
import { SendToBankUBPState } from 'app/pages/SendToBankUBP/slice/types';
import { UpdateEmailState } from 'app/pages/UpdateEmail/slice/types';

// components
import { UpdatePasswordState } from 'app/components/UpdatePassword/slice/types';
import { VerifyOTPState } from 'app/components/VerifyOTP/slice/types';
import { ProfileBronzeState } from 'app/components/UpdateProfile/Bronze/slice/types';
import { ProfileSilverState } from 'app/components/UpdateProfile/Silver/slice/types';
import { UpdateProfileState } from 'app/components/UpdateProfile/Profile/slice/types';

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
  generateQR?: GenerateQRState;
  buyEpins?: BuyEpinsState;
  buyLoad?: BuyLoadState;
  profilePage?: ProfileState;
  profileBronze?: ProfileBronzeState;
  profileSilver?: ProfileSilverState;
  updateProfile?: UpdateProfileState;
  notifications?: NotificationsState;
  addMoneyDragonpay: AddMoneyDragonpayState;
  addMoneyBpi?: AddMoneyBpiState;
  addMoneyECPay?: AddMoneyECPayState;
  addMoneyUbp: AddMoneyUbpState;
  transactionHistory?: TransactionHistoryState;
  foreignExchange?: ForeignExchangeState;
  changePassword?: ChangePasswordState;
  changePin?: ChangePinState;
  dashboard?: DashboardState;
  tierUpgrade?: TierUpgradeState;
  sendToBank?: any;
  sendToBankUBP?: SendToBankUBPState;
  updateEmail?: UpdateEmailState;
  payBills?: PayBillsState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
