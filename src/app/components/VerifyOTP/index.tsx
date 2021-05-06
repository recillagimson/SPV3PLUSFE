/* eslint-disable react-hooks/exhaustive-deps */
/**
 * This will verify OTP code
 * NOTE: this will only render the input fields and submit button
 * @prop {boolean}    isEmail       If OTP code came from email or via sms
 * @prop {string}     viaValue      Email or mobile number of the requestor
 * @prop {function}   onSuccess     callback when code is verified
 * @prop {string}     apiURL        pass the API endpoint ie: /auth/verify/password
 *                                  NOTE: do not include the /api in the endpoint
 */
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import ReactCodeInput from 'react-code-input';

import { StyleConstants } from 'styles/StyleConstants';

import Loading from 'app/components/Loading';
import Field from 'app/components/Elements/Fields';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Button from 'app/components/Elements/Button';

/** slice */
import { useComponentSaga } from './slice';
import { selectLoading, selectError, selectData } from './slice/selectors';

const Wrapper = styled.div`
  text-align: center;

  /** pin input styles */
  .pin-input {
    margin: 0 0 5px;

    input {
      border-radius: ${StyleConstants.BUTTON_RADIUS};
      background-color: ${StyleConstants.GRAY_BG};
      appearance: textfield;
      border: 1px solid transparent;
      margin: 2px 5px;
      font-size: 1.25rem;
      width: 50px;
      height: 50px;
      text-align: center;
      outline: 0;

      &:hover,
      &:focus-visible {
        border-color: ${StyleConstants.GOLD};
      }

      &[data-valid='false'] {
        background-color: transparent;
        color: ${StyleConstants.BUTTONS.danger.main};
        border-color: ${StyleConstants.BUTTONS.danger.main};
      }
    }
  }
`;

type VerifyOTPComponentProps = {
  /** If we are passing as email or mobile number */
  isEmail?: boolean;
  /** If this prop is defined, email or mobile will be pass on the request payload, this should be use with isEmail props */
  viaValue?: string;
  /** Function callback when OTP is verified, parent should handle this callback */
  onSuccess: () => void;
  /** Pass the BE API endpoint */
  apiURL: string;
};
export default function VerifyOTPComponent({
  isEmail,
  viaValue,
  onSuccess,
  apiURL,
}: VerifyOTPComponentProps) {
  const { actions } = useComponentSaga();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error: any = useSelector(selectError);
  const success = useSelector(selectData);

  const [isCodeValid, setIsCodeValid] = React.useState(true); // set to true
  const [code, setCode] = React.useState({ value: '', error: false });

  React.useEffect(
    () => () => {
      dispatch(actions.getFetchReset());
    },
    [],
  );

  React.useEffect(() => {
    if (error && Object.keys(error).length > 0) {
      setIsCodeValid(false);
    }

    if (success) {
      onSuccess();
      dispatch(actions.getFetchReset());
    }
  }, [success, error]);

  const onChangePin = (val: any) => {
    setCode({ value: val, error: false });
    setIsCodeValid(true);
  };

  const onSubmitVerify = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (e && e.preventDefault) e.preventDefault();
    let error = false;

    if (code.value === '') {
      error = true;
      setCode({ ...code, error: true });
    }

    if (!error) {
      const data = {
        url: apiURL,
        body: {
          // code_type: codeType ? codeType : 'password_recovery',
          mobile_number: viaValue && !isEmail ? viaValue : undefined,
          email: viaValue && isEmail ? viaValue : undefined,
          code: code.value,
        },
      };
      dispatch(actions.getFetchLoading(data));
    }
  };

  return (
    <Wrapper>
      {loading && <Loading position="absolute" />}
      <Field className="code">
        <ReactCodeInput
          name="verify"
          inputMode="numeric"
          type="text"
          fields={4}
          onChange={onChangePin}
          className="pin-input"
          isValid={isCodeValid}
        />
        {code.error && <ErrorMsg formError>Please input your code</ErrorMsg>}
        {error && Object.keys(error).length > 0 && (
          <ErrorMsg formError>
            {' '}
            {error.code && error.code === 422
              ? 'Uh-oh! Invalid Code'
              : error.message}
          </ErrorMsg>
        )}
      </Field>

      <Button
        type="submit"
        onClick={onSubmitVerify}
        color="primary"
        fullWidth={true}
        size="large"
        variant="contained"
      >
        VERIFY
      </Button>
    </Wrapper>
  );
}
