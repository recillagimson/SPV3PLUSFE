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
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import spdCrypto from 'app/components/Helpers/EncyptDecrypt';

import Main from 'app/components/Layouts/Main';
import Content from 'app/components/Layouts/Content';
import Header from 'app/components/Header';
import Footer from 'app/components/Footer';
import Sidebar from 'app/components/Sidebar';
import Dialog from 'app/components/Dialog';
import { getCookie } from 'app/components/Helpers';

import { GlobalStyle } from 'styles/global-styles';
import { NotFoundPage } from 'app/components/NotFoundPage/Loadable';

import { DashboardPage } from 'app/pages/DashboardPage/Loadable';
import { CardMemberAgreementPage } from 'app/pages/CardMemberAgreementPage/Loadable';
import { LoginPage } from 'app/pages/LoginPage/Loadable';
import { RegisterPage } from 'app/pages/RegisterPage/Loadable';
import { ForgotPasswordPage } from 'app/pages/ForgotPasswordPage/Loadable';
import { SendMoney } from 'app/pages/SendMoney/Loadable';
import { ScanQR } from 'app/pages/ScanQR/Loadable';
import { OnlineBank } from 'app/pages/OnlineBank/Loadable';
import { BuyLoad } from 'app/pages/BuyLoad/Loadable';
import { UserProfilePage } from 'app/pages/ProfilePage/Loadable';

import pageRoutes from './Routes';

// private routes, use this component in rendering pages
// that should only be accessible with the logged in user
import PrivateRoute from './PrivateRoute';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

/** selectors, slice */
import { useAppSaga } from './slice';
import {
  selectSessionExpired,
  selectIsAuthenticated,
  selectIsBlankPage,
} from './slice/selectors';
import { usePrevious } from 'app/components/Helpers/Hooks';

export function App() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const history = useHistory();

  // sample usage of slice (react redux)
  const { actions } = useAppSaga();
  const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isSessionExpired = useSelector(selectSessionExpired);
  const isBlankPage = useSelector(selectIsBlankPage);

  const prevAuth = usePrevious(isAuthenticated);

  React.useEffect(() => {
    const path: string | boolean = location ? location.pathname : '/dashboard';
    const phrase = getCookie('spv_uat_hmc');
    const sessionCookie = getCookie('spv_uat');
    const clientCookie = getCookie('spv_cat') || '';

    let decrypt: any = false;

    if (phrase && sessionCookie) {
      decrypt = spdCrypto.decrypt(sessionCookie, phrase);
    }

    if (decrypt) {
      dispatch(actions.getIsAuthenticated(true));
      dispatch(actions.getClientTokenSuccess(JSON.parse(clientCookie)));
      dispatch(actions.getUserToken(decrypt.user_token));

      setTimeout(() => {
        dispatch(actions.getUserProfile(decrypt));
      }, 500);

      history.push(path === '/' ? '/dashboard' : path);
    } else {
      dispatch(actions.getClientTokenLoading());
    }
  }, []);

  React.useEffect(() => {
    if (isAuthenticated && !prevAuth) {
      dispatch(actions.getLoadReferences());
    }
  }, [isAuthenticated]);

  const onClickSessionExpired = () => {
    const publicURL = process.env.PUBLIC_URL || '';

    window.location.replace(`${publicURL}/`);
    dispatch(actions.getIsAuthenticated(false));
    dispatch(actions.getIsSessionExpired(false));
  };

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
            <Route
              exact
              path="/card-member-agreement"
              component={CardMemberAgreementPage}
            />
            <Route path="/forgotpassword" component={ForgotPasswordPage} />
            <PrivateRoute path="/dashboard" component={DashboardPage} />
            <PrivateRoute path="/sendmoney" component={SendMoney} />
            <PrivateRoute path="/scanqr" component={ScanQR} />
            <PrivateRoute path="/onlinebank" component={OnlineBank} />
            <PrivateRoute path="/buyload" component={BuyLoad} />
            <PrivateRoute path="/profile" component={UserProfilePage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
          {!isBlankPage && <Footer />}
        </Content>
      </Main>
      <Dialog
        show={isSessionExpired}
        onClick={onClickSessionExpired}
        okText="OK"
        message="Your session has expired, please login again to continue."
        title="SESSION EXPIRED"
      />
      <GlobalStyle />
    </>
  );
}
