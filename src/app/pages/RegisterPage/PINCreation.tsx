import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loading from 'app/components/Loading';
import { H4, Paragraph } from 'app/components/Typography';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import Field from 'app/components/Elements/Fields';
import Button from 'app/components/Elements/Button';
import PinInput from 'app/components/Elements/PinInput';

import { validatePIN } from 'helpers/formValidations';

type PINCreationProps = {
  onSuccessPinCreation: (pin: string) => void;
};

/**
 * PIN Code Creation
 * @typedef PINCreationProps
 * @returns {string}  returns the PIN code
 */
export default function PINCreation({
  onSuccessPinCreation,
}: PINCreationProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPin, setShowPin] = React.useState(true);
  const [showPinConfirm, setShowPinConfirm] = React.useState(false);
  const [showPinCreated, setShowPinCreated] = React.useState(false);

  const [pin, setPin] = React.useState({ value: '', error: false, msg: '' });
  const [pinConfirm, setPinConfirm] = React.useState({
    value: '',
    error: false,
    msg: '',
  });

  const onResetPIN = () => {
    setPin({ value: '', error: false, msg: '' });
    setPinConfirm({ value: '', error: false, msg: '' });
    setShowPinConfirm(false);
    setShowPin(true);
  };

  // validate the pin and show the confirm pin
  const onPinNext = () => {
    let hasError = false;
    if (pin.value !== '' && pin.value.length === 4) {
      let validatedPin = validatePIN(pin.value);
      if (validatedPin && validatedPin.error) {
        hasError = true;
        setPin({
          ...pin,
          error: true,
          msg: validatedPin.msg,
        });
      }
    }
    if (!hasError) {
      setShowPin(false);
      setShowPinConfirm(true);
      // dispatch(actions.getValidateReset());
    }
  };

  // validate the re-entered pin and then show PIN created
  const onPinConfirmNext = () => {
    let hasError = false;
    // validate the pin if they are the same
    // notify user
    if (pinConfirm.value === '') {
      hasError = true;
      setPinConfirm({
        ...pinConfirm,
        error: true,
        msg: 'You have not re-entered your PIN. Please try again.',
      });
    }

    if (pinConfirm.value !== '') {
      if (pinConfirm.value.length < 4) {
        hasError = true;
        setPinConfirm({
          ...pinConfirm,
          error: true,
          msg: 'You have not re-entered your PIN correctly. Please try again.',
        });
      }

      if (pinConfirm.value.length === 4 && pinConfirm.value !== pin.value) {
        hasError = true;
        setPinConfirm({
          ...pinConfirm,
          error: true,
          msg: 'PINs did not match',
        });
      }
    }

    if (!hasError) {
      setIsLoading(true);

      setTimeout(() => {
        setShowPinConfirm(false);
        setShowPinCreated(true);
        setIsLoading(false);
      }, 800);
    }
  };

  return (
    <>
      {isLoading && <Loading position="fixed" />}
      {showPin && (
        <div className="text-center" style={{ padding: '0 40px' }}>
          <CircleIndicator size="large">
            <FontAwesomeIcon icon="lock" />
          </CircleIndicator>
          <H4 align="center" margin="20px 0 10px">
            Setup your unique PIN
          </H4>
          <Paragraph size="small" align="center" margin="0 0 20px">
            This will be used every time you login to your SquidPay account
          </Paragraph>
          <Field margin="5px 0 30px">
            <PinInput
              length={4}
              onChange={p => setPin({ value: p, error: false, msg: '' })}
              value={pin.value}
              isValid={!pin.error}
            />
            {pin.error && (
              <Paragraph color="danger" align="center" padding="20px 0 0">
                {pin.msg}
              </Paragraph>
            )}
          </Field>
          <Button
            type="button"
            onClick={onPinNext}
            color="primary"
            fullWidth
            size="large"
            variant="contained"
          >
            Next
          </Button>
        </div>
      )}
      {showPinConfirm && (
        <div className="text-center" style={{ padding: '0 40px' }}>
          <CircleIndicator size="large">
            <FontAwesomeIcon icon="lock" />
          </CircleIndicator>
          <H4 align="center" margin="20px 0 10px">
            Retype your new unique PIN
          </H4>
          <Paragraph size="small" align="center" margin="0 0 20px">
            This will be used every time you login to your SquidPay account
          </Paragraph>
          <Field margin="5px 0 30px">
            <PinInput
              length={4}
              onChange={p => setPinConfirm({ value: p, error: false, msg: '' })}
              value={pinConfirm.value}
              isValid={!pinConfirm.error}
            />
            {pinConfirm.error && (
              <Paragraph color="danger" align="center" padding="20px 0 0">
                {pinConfirm.msg}
              </Paragraph>
            )}
          </Field>
          <Button
            type="button"
            onClick={onPinConfirmNext}
            color="primary"
            fullWidth
            size="large"
            variant="contained"
            style={{ marginBottom: 10 }}
          >
            Next
          </Button>
          <Button
            type="button"
            onClick={onResetPIN}
            fullWidth
            size="large"
            variant="contained"
          >
            Reset
          </Button>
        </div>
      )}

      {showPinCreated && (
        <div className="text-center" style={{ padding: '0 40px' }}>
          <CircleIndicator size="large">
            <FontAwesomeIcon icon="check" />
          </CircleIndicator>
          <H4 align="center" margin="20px 0 10px">
            User PIN successfully created
          </H4>
          <Paragraph size="small" align="center" margin="0 0 20px">
            This will be used every time you login to your SquidPay account
          </Paragraph>
          <Field margin="30px 0 0">
            <Button
              type="button"
              onClick={() => onSuccessPinCreation(pin.value)}
              color="primary"
              fullWidth
              size="large"
              variant="contained"
            >
              Next
            </Button>
          </Field>
        </div>
      )}
    </>
  );
}
