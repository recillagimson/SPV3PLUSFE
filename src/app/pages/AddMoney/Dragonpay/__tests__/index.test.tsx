import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import { configureAppStore } from 'store/configureStore';
import { Dragonpay } from '..';

const store = configureAppStore();
const renderDragonPay = () =>
  act(() => {
    render(
      <Provider store={store}>
        <HelmetProvider>
          <Dragonpay />
        </HelmetProvider>
      </Provider>,
    );
  });

describe('Dragonpay', () => {
  test('show validation', () => {
    renderDragonPay();
    fireEvent.click(screen.getByText('Next'), { bubbles: true });
    expect(screen.queryByText('Online Bank')).toBeTruthy();
    expect(screen.queryByText('Amount')).toBeTruthy();
    expect(screen.queryByText('Please enter amount.')).toBeTruthy();
  });

  test('show validation - greater', () => {
    renderDragonPay();
    const amountInput: any = screen.getByTestId('amount');
    fireEvent.change(amountInput, {
      bubbles: true,
      target: { value: 10 },
    });
    fireEvent.click(screen.getByText('Next'), { bubbles: true });
    expect(
      screen.queryByText('The amount must be at least 50 or greater.'),
    ).toBeTruthy();
  });

  test('submit with amount value', async () => {
    renderDragonPay();
    const amountInput: any = screen.getByTestId('amount');
    fireEvent.change(amountInput, {
      bubbles: true,
      target: { value: 50 },
    });

    expect(screen.queryByText('Online Bank')).toBeTruthy();
    expect(amountInput.value).toBe('50');
    fireEvent.click(screen.getByText('Next'), { bubbles: true });
    await waitFor(() => screen.queryByRole('loading'));
  });
});
