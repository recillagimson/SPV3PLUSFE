import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { DateTime } from 'luxon';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Loading from 'app/components/Loading';
import H5 from 'app/components/Elements/H5';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Button from 'app/components/Elements/Button';
import Dialog from 'app/components/Dialog';
import Avatar from 'app/components/Elements/Avatar';
import Flex from 'app/components/Elements/Flex';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import Card from 'app/components/Elements/Card/Card';
import Grid from 'app/components/Elements/Grid';
import Receipt from 'app/components/Receipt';

import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Wrapper from './Wrapper';

import { numberCommas, regExMobile } from 'app/components/Helpers';

import { useContainerSaga } from './slice';
import {
  selectLoading,
  selectData,
  selectValidateLoading,
  selectValidateData,
  selectValidateError,
  selectPayData,
  selectPayLoading,
  selectPayError,
} from './slice/selectors';

export function BuyEpinsPage() {
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();
  let success: any = useSelector(selectData);
  let loading: any = useSelector(selectLoading);

  const validateLoading = useSelector(selectValidateLoading);
  const validateSuccess: any = useSelector(selectValidateData);
  const validateError: any = useSelector(selectValidateError);

  const payLoading = useSelector(selectPayLoading);
  const paySuccess: any = useSelector(selectPayData);
  const payError: any = useSelector(selectPayError);

  const date = DateTime.fromISO(paySuccess.transaction_date);
  const humanReadable = date.toLocaleString(DateTime.DATETIME_MED);

  const [mobile, setMobile] = React.useState<{
    value: string;
    error: boolean;
    msg: string;
  }>({
    value: '',
    error: false,
    msg: '',
  });

  const [selectedProduct, setSelectedProduct] = React.useState<{
    productCode: string;
    productName: string;
    description: string;
    amount: string;
  }>({
    productCode: '',
    productName: '',
    description: '',
    amount: '',
  });

  const [showForm, setShowForm] = React.useState<boolean>(true);
  const [showProducts, setShowProducts] = React.useState<boolean>(false);
  const [showReview, setShowReview] = React.useState<boolean>(false);
  const [showPay, setShowPay] = React.useState<boolean>(false);

  const [validateApiMsg, setValidateApiMsg] = React.useState<{
    msg: string;
    error: boolean;
  }>({
    msg: '',
    error: false,
  });

  const [payApiMsg, setPayApiMsg] = React.useState<{
    msg: string;
    error: boolean;
  }>({
    msg: '',
    error: false,
  });

  React.useEffect(() => {
    return () => {
      dispatch(actions.getFetchReset());
      dispatch(actions.getValidateReset());
      dispatch(actions.getPayReset());
    };
  }, [actions, dispatch]);

  React.useEffect(() => {
    if (Array.isArray(success)) {
      setShowProducts(true);
      setShowForm(false);
    }
  }, [success]);

  React.useEffect(() => {
    if (validateSuccess) {
      setShowProducts(false);
      setShowReview(true);
    }
  }, [validateSuccess]);

  React.useEffect(() => {
    if (paySuccess) {
      setShowPay(true);
    }
  }, [paySuccess]);

  React.useEffect(() => {
    if (validateError && Object.keys(validateError).length > 0) {
      if (validateError.code && validateError.code === 422) {
        if (validateError.errors && validateError.errors.error_code) {
          validateError.errors.error_code.forEach((i: any) => {
            setValidateApiMsg(errorHandler(i));
          });
        }
      }
    }
  }, [validateError]);

  React.useEffect(() => {
    if (payError && Object.keys(payError).length > 0) {
      if (payError.code && payError.code === 422) {
        if (payError.errors && payError.errors.error_code) {
          payError.errors.error_code.forEach((i: any) => {
            setPayApiMsg(errorHandler(i));
          });
        }
      }
    }
  }, [payError]);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    let error = false;

    if (mobile.value === '') {
      error = true;
      setMobile({
        ...mobile,
        error: true,
        msg: 'Please enter your mobile number',
      });
    }

    if (mobile.value !== '' && !regExMobile.test(mobile.value)) {
      error = true;
      setMobile({
        ...mobile,
        error: true,
        msg:
          'Please enter valid mobile number (09 + 9 digit number) ie: 09xxxxxxxxx',
      });
    }

    if (!error) {
      const data = {
        mobile_number: mobile.value,
      };
      dispatch(actions.getFetchLoading(data));
    }
  };

  const OnClickValidate = () => {
    if (selectedProduct.productCode === '') {
      return;
    }

    const data = {
      mobile_number: mobile.value,
      product_code: selectedProduct.productCode,
      product_name: selectedProduct.productName,
      amount: selectedProduct.amount,
    };

    dispatch(actions.getValidateLoading(data));
  };

  const onClickPay = () => {
    const data = {
      mobile_number: mobile.value,
      product_code: selectedProduct.productCode,
      product_name: selectedProduct.productName,
      amount: selectedProduct.amount,
    };
    dispatch(actions.getPayLoading(data));
  };

  const onCloseValidateError = () => {
    setValidateApiMsg({ msg: '', error: false });
  };

  const onClosePayError = () => {
    setPayApiMsg({ msg: '', error: false });
  };

  const onCloseSuccessDialog = () => {
    setShowReview(false);
    setShowProducts(false);
    setShowPay(false);
    setShowForm(true);
    dispatch(actions.getFetchReset());
    dispatch(actions.getValidateReset());
    dispatch(actions.getPayReset());
    setMobile({ value: '', error: false, msg: '' });
  };

  const errorHandler = i => {
    switch (i) {
      case 302:
        return {
          msg: 'Transaction failed. Please try again.',
          error: true,
        };

      case 401: {
        return {
          msg: 'User profile not updated.',
          error: true,
        };
      }
      case 402: {
        return {
          msg: 'Transaction denied due to insufficient Squidpay Balance.',
          error: true,
        };
      }
      case 405: {
        return {
          msg:
            'You have reached the allowable wallet limit for this month. Please try again next month.',
          error: true,
        };
      }
      case 406: {
        return {
          msg:
            'Oops! To completely access all Squidpay services, please update your profile. Thank you.',
          error: true,
        };
      }
      case 501: {
        return {
          msg: 'Mobile number prefix is not supported.',
          error: true,
        };
      }
      case 502: {
        return {
          msg: 'Mobile number is not supported.',
          error: true,
        };
      }
      default:
        return {
          msg: 'Something went wrong',
          error: true,
        };
    }
  };

  // let replaceFirst7 = (mobileNumber: string) => {
  //   return mobileNumber.replace(/^.{1,7}/, m => '*'.repeat(m.length));
  // };

  return (
    <>
      <ProtectedContent>
        <Helmet>
          <title>Buy EPINS</title>
        </Helmet>
        <Wrapper id="buyLoad">
          <Card
            title={!showReview ? 'Buy EPINS' : 'Review Load Purchase'}
            size="medium"
          >
            {loading && <Loading position="absolute" />}
            {validateLoading && <Loading position="absolute" />}
            {payLoading && <Loading position="absolute" />}
            {showForm && (
              <>
                <Field>
                  <Label>Mobile Number</Label>
                  <Input
                    type="number"
                    value={mobile.value}
                    autoComplete="off"
                    onChange={e =>
                      setMobile({
                        value: e.currentTarget.value,
                        error: false,
                        msg: '',
                      })
                    }
                    error={mobile.error ? true : undefined}
                    hidespinner
                  />
                  {mobile.error && <ErrorMsg formError>{mobile.msg}</ErrorMsg>}
                </Field>
                <Flex justifyContent="flex-end">
                  <Button
                    type="submit"
                    color="primary"
                    size="large"
                    variant="contained"
                    onClick={onSubmit}
                    style={{ paddingLeft: '30px', paddingRight: '30px' }}
                  >
                    Next
                  </Button>
                </Flex>
              </>
            )}

            {showProducts && success && (
              <>
                <Flex justifyContent="center">
                  <Avatar
                    image=""
                    size="medium"
                    style={{ marginBottom: '10px' }}
                  />
                </Flex>
                <H5 className="text-center">{mobile.value}</H5>
                <br />
                <section>
                  <Scrollbars style={{ height: 300 }}>
                    {success
                      .slice()
                      .sort((a, b) =>
                        a.denomination > b.denomination ? 1 : -1,
                      )
                      .map(promo => (
                        <div
                          key={promo.productCode}
                          className={
                            selectedProduct.productName === ''
                              ? 'product-list'
                              : selectedProduct.productName ===
                                promo.productCode
                              ? 'active product-list'
                              : 'product-list'
                          }
                          onClick={() => {
                            setSelectedProduct({
                              productCode: promo.productCode,
                              productName: promo.productCode,
                              description: promo.description,
                              amount: promo.denomination,
                            });
                          }}
                        >
                          <div>{promo.description}</div>
                          <div>PHP {promo.denomination}.00</div>
                        </div>
                      ))}
                  </Scrollbars>
                  <br />
                  <Flex justifyContent="flex-end">
                    <Button
                      type="submit"
                      color="primary"
                      size="large"
                      variant="contained"
                      onClick={OnClickValidate}
                      style={{ paddingLeft: '30px', paddingRight: '30px' }}
                    >
                      Next
                    </Button>
                  </Flex>
                </section>
              </>
            )}

            {showReview && !showProducts && !showForm && (
              <>
                <br />
                <Grid columns="1fr 2fr 1fr">
                  <div></div>
                  <div>
                    <Flex justifyContent="center">
                      <Avatar
                        image=""
                        size="medium"
                        style={{ marginBottom: '10px' }}
                      />
                    </Flex>
                    <H5 className="text-center">{mobile.value}</H5>
                    <br />
                    <section className="review-details">
                      <Flex justifyContent="space-between">
                        <p>Mobile Number</p>
                        <p>{mobile.value}</p>
                      </Flex>
                      <Flex justifyContent="space-between">
                        <p>Load</p>
                        <p>{selectedProduct.productCode}</p>
                      </Flex>
                      <Flex justifyContent="space-between">
                        <p>Amount</p>
                        <p>PHP {numberCommas(selectedProduct.amount)}</p>
                      </Flex>
                    </section>
                    <br />

                    <p className="text-center">Total Amount</p>
                    <H5 className="text-center">
                      PHP {numberCommas(selectedProduct.amount)}
                    </H5>
                    <br />
                    <p style={{ marginBottom: '5px' }}>Description</p>
                    <small>{selectedProduct.description}</small>
                    <br />
                    <br />
                    <br />
                    <Button
                      type="submit"
                      color="primary"
                      size="large"
                      variant="contained"
                      onClick={onClickPay}
                      fullWidth={true}
                    >
                      Pay
                    </Button>
                  </div>
                  <div></div>
                </Grid>
              </>
            )}

            <Dialog show={validateApiMsg.error} size="xsmall">
              <div style={{ margin: '20px', textAlign: 'center' }}>
                <CircleIndicator size="medium" color="danger">
                  <FontAwesomeIcon icon="times" />
                </CircleIndicator>
                <H5 margin="10px 0 5px">Oops! Transaction Error</H5>
                <small>{validateApiMsg.msg}</small>
                <br />
                <br />
                <Button
                  fullWidth
                  onClick={onCloseValidateError}
                  variant="outlined"
                  size="medium"
                >
                  Ok
                </Button>
              </div>
            </Dialog>

            <Dialog show={payApiMsg.error} size="xsmall">
              <div style={{ margin: '20px', textAlign: 'center' }}>
                <CircleIndicator size="medium" color="danger">
                  <FontAwesomeIcon icon="times" />
                </CircleIndicator>
                <H5 margin="10px 0 5px">Oops! Transaction Error</H5>
                <small>{payApiMsg.msg}</small>
                <br />
                <br />
                <Button
                  fullWidth
                  onClick={onClosePayError}
                  variant="outlined"
                  size="medium"
                >
                  Ok
                </Button>
              </div>
            </Dialog>

            <Dialog show={showPay && Boolean(paySuccess)} size="xsmall">
              <Receipt
                title="Load purchase successful!"
                total={paySuccess.amount + '.00'}
                onClick={onCloseSuccessDialog}
                date={humanReadable}
              >
                <Flex justifyContent="space-between">
                  <span>Mobile Number</span>
                  <span>{paySuccess.recipient_mobile_number || ''}</span>
                </Flex>
                <Flex justifyContent="space-between">
                  <span>Load</span>
                  <span>{paySuccess.product_code}</span>
                </Flex>
                <Flex justifyContent="space-between">
                  <span>Amount</span>
                  <span>PHP {numberCommas(paySuccess.amount)}</span>
                </Flex>
                <Flex justifyContent="space-between">
                  <span>Transaction Number</span>
                  <span>{paySuccess.transaction_number}</span>
                </Flex>
              </Receipt>
            </Dialog>
          </Card>
        </Wrapper>
      </ProtectedContent>
    </>
  );
}
