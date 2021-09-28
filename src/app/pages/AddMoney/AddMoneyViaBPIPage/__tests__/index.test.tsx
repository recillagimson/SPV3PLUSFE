import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import { configureAppStore } from 'store/configureStore';
import { containerActions as actions } from '../slice';
import { AddMoneyViaBPI } from '../index';
import { accountsResponseMock, fundTopUpResponseMock } from '../mocks';

const store = configureAppStore();
const renderAddMoneyViaBPIPage = () =>
  render(
    <Provider store={store}>
      <HelmetProvider>
        <AddMoneyViaBPI />
      </HelmetProvider>
    </Provider>,
  );

describe('AddMoney/AddMoneyViaBPIPage', () => {
  test('cash in view - show validation', () => {
    renderAddMoneyViaBPIPage();
    fireEvent.click(screen.getByText('Next'), { bubbles: true });
    expect(screen.queryByText('Online Bank')).toBeTruthy();
    expect(screen.queryByText('Amount')).toBeTruthy();
    expect(
      screen.queryByText('Oops! This field cannot be empty.'),
    ).toBeTruthy();
    expect(screen.queryByText('Login to BPI Online')).toBeFalsy();
  });

  test('cash in view - submit with amount value', () => {
    renderAddMoneyViaBPIPage();
    const amountInput: any = screen.getByTestId('amount');
    fireEvent.change(amountInput, {
      bubbles: true,
      target: { value: 10 },
    });

    expect(screen.queryByText('Online Bank')).toBeTruthy();
    expect(amountInput.value).toBe('10');
    fireEvent.click(screen.getByText('Next'), { bubbles: true });
    expect(screen.queryByText('Oops! This field cannot be empty.')).toBeFalsy();
  });

  test('select account view', () => {
    const url = '/add-money/bpi/select-account';
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        pathname: url,
      },
    });
    window.sessionStorage.setItem('amount', '20');
    store.dispatch(actions.getFetchAccountsSuccess(accountsResponseMock));
    renderAddMoneyViaBPIPage();

    expect(window.location.pathname).toEqual(url);
    expect(screen.queryByText('Login to BPI Online')).toBeTruthy();
    expect(screen.queryByText('20.00')).toBeTruthy();
    expect(screen.queryByText('XXXXXX3144')).toBeTruthy();
    expect(screen.queryByText('XXXXXX1206')).toBeTruthy();
    expect(screen.queryByText('Cash In')).toBeTruthy();
  });

  test('verification view', () => {
    store.dispatch(actions.getFetchFundTopUpSuccess(fundTopUpResponseMock));
    renderAddMoneyViaBPIPage();

    expect(screen.queryByText('Login to BPI Online')).toBeTruthy();
    expect(screen.queryByText('+63927****863')).toBeTruthy();
    expect(screen.queryByText('59 s')).toBeTruthy();
    expect(screen.queryByText('Verify')).toBeTruthy();
  });
});
