import * as React from 'react';
import { Store } from '@reduxjs/toolkit';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { configureAppStore } from 'store/configureStore';

import 'utils/faLibrary';

import { RegisterPage } from '..';
import { initialState } from '../slice';

function* mockContainerSaga() {}

jest.mock('../slice/saga', () => ({
  containerSaga: mockContainerSaga,
}));

const renderRegisterPage = (store: Store) => render(<RegisterPage />);

describe('<RegisterPage />', () => {
  // let store: ReturnType<typeof configureAppStore>;
  // let component: ReturnType<typeof renderRegisterPage>;

  // beforeEach(() => {
  //   store = configureAppStore();
  //   component = renderRegisterPage(store);
  // });
  // afterEach(cleanup);

  it('should render properly', () => {
    const tree = render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>,
    );
    expect(tree).toMatchSnapshot();
  });
  // it('should expect to render steps on account creation', () => {
  //   expect(screen.getByText('Log in Details')).toBeInTheDocument();
  // });

  // it('should render a form container', () => {
  //   expect(
  //     component.container.querySelector('.form-container'),
  //   ).toBeInTheDocument();
  // });
});
