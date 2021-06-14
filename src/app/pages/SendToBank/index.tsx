/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// get our fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import ComponentLoading from 'app/components/ComponentLoading';
import Box from 'app/components/Box';
import Button from 'app/components/Elements/Button';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import Select from 'app/components/Elements/Select';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import List from 'app/components/List';
import ListItem from 'app/components/List/ListItem';
import ListItemText from 'app/components/List/ListItemText';

import { VerifyOTPPage } from './VerifyPage';

/** slice */
import { useContainerSaga } from './slice';
import {
  selectLoading,
  selectError,
  selectBanks,
  selectPurposes,
  selectBankTransactionType,
  selectValidateTransaction,
} from './slice/selectors';

import { BankState } from './slice/types';

// Helpers
import {
  initialFormData,
  initialformErrors,
  BANK_TRANSACTION_TYPE,
} from './helpers';

// Utils
import { numberWithCommas, parseToNumber } from 'utils/common';
import { validateEmail } from 'app/components/Helpers';

// Styled Components
import * as S from './SendToBank.style';

// Assets
import InstapayLogo from 'app/components/Assets/instapay.svg';
import PesonetLogo from 'app/components/Assets/pesonet.svg';

export function SendToBank() {
  const history = useHistory();
  const [steps, setSteps] = React.useState(0);
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const apiErrors: any = useSelector(selectError);
  const banks = useSelector(selectBanks);
  const purposes = useSelector(selectPurposes);
  const bankTransactionType = useSelector(selectBankTransactionType);
  const validateTransaction = useSelector(selectValidateTransaction);

  const [formData, setFormData] = React.useState(initialFormData);
  const [formErrors, setFormErrors] = React.useState(initialformErrors);

  const calculateTotalAmount = parseToNumber(
    parseFloat(formData.amount) + validateTransaction?.service_fee,
  );

  React.useEffect(() => {
    dispatch(actions.getPurposesLoading());
    dispatch(actions.resetTransaction());
  }, []);

  React.useEffect(() => {
    if (apiErrors?.errors?.error_code?.length) {
      apiErrors?.errors?.error_code?.map(err => {
        if (err === 402) {
          setFormErrors({
            ...formErrors,
            amount: 'You do not have enough balance.',
          });
        }
        if (err === 405) {
          setFormErrors({
            ...formErrors,
            amount:
              'Oops! You have reached the allowable wallet limit for this month. Please try again next month.',
          });
        }

        return null;
      });
    }
  }, [apiErrors]);

  React.useEffect(() => {
    const isSuccessValidateTransaction = Object.keys(validateTransaction)
      .length;
    if (isSuccessValidateTransaction) setSteps(3);
  }, [validateTransaction]);

  const validateForm = formData => {
    const errors: any = {};
    if (formData.account_number === '') {
      errors.account_number = 'This is a required field.';
    }

    if (formData.account_name === '') {
      errors.account_name = 'This is a required field.';
    }

    if (formData.amount === '') {
      errors.amount = 'This is a required field.';
    }

    if (formData.purpose === '') {
      errors.purpose = 'This is a required field.';
    }

    if (!validateEmail(formData.send_receipt_to)) {
      errors.send_receipt_to = 'This is a required field and a valid email.';
    }

    const hasFormErrors = !!Object.keys(errors).filter(err => err !== '')
      .length;

    if (hasFormErrors) {
      setFormErrors(errors);
    } else {
      setFormErrors(initialformErrors);
    }

    return {
      errors,
      hasErrors: hasFormErrors,
    };
  };

  const _handleSelectBankTransactionType = (type: string) => {
    dispatch(actions.getBanksLoading(type));
    setSteps(steps + 1);
  };

  const _handleSelectBankData = (data: BankState) => {
    const { code, bank } = data;
    setFormData({
      ...formData,
      bank_code: code,
      bank_name: bank,
    });
    setSteps(steps + 1);
  };

  const _handleChangeFormFieldValues = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const _onSubmitFormData = (e: any) => {
    e.preventDefault();
    const errors = validateForm(formData);

    if (!errors.hasErrors) {
      dispatch(actions.validateBankLoading(formData));
    }
  };

  const _onTransferFund = async () => {
    await dispatch(actions.generateSendToBankOTPLoading());
    setSteps(4);
  };

  const renderReviewContainer = (type?: string) => {
    const isSuccessReview = type === 'successReview';

    return (
      <S.ReviewContainer>
        <S.ReviewListItem>
          <p>Bank</p>
          <p>{formData.bank_name}</p>
        </S.ReviewListItem>
        <S.ReviewListItem>
          <p>Account Number</p>
          <p>{formData.account_number}</p>
        </S.ReviewListItem>
        <S.ReviewListItem>
          <p>Account Name</p>
          <p>{formData.account_name}</p>
        </S.ReviewListItem>
        <S.ReviewListItem>
          <p>Amount</p>
          <p>PHP {numberWithCommas(formData.amount)}</p>
        </S.ReviewListItem>
        {isSuccessReview ? (
          <React.Fragment>
            <S.ReviewListItem>
              <p>Send Receipt To</p>
              <p>None</p>
            </S.ReviewListItem>
            <S.ReviewListItem>
              <p>Transaction Number</p>
              <p>000001</p>
            </S.ReviewListItem>
          </React.Fragment>
        ) : (
          <S.ReviewListItem>
            <p>Purpose</p>
            <p>{formData.purpose}</p>
          </S.ReviewListItem>
        )}
      </S.ReviewContainer>
    );
  };

  const renderSteps = (step: number) => {
    switch (step) {
      case 0:
        return (
          <S.Wrapper>
            <p>To Bank account</p>
            <S.CTAWrapper>
              {BANK_TRANSACTION_TYPE.map((cta, i) => (
                <S.SendCTA
                  key={i}
                  onClick={
                    cta.onClick
                      ? () => history.push('/send-to-bank/ubp')
                      : () => _handleSelectBankTransactionType(cta.id)
                  }
                >
                  <S.SendCTAContent>
                    <p>{cta.header}</p>
                    <img src={cta.icon} alt="Send to bank" />
                    <S.CTAList>
                      {cta.items.map((item, i) => (
                        <S.CTAListItem key={i}>- {item}</S.CTAListItem>
                      ))}
                    </S.CTAList>
                  </S.SendCTAContent>
                  <S.SendCTALogo>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </S.SendCTALogo>
                </S.SendCTA>
              ))}
            </S.CTAWrapper>
          </S.Wrapper>
        );
      case 1:
        return (
          <S.Wrapper>
            <List divider bordertop>
              {banks?.map((d: any) => (
                <ListItem flex key={d.code}>
                  <ListItemText
                    role="presentation"
                    onClick={() => _handleSelectBankData(d)}
                    primary={d.bank}
                    style={{
                      flexGrow: 1,
                    }}
                    icon
                  />
                </ListItem>
              ))}
            </List>
          </S.Wrapper>
        );
      case 2:
        return (
          <S.Wrapper>
            <S.ContentImage
              src={
                bankTransactionType === 'instapay' ? InstapayLogo : PesonetLogo
              }
              alt="Instapay"
              margin="0 0 20px"
            />
            <S.FormWrapper>
              <Field>
                <Label>
                  Enter Amount <i>*</i>
                </Label>
                <Input
                  required
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={_handleChangeFormFieldValues}
                  placeholder="PHP 0.00"
                />
                {formErrors.amount && (
                  <ErrorMsg formError>{formErrors.amount}</ErrorMsg>
                )}
              </Field>
              <Field>
                <Label>
                  Account Name <i>*</i>
                </Label>
                <Input
                  required
                  type="text"
                  name="account_name"
                  value={formData.account_name}
                  maxLength={150}
                  onChange={_handleChangeFormFieldValues}
                />
                {formErrors.account_name && (
                  <ErrorMsg formError>{formErrors.account_name}</ErrorMsg>
                )}
              </Field>
              <Field>
                <Label>
                  Account Number <i>*</i>
                </Label>
                <Input
                  required
                  type="number"
                  name="account_number"
                  maxLength={20}
                  value={formData.account_number}
                  onChange={_handleChangeFormFieldValues}
                />
                {formErrors.account_number && (
                  <ErrorMsg formError>{formErrors.account_number}</ErrorMsg>
                )}
              </Field>
              <Field>
                <Label>Send Receipt to</Label>
                <Input
                  required
                  type="email"
                  name="send_receipt_to"
                  value={formData.send_receipt_to}
                  onChange={_handleChangeFormFieldValues}
                  placeholder="Enter a valid email address"
                />
                {formErrors.send_receipt_to && (
                  <ErrorMsg formError>{formErrors.send_receipt_to}</ErrorMsg>
                )}
                <S.FieldSubtext>
                  You can notify the recipient by entering their email address
                  and mobile number
                </S.FieldSubtext>
              </Field>
              <Field>
                <Label>Purpose of transaction</Label>
                <Select
                  fullWidth
                  value={formData.purpose}
                  onChange={e => {
                    setFormData({
                      ...formData,
                      purpose: e.target.value,
                    });
                  }}
                  className={formErrors.purpose ? 'error' : undefined}
                >
                  <option value="" disabled>
                    Please select
                  </option>
                  {purposes?.map(d => (
                    <option key={d.code} value={d.description}>
                      {d.description}
                    </option>
                  ))}
                </Select>
                {formErrors.purpose && (
                  <ErrorMsg formError>{formErrors.purpose}</ErrorMsg>
                )}
              </Field>
              <S.FormFooter>
                <Button
                  size="medium"
                  color="secondary"
                  variant="outlined"
                  onClick={() => setSteps(steps - 1)}
                >
                  Back
                </Button>
                <Button
                  size="medium"
                  color="primary"
                  variant="contained"
                  onClick={(e: any) => _onSubmitFormData(e)}
                >
                  Next
                </Button>
              </S.FormFooter>
            </S.FormWrapper>
          </S.Wrapper>
        );
      case 3:
        return (
          <S.Wrapper
            display="flex"
            direction="column"
            alignment="center"
            width="380px"
            margin="20px auto"
          >
            <S.ContentImage
              src={
                bankTransactionType === 'instapay' ? InstapayLogo : PesonetLogo
              }
              alt="Send to bank type"
            />
            {renderReviewContainer('totalReview')}
            <S.ReviewTotal>
              <p className="total-description">Total amount plus service fee</p>
              <p className="total-amount">PHP {calculateTotalAmount}</p>
              <Button
                size="large"
                color="primary"
                variant="contained"
                onClick={() => _onTransferFund()}
                fullWidth
              >
                Transfer Fund
              </Button>
            </S.ReviewTotal>
          </S.Wrapper>
        );
      case 4:
        return <VerifyOTPPage />;
      default:
        return <React.Fragment />;
    }
  };

  const renderTitle = (step: number) => {
    switch (step) {
      case 0:
        return 'Send To Bank';
      case 1:
        return 'Select Partner Banks';
      case 2:
        return 'Bank Account';
      case 3:
        return 'Review Cash Out';
      case 4:
        return '4-Digit One Time PIN';
      case 5:
        return 'Temporary steps';
      default:
        return 'N/A';
    }
  };

  return (
    <React.Fragment>
      <Helmet title="Send To Bank" />
      <Box title={renderTitle(steps)} titleBorder={true}>
        <ComponentLoading isLoading={loading}>
          {renderSteps(steps)}
        </ComponentLoading>
      </Box>
    </React.Fragment>
  );
}
