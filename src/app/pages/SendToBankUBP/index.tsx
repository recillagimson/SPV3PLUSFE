/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// react router
import { useHistory } from 'react-router-dom';

// custom elements
import Box from 'app/components/Box';
import Field from 'app/components/Elements/Fields';
import Label from 'app/components/Elements/Label';
import Input from 'app/components/Elements/Input';
import InputTextWrapper from 'app/components/Elements/InputTextWrapper';
import Button from 'app/components/Elements/Button';
// import MaskedCurrencyInput from 'app/components/Elements/MaskedCurrencyInput';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Flex from 'app/components/Elements/Flex';
import H3 from 'app/components/Elements/H3';
import Dialog from 'app/components/Dialog';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import ComponentLoading from 'app/components/ComponentLoading';

import { numberCommas } from 'app/components/Helpers';

// #region redux imports
import { useSelector, useDispatch } from 'react-redux';
import { useContainerSaga } from './slice';
import {
  selectError,
  selectValidateTransaction,
  selectLoading,
} from './slice/selectors';

// child components
import OTP from './OTP';

// Helpers
import { FormModel, initialFormValues } from './helpers';
import { parseToNumber } from 'utils/common';

// Styles
import * as S from './SendToBankUBP.style';

// Assets
import UBPImageTextLogo from 'app/components/Assets/ubp-logo-text.png';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';

export function SendToBankUBP() {
  const history = useHistory();
  const [isFailedDialog, setFailedDialog] = React.useState(false);
  // redux
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const apiErrors: any = useSelector(selectError);
  const [errors, setErrors] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const validateTransaction = useSelector(selectValidateTransaction);
  // review cash out
  const [step, setStep] = React.useState<number>(0);
  // form
  const [formData, updateFormData] = React.useState<FormModel>(
    initialFormValues,
  );

  const calculateTotalAmount = parseToNumber(
    parseFloat(formData.amount.value) +
      parseFloat(validateTransaction?.service_fee),
  );

  // #region handleForm Events
  const onChangeFieldValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({
      ...formData,
      [event.currentTarget.name]: {
        ...formData[event.currentTarget.name],
        value: event.currentTarget.value,
        error: event.currentTarget.value ? false : true,
      },
    });
  };

  const stepForward = (): void => {
    setStep(Math.min(step + 1, 2));
  };

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target;
    const data = {};
    for (const [, field] of Object.entries(target)) {
      const fieldName = field?.name;
      let fieldValue = field?.value;

      if (fieldName) {
        if (fieldName === 'amount' && fieldValue) {
          fieldValue = parseFloat(
            fieldValue.replace(/,/g, '').replace(/PHP/g, ''),
          );
        }
        data[fieldName] = fieldValue;
      }
    }
    const newForm = JSON.parse(JSON.stringify(formData));
    for (const [key] of Object.entries(data)) {
      if (newForm.validation) {
        const validate =
          newForm[key].validation.validate.test(data[key]) ||
          newForm[key].validation.secondValidate.test(data[key]);
        newForm[key].error = !validate;
      } else {
        newForm[key].error = !data[key];
      }
    }

    updateFormData(newForm);
    const errors = {};
    for (const key in newForm) {
      if (newForm.hasOwnProperty(key) && newForm[key].error) {
        errors[key] = newForm[key].error;
      }
    }

    if (!Object.keys(errors).length) {
      setIsSubmitted(true);
      await dispatch(actions.validateBankLoading(data));
    }
  };

  const sendOTP = async event => {
    event.preventDefault();
    await dispatch(actions.generateSendToBankOTPLoading());
    stepForward();
  };
  // #endregion

  // #region useEffects
  React.useEffect(() => {
    if (
      isSubmitted &&
      validateTransaction &&
      Object.keys(validateTransaction).length
    ) {
      stepForward();
      setIsSubmitted(false);
    }
  }, [validateTransaction, isSubmitted]);

  React.useEffect(() => {
    console.log(apiErrors);
    if (apiErrors?.errors?.error_code?.length) {
      apiErrors?.errors?.error_code?.map(err => {
        switch (err) {
          case 302:
            setErrors('Transaction failed. Please try again.');
            break;
          case 401:
            setErrors('User profile not updated.');
            break;
          case 402:
            setErrors('User has insufficient balance.');
            break;
          case 405:
            setErrors('Oh No! You have exceeded your monthly limit.');
            break;
          case 406:
            setErrors(
              'Oops! To completely access all Squidpay services, please update your profile. Thank you.',
            );
            break;
          case 151:
            setErrors('Encrypted payload is invalid.');
            break;
          case 203:
            setErrors('Invalid provider.');
            break;
          default:
            setErrors('Please try again later.');
            break;
        }
        setFailedDialog(true);
        return null;
      });
    }
    if (apiErrors && apiErrors.errors) {
      if (
        apiErrors.errors.recipient_account_no &&
        apiErrors.errors.recipient_account_no.length > 0
      ) {
        updateFormData({
          ...formData,
          recipient_account_no: {
            ...formData['recipient_account_no'],
            error: true,
            msg: apiErrors.errors.recipient_account_no.join('\n'),
          },
        });
      }
    }
  }, [apiErrors]);

  // #endregion

  return (
    <ProtectedContent>
      <Helmet title="Send To Bank UBP" />

      <Box
        title={['Bank Account', 'Review Cashout', '4-Digit One Time Pin'][step]}
        titleBorder
      >
        <S.BodyWrapper>
          <ComponentLoading isLoading={loading}>
            {step < 2 && (
              <S.LogoSection
                justifyContent={step === 1 ? 'center' : 'flex-start'}
              >
                <S.ImageLogoWrapper
                  src={UBPImageTextLogo}
                  alt="UBP text logo"
                />
              </S.LogoSection>
            )}
            {/* <S.ContentImage src={UBPLogo} alt="UBP" margin="0 0 20px" /> */}
            {step === 0 && (
              <form onSubmit={onSubmit}>
                <Field>
                  <Label>
                    Enter Amount <i>*</i>
                  </Label>
                  <InputTextWrapper>
                    <Input
                      type="number"
                      value={formData.amount.value}
                      onChange={onChangeFieldValue}
                      name="amount"
                      className={formData.amount.error ? 'error' : undefined}
                      placeholder="0.00"
                      hidespinner
                    />
                    <span>PHP</span>
                  </InputTextWrapper>

                  {formData.amount.error && (
                    <ErrorMsg formError>Amount is required.</ErrorMsg>
                  )}
                </Field>
                <Field>
                  <Label>
                    Account Name <i>*</i>
                  </Label>
                  <Input
                    value={formData.recipient_name.value}
                    onChange={onChangeFieldValue}
                    name="recipient_name"
                    className={
                      formData.recipient_name.error ? 'error' : undefined
                    }
                  />
                  {formData.recipient_name.error && (
                    <ErrorMsg formError>Account name is required.</ErrorMsg>
                  )}
                </Field>
                <Field>
                  <Label>
                    Account Number <i>*</i>
                  </Label>
                  <Input
                    value={formData.recipient_account_no.value}
                    onChange={onChangeFieldValue}
                    name="recipient_account_no"
                    className={
                      formData.recipient_account_no.error ? 'error' : undefined
                    }
                    maxLength={12}
                  />
                  {formData.recipient_account_no.error && (
                    <ErrorMsg formError>
                      {formData.recipient_account_no.msg === ''
                        ? 'Account number is required.'
                        : formData.recipient_account_no.msg}
                    </ErrorMsg>
                  )}
                </Field>
                <Field>
                  <Label>
                    Send Receipt to <i>*</i>
                  </Label>
                  <Input
                    value={formData.send_receipt_to.value}
                    onChange={onChangeFieldValue}
                    name="send_receipt_to"
                    placeholder="Enter a valid email address"
                    className={
                      formData.send_receipt_to.error ? 'error' : undefined
                    }
                  />
                  {formData.send_receipt_to.error && (
                    <ErrorMsg formError>
                      {formData?.send_receipt_to?.validation?.errorMessage ??
                        'Recipient email or mobile number is required.'}
                    </ErrorMsg>
                  )}
                </Field>
                <Field>
                  <Label>
                    Particulars <i>*</i>
                  </Label>
                  <Input
                    value={formData.particulars.value}
                    onChange={onChangeFieldValue}
                    name="particulars"
                    className={formData.particulars.error ? 'error' : undefined}
                    maxLength={50}
                  />
                  {formData.particulars.error && (
                    <ErrorMsg formError>{'Particulars is required.'}</ErrorMsg>
                  )}
                </Field>
                <Field>
                  <Label>
                    Remarks <i>*</i>
                  </Label>
                  <Input
                    value={formData.remarks.value}
                    onChange={onChangeFieldValue}
                    name="remarks"
                    className={formData.remarks.error ? 'error' : undefined}
                    maxLength={50}
                  />
                  {formData.remarks.error && (
                    <ErrorMsg formError>{'Remark is required.'}</ErrorMsg>
                  )}
                </Field>
                <Flex alignItems="center" justifyContent="flex-end">
                  <Button
                    disabled={loading}
                    onClick={e => {
                      e.preventDefault();
                      dispatch(actions.resetTransaction());
                      history.push('/dashboard');
                    }}
                    type="button"
                    variant="outlined"
                    color="secondary"
                    size="large"
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={loading}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Next
                  </Button>
                </Flex>
              </form>
            )}
            {step === 1 && (
              <React.Fragment>
                <S.ReviewContainer>
                  <S.ReviewListItem>
                    <p>Bank</p>
                    <p>UBP</p>
                  </S.ReviewListItem>
                  <S.ReviewListItem>
                    <p>Account Number</p>
                    <p>{formData.recipient_account_no.value}</p>
                  </S.ReviewListItem>
                  <S.ReviewListItem>
                    <p>Account Name</p>
                    <p>{formData.recipient_name.value}</p>
                  </S.ReviewListItem>
                  <S.ReviewListItem>
                    <p>Amount</p>
                    <p>{numberCommas(formData.amount.value)}</p>
                  </S.ReviewListItem>
                  <S.ReviewListItem>
                    <p>Particulars</p>
                    <p>{formData.particulars.value ?? 'None'}</p>
                  </S.ReviewListItem>
                  <S.ReviewListItem>
                    <p>Remarks</p>
                    <p>{formData.remarks.value ?? 'None'}</p>
                  </S.ReviewListItem>
                  <S.TotalAmountWrapper>
                    <S.TotalAmountTitle>
                      Total Amount plus service fee
                    </S.TotalAmountTitle>
                    <S.TotalAmountValue>
                      PHP {numberCommas(calculateTotalAmount)}
                    </S.TotalAmountValue>
                    <p className="service-fees">
                      Service Fee: PHP{' '}
                      {parseToNumber(validateTransaction?.service_fee)}
                    </p>
                  </S.TotalAmountWrapper>
                </S.ReviewContainer>
                <S.TransferButtonWrapper>
                  <Button
                    fullWidth
                    disabled={loading}
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={sendOTP}
                  >
                    Transfer Fund
                  </Button>
                </S.TransferButtonWrapper>
              </React.Fragment>
            )}
            {step === 2 && <OTP />}
          </ComponentLoading>
        </S.BodyWrapper>
      </Box>

      {/* show error Dialog */}
      <Dialog show={isFailedDialog} size="small">
        <S.DetailsWrapper padding="15px">
          <div className="text-center">
            <CircleIndicator size="medium" color="danger">
              <FontAwesomeIcon icon="times" />
            </CircleIndicator>
            <H3 margin="15px 0 10px">Oops! System Error</H3>
            <p>{errors}</p>
            <Button
              fullWidth
              onClick={() => {
                setFailedDialog(false);
                dispatch(actions.resetTransaction());
                history.push('/dashboard');
              }}
              variant="outlined"
              color="secondary"
              size="large"
            >
              Ok
            </Button>
          </div>
        </S.DetailsWrapper>
      </Dialog>
    </ProtectedContent>
  );
}
