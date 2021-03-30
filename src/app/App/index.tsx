/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from "react";
import { Helmet } from "react-helmet-async";
import { Switch, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import Main from "app/components/Layouts/Main";
import Content from "app/components/Layouts/Content";
import Header from "app/components/Header";
import Footer from "app/components/Footer";
import Sidebar from "app/components/Sidebar";
import Dialog from "app/components/Dialog";

import { GlobalStyle } from "styles/global-styles";
import { NotFoundPage } from "app/components/NotFoundPage/Loadable";

import { DashboardPage } from "app/pages/DashboardPage/Loadable";
import { CardMemberAgreementPage } from "app/pages/CardMemberAgreementPage/Loadable";
import { LoginPage } from "app/pages/LoginPage/Loadable";
import { RegisterPage } from "app/pages/RegisterPage/Loadable";
import { SendMoney } from "app/pages/SendMoney/Loadable";

import PrivateRoute from "./PrivateRoute";

/** selectors, slice */
import { useAppSaga } from "./slice";
import { selectSessionExpired, selectIsAuthenticated } from "./slice/selectors";

export function App() {
  const { i18n } = useTranslation();

  // sample usage of slice (react redux)
  const { actions } = useAppSaga();
  const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isSessionExpired = useSelector(selectSessionExpired);

  React.useEffect(() => {
    dispatch(actions.getTokenLoading());
  }, [actions, dispatch]);

  const onClickSessionExpired = () => {
    window.location.replace("/");
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

      <Main className={isAuthenticated ? "spdin" : undefined}>
        <Header isLoggedIn={isAuthenticated} />
        {isAuthenticated && <Sidebar />}
        <Content className={isAuthenticated ? "authenticated" : undefined}>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route
              exact
              path="/card-member-agreement"
              component={CardMemberAgreementPage}
            />
            <Route path="/SendMoney" component={SendMoney} />
            <PrivateRoute exact path="/dashboard" component={DashboardPage} />

            <Route component={NotFoundPage} />
          </Switch>
          <Footer />
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
