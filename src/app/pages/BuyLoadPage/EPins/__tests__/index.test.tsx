import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import { configureAppStore } from 'store/configureStore';
import { BuyEpinsPage } from '..';

const store = configureAppStore();
const renderBuyEpins = () =>
  act(() => {
    render(
      <Provider store={store}>
        <HelmetProvider>
          <BuyEpinsPage />
        </HelmetProvider>
      </Provider>,
    );
  });

describe('Buyload', () => {
  test('show validation', () => {
    renderBuyEpins();
    fireEvent.click(screen.getByText('Next'), { bubbles: true });
    expect(screen.queryByText('Buy EPINS')).toBeTruthy();
    expect(screen.queryByText('Mobile Number')).toBeTruthy();
    expect(screen.queryByText('Please enter your mobile number')).toBeTruthy();
  });
});
