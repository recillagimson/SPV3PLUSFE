/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import Logo from 'app/components/Assets/Logo';
import Field from 'app/components/Elements/Fields';
import A from 'app/components/Elements/A';
import Wrapper from 'app/components/Layouts/AuthWrapper';

import LoginForm from './LoginForm';

export function LoginPage() {
  return (
    <Wrapper>
      <Helmet title="Login" />
      <div className="form-container">
        <Logo size="medium" />

        <LoginForm onNoAccount={() => alert('no account')} />
        <Field className="text-center" margin="10px 0 0">
          <A to="/forgotpassword">Forgot Password?</A>
        </Field>

        <Field className="text-center f-small" margin="45px 0 0">
          Not yet a member?{' '}
          <A to="/register" underline="true">
            Sign up
          </A>
        </Field>
      </div>
    </Wrapper>
  );
}
