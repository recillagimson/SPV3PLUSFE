import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Button from 'app/components/Elements/Button';
import A from 'app/components/Elements/A';

import InputIconWrapper from 'app/components/Elements/InputIconWrapper';
import IconButton from 'app/components/Elements/IconButton';
import useFetch from 'utils/useFetch';
import {
  regExIsGonnaBeEmail,
  regExMobile,
  validateEmail,
} from 'app/components/Helpers';

type LoginFormProps = {
  /**
   * Return the user credentials if there is no account detected
   */
  onNoAccount?: (isEmail: boolean, username: string, password: string) => void;
};
export default function LoginForm({ onNoAccount }: LoginFormProps) {
  const { loading, error, response, goFetch, fetchReset } = useFetch();

  const [isEmail, setIsEmail] = React.useState(false);
  const [email, setEmail] = React.useState({
    value: '',
    error: false,
    msg: '',
  });
  const [password, setPassword] = React.useState({
    value: '',
    error: false,
    msg: '',
  });
  const [showPass, setShowPass] = React.useState(false);

  React.useEffect(() => {
    console.log(response);
  }, [response]);

  /**
   * Submit Credentials
   * @param e
   */
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    let error = false;
    let anEmail = false;

    // first check if field is not empty
    if (email.value === '') {
      error = true;
      setEmail({
        ...email,
        error: true,
        msg: 'Please enter your email/mobile number',
      });
    }

    // check if field is not empty and we are typing in an email format
    if (
      email.value !== '' && // check if not empty
      (!/\d/g.test(email.value) ||
        regExIsGonnaBeEmail.test(email.value.trim())) && // check if we are typing into an email format ie: asb@
      !validateEmail(email.value) // check if what we type is a valid email format ie: email@example.com
    ) {
      // set error message we did't pass email validation
      error = true;
      setEmail({
        ...email,
        error: true,
        msg: 'Please enter your email in valid format ie: email@example.com',
      });
    }

    // check if value is not empty
    if (
      email.value !== '' && // check if not empty
      !regExIsGonnaBeEmail.test(email.value.trim()) && // check if we are not typing into an email format
      !validateEmail(email.value.trim()) && // validate if it's not valid email
      /\d/g.test(email.value) // check if we started with a digit
    ) {
      // we have typed a digit and did not pass the email validation
      // now check if it's in valid mobile format ie: 09 + 9 digit number
      if (!regExMobile.test(email.value)) {
        error = true;
        setEmail({
          ...email,
          error: true,
          msg:
            'Please enter valid mobile number (09 + 9 digit number) ie: 09xxxxxxxxx',
        });
      }
    }

    // if we pass the validation above, set if we are going to pass an email or mobile
    if (email.value !== '' && validateEmail(email.value.trim())) {
      anEmail = true;
      setIsEmail(true);
    } else if (email.value !== '' && regExMobile.test(email.value)) {
      setIsEmail(false);
    }

    if (password.value === '') {
      error = true;
      setPassword({
        ...password,
        error: true,
        msg: 'Please enter your password.',
      });
    }

    if (!error) {
      const data = {
        email: anEmail ? email.value.trim() : undefined,
        mobile_number: !anEmail ? email.value.trim() : undefined,
        password: password.value,
      };

      // dispatch payload to saga
      goFetch('/auth/login', 'POST', JSON.stringify(data), '', false, true);
    }
  };

  return (
    <form>
      <Field>
        <Label>
          Email or Mobile No. <i>*</i>
        </Label>
        <Input
          required
          type="text"
          value={email.value}
          onChange={e =>
            setEmail({
              value: e.currentTarget.value,
              error: false,
              msg: '',
            })
          }
          placeholder="Email or Mobile No."
          className={email.error ? 'error' : undefined}
        />
        {email.error && <ErrorMsg formError>{email.msg}</ErrorMsg>}
      </Field>
      <Field>
        <Label>
          Password <i>*</i>
        </Label>
        <InputIconWrapper>
          <Input
            type={showPass ? 'text' : 'password'}
            value={password.value}
            placeholder="Password"
            required
            onChange={e =>
              setPassword({
                value: e.currentTarget.value,
                error: false,
                msg: '',
              })
            }
            className={password.error ? 'error' : undefined}
          />
          <IconButton type="button" onClick={() => setShowPass(prev => !prev)}>
            <FontAwesomeIcon icon={!showPass ? 'eye-slash' : 'eye'} />
          </IconButton>
        </InputIconWrapper>

        {password.error && <ErrorMsg formError>{password.msg}</ErrorMsg>}
      </Field>

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
      <Field className="text-center" margin="30px 0 0">
        <A to="/forgotpassword">Forgot Password?</A>
      </Field>

      <Field className="text-center f-small" margin="30px 0 0">
        Not yet a member?{' '}
        <A to="/register" underline="true">
          Sign up
        </A>
      </Field>
    </form>
  );
}
