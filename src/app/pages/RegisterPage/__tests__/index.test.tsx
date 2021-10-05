import React from 'react';
import { act, render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import { configureAppStore } from 'store/configureStore';
import { RegisterPage } from '../index';

const store = configureAppStore();

const renderRegisterPage = () => {
  act(() => {
    render(
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <RegisterPage />
          </BrowserRouter>
        </HelmetProvider>
      </Provider>,
    );
  });
};

describe('Register', () => {
  test('Register - show email signup', () => {
    renderRegisterPage();

    expect(screen.queryByText('Create your Account')).toBeTruthy();
    fireEvent.click(screen.getByText('Email'), { bubbles: true });
    expect(screen.queryByText('Email')).toBeTruthy();

    fireEvent.click(screen.getByText('Next'), { bubbles: true });
    expect(screen.queryByText('Kindly enter your email address')).toBeTruthy();
  });

  test('Register - show mobile signup', () => {
    renderRegisterPage();

    expect(screen.queryByText('Create your Account')).toBeTruthy();
    fireEvent.click(screen.getByText('Mobile Number'), { bubbles: true });
    expect(screen.queryByText('Mobile No.')).toBeTruthy();

    fireEvent.click(screen.getByText('Next'), { bubbles: true });
    expect(screen.queryByText('Kindly enter your mobile number')).toBeTruthy();
  });
});
