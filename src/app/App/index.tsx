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
import { Switch, Route, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { remoteConfig } from 'utils/firebase';
import IdleTimer from 'utils/useIdleTime';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import spdCrypto from 'app/components/Helpers/EncyptDecrypt';

import Main from 'app/components/Layouts/Main';
import Content from 'app/components/Layouts/Content';
import Header from 'app/components/Header';
import Footer from 'app/components/Footer';
import Sidebar from 'app/components/Sidebar';
import Dialog from 'app/components/Dialog';
import Button from 'app/components/Elements/Button';
import CircleIndicator from 'app/components/Elements/CircleIndicator';

import { doSignOut, getCookie } from 'app/components/Helpers';

import { GlobalStyle } from 'styles/global-styles';
import { NotFoundPage } from 'app/components/NotFoundPage/Loadable';

import { DashboardPage } from 'app/pages/DashboardPage/Loadable';
// import { CardMemberAgreementPage } from 'app/pages/CardMemberAgreementPage/Loadable';
import { LoginPage } from 'app/pages/LoginPage/Loadable';
import { RegisterPage } from 'app/pages/RegisterPage/Loadable';
import { ForgotPasswordPage } from 'app/pages/ForgotPasswordPage/Loadable';
import { SendMoney } from 'app/pages/SendMoney/Loadable';
import { GenerateQR } from 'app/pages/GenerateQR/Loadable';
import { AddMoneyViaBPI } from 'app/pages/AddMoneyViaBPIPage/Loadable';

// import { ScanQR } from 'app/pages/ScanQR/Loadable';
import { OnlineBank } from 'app/pages/OnlineBank/Loadable';
import { BuyLoad } from 'app/pages/BuyLoadPage/Loadable';
import { UserProfilePage } from 'app/pages/ProfilePage/Loadable';
import {
  TransactionHistoryPage,
  TransactionHistoryDetailsPage,
} from 'app/pages/TransactionHistoryPage/Loadable';
import { HelpCenterPage, FAQPage } from 'app/pages/HelpCenterPage/Loadable';
import { SendToBank } from 'app/pages/SendToBank/Loadable';
import { SettingsPage } from 'app/pages/SettingsPage/Loadable';
import { SettingsChangePasswordPage } from 'app/pages/SettingsPage/ChangePassword/Loadable';
import { SettingsChangePinPage } from 'app/pages/SettingsPage/ChangePin/Loadable';
import { Notifications } from 'app/pages/Notification';
import { UpdateProfileVerificationPage } from 'app/pages/UpdateProfileVerificationPage/Loadable';
import { ContactUsPage } from 'app/pages/ContactUsPage/Loadable';
import { ChatSupportPage } from 'app/pages/ChatSupportPage/Loadable';
import { MerchantInquiryPage } from 'app/pages/MerchantInquiry/Loadable';
import { TiersPage, TierUpgradePage } from 'app/pages/TierUpgradePage/Loadable';

import { Page500 } from 'app/components/500/Loadable';

// import pageRoutes from './Routes';

// private routes, use this component in rendering pages
// that should only be accessible with the logged in user
import PrivateRoute from './PrivateRoute';

/** selectors, slice */
import { containerActions as dashboardAction } from 'app/pages/DashboardPage/slice';
import { useAppSaga } from './slice';
import {
  selectSessionExpired,
  selectIsAuthenticated,
  selectIsBlankPage,
  setIsUnathenticated,
} from './slice/selectors';
// import { usePrevious } from 'app/components/Helpers/Hooks';
import { AddMoney } from 'app/pages/AddMoney';
import { Dragonpay } from 'app/pages/AddMoney/Dragonpay';
import { DataPrivacyConsent } from 'app/pages/DataPrivacyConsent';
import { TermsAndConditionConsent } from 'app/pages/TermsAndConditionsConsent/indext';

// default flags for features
const defaultFlags = {
  add_money_dragon_pay_enabled: true,
  buy_load_enabled: true,
  send_money_enabled: true,
  send_money_via_qr_enabled: true,
  send_to_bank_ubp_enabled: true,
  pay_bills_enabled: true,
};

export function App() {
  const { i18n } = useTranslation();
  // const location = useLocation();
  const history = useHistory();

  // sample usage of slice (react redux)
  const { actions } = useAppSaga();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isSessionExpired = useSelector(selectSessionExpired);
  const isBlankPage = useSelector(selectIsBlankPage);
  const clientTokenExpired = useSelector(setIsUnathenticated); // use this only on users who hasn't logged in yet

  const [flags, setFlags] = React.useState(defaultFlags);

  React.useEffect(() => {
    // const path: string | boolean = location ? location.pathname : '/dashboard';
    const phrase = getCookie('spv_uat_hmc'); // retrieve the passphrase use for encrypting
    const sessionCookie = getCookie('spv_uat'); // user token
    const clientCookie = getCookie('spv_cat') || ''; // client token
    const userCookie = getCookie('spv_uat_u'); // login email/mobile
    const forceUpdate = getCookie('spv_uat_f');

    let decrypt: any = false;
    let username: string = '';

    // decrypted the encrypted cookies
    if (phrase && sessionCookie) {
      decrypt = spdCrypto.decrypt(sessionCookie, phrase);
      username = userCookie ? spdCrypto.decrypt(userCookie, phrase) : '';
    }

    if (!forceUpdate && decrypt) {
      dispatch(actions.getIsAuthenticated(true));
      dispatch(actions.getClientTokenSuccess(JSON.parse(clientCookie)));
      dispatch(actions.getUserToken(decrypt.user_token));
      dispatch(actions.getSaveLoginName(username));

      // delay the retrieval of references and user profile
      setTimeout(() => {
        dispatch(actions.getLoadReferences());
        dispatch(actions.getLoadUserProfile());
        dispatch(dashboardAction.getFetchLoading());
      }, 2000);

      history.push('/dashboard');

      // if (process.env.NODE_ENV === 'production') {
      //   loadFbAsync(); // load fb
      // }
    } else if (forceUpdate) {
      dispatch(actions.getClientTokenLoading());
      history.push('/register/update-profile');
    } else {
      dispatch(actions.getClientTokenLoading());

      setTimeout(() => {
        dispatch(actions.getLoadReferences());
      }, 2000);
    }
  }, []);

  React.useEffect(() => {
    /** enable this for FB customer chat if we are going to use this */
    // if (
    //   isAuthenticated &&
    //   process.env.NODE_ENV === 'production' && // @ts-ignore
    //   !window.fbAsyncInit
    // ) {
    //   loadFbAsync(); // load fb
    // }

    // remote config
    if (isAuthenticated) {
      getRemoteConfigValues();
      // window.setInterval(getRemoteConfigValues, 300000); // 5 mins interval
    }
  }, [isAuthenticated]);

  const getRemoteConfigValues = () => {
    remoteConfig
      .fetchAndActivate()
      .then(() => {
        return remoteConfig.getAll();
      })
      .then(remoteFlags => {
        const newFlags = {
          ...flags,
        };

        for (const [key, config] of Object.entries(remoteFlags)) {
          newFlags[key] = config.asBoolean();
        }
        window['spFlags'] = newFlags || {};

        setFlags(newFlags);
      })
      .catch(err => console.warn(err));
  };

  const onClickSessionExpired = () => {
    // window.location.replace('/');
    // dispatch(actions.getIsAuthenticated(false));
    // dispatch(actions.getIsSessionExpired(false));
    doSignOut();
  };

  /** Enable if FB Chat will be use, do not delete */
  // const loadFbAsync = () => {
  //   var chatbox: any = document.getElementById('fb-customer-chat');
  //   chatbox.setAttribute('page_id', '100608264934915');
  //   chatbox.setAttribute('attribution', 'biz_inbox');
  //   // @ts-ignore
  //   window.fbAsyncInit = function () {
  //     // @ts-ignore
  //     FB.init({
  //       xfbml: true,
  //       version: 'v10.0',
  //     });
  //   };

  //   (function (d, s, id) {
  //     var js,
  //       fjs: any = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) return;
  //     js = d.createElement(s);
  //     js.id = id;
  //     js.src = '//connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
  //     fjs.parentNode.insertBefore(js, fjs);
  //   })(document, 'script', 'facebook-jssdk');
  // };

  return (
    <>
      <Helmet
        titleTemplate="%s - SquidPay"
        defaultTitle="SquidPay"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta
          name="description"
          content="Empowering Filipinos through advanced payment solutions accessible to all."
        />
      </Helmet>

      <Main className={isAuthenticated ? 'spdin' : undefined}>
        <Header
          isLoggedIn={isAuthenticated}
          blankPage={isBlankPage ? true : false}
        />
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
            <PrivateRoute path="/dashboard" component={DashboardPage} />
            <PrivateRoute path="/sendmoney" component={SendMoney} />
            <PrivateRoute path="/generateqr" component={GenerateQR} />
            <PrivateRoute path="/addmoneyviabpi" component={AddMoneyViaBPI} />
            <PrivateRoute path="/onlinebank" component={OnlineBank} />
            <PrivateRoute path="/buyload" component={BuyLoad} />
            <PrivateRoute path="/profile" component={UserProfilePage} />
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
              path="/help-center"
              component={HelpCenterPage}
            />
            <PrivateRoute exact path="/help-center/faq" component={FAQPage} />
            <PrivateRoute exact path="/send-to-bank" component={SendToBank} />
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
            <PrivateRoute exact path="/tiers" component={TiersPage} />
            <PrivateRoute
              exact
              path="/tiers/upgrade"
              component={TierUpgradePage}
            />
            <PrivateRoute
              exact
              path="/privacypolicy"
              component={DataPrivacyConsent}
            />
            <PrivateRoute
              exact
              path="/terms-and-condition"
              component={TermsAndConditionConsent}
            />

            {/* Not found page should be the last entry for this <Switch /> container */}
            <Route component={NotFoundPage} />
          </Switch>
          {!isBlankPage && <Footer />}
        </Content>
      </Main>
      <Dialog show={isSessionExpired} size="small">
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
      {isAuthenticated && <IdleTimer idle={process.env.IDLE_TIME || 3000000} />}

      {/*  FB element containers */}
      {/* <div id="fb-root"></div>
      <div id="fb-customer-chat" className="fb-customerchat" /> */}
    </>
  );
}
