import React from 'react';
import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import { configureAppStore } from 'store/configureStore';
import { LoginPage } from '../index';

const store = configureAppStore();
const renderLoginPage = () => {
  act(() => {
    render(
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <LoginPage />
          </BrowserRouter>
        </HelmetProvider>
      </Provider>,
    );
  });
};

describe('Login', () => {
  test('Login - show validation', () => {
    renderLoginPage();

    fireEvent.click(screen.getByText('LOGIN'), { bubbles: true });
    expect(
      screen.queryByText('Please enter your email/mobile number'),
    ).toBeTruthy();
    expect(screen.queryByText('Please enter your password.')).toBeTruthy();
  });

  test('Login - submit and show loading', async () => {
    renderLoginPage();

    const emailOrMobileInput: any = screen.getByTestId('emailOrMobile');
    const passwordInput: any = screen.getByTestId('password');
    fireEvent.change(emailOrMobileInput, {
      bubbles: true,
      target: { value: 'test@gmail.com' },
    });
    fireEvent.change(passwordInput, {
      bubbles: true,
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByText('LOGIN'), { bubbles: true });

    expect(
      screen.queryByText('Please enter your email/mobile number'),
    ).toBeFalsy();
    expect(screen.queryByText('Please enter your password.')).toBeFalsy();
    await waitFor(() => screen.queryByRole('loading'));
  });
});
