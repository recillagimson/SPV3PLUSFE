import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import H1 from 'app/components/Elements/H1';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import Button from 'app/components/Elements/Button';
import A from 'app/components/Elements/A';

import Wrapper from 'app/components/Layouts/AuthWrapper';
import IconButton from 'app/components/Elements/IconButton';

export function LoginPage() {
  const [email, setEmail] = React.useState({ value: '', error: false });
  const [password, setPassword] = React.useState({ value: '', error: false });
  const [type, setType] = React.useState(true);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    let error = false;

    if (email.value && email.value === '') {
      error = true;
      setEmail({ ...email, error: true });
    }
    if (password.value && password.value === '') {
      error = true;
      setPassword({ ...password, error: true });
    }

    if (!error) {
      const data = {
        email: email.value,
        password: password.value,
      };
      console.log(data);
    }
  };

  return (
    <Wrapper>
      <Helmet title="Login" />
      <div className="form-container">
        <H1>We're glad you're back!</H1>
        <p>Login to manage your account.</p>
        <form>
          <Field>
            <Label>Email or Mobile No.</Label>
            <Input
              type="text"
              value={email.value}
              onChange={e =>
                setEmail({ value: e.currentTarget.value, error: false })
              }
              placeholder="Email or Mobile No."
            />
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              type={type ? 'password' : 'text'}
              value={password.value}
              onChange={e =>
                setPassword({ value: e.currentTarget.value, error: false })
              }
              placeholder="Password"
            />
            <IconButton
              type="button"
              className="icon-btn"
              onClick={() => setType(prev => !prev)}
            >
              <FontAwesomeIcon icon={type ? 'eye' : 'eye-slash'} fixedWidth />
            </IconButton>
          </Field>
          <Field className="flex">
            <input type="checkbox" />
            <span>
              By Logging in, I agree to <A to="/">Card Member Agreement</A> and{' '}
              <A to="/">Privacy Policy</A>
            </span>
          </Field>

          <Button type="submit" primary onClick={onSubmit}>
            LOGIN
          </Button>
          <Field className="text-right">
            <A to="/">Forgot Password?</A>
          </Field>
          <Field className="text-center">
            Not registered yet? <A to="/">Click here</A>
          </Field>
        </form>
      </div>
    </Wrapper>
  );
}
