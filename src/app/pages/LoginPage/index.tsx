import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

import Loading from 'app/components/Loading';
import H1 from 'app/components/Elements/H1';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Button from 'app/components/Elements/Button';
import A from 'app/components/Elements/A';

import Wrapper from 'app/components/Layouts/AuthWrapper';

/** slice */
import { useContainerSaga } from './slice';
import { selectLoading, selectError, selectData } from './slice/selectors';

export function LoginPage() {
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const success = useSelector(selectData);

  const [email, setEmail] = React.useState({ value: '', error: false });
  const [password, setPassword] = React.useState({ value: '', error: false });

  React.useEffect(() => {
    // do something if log in is successfull
  }, [success]);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    let error = false;

    if (email.value === '') {
      error = true;
      setEmail({ ...email, error: true });
    }
    if (password.value === '') {
      error = true;
      setPassword({ ...password, error: true });
    }

    if (!error) {
      const data = {
        email: email.value,
        password: password.value,
      };
      console.log(data);
      // enable code below to integrate api
      // dispatch(actions.getFetchLoading(data));
    }
  };

  return (
    <Wrapper>
      <Helmet title="Login" />
      <div className="form-container">
        <H1>We're glad you're back!</H1>
        <p>Login to manage your account.</p>

        <form>
          {loading && <Loading position="absolute" />}
          <Field>
            <Label>Email or Mobile No.</Label>
            <Input
              type="text"
              value={email.value}
              autoComplete="off"
              onChange={e =>
                setEmail({ value: e.currentTarget.value, error: false })
              }
              placeholder="Email or Mobile No."
            />
            {email.error && (
              <ErrorMsg formError>
                * Please enter your email or mobile number
              </ErrorMsg>
            )}
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              type="password"
              value={password.value}
              autoComplete="off"
              onChange={e =>
                setPassword({ value: e.currentTarget.value, error: false })
              }
              placeholder="Password"
            />
            {password.error && (
              <ErrorMsg formError>* Please enter your password</ErrorMsg>
            )}
          </Field>

          {error && (
            <ErrorMsg formError>* Invalid email/mobile or password.</ErrorMsg>
          )}

          <Button
            type="submit"
            onClick={onSubmit}
            color="primary"
            fullWidth={true}
            size="large"
            variant="contained"
          >
            LOGIN
          </Button>
          <Field className="text-center" margin="20px 0 10px">
            Not yet a member? <A to="/">Sign up</A>
          </Field>
          <Field className="text-center">
            <A to="/">Forgot Password?</A>
          </Field>
        </form>
      </div>
    </Wrapper>
  );
}
