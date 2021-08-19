import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';

// import moment from 'moment';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

// get our fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import ComponentLoading from 'app/components/ComponentLoading';
import Button from 'app/components/Elements/Button';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import Select from 'app/components/Elements/Select';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import H3 from 'app/components/Elements/H3';
import Dialog from 'app/components/Dialog';
import Logo from 'app/components/Assets/Logo';

/** slice */
import { selectData } from 'app/pages/DashboardPage/slice/selectors';

import { useContainerSaga } from './slice';
import {
  selectLoading,
  selectError,
  selectBillers,
  selectBillerCode,
  selectValidatedBiller,
  selectCreatedPayBills,
} from './slice/selectors';
import { BillersState, BillerStateOptions } from './slice/types';

// Helpers
import { numberWithCommas } from 'utils/common';
import { numberCommas } from 'app/components/Helpers';
import {
  CATEGORIES,
  getFormData,
  disconnectionDialogLogo,
  isPrimaryColorForDisconnection,
  disconnectionTitleMessage,
} from './helpers';
import { RENDER_FIELDS, RENDER_SELECT_ITEMS } from './fields';

// Assets
import WrapperCuttedCornerBottom from 'app/components/Assets/WrapperCuttedCornerBottom.svg';
import WrapperCuttedCornerTop from 'app/components/Assets/WrapperCuttedCornerTop.svg';
import BayadCenterLogo from 'app/components/Assets/paybills/bayad-center-logo.svg';

// Styles
import * as S from './PayBills.style';

export function PayBillsPage() {
  const history = useHistory();
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const apiErrors: any = useSelector(selectError);
  const dashData: any = useSelector(selectData);
  const billers: any = useSelector(selectBillers);
  const billerCode: string = useSelector(selectBillerCode);
  const validatedBiller: any = useSelector(selectValidatedBiller);
  const createdPayBills: any = useSelector(selectCreatedPayBills);
  const [steps, setSteps] = React.useState(0);
  const [selectedBillers, setSelectedBillers] = React.useState([]);
  const [filteredBillers, setSelectedFilteredBillers] = React.useState([]);
  const [isDialogErrorOpen, setDialogError] = React.useState(false);
  const [isDialogSuccessOpen, setDialogSuccess] = React.useState<boolean>(
    false,
  );
  const [isDisconnectionDialogOpen, setDisconnectionDialog] = React.useState<
    string
  >('');
  const [disconnectionCode, setDisconnectionCode] = React.useState(null);
  const isMECOR = billerCode === 'MECOR';

  let balanceInfo = '000.00';
  if (dashData && dashData.balance_info) {
    balanceInfo = numberCommas(
      parseFloat(dashData.balance_info.available_balance).toFixed(2),
    );
  }

  const initialFormData: any = {};

  const [formData, setFormData] = React.useState(initialFormData);
  const [formErrors, setFormErrors] = React.useState(initialFormData);

  React.useEffect(() => {
    dispatch(actions.clear()); // Clear all the data
    setSteps(0); // Reset in first step the pay bills page
    setFormData(initialFormData); // Reset in default state the forms
    setFormErrors(initialFormData); // Reset in error state
    dispatch(actions.getBillersLoading());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      setSteps(0);
      dispatch(actions.clear());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handles API errors
  React.useEffect(() => {
    if (apiErrors && apiErrors?.errors?.error_code?.length) {
      console.log('apiErrors...', apiErrors);
      const transactionFailed = apiErrors?.errors?.error_code?.find(
        errorCode => errorCode === 151,
      );
      if (
        apiErrors &&
        apiErrors?.provider_error?.length &&
        apiErrors?.code === 422
      ) {
        const provider_error =
          apiErrors?.provider_error.length && apiErrors?.provider_error[0];
        if (provider_error?.data) {
          const payloadForMECOR: any = {
            validationNumber: provider_error?.data?.validationNumber,
          };
          dispatch(actions.validatePayBillsSuccess(payloadForMECOR));
          setDisconnectionDialog(provider_error?.data?.message);
          setDisconnectionCode(provider_error?.data?.code);
        }

        if (provider_error?.details) {
          setDisconnectionDialog(provider_error?.details?.message);
          setDisconnectionCode(provider_error?.details?.code);
        }
      }

      if (
        apiErrors &&
        apiErrors?.provider_error?.length &&
        apiErrors?.code === 422
      ) {
        const provider_error =
          apiErrors?.provider_error.length && apiErrors?.provider_error[0];
        if (provider_error?.data) {
          const payloadForMECOR: any = {
            validationNumber: provider_error?.data?.validationNumber,
          };
          dispatch(actions.validatePayBillsSuccess(payloadForMECOR));
          setDisconnectionDialog(provider_error?.data?.message);
          setDisconnectionCode(provider_error?.data?.code);
        }

        if (provider_error?.details) {
          setDisconnectionDialog(provider_error?.details?.message);
          setDisconnectionCode(provider_error?.details?.code);
        }
      }

      if (transactionFailed) setDialogError(true);
    }

    if (apiErrors && apiErrors?.provider_error?.length) {
      if (
        apiErrors?.provider_error[0].status !== 400 &&
        apiErrors?.code !== 422
      ) {
        const providerErr = Object.keys(apiErrors?.provider_error[0]?.errors);
        if (providerErr.length) {
          const errors = {};
          providerErr.map(err => {
            const error = apiErrors?.provider_error[0]?.errors[err];
            errors[err] = error[0]?.message;
            return err;
          });

          setFormErrors({ ...formErrors, ...errors });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiErrors]);

  // Success created pay bills
  React.useEffect(() => {
    if (
      Object.keys(validatedBiller).length &&
      validatedBiller?.validationNumber
    ) {
      console.log('validatedBiller...', validatedBiller);
      setSteps(steps + 1);
    }

    if (Object.keys(createdPayBills).length) {
      console.log('createdPayBills...', createdPayBills);
      setDialogSuccess(true);
      setSteps(3);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdPayBills, validatedBiller]);

  const renderList = (successReview: boolean, isMecor: boolean, data: any) => {
    if (isMecor && successReview) {
      return (
        <React.Fragment>
          <S.ReviewListItem>
            <p>Account Name</p>
            <p>{data.account_name || 'None'}</p>
          </S.ReviewListItem>
          <S.ReviewListItem>
            <p>Customer Account Number</p>
            <p>{data.account_number || data.referenceNumber || 'None'}</p>
          </S.ReviewListItem>
          <S.ReviewListItem>
            <p>Reference Number</p>
            <p>{data.reference_number || data.referenceNumber || 'None'}</p>
          </S.ReviewListItem>
          <S.ReviewListItem>
            <p>Amount</p>
            <p>PHP {numberWithCommas(data.amount)}</p>
          </S.ReviewListItem>
        </React.Fragment>
      );
    } else if (isMecor) {
      return (
        <React.Fragment>
          <S.ReviewListItem>
            <p>Customer Account Number</p>
            <p>{data.account_number || data.referenceNumber || 'None'}</p>
          </S.ReviewListItem>
          <S.ReviewListItem>
            <p>Amount</p>
            <p>PHP {numberWithCommas(data.amount)}</p>
          </S.ReviewListItem>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <S.ReviewListItem>
            <p>Account Name</p>
            <p>{data.account_name || 'None'}</p>
          </S.ReviewListItem>
          <S.ReviewListItem>
            <p>Account Number</p>
            <p>{data.account_number || data.referenceNumber || 'None'}</p>
          </S.ReviewListItem>
          <S.ReviewListItem>
            <p>Reference Number</p>
            <p>{data.reference_number || data.referenceNumber || 'None'}</p>
          </S.ReviewListItem>
          <S.ReviewListItem>
            <p>Amount</p>
            <p>PHP {numberWithCommas(data.amount)}</p>
          </S.ReviewListItem>
          <S.ReviewListItem>
            <p>Send Receipt To</p>
            <p>{data.send_receipt_to || 'None'}</p>
          </S.ReviewListItem>
          <S.ReviewListItem>
            <p>Message</p>
            <p>{data.message || 'None'}</p>
          </S.ReviewListItem>
          {successReview && (
            <S.ReviewListItem>
              <p>Transaction Number</p>
              <p>{data.transaction_number || 'None'}</p>
            </S.ReviewListItem>
          )}
        </React.Fragment>
      );
    }
  };

  const renderReviewContainer = (data: any, type?: string) => {
    const selectedBiller = billers?.find(biller => biller.code === billerCode);
    const firstChar = selectedBiller?.name.charAt(0);
    const isSuccessReview = type === 'successReview';

    const date = DateTime.fromISO(data?.created_at);
    const monthDateYearTime = date.toLocaleString(DateTime.DATETIME_MED);

    return (
      <S.ReviewContainer width={isSuccessReview ? 'unset' : '400px'}>
        <CircleIndicator size="medium" color="primary">
          {isSuccessReview ? <FontAwesomeIcon icon="check" /> : firstChar}
        </CircleIndicator>
        <h3 className="review-title">
          {isSuccessReview ? 'Transaction successful!' : selectedBiller?.name}
        </h3>
        {isMECOR && isSuccessReview && (
          <p className="mecor-message">
            "Sweet! We have received your MERALCO bill payment and are currently
            processing it. Thank you. Have a great day ahead!"
          </p>
        )}
        {renderList(isSuccessReview, isMECOR, data)}
        <S.ReviewTotal>
          <p className="total-description">Total amount</p>
          <p className="total-amount">PHP {numberWithCommas(data?.amount)}</p>
          <p className="service-fees">
            Service Fee: PHP {numberWithCommas(validatedBiller?.serviceFee)}
          </p>
          <p className="other-fees">
            Other Charges: PHP {numberWithCommas(validatedBiller?.otherCharges)}
          </p>
          {isSuccessReview && (
            <img
              className="bayad-center"
              src={BayadCenterLogo}
              alt="Bayad Center"
            />
          )}
          {isSuccessReview ? (
            <React.Fragment>
              <Logo size="small" />
              <p className="date">{monthDateYearTime}</p>
            </React.Fragment>
          ) : (
            <S.PayBillCTAContainer>
              <img
                className="bayad-center"
                src={BayadCenterLogo}
                alt="Bayad Center"
              />
              <Button
                size="large"
                color="primary"
                variant="contained"
                onClick={() => dispatch(actions.createPayBillsLoading())}
              >
                Pay Bill
              </Button>
            </S.PayBillCTAContainer>
          )}
        </S.ReviewTotal>
      </S.ReviewContainer>
    );
  };

  const selectCategory = (category?: string) => {
    const filtered = billers.filter(
      (biller: BillersState) =>
        biller.category.toLowerCase() === category?.toLowerCase() &&
        biller.active === '1',
    );

    setSelectedBillers(filtered);
    setSelectedFilteredBillers(filtered);
    setSteps(1);
  };

  const onSearchBillers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = e.target.value;

    const filtered = selectedBillers?.filter((biller: BillersState) => {
      return (
        biller.name.toLowerCase().search(searchString.toLowerCase()) !== -1 ||
        biller.description.toLowerCase().search(searchString.toLowerCase()) !==
          -1
      );
    });

    setSelectedFilteredBillers(filtered);
  };

  const onChangeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = form => {
    const keys = Object.keys(form);
    const errors = {};

    // Check if the field has an empty value
    keys.forEach(k => {
      if (form[k] === '') {
        errors[k] = 'This is a required field';
      }
    });

    setFormErrors(errors);
    return !!Object.keys(errors).length;
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (!validate(formData)) {
      const payload = getFormData(formData, billerCode);
      dispatch(actions.validatePayBillsLoading(payload));
    }
  };

  const activeCategories = () => {
    const filteredCategories = CATEGORIES.map(cat => {
      const isActive = !!billers?.find(
        biller =>
          biller.category.toLowerCase() === cat.value.toLowerCase() &&
          biller.active === '1',
      );

      return {
        ...cat,
        isActive,
      };
    });
    return filteredCategories;
  };

  const renderView = step => {
    switch (step) {
      case 0:
        return (
          <React.Fragment>
            <h3 className="title">Categories</h3>
            <S.BillersOptions>
              {activeCategories()?.map(
                (category: BillerStateOptions, i: number) => {
                  // eslint-disable-next-line array-callback-return
                  if (!category.isActive) return;

                  return (
                    <S.BillerOptionsItem
                      key={i}
                      onClick={() => selectCategory(category.value)}
                    >
                      <img src={category.icon} alt={category.label} />
                      <p>{category.label}</p>
                    </S.BillerOptionsItem>
                  );
                },
              )}
            </S.BillersOptions>
          </React.Fragment>
        );
      case 1:
        return (
          <S.BillersList>
            {filteredBillers.map((biller: BillersState) => (
              <S.BillersListItem
                key={biller.code}
                onClick={() => {
                  // Clear form data
                  setFormData(initialFormData);
                  setFormErrors(initialFormData);

                  const fields = {};
                  RENDER_FIELDS(biller.code).map((field: any) => {
                    if (field.required) {
                      fields[field.name] = '';
                    }

                    return {};
                  });

                  // Set form data based on the biller fields
                  setFormData(fields);
                  setFormErrors(fields);
                  // Set selected code for the biller
                  dispatch(actions.setBillerCode(biller.code));
                  // Render next steps after selecting a biller
                  setSteps(2);
                }}
              >
                <img
                  src={biller.logo}
                  alt={biller.category}
                  onError={e => {
                    e.currentTarget.src = 'https://via.placeholder.com/150x50';
                  }}
                />
                <p>{biller.name}</p>
              </S.BillersListItem>
            ))}
          </S.BillersList>
        );
      case 2:
        return (
          <S.FormWrapper>
            {RENDER_FIELDS(billerCode).map((field: any, i) => {
              const items = RENDER_SELECT_ITEMS(
                billerCode.toLowerCase() + `_` + field.name,
              );
              if (field.type === 'select') {
                return (
                  <Field key={i}>
                    <Label>
                      {field.label} {field.required ? <i>*</i> : ''}
                    </Label>
                    <Select
                      fullWidth
                      value={formData[field.name]}
                      name={field.name}
                      onChange={e => {
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      className={formErrors[field.name] ? 'error' : undefined}
                    >
                      <option value="">Please select</option>
                      {items.map(d => (
                        <option key={d.value} value={d.value}>
                          {d.label}
                        </option>
                      ))}
                    </Select>
                    {formErrors[field.name] && (
                      <ErrorMsg formError>{formErrors[field.name]}</ErrorMsg>
                    )}
                  </Field>
                );
              } else {
                switch (field.name) {
                  case 'amount':
                    return (
                      <Field key={i}>
                        <Label>
                          {field.label} {field.required ? <i>*</i> : ''}
                        </Label>
                        <Input
                          {...field}
                          required={field.required}
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={onChangeFormData}
                          placeholder={field.placeholder}
                        />
                        {formErrors[field.name] && (
                          <ErrorMsg formError>
                            {formErrors[field.name]}
                          </ErrorMsg>
                        )}
                        <S.FieldSubtext>
                          Available balance: PHP {balanceInfo}
                        </S.FieldSubtext>
                      </Field>
                    );
                  default:
                    return (
                      <Field key={i}>
                        <Label>
                          {field.label} {field.required ? <i>*</i> : ''}
                        </Label>
                        <Input
                          required={field.required}
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={onChangeFormData}
                          placeholder={field.placeholder}
                          maxLength={field.maxLength}
                        />
                        {formErrors[field.name] && (
                          <ErrorMsg formError>
                            {formErrors[field.name]}
                          </ErrorMsg>
                        )}
                      </Field>
                    );
                }
              }
            })}
            {isMECOR && (
              <S.NoteWrapper>
                <p className="important">
                  IMPORTANT NOTE:
                  <span>
                    To avoid inconvenience, please input the exact amount of
                    your total billing amount due and settle before your due
                    date.
                  </span>
                </p>
                <p>
                  Please review to ensure that the details are correct before
                  you proceed.
                </p>
              </S.NoteWrapper>
            )}
            <S.FormFooter>
              <Button
                size="medium"
                color="secondary"
                variant="outlined"
                onClick={() => {
                  setFormData(initialFormData);
                  setFormErrors(initialFormData);
                  setSelectedFilteredBillers(selectedBillers);
                  setSteps(steps - 1);
                }}
              >
                Back
              </Button>
              <Button
                size="medium"
                color="primary"
                variant="contained"
                onClick={onSubmit}
              >
                Next
              </Button>
            </S.FormFooter>
          </S.FormWrapper>
        );
      case 3:
        return renderReviewContainer(formData, 'payBillReview');
      default:
        return <React.Fragment />;
    }
  };

  const renderHeader = (step: number) => {
    switch (step) {
      case 0:
      case 2:
        return <h3>Pay Bills</h3>;
      case 1:
        return (
          <React.Fragment>
            <h3>Electric Utility</h3>
            {false && ( // Temporary hidden
              <Input
                type="text"
                placeholder="Search"
                onChange={onSearchBillers}
              />
            )}
          </React.Fragment>
        );
      case 3:
        return <h3>Review Payments</h3>;
      default:
        return <React.Fragment />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Pay bills</title>
      </Helmet>
      <S.Container>
        <S.Wrapper data-id="Paybills-Wrapper">
          <S.WrapperHeader isCustom={steps === 1}>
            <div>
              {renderHeader(steps)}
              <Button onClick={() => setSteps(0)}>Back</Button>
            </div>
          </S.WrapperHeader>
          <ComponentLoading isLoading={loading}>
            <S.WrapperContent>{renderView(steps)}</S.WrapperContent>
          </ComponentLoading>
        </S.Wrapper>
        {/* Show BAYAD CENTER logo when in the form fields */}
        {steps === 2 && (
          <img
            className="bayad-center"
            src={BayadCenterLogo}
            alt="Bayad Center"
          />
        )}
      </S.Container>
      {/* show success Dialog */}
      <Dialog show={isDialogSuccessOpen} size="small">
        <S.DetailsWrapper padding="15px">
          <Logo size="medium" />
          <S.SuccessWrapper>
            <S.CuttedImageWrapper
              src={WrapperCuttedCornerTop}
              alt="Squid pay"
            />
            {renderReviewContainer(createdPayBills, 'successReview')}
            <S.CuttedImageWrapper
              src={WrapperCuttedCornerBottom}
              alt="Squid pay"
            />
          </S.SuccessWrapper>
          <div className="text-center">
            <Button
              size="medium"
              color="primary"
              variant="contained"
              onClick={() => {
                setDialogError(false);
                dispatch(actions.clear());
                history.push('/dashboard');
              }}
              fullWidth
            >
              Close
            </Button>
            <S.ConfirmationMessage>
              "You will receive an SMS notification for your confirmed
              transaction"
            </S.ConfirmationMessage>
          </div>
        </S.DetailsWrapper>
      </Dialog>
      {/* MECOR Disconnection Dialog */}
      <Dialog show={!!isDisconnectionDialogOpen} size="small">
        <S.DetailsWrapper padding="15px">
          <div className="text-center">
            <CircleIndicator
              size="medium"
              color={isPrimaryColorForDisconnection(disconnectionCode)}
            >
              <FontAwesomeIcon
                icon={disconnectionDialogLogo(disconnectionCode)}
              />
            </CircleIndicator>
            <H3 margin="15px 0 10px">
              {disconnectionTitleMessage(disconnectionCode)}
            </H3>
            <S.DisconnectionMessage>
              {isDisconnectionDialogOpen}
            </S.DisconnectionMessage>
            <S.DialogActions>
              {disconnectionCode === 1 && (
                <Button
                  fullWidth
                  onClick={() => {
                    setDisconnectionDialog('');
                    setSteps(3);
                  }}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  I agree
                </Button>
              )}
              <Button
                fullWidth
                onClick={() => {
                  setDisconnectionDialog('');
                }}
                variant="outlined"
                color="default"
                size="large"
              >
                {disconnectionCode === 1 ? 'Cancel' : 'Ok'}
              </Button>
            </S.DialogActions>
          </div>
        </S.DetailsWrapper>
      </Dialog>
      {/* show error Dialog */}
      <Dialog show={isDialogErrorOpen} size="small">
        <S.DetailsWrapper padding="15px">
          <div className="text-center">
            <CircleIndicator size="medium" color="danger">
              <FontAwesomeIcon icon="times" />
            </CircleIndicator>
            <H3 margin="15px 0 10px">Oops! System Error</H3>
            <Button
              fullWidth
              onClick={() => {
                setDialogError(false);
                dispatch(actions.clear());
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
    </>
  );
}
