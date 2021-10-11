import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import { configureAppStore } from 'store/configureStore';
import { ECPay } from '../index';

const store = configureAppStore();
const renderECPay = () => {
  act(() => {
    render(
      <Provider store={store}>
        <HelmetProvider>
          <ECPay />
        </HelmetProvider>
      </Provider>,
    );
  });
};

describe('AddMoney/ECPay', () => {
  test('AddMoney/ECPay - show validation', async () => {
    renderECPay();

    expect(screen.findByText('ECPay')).toBeTruthy();
    expect(screen.queryByText('How to To Add Money via ECPay')).toBeTruthy();
    expect(
      screen.queryByText(
        'Please follow the quick and easy instructions below.',
      ),
    ).toBeTruthy();
    expect(screen.queryByText('Step 1')).toBeTruthy();
  });

  test('click', async () => {
    renderECPay();
    fireEvent.click(screen.getByText('Next'), { bubbles: true });
    expect(screen.findByText('ECPay')).toBeTruthy();
    expect(screen.queryByText('Amount')).toBeTruthy();
  });

  test('submit validation', () => {
    renderECPay();
    fireEvent.click(screen.getByText('Next'), { bubbles: true });
    const submit: any = screen.getByTestId('submit');
    fireEvent.click(submit, { bubbles: true });
    expect(
      screen.queryByText('Oops! This field cannot be empty.'),
    ).toBeTruthy();
  });

  test('submit validation less than', () => {
    renderECPay();
    fireEvent.click(screen.getByText('Next'), { bubbles: true });
    const amountInput: any = screen.getByTestId('amount');
    fireEvent.change(amountInput, {
      bubbles: true,
      target: { value: 49 },
    });
    const submit: any = screen.getByTestId('submit');
    fireEvent.click(submit, { bubbles: true });
    expect(
      screen.queryByText('The amount must be at least 50.00.'),
    ).toBeTruthy();
  });
});
