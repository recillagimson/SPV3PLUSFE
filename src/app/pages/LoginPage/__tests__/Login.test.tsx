import * as React from 'react';
import { Store } from '@reduxjs/toolkit';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { configureAppStore } from 'store/configureStore';

import 'utils/faLibrary';

import LoginForm from '../LoginForm';
import { containerActions as actions, initialState } from '../slice';
import { regExMobile, validateEmail } from 'app/components/Helpers';

function* mockContainerSaga() {}

jest.mock('../slice/saga', () => ({
  containerSaga: mockContainerSaga,
}));

const renderLoginForm = (store: Store) =>
  render(
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </HelmetProvider>
    </Provider>,
  );

describe('<LoginForm />', () => {
  let store: ReturnType<typeof configureAppStore>;
  let component: ReturnType<typeof renderLoginForm>;

  beforeEach(() => {
    store = configureAppStore();
    component = renderLoginForm(store);
    expect(store.getState().login).toEqual(initialState);
  });
  afterEach(() => {
    component.unmount();
  });

  it('should render email or mobile and password input', () => {
    const input = component.container.querySelector(
      '#username',
    ) as HTMLInputElement;
    fireEvent.change(input!, { target: { value: 'test@email.com' } });
    expect(input?.value).toBe('test@email.com');
  });

  it('should render a login button', () => {
    expect(component.container.querySelector('button')).toBeInTheDocument();
  });

  it('should accept and pass validation of email address', () => {
    const input = component.container.querySelector(
      '#username',
    ) as HTMLInputElement;
    fireEvent.change(input!, { target: { value: 'test@email.com' } });
    expect(input?.value).toBe('test@email.com');

    const validated = validateEmail(input?.value.trim());
    expect(validated).toBe(true);
  });

  it('should validate email address and show error when length is greater than 50', () => {
    const input = component.container.querySelector(
      '#username',
    ) as HTMLInputElement;
    fireEvent.change(input!, {
      target: {
        value: 'averlongemailthatshouldfailonlengthvalidation@email.com',
      },
    });
    expect(input?.value.length > 50).toBe(true);

    const button = component.container.querySelector(
      '.form-submit',
    ) as HTMLButtonElement;
    fireEvent.click(button);
    expect(
      screen.queryByText('The email must not be greater than 50 characters.'),
    ).toBeInTheDocument();
  });

  it('should accept and validate a valid mobile number', () => {
    const input = component.container.querySelector(
      '#username',
    ) as HTMLInputElement;
    fireEvent.change(input!, { target: { value: '09171234567' } });
    expect(input?.value).toBe('09171234567');

    const validated = regExMobile.test(input?.value.trim());
    expect(validated).toBe(true);
  });

  it('should validate mobile number and show error if length is greater than 11', () => {
    const input = component.container.querySelector(
      '#username',
    ) as HTMLInputElement;
    fireEvent.change(input!, { target: { value: '09171234567123' } });
    expect(input?.value.length > 11).toBe(true);
    const button = component.container.querySelector(
      '.form-submit',
    ) as HTMLButtonElement;
    fireEvent.click(button);
    expect(
      screen.queryByText(
        'The mobile number must not be greater than 11 characters.',
      ),
    ).toBeInTheDocument();
  });

  it('should validate fields and show error message if fields are empty', () => {
    const button = component.container.querySelector(
      '.form-submit',
    ) as HTMLButtonElement;
    fireEvent.click(button);
    expect(
      screen.queryByText('Please enter your email or mobile number.'),
    ).toBeInTheDocument();
    expect(
      screen.queryByText('The password field is required.'),
    ).toBeInTheDocument();
  });

  it('should dispatch action to submit credentials', () => {
    const payload = {
      email: undefined,
      mobile_number: '09171234567',
      password: 'TestPassword123!',
    };

    store.dispatch(actions.getFetchLoading(payload));
    expect(store.getState().login.request).toEqual(payload);
    expect(
      component.container.querySelector('#loadingIndicator'),
    ).toBeInTheDocument();
  });

  it("should show no account detected if credentials doesn't exists", () => {
    // unmount first the component then write the error in redux simulating the error code passed by the API
    component.unmount();
    const payload = {
      message: 'The given data was invalid.',
      errors: { error_code: [103], message: ['Account does not exist.'] },
    };

    store.dispatch(actions.getFetchError(payload));
    // mount again our component to reflect error from the redux
    component = renderLoginForm(store);
    expect(screen.queryByText('No account detected')).toBeInTheDocument();
  });
});
