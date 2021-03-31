/* eslint-disable react-hooks/exhaustive-deps */
/**
 * This will verify OTP code
 * NOTE: this will only render the input fields and submit button
 * @prop {boolean}    mound         true/false to mount the component
 * @prop {string}     codeType      Code type ie: password_recovery or others specified in the BE API
 * @prop {boolean}    isEmail       If OTP code came from email or via sms
 * @prop {string}     viaValue      Email or mobile number of the requestor
 * @prop {function}   onSuccess     callback when code is verified
 */
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactCodeInput from 'react-code-input';

import Loading from 'app/components/Loading';
import Field from 'app/components/Elements/Fields';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Button from 'app/components/Elements/Button';

import { useComponentSaga } from './slice';
import { selectLoading, selectError, selectData } from './slice/selectors';

type Props = {
  mount: boolean;
  codeType?: string;
  isEmail: boolean;
  viaValue: string;
  onSuccess: () => void;
};
export default function VerifyOTPComponent({
  mount,
  codeType,
  isEmail,
  viaValue,
  onSuccess,
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

  // before we load all the codes below, check if we are going to be mounted first
  if (!mount) {
    return null;
  }

  const onChangePin = (val: any) => {
    setCode({ value: val, error: false });
  };

  const onSubmitVerify = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (e && e.preventDefault) e.preventDefault();
    let error = false;

    if (!error) {
      const data = {
        code_type: codeType ? codeType : 'password_recovery',
        mobile_number: !isEmail ? viaValue : undefined,
        email: isEmail ? viaValue : undefined,
        code: isEmail ? code.value : undefined,
      };
      dispatch(actions.getFetchLoading(data));
    }
  };

  return (
    <>
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
      </Field>
      {error && Object.keys(error).length > 0 && (
        <ErrorMsg formError>
          *{' '}
          {error.code && error.code === 422
            ? error.errors.code.join(' ')
            : error.message}
        </ErrorMsg>
      )}

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
    </>
  );
}
