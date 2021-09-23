import * as React from 'react';
import { Store } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { configureAppStore } from 'store/configureStore';

import 'utils/faLibrary';

import { LoginPage } from '..';
import { initialState } from '../slice';

function* mockContainerSaga() {}

jest.mock('../slice/saga', () => ({
  containerSaga: mockContainerSaga,
}));

const renderLoginPage = (store: Store) =>
  render(
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </HelmetProvider>
    </Provider>,
  );

describe('<LoginPage />', () => {
  let store: ReturnType<typeof configureAppStore>;
  let component: ReturnType<typeof renderLoginPage>;

  beforeEach(() => {
    store = configureAppStore();
    component = renderLoginPage(store);
    expect(store.getState().login).toEqual(initialState);
  });
  afterEach(() => {
    component.unmount();
  });

  it('should expect to have a login entry in redux store', () => {
    expect(store.getState().login).toEqual(initialState);
  });

  it('should render a forgot password link', () => {
    expect(
      component.container.querySelector('.forgot-password'),
    ).toBeInTheDocument();
  });

  it('should render a sign up link', () => {
    expect(component.container.querySelector('.sign-up')).toBeInTheDocument();
  });
});
