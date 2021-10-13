import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import { configureAppStore } from 'store/configureStore';
import { containerActions as actions } from '../slice';
import { DashboardPage } from '..';

const store = configureAppStore();

const renderDashboardPage = () => {
  act(() => {
    render(
      <Provider store={store}>
        <HelmetProvider>
          <DashboardPage />
        </HelmetProvider>
      </Provider>,
    );
  });
};

describe('Dashboard', () => {
  test('Dashboard - No balance and No history', async () => {
    renderDashboardPage();
    await waitFor(() => screen.queryByRole('loading'));

    expect(screen.queryByText('Squid Balance')).toBeTruthy();
    expect(screen.queryByText('000.00')).toBeTruthy();
    expect(screen.queryByText('Transaction History')).toBeTruthy();

    expect(screen.queryByText('No Transactions')).toBeTruthy();
    expect(
      screen.queryByText('You haven’t made any transactions yet'),
    ).toBeTruthy();
  });

  test('Dashboard - balance and history', async () => {
    renderDashboardPage();
    await waitFor(() => screen.queryByRole('loading'));
    await store.dispatch(
      actions.getFetchSuccess({
        email: 'test@gmail.com',
        balance_info: { available_balance: '10.000000' },
      }),
    );

    let recentTransaction: any = [
      {
        transaction_id: '1',
        signed_total_amount: '+3.00',
        transaction_category: {
          title: 'Add Money via BPI',
          transaction_type: 'POSITIVE',
        },
        status: 'SUCCESS',
        created_at: '2021-09-30T07:11:29.000000Z',
      },
      {
        transaction_id: '2',
        signed_total_amount: '+7.00',
        transaction_category: {
          title: 'Add Money via BPI',
          transaction_type: 'POSITIVE',
        },
        status: 'SUCCESS',
        created_at: '2021-09-30T07:12:29.000000Z',
      },
    ];
    await store.dispatch(actions.getTransactionSuccess(recentTransaction));

    expect(screen.queryByText('Squid Balance')).toBeTruthy();
    expect(screen.queryByText('10.00')).toBeTruthy();
    expect(screen.queryByText('Transaction History')).toBeTruthy();
    expect(screen.findByText('Add Money via BPI')).toBeTruthy();
  });
});
