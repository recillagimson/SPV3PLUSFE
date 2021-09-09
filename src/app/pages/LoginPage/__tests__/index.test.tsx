import * as React from 'react';
import { Store } from '@reduxjs/toolkit';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { configureAppStore } from 'store/configureStore';

import 'utils/faLibrary';

import { LoginPage } from '..';
import { containerActions as actions, initialState } from '../slice';

function* mockContainerSaga() {}

jest.mock('../slice/saga', () => ({
  containerSaga: mockContainerSaga,
}));

const renderLoginForm = (store: Store) =>
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
  let component: ReturnType<typeof renderLoginForm>;

  beforeEach(() => {
    store = configureAppStore();
    component = renderLoginForm(store);
    expect(store.getState().login).toEqual(initialState);
  });
  afterEach(() => {
    component.unmount();
  });

  it('should expect to have a login entry in redux store', () => {
    expect(store.getState().login).toEqual(initialState);
  });

  it('should render input with test value', () => {
    const input = component.container.querySelector('input');
    fireEvent.change(input!, { target: { value: 'test' } });
    expect(component.container.querySelector('input')?.value).toBe('test');
  });

  it('should render a login button', () => {
    component = renderLoginForm(store);
    expect(component.container.querySelector('button')).toBeInTheDocument();
  });

  it('should dispatch action to submit credentials', () => {
    const payload = {
      email: 'test@email.com',
      password: 'testPassword',
    };
    store.dispatch(actions.getFetchLoading(payload));
    expect(store.getState().login.request).toEqual(payload);
  });
});
