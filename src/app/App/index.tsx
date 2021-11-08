/* eslint-disable react-hooks/exhaustive-deps */
/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import IdleTimer from 'utils/useIdleTime';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import spdCrypto from 'app/components/Helpers/EncyptDecrypt';
import build from 'build.json';

import Main from 'app/components/Layouts/Main';
import Content from 'app/components/Layouts/Content';
import Header from 'app/components/Header';
import Footer from 'app/components/Footer';
import Sidebar from 'app/components/Sidebar';
import Dialog from 'app/components/Dialog';
import Button from 'app/components/Elements/Button';
import CircleIndicator from 'app/components/Elements/CircleIndicator';

import { doSignOut, getCookie } from 'app/components/Helpers';

import FlagsProvider from 'utils/FlagsProvider';
import { GlobalStyle } from 'styles/global-styles';

import { DashboardPage } from 'app/pages/DashboardPage/Loadable';
import { LoginPage } from 'app/pages/LoginPage/Loadable';
import { RegisterPage } from 'app/pages/RegisterPage/Loadable';
import { ForgotPasswordPage } from 'app/pages/ForgotPasswordPage/Loadable';
import { SendMoney } from 'app/pages/SendMoney/Loadable';
import { GenerateQR } from 'app/pages/GenerateQR/Loadable';
import { AddMoneyViaBPI } from 'app/pages/AddMoney/AddMoneyViaBPIPage/Loadable';
import { MyQrCodePage } from 'app/pages/MyQrCodePage/Loadable';
import { QrPages } from 'app/pages/QrPages/Loadable';
import { AddMoneyViaUBP } from 'app/pages/AddMoney/AddMoneyViaUBPPage/Loadable';
import { OnlineBank } from 'app/pages/OnlineBank/Loadable';
import {
  BuyLoadIndexPage,
  BuyLoadPage,
  BuyEpinsPage,
} from 'app/pages/BuyLoadPage/Loadable';

import { UserProfilePage } from 'app/pages/ProfilePage/Loadable';
import {
  TransactionHistoryPage,
  TransactionHistoryDetailsPage,
  TransactionRequestPage,
} from 'app/pages/TransactionHistoryPage/Loadable';
import {
  HelpCenterPage,
  FAQPage,
  PrivacyPolicyConsent,
  TermsAndConditionConsent,
} from 'app/pages/HelpCenterPage/Loadable';
import { SendToBank } from 'app/pages/SendToBank/Loadable';
import { SendToBankUBP } from 'app/pages/SendToBankUBP/Loadable';
import { SettingsPage } from 'app/pages/SettingsPage/Loadable';
import { SettingsChangePasswordPage } from 'app/pages/SettingsPage/ChangePassword/Loadable';
import { SettingsChangePinPage } from 'app/pages/SettingsPage/ChangePin/Loadable';
import { Notifications } from 'app/pages/Notification';
import { UpdateProfileVerificationPage } from 'app/pages/UpdateProfileVerificationPage/Loadable';
import { ContactUsPage } from 'app/pages/ContactUsPage/Loadable';
import { ChatSupportPage } from 'app/pages/ChatSupportPage/Loadable';
import { MerchantInquiryPage } from 'app/pages/MerchantInquiry/Loadable';
import { PayBillsPage } from 'app/pages/PayBillsPage/Loadable';
import { TiersPage, TierUpgradePage } from 'app/pages/TierUpgradePage/Loadable';
import { UpdateEmailPage } from 'app/pages/UpdateEmail/Loadable';
import { AddMoney } from 'app/pages/AddMoney/Loadable';
import { Dragonpay } from 'app/pages/AddMoney/Dragonpay/Loadable';
import { ECPay } from 'app/pages/AddMoney/ECPay/Loadable';
// #endregion

import { ForeignExchangePage } from 'app/pages/ForeignExchangePage/Loadable';
import { LoansPage } from 'app/pages/LoansPage/Loadable';
import { PrivacyPolicyPage } from 'app/pages/PrivacyPolicyPage/Loadable';
import { TermsAndConditionPage } from 'app/pages/TermsConditionPage/Loadable';
import { NotFoundPage } from 'app/components/NotFoundPage/Loadable';
import { Page500 } from 'app/components/500/Loadable';
import { ComingSoonPage } from 'app/components/ComingSoonPage/Loadable';

/** Postback URL */
import DragonpaySuccessPostback from './DragonpayPostback';
import SuccessPostBack from './SuccessPostback';

// import pageRoutes from './Routes';

// private routes, use this component in rendering pages
// that should only be accessible with the logged in user
import PrivateRoute from './PrivateRoute';

/** selectors, slice */
import { containerActions as addMoneyBpiAction } from 'app/pages/AddMoney/AddMoneyViaBPIPage/slice';
import { useAppSaga } from './slice';
import { useContainerSaga } from 'app/pages/DashboardPage/slice';

import {
  selectSessionExpired,
  selectIsAuthenticated,
  selectIsBlankPage,
  setIsUnathenticated,
  selectIsServerError,
} from './slice/selectors';
// import { captureException } from 'utils/sentry';
// import { usePrevious } from 'app/components/Helpers/Hooks';

// default flags for features
const defaultFlags = {
  add_money_dragon_pay_enabled: true,
  buy_load_enabled: true,
  send_money_enabled: true,
  send_money_via_qr_enabled: true,
  send_to_bank_ubp_enabled: true,
  pay_bills_enabled: true,
  add_money_bpi_enabled: true,
  add_money_ecpay_enabled: true,
};

export function App() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const history = useHistory();

  // sample usage of slice (react redux)
  const { actions } = useAppSaga();
  const { actions: dashboardAction } = useContainerSaga();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isSessionExpired = useSelector(selectSessionExpired);
  const isBlankPage = useSelector(selectIsBlankPage);
  const isServerError = useSelector(selectIsServerError);
  const clientTokenExpired = useSelector(setIsUnathenticated); // use this only on users who hasn't logged in yet

  // const [flags, setFlags] = React.useState(defaultFlags);
  const [isTimeout, setIsTimeout] = React.useState(false);

  React.useEffect(() => {
    /**
     * Check if we have the references in the local storage
     * this will reduce the load time
     * TODO: references update behind the background
     */
    let refs = {
      maritalStatus: localStorage.getItem('spv_marital')
        ? JSON.parse(localStorage.getItem('spv_marital') || '')
        : false,
      natureOfWork: localStorage.getItem('spv_nature')
        ? JSON.parse(localStorage.getItem('spv_nature') || '')
        : false,
      nationalities: localStorage.getItem('spv_nationalities')
        ? JSON.parse(localStorage.getItem('spv_nationalities') || '')
        : false,
      countries: localStorage.getItem('spv_countries')
        ? JSON.parse(localStorage.getItem('spv_countries') || '')
        : false,
      signUpHost: localStorage.getItem('spv_signup')
        ? JSON.parse(localStorage.getItem('spv_signup') || '')
        : false,
      currency: localStorage.getItem('spv_currencies')
        ? JSON.parse(localStorage.getItem('spv_currencies') || '')
        : false,
      sourceOfFunds: localStorage.getItem('spv_source')
        ? JSON.parse(localStorage.getItem('spv_source') || '')
        : false,
    };

    if (refs) {
      dispatch(actions.getSaveAllReferences(refs));
    }
    /**
     * Check Session and necessary cookies for the token
     */
    const path: string | boolean = location ? location.pathname : '/dashboard';
    const phrase = getCookie('spv_uat_hmc'); // retrieve the passphrase use for encrypting
    const sessionCookie = getCookie('spv_uat'); // user token
    const clientCookie = getCookie('spv_cat') || ''; // client token
    const userCookie = getCookie('spv_uat_u'); // login email/mobile
    const forceUpdate = getCookie('spv_uat_f');

    let param = new URLSearchParams(location.search).get('code');
    let code;
    if (param && sessionStorage.getItem('ubpUrl')) {
      code = {
        type: 'ubp',
        value: param ?? '',
      };
    }
    if (param && !sessionStorage.getItem('ubpUrl')) {
      code = {
        type: 'bpi',
        value: param ?? '',
      };
    }

    let decrypt: any = false;
    let username: string = '';

    // decrypted the encrypted cookies
    if (phrase && sessionCookie) {
      decrypt = spdCrypto.decrypt(sessionCookie, phrase);
      username = userCookie ? spdCrypto.decrypt(userCookie, phrase) : '';
    }

    if (!forceUpdate && decrypt && code && path === '/') {
      dispatch(actions.getClientTokenLoading());
      dispatch(actions.getIsAuthenticated(true));
      dispatch(actions.getClientTokenSuccess(JSON.parse(clientCookie)));
      dispatch(actions.getUserToken(decrypt.user_token));
      dispatch(actions.getSaveLoginName(username));

      // delay the retrieval of dashboard and user profile
      setTimeout(() => {
        dispatch(actions.getLoadUserProfile());
        dispatch(dashboardAction.getFetchLoading());
        dispatch(addMoneyBpiAction.getFetchAccessTokenLoading(bpiCode));
      }, 2000);

      if (code?.type === 'bpi') {
        history.push('/add-money/bpi/select-account');
      }

      if (code?.type === 'ubp') {
        history.push({
          pathname: '/add-money/ubp',
          search: `?code=${code?.value}`,
        });
      }
    }

    if (!forceUpdate && decrypt && !path.includes('/postback') && !code) {
      dispatch(actions.getIsAuthenticated(true));
      dispatch(actions.getClientTokenSuccess(JSON.parse(clientCookie)));
      dispatch(actions.getUserToken(decrypt.user_token));
      dispatch(actions.getSaveLoginName(username));

      // delay the retrieval of references and user profile
      setTimeout(() => {
        // dispatch(actions.getLoadReferences());
        dispatch(actions.getLoadUserProfile());
      }, 2000);

      history.push('/dashboard');
    } else if (forceUpdate) {
      dispatch(actions.getClientTokenLoading());
      history.push('/register/update-profile');
    } else {
      dispatch(actions.getClientTokenLoading());
    }

    // remote config
    // getRemoteConfigValues();
  }, []);

  React.useEffect(() => {
    /** enable this for FB customer chat if we are going to use this */
    if (
      isAuthenticated &&
      process.env.NODE_ENV === 'production' && // @ts-ignore
      !window.fbAsyncInit
    ) {
      loadFbAsync(); // load fb
    }
  }, [isAuthenticated]);

  React.useEffect(() => {
    if (isServerError) {
      history.push('/error');
      dispatch(actions.getIsServerError(false));
    }
  }, [isServerError]);

  const onClickSessionExpired = () => {
    doSignOut();
  };

  /** Enable if FB Chat will be use, do not delete */
  const loadFbAsync = () => {
    var chatbox: any = document.getElementById('fb-customer-chat');
    chatbox.setAttribute('page_id', '100608264934915');
    chatbox.setAttribute('attribution', 'biz_inbox');
    // @ts-ignore
    window.fbAsyncInit = function () {
      // @ts-ignore
      FB.init({
        xfbml: true,
        version: 'v10.0',
      });
    };

    (function (d, s, id) {
      var js,
        fjs: any = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  };

  const bpiCode = new URLSearchParams(location.search).get('code'); // add money
  const currentLocation = location ? location.pathname : '';
  let showHeaderFooter = false;
  if (currentLocation) {
    if (
      !currentLocation.includes('/postback') &&
      currentLocation !== '/privacy-policy' &&
      currentLocation !== '/terms-and-conditions' &&
      !bpiCode
    ) {
      showHeaderFooter = true;
    }
  }

  return (
    <FlagsProvider defaultFlags={defaultFlags}>
      <Helmet
        titleTemplate="%s - SquidPay"
        defaultTitle="SquidPay"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta
          name="app-version"
          content={`v${process.env.REACT_APP_VERSION} build: ${build.build_no}`}
        />
      </Helmet>

      <Main className={isAuthenticated ? 'spdin' : undefined}>
        {showHeaderFooter && (
          <Header
            isLoggedIn={isAuthenticated}
            blankPage={isBlankPage ? true : false}
          />
        )}
        {!isBlankPage && isAuthenticated && <Sidebar />}
        <Content className={isAuthenticated ? 'authenticated' : undefined}>
          <Switch>
            {/* this will be a sample pageRoutes mapping
                should be enable once we figure the tiering, and app feature enable/disable
            {pageRoutes.map(i => {
              if (i.enabled) {
                if (i.secured) {
                  return (
                    <PrivateRoute
                      key={i.path}
                      path={i.path}
                      exact={i.exact}
                      component={i.component}
                    />
                  );
                }

                return (
                  <Route
                    key={i.path}
                    exact={i.exact}
                    path={i.path}
                    component={i.component}
                  />
                );
              }

              return null;
            })} */}
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route path="/forgotpassword" component={ForgotPasswordPage} />
            <Route
              path="/register/update-profile"
              component={UpdateProfileVerificationPage}
            />
            <Route path="/500" component={Page500} />
            <Route path="/privacy-policy" component={PrivacyPolicyPage} />
            <Route
              path="/terms-and-conditions"
              component={TermsAndConditionPage}
            />
            <Route exact path="/postback" component={SuccessPostBack} />
            <Route
              exact
              path="/postback/dragonpay"
              component={DragonpaySuccessPostback}
            />
            <PrivateRoute path="/dashboard" component={DashboardPage} />
            <PrivateRoute path="/sendmoney" component={SendMoney} />
            <PrivateRoute path="/generateqr" component={GenerateQR} />
            <PrivateRoute path="/my-qr-code" component={MyQrCodePage} />
            <PrivateRoute path="/qr-code" component={QrPages} />
            <PrivateRoute path="/addmoneyviabpi" component={AddMoneyViaBPI} />
            <PrivateRoute path="/onlinebank" component={OnlineBank} />
            <PrivateRoute exact path="/buy" component={BuyLoadIndexPage} />
            <PrivateRoute exact path="/buy/load" component={BuyLoadPage} />
            <PrivateRoute exact path="/buy/epins" component={BuyEpinsPage} />
            <PrivateRoute exact path="/profile" component={UserProfilePage} />
            <PrivateRoute
              exact
              path="/profile/update-email"
              component={UpdateEmailPage}
            />
            <PrivateRoute
              path={['/notifications/:id', '/notifications']}
              component={Notifications}
            />
            <PrivateRoute exact path="/add-money" component={AddMoney} />
            <PrivateRoute
              exact
              path="/add-money/dragonpay"
              component={Dragonpay}
            />
            <PrivateRoute
              exact
              path="/add-money/bpi"
              component={AddMoneyViaBPI}
            />
            <PrivateRoute
              exact
              path="/add-money/ubp"
              component={AddMoneyViaUBP}
            />
            <PrivateRoute
              exact
              path="/add-money/bpi/select-account"
              component={AddMoneyViaBPI}
            />
            <PrivateRoute exact path="/add-money/ecpay" component={ECPay} />
            <PrivateRoute
              exact
              path="/transaction-history"
              component={TransactionHistoryPage}
            />
            <PrivateRoute
              exact
              path="/transaction-history/:id"
              component={TransactionHistoryDetailsPage}
            />
            <PrivateRoute
              exact
              path="/transaction-request"
              component={TransactionRequestPage}
            />
            <PrivateRoute
              exact
              path="/foreign-exchange"
              component={ForeignExchangePage}
            />
            <PrivateRoute exact path="/loans" component={LoansPage} />
            <PrivateRoute
              exact
              path="/help-center"
              component={HelpCenterPage}
            />
            <PrivateRoute exact path="/help-center/faq" component={FAQPage} />
            <PrivateRoute
              exact
              path="/help-center/privacy-policy"
              component={PrivacyPolicyConsent}
            />
            <PrivateRoute
              exact
              path="/help-center/terms-and-condition"
              component={TermsAndConditionConsent}
            />
            <PrivateRoute exact path="/send-to-bank" component={SendToBank} />
            <PrivateRoute
              exact
              path="/send-to-bank/ubp"
              component={SendToBankUBP}
            />
            <PrivateRoute exact path="/settings" component={SettingsPage} />
            <PrivateRoute
              exact
              path="/settings/change-password"
              component={SettingsChangePasswordPage}
            />
            <PrivateRoute
              exact
              path="/settings/change-pin"
              component={SettingsChangePinPage}
            />
            <PrivateRoute exact path="/contact-us" component={ContactUsPage} />
            <PrivateRoute
              exact
              path="/chat-support"
              component={ChatSupportPage}
            />
            <PrivateRoute
              exact
              path="/merchant-inquiry"
              component={MerchantInquiryPage}
            />
            <PrivateRoute exact path="/pay-bills" component={PayBillsPage} />
            <PrivateRoute exact path="/tiers" component={TiersPage} />
            <PrivateRoute
              exact
              path="/tiers/upgrade"
              component={TierUpgradePage}
            />

            {/* Not found page should be the last entry for this <Switch /> container */}
            <Route path="/error" component={Page500} />
            <Route path="/comingsoon" component={ComingSoonPage} />
            <Route component={NotFoundPage} />
          </Switch>
          {(!isBlankPage || showHeaderFooter) && <Footer />}
        </Content>
      </Main>
      <Dialog show={isTimeout} size="small">
        <div className="text-center" style={{ padding: '25px' }}>
          <CircleIndicator size="medium" color="primary">
            <FontAwesomeIcon icon="stopwatch" />
          </CircleIndicator>
          <p style={{ margin: '15px 0 10px' }}>
            <strong>Oops, Your session has expired.</strong>
          </p>
          <p>You have been automatically logged out due to inactivity.</p>
          <Button
            fullWidth
            onClick={onClickSessionExpired}
            variant="contained"
            color="primary"
          >
            Ok
          </Button>
        </div>
      </Dialog>

      <Dialog show={isSessionExpired} size="small">
        <div className="text-center" style={{ padding: '25px' }}>
          <CircleIndicator size="medium" color="primary">
            <FontAwesomeIcon icon="stopwatch" />
          </CircleIndicator>
          <p style={{ margin: '15px 0 10px' }}>
            <strong>Oops, Your session has expired.</strong>
          </p>
          <p>You have been automatically logged out due to session expiry.</p>
          <Button
            fullWidth
            onClick={onClickSessionExpired}
            variant="contained"
            color="primary"
          >
            Ok
          </Button>
        </div>
      </Dialog>

      <Dialog show={clientTokenExpired} size="small">
        <div className="text-center" style={{ padding: '25px' }}>
          <CircleIndicator size="medium" color="primary">
            <FontAwesomeIcon icon="stopwatch" />
          </CircleIndicator>
          <p style={{ margin: '15px 0 10px' }}>
            <strong>Oops, Your session token has expired.</strong>
          </p>
          <p>Kindly refresh to the page to try again.</p>
          <Button
            fullWidth
            onClick={onClickSessionExpired}
            variant="contained"
            color="primary"
          >
            Refresh
          </Button>
        </div>
      </Dialog>
      <GlobalStyle />

      {/* Idle Timer */}
      {isAuthenticated && (
        <IdleTimer
          idle={process.env.REACT_APP_IDLE_TIME || 3000000}
          onTimeout={() => setIsTimeout(true)}
        />
      )}

      {/*  FB element containers */}
      <div id="fb-root"></div>
      <div id="fb-customer-chat" className="fb-customerchat" />
    </FlagsProvider>
  );
}
