/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, useLocation } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Main from 'app/components/Layouts/Main';
import Content from 'app/components/Layouts/Content';
import Header from 'app/components/Header';
import Footer from 'app/components/Footer';
import Sidebar from 'app/components/Sidebar';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from 'app/pages/HomePage/Loadable';
import { CardMemberAgreementPage } from 'app/pages/CardMemberAgreementPage/Loadable';
import { LoginPage } from 'app/pages/LoginPage/Loadable';

import { NotFoundPage } from 'app/components/NotFoundPage/Loadable';

/** selectors, slice */
// import { useAppSaga } from './slice';
// import { selectUser, selectIsAuthenticated } from './slice/selectors';

export function App() {
  const { i18n } = useTranslation();
  const location = useLocation();

  // sample usage of slice (react reduce)
  // const { actions } = useAppSaga();
  // const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  // const isAuthenticated = useSelector(selectIsAuthenticated);

  // React.useEffect(() => {
  //   dispatch(actions.getFetchLoading(false));
  // }, [actions, dispatch]);

  // this is a sample only, authentication should be taken from the store state
  // and set to true by the successfull login
  let isAuthenticated = false;
  if (location.pathname !== '/') {
    isAuthenticated = true;
  }

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

      <Main>
        <Header isLoggedIn={isAuthenticated} />
        {isAuthenticated && <Sidebar />}
        <Content className={isAuthenticated ? 'authenticated' : undefined}>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route
              path="/card-member-agreement"
              component={CardMemberAgreementPage}
            />
            <Route path="/dashboard" component={HomePage} />
            <Route component={NotFoundPage} />
          </Switch>
          <Footer />
        </Content>
      </Main>
      <GlobalStyle />
    </>
  );
}
