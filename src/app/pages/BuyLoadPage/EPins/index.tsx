/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { DateTime } from 'luxon';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Loading from 'app/components/Loading';
import H3 from 'app/components/Elements/H3';
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
import Paragraph from 'app/components/Elements/Paragraph';

import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Wrapper from './Wrapper';

import {
  maskCharacters,
  numberCommas,
  regExMobile,
} from 'app/components/Helpers';

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
  selectError,
} from './slice/selectors';

export function BuyEpinsPage() {
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();

  const success: any = useSelector(selectData);
  const loading: any = useSelector(selectLoading);
  const error: any = useSelector(selectError);

  const validateLoading = useSelector(selectValidateLoading);
  const validateSuccess: any = useSelector(selectValidateData);
  const validateError: any = useSelector(selectValidateError);

  const payLoading = useSelector(selectPayLoading);
  const paySuccess: any = useSelector(selectPayData);
  const payError: any = useSelector(selectPayError);

  let date = DateTime.fromSQL(paySuccess.transaction_date);
  if (date.invalid) {
    date = DateTime.fromISO(paySuccess.transaction_date);
  }
  const humanReadable = date.toFormat('dd LLLL yyyy, t');

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
    code: number;
  }>({
    msg: '',
    error: false,
    code: 0,
  });

  const [payApiMsg, setPayApiMsg] = React.useState<{
    msg: string;
    error: boolean;
    code: number;
  }>({
    msg: '',
    error: false,
    code: 0,
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
    if (error && Object.keys(error).length > 0) {
      if (error.code && error.code === 422) {
        onApiError(error);
      }
    }
  }, [error]);

  React.useEffect(() => {
    if (validateError && Object.keys(validateError).length > 0) {
      if (
        validateError.code &&
        validateError.errors &&
        validateError.errors.error_code &&
        validateError.errors.error_code.length > 0
      ) {
        validateError.errors.error_code.forEach((i: any) => {
          setValidateApiMsg(errorHandler(i));
        });
      }
    }
  }, [validateError]);

  React.useEffect(() => {
    if (payError && Object.keys(payError).length > 0) {
      if (payError.code && payError.code === 422) {
        if (
          payError.errors &&
          payError.errors &&
          payError.errors.error_code &&
          payError.errors.error_code.length > 0
        ) {
          payError.errors.error_code.forEach((i: any) => {
            setPayApiMsg(errorHandler(i));
          });
        }
      }
    }
  }, [payError]);

  const onApiError = err => {
    const errors = err.errors ? err.errors : false;
    if (errors && errors.error_code && errors.error_code.length > 0) {
      errors.error_code.map(i => {
        if (i === 302) {
          setMobile({
            ...mobile,
            error: true,
            msg: 'Transaction failed. Please try again.',
          });
          return null;
        }
        if (i === 401) {
          setMobile({
            ...mobile,
            error: true,
            msg: 'User profile not updated.',
          });
          return null;
        }
        if (i === 402) {
          setMobile({
            ...mobile,
            error: true,
            msg: 'Transaction denied due to insufficient Squidpay Balance.',
          });
          return null;
        }
        if (i === 405) {
          setMobile({
            ...mobile,
            error: true,
            msg:
              'You have reached the allowable wallet limit for this month. Please try again next month.',
          });
          return null;
        }
        if (i === 406) {
          setMobile({
            ...mobile,
            error: true,
            msg:
              'Oops! To completely access all Squidpay services, please update your profile. Thank you.',
          });
          return null;
        }
        if (i === 501) {
          setMobile({
            ...mobile,
            error: true,
            msg: 'Mobile number prefix is not supported.',
          });
          return null;
        }
        if (i === 502) {
          setMobile({
            ...mobile,
            error: true,
            msg: 'Mobile number is not supported.',
          });
          return null;
        }

        setMobile({
          ...mobile,
          error: false,
          msg: '',
        });
        return null;
      });
    }
    if (errors && !errors.error_code) {
      let errMsg = '';
      if (errors.mobile_number) {
        errMsg = errors.mobile_number.join('\n');
      }
      if (errors.product_code) {
        errMsg = errors.product_code.join('\n');
      }
      if (errors.product_name) {
        errMsg = errors.product_name.join('\n');
      }
      if (errors.amount) {
        errMsg = errors.amount.join('\n');
      }
      setMobile({
        ...mobile,
        error: errMsg !== '' ? true : false,
        msg: errMsg,
      });
    }

    if (!errors && err.response) {
      setMobile({
        ...mobile,
        error: true,
        msg: err.reponse.statusText,
      });
    }
  };

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
    if (!payLoading) {
      const data = {
        mobile_number: mobile.value,
        product_code: selectedProduct.productCode,
        product_name: selectedProduct.productName,
        amount: selectedProduct.amount,
      };
      dispatch(actions.getPayLoading(data));
    }
  };

  const onCloseValidateError = () => {
    if (validateApiMsg.code === 501 || validateApiMsg.code === 502) {
      setShowForm(true);
      setShowProducts(false);
      setSelectedProduct({
        productCode: '',
        productName: '',
        description: '',
        amount: '',
      });
      dispatch(actions.getValidateReset());
    }
    setValidateApiMsg({ msg: '', error: false, code: 0 });
  };

  const onClosePayError = () => {
    setPayApiMsg({ msg: '', error: false, code: 0 });
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
    setSelectedProduct({
      productCode: '',
      productName: '',
      description: '',
      amount: '',
    });
  };

  const errorHandler = i => {
    switch (i) {
      case 302:
        return {
          msg: 'Transaction failed. Please try again.',
          error: true,
          code: 302,
        };

      case 401: {
        return {
          msg: 'User profile not updated.',
          error: true,
          code: 401,
        };
      }
      case 402: {
        return {
          msg: 'Transaction denied due to insufficient Squidpay Balance.',
          error: true,
          code: 402,
        };
      }
      case 405: {
        return {
          msg:
            'You have reached the allowable wallet limit for this month. Please try again next month.',
          error: true,
          code: 405,
        };
      }
      case 406: {
        return {
          msg:
            'Oops! To completely access all Squidpay services, please update your profile. Thank you.',
          error: true,
          code: 406,
        };
      }
      case 501: {
        return {
          msg: 'Mobile number prefix is not supported.',
          error: true,
          code: 501,
        };
      }
      case 502: {
        return {
          msg: 'Mobile number is not supported.',
          error: true,
          code: 502,
        };
      }
      default:
        return {
          msg: 'Something went wrong',
          error: true,
          code: 1,
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
                  <Scrollbars style={{ maxHeight: '40vh', height: '600px' }}>
                    {success &&
                      success
                        .slice()
                        .sort((a, b) =>
                          a.productCode > b.productCode ? 1 : -1,
                        )
                        .map((promo, idx) => (
                          <div
                            key={idx}
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
                            <div>PHP {numberCommas(promo.denomination)}</div>
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
                        <p>{selectedProduct.description}</p>
                      </Flex>
                      <Flex justifyContent="space-between">
                        <p>Amount</p>
                        <p>PHP {numberCommas(selectedProduct.amount)}</p>
                      </Flex>
                    </section>
                    <br />

                    <p className="text-center" style={{ margin: '0 0 5px' }}>
                      Total Amount
                    </p>
                    <H5 className="text-center" margin="0 0 80px">
                      PHP {numberCommas(selectedProduct.amount)}
                    </H5>
                    {/* <br />
                    <p style={{ marginBottom: '5px' }}>Description</p>
                    <small>{selectedProduct.description}</small> */}
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
                <H3 margin="20px 0 5px">Oops! Transaction Error</H3>
                <Paragraph size="small" align="center" margin="0 0 30px">
                  {validateApiMsg.msg}
                </Paragraph>

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
                <H3 margin="20px 0 5px">Oops! Transaction Error</H3>
                <Paragraph size="small" align="center" margin="0 0 30px">
                  {payApiMsg.msg}
                </Paragraph>

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

            <Dialog show={showPay && Boolean(paySuccess)} size="small">
              <Receipt
                title="Load purchase successful!"
                total={paySuccess.amount}
                onClick={onCloseSuccessDialog}
                date={humanReadable}
              >
                <Flex justifyContent="space-between">
                  <span>Mobile Number</span>
                  <span>
                    {maskCharacters(paySuccess.recipient_mobile_number || '')}
                  </span>
                </Flex>
                <Flex justifyContent="space-between">
                  <span>Load</span>
                  <span>{selectedProduct.description}</span>
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
