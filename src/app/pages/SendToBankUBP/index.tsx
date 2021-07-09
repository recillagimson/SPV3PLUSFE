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
import Button from 'app/components/Elements/Button';
import MaskedCurrencyInput from 'app/components/Elements/MaskedCurrencyInput';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Flex from 'app/components/Elements/Flex';
import Grid from 'app/components/Elements/Grid';
import H3 from 'app/components/Elements/H3';
import Dialog from 'app/components/Dialog';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import ComponentLoading from 'app/components/ComponentLoading';

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
import { numberWithCommas, parseToNumber } from 'utils/common';

// Styles
import * as S from './SendToBankUBP.style';

// Assets
import UBPImageTextLogo from 'app/components/Assets/ubp-logo-text.png';

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
    parseFloat(formData.amount.value.replace(/,/g, '').replace(/PHP/g, '')) +
      validateTransaction?.service_fee,
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
          default:
            setErrors('Please try again later.');
            break;
        }
        setFailedDialog(true);
        return null;
      });
    }
  }, [apiErrors]);

  // #endregion

  return (
    <React.Fragment>
      <Helmet title="Send To Bank UBP" />
      <Grid
        justifyContent="center"
        columns="930px"
        gap="30px"
        style={{
          marginBlockStart: '20px',
        }}
      >
        <Box
          title={
            ['Bank Account', 'Review Cashout', '4-Digit One Time Pin'][step]
          }
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
                    <Label>Enter Amount</Label>
                    <MaskedCurrencyInput
                      value={formData.amount.value}
                      onChange={onChangeFieldValue}
                      name="amount"
                      className={formData.amount.error ? 'error' : undefined}
                      placeholder="PHP0.00"
                    />
                    {formData.amount.error && (
                      <ErrorMsg formError>Amount is required.</ErrorMsg>
                    )}
                  </Field>
                  <Field>
                    <Label>Account Name</Label>
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
                    <Label>Account Number</Label>
                    <Input
                      value={formData.recipient_account_no.value}
                      onChange={onChangeFieldValue}
                      name="recipient_account_no"
                      className={
                        formData.recipient_account_no.error
                          ? 'error'
                          : undefined
                      }
                    />
                    {formData.recipient_account_no.error && (
                      <ErrorMsg formError>Account number is required.</ErrorMsg>
                    )}
                  </Field>
                  <Field>
                    <Label>Send Receipt to</Label>
                    <Input
                      value={formData.send_receipt_to.value}
                      onChange={onChangeFieldValue}
                      name="send_receipt_to"
                      placeholder="Enter email or mobile number"
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
                    <Label>Particulars</Label>
                    <Input
                      value={formData.particulars.value}
                      onChange={onChangeFieldValue}
                      name="particulars"
                      className={
                        formData.particulars.error ? 'error' : undefined
                      }
                    />
                    {formData.particulars.error && (
                      <ErrorMsg formError>
                        {'Particulars is required.'}
                      </ErrorMsg>
                    )}
                  </Field>
                  <Field>
                    <Label>Remarks</Label>
                    <Input
                      value={formData.remarks.value}
                      onChange={onChangeFieldValue}
                      name="remarks"
                      className={formData.remarks.error ? 'error' : undefined}
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
                      <p>{formData.amount.value}</p>
                    </S.ReviewListItem>
                    <S.ReviewListItem>
                      <p>Particulars</p>
                      <p>{formData.particulars.value ?? 'none'}</p>
                    </S.ReviewListItem>
                    <S.ReviewListItem>
                      <p>Remarks</p>
                      <p>{formData.remarks.value ?? 'None'}</p>
                    </S.ReviewListItem>
                    <S.TotalAmountWrapper>
                      <S.TotalAmountTitle>Total Amount</S.TotalAmountTitle>
                      <S.TotalAmountValue>
                        PHP {numberWithCommas(calculateTotalAmount)}
                      </S.TotalAmountValue>
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
      </Grid>
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
    </React.Fragment>
  );
}