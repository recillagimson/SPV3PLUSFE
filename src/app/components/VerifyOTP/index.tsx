/* eslint-disable react-hooks/exhaustive-deps */
/**
 * This will verify OTP code
 * NOTE: this will only render the input fields and submit button
 * @prop {string}     codeType      Code type ie: password_recovery or others specified in the BE API
 * @prop {boolean}    isEmail       If OTP code came from email or via sms
 * @prop {string}     viaValue      Email or mobile number of the requestor
 * @prop {function}   onSuccess     callback when code is verified
 * @prop {string}     verifyType    select one for verifying code 'password' | 'account' | undefined
 *                                  NOTE: add more in the selection if we will have more url for verification
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
      &:focus {
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

type Props = {
  codeType?: string;
  isEmail: boolean;
  viaValue: string;
  onSuccess: () => void;
  isPin?: boolean;
  verifyType: 'password' | 'account';
};
export default function VerifyOTPComponent({
  codeType,
  isEmail,
  viaValue,
  onSuccess,
  verifyType,
}: Props) {
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
        url: verifyType,
        body: {
          code_type: codeType ? codeType : 'password_recovery',
          mobile_number: !isEmail ? viaValue : undefined,
          email: isEmail ? viaValue : undefined,
          code: isEmail ? code.value : undefined,
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
