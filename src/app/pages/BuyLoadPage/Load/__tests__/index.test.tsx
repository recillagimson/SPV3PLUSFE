import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import { configureAppStore } from 'store/configureStore';
import { BuyLoadPage } from '..';

const store = configureAppStore();
const renderBuyload = () =>
  act(() => {
    render(
      <Provider store={store}>
        <HelmetProvider>
          <BuyLoadPage />
        </HelmetProvider>
      </Provider>,
    );
  });

describe('Buyload', () => {
  test('show validation', () => {
    renderBuyload();
    fireEvent.click(screen.getByText('Next'), { bubbles: true });
    expect(screen.queryByText('Buy Load')).toBeTruthy();
    expect(screen.queryByText('Mobile Number')).toBeTruthy();
    expect(screen.queryByText('Please enter your mobile number')).toBeTruthy();
  });
});
