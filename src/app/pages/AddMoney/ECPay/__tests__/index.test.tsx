import React from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import { configureAppStore } from 'store/configureStore';
import { ECPay } from '../index';
import { mockData } from '../mocks';
import { containerActions as actions } from '../slice';

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

  // test('submit', async () => {
  //   renderECPay();
  //   fireEvent.click(screen.getByText('Next'), { bubbles: true });
  //   const amountInput: any = screen.getByTestId('amount');
  //   fireEvent.change(amountInput, {
  //     bubbles: true,
  //     target: { value: 200 },
  //   });
  //   fireEvent.click(screen.getByText('Nextx'), { bubbles: true });
  //   expect(screen.queryByText('Service Fee')).toBeTruthy();
  //   expect(screen.queryByText('Expiration Date')).toBeTruthy();
  // });
});
