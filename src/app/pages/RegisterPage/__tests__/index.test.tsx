import * as React from 'react';
import { Store } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { configureAppStore } from 'store/configureStore';

import 'utils/faLibrary';

import { RegisterPage } from '..';

// function* mockContainerSaga() {}

// jest.mock('../slice/saga', () => ({
//   containerSaga: mockContainerSaga,
// }));

const renderRegisterPage = (store: Store) =>
  render(
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </HelmetProvider>
    </Provider>,
  );

describe('<RegisterPage />', () => {
  let store: ReturnType<typeof configureAppStore>;
  let component: ReturnType<typeof renderRegisterPage>;

  beforeEach(() => {
    store = configureAppStore();
    component = renderRegisterPage(store);
  });
  afterEach(() => {
    component.unmount();
  });

  it('should expect to render steps on account creation', () => {
    expect(screen.getByText('Log in Details')).toBeInTheDocument();
  });
});
