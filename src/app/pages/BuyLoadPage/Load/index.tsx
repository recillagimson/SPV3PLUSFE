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

// For the custom sidebar for the pills
import { Scrollbars } from 'react-custom-scrollbars';
// FontAwesome import
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
  // selectError,
  selectData,
  selectValidateLoading,
  selectValidateData,
  selectValidateError,
  selectPayData,
  selectPayLoading,
  selectPayError,
} from './slice/selectors';

export function BuyLoadPage() {
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  // const error: any = useSelector(selectError);
  const success: any = useSelector(selectData);

  const validateLoading = useSelector(selectValidateLoading);
  const validateSuccess: any = useSelector(selectValidateData);
  const validateError: any = useSelector(selectValidateError);

  const payLoading = useSelector(selectPayLoading);
  const paySuccess: any = useSelector(selectPayData);
  const payError: any = useSelector(selectPayError);

  const date = DateTime.fromISO(paySuccess.transaction_date);
  const humanReadable = date.toLocaleString(DateTime.DATETIME_MED);

  const [mobile, setMobile] = React.useState({
    value: '',
    error: false,
    msg: '',
  });

  const [selectedProduct, setSelectedProduct] = React.useState({
    productCode: '',
    productName: '',
    description: '',
    amount: '',
  });

  const [showForm, setShowForm] = React.useState(true);
  const [showProducts, setShowProducts] = React.useState(false);
  const [isReview, setIsReview] = React.useState(false);

  // const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isActive, setIsActive] = React.useState({ value: '' });

  const [category, setCategory] = React.useState('');
  const [categories, setCategories] = React.useState<any[]>([]);

  const [validateApiMsg, setValidateApiMsg] = React.useState({
    msg: '',
    error: false,
  });

  const [payApiMsg, setPayApiMsg] = React.useState({
    msg: '',
    error: false,
  });

  React.useEffect(() => {
    return () => {
      dispatch(actions.getFetchReset());
      dispatch(actions.getValidateReset());
      dispatch(actions.getPayReset());
      setShowForm(true);
      setIsReview(false);
      setShowProducts(false);
      setIsSuccess(false);
      setCategory('');
      setCategories([]);
      setSelectedProduct({
        productCode: '',
        productName: '',
        description: '',
        amount: '',
      });
    };
  }, [actions, dispatch]);

  React.useEffect(() => {
    if (success && success.length > 0) {
      const cats: string[] = Array.from(new Set(success.map(x => x.category)));

      setCategories(cats);
      setCategory(cats[0]);
      setShowForm(false);
      setShowProducts(true);
    }
  }, [success]);

  React.useEffect(() => {
    if (validateError && Object.keys(validateError).length > 0) {
      if (validateError.code && validateError.code === 422) {
        if (
          validateError.errors &&
          validateError.errors.error_code &&
          validateError.errors.error_code.length > 0
        ) {
          validateError.errors.error_code.forEach((i: any) => {
            if (i === 302) {
              setValidateApiMsg({
                msg: 'Transaction failed. Please try again.',
                error: true,
              });
            }
            if (i === 401) {
              setValidateApiMsg({
                msg: 'User profile not updated.',
                error: true,
              });
            }
            if (i === 402) {
              setValidateApiMsg({
                msg: 'Transaction denied due to insufficient Squidpay Balance.',
                error: true,
              });
            }
            if (i === 405) {
              setValidateApiMsg({
                msg: 'Oh No! You have exceeded your monthly limit.',

                error: true,
              });
            }
            if (i === 406) {
              setValidateApiMsg({
                msg:
                  'Oops! To completely access all Squidpay services, please update your profile. Thank you.',
                error: true,
              });
            }
            if (i === 501) {
              setValidateApiMsg({
                msg: 'Mobile number prefix is not supported.',
                error: true,
              });
            }
            if (i === 502) {
              setPayApiMsg({
                msg: 'Mobile number is not supported.',
                error: true,
              });
            }
          });
        }
      }
    }

    if (payError && Object.keys(payError).length > 0) {
      if (payError.code && payError.code === 422) {
        if (payError.errors && payError.errors.error_code) {
          payError.errors.error_code.forEach((i: any) => {
            if (i === 302) {
              setPayApiMsg({
                msg: 'Transaction failed. Please try again.',
                error: true,
              });
            }
            if (i === 401) {
              setPayApiMsg({
                msg: 'User profile not updated.',
                error: true,
              });
            }
            if (i === 402) {
              setPayApiMsg({
                msg: 'Transaction denied due to insufficient Squidpay Balance.',
                error: true,
              });
            }
            if (i === 405) {
              setPayApiMsg({
                msg: 'Oh No! You have exceeded your monthly limit.',

                error: true,
              });
            }
            if (i === 406) {
              setPayApiMsg({
                msg:
                  'Oops! To completely access all Squidpay services, please update your profile. Thank you.',
                error: true,
              });
            }
            if (i === 501) {
              setPayApiMsg({
                msg: 'Mobile number prefix is not supported.',
                error: true,
              });
            }
            if (i === 502) {
              setPayApiMsg({
                msg: 'Mobile number is not supported.',
                error: true,
              });
            }
          });
        }
      }
    }
    if (validateSuccess) {
      setShowProducts(false);
      setIsReview(true);
    }
    if (paySuccess) {
      setIsSuccess(true);
    }
  }, [success, validateSuccess, validateError, paySuccess, payError]);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    let error = false;

    // first check if field is not empty
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

      // dispatch payload to saga
      dispatch(actions.getFetchLoading(data));
    }
  };

  // 2nd API
  const OnClickValidate = () => {
    let isEmpty = false;
    if (selectedProduct.productCode === '') {
      isEmpty = true;
    }

    if (!isEmpty) {
      const data = {
        mobile_number: mobile.value,
        product_code: selectedProduct.productCode,
        product_name: selectedProduct.productName,
        amount: selectedProduct.amount,
      };

      // dispatch payload to saga
      dispatch(actions.getValidateLoading(data));
    }
  };

  // 3rd API
  const onClickPay = () => {
    const data = {
      mobile_number: mobile.value,
      product_code: selectedProduct.productCode,
      product_name: selectedProduct.productName,
      amount: selectedProduct.amount,
    };

    // dispatch payload to saga
    dispatch(actions.getPayLoading(data));
  };

  const onCloseValidateError = () => {
    setValidateApiMsg({ msg: '', error: false });
  };

  const onClosePayError = () => {
    setPayApiMsg({ msg: '', error: false });
  };

  const onCloseSuccessDialog = () => {
    setIsReview(false);
    setShowProducts(false);
    setIsSuccess(false);
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
    setCategory('');
    setCategories([]);
  };

  return (
    <>
      <ProtectedContent>
        <Helmet>
          <title>Buy Load</title>
        </Helmet>

        <Wrapper id="buyLoad">
          <Card
            title={!isReview ? 'Buy Load' : 'Review Load Purchase'}
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
                    image={validateSuccess.avatar_link || ''}
                    size="medium"
                    style={{ marginBottom: '10px' }}
                  />
                </Flex>
                <H5 className="text-center">{mobile.value}</H5>
                <br />
                {categories && categories.length > 0 && (
                  <div className="pills">
                    <Scrollbars style={{ height: 50 }}>
                      {categories.map((p, i: number) => (
                        <Button
                          type="submit"
                          color="secondary"
                          size="medium"
                          variant={category === p ? 'contained' : 'outlined'}
                          onClick={() => setCategory(p)}
                        >
                          {p}
                        </Button>
                      ))}
                    </Scrollbars>
                  </div>
                )}
                {/* {success[0].provider === 'SMART' && (
                  <div className="pills">
                    <Scrollbars style={{ height: 50 }}>
                      <Button
                        type="submit"
                        color="secondary"
                        size="medium"
                        variant={
                          category === 'Regular' ? 'contained' : 'outlined'
                        }
                        onClick={() => setCategory('Regular')}
                      >
                        Regular
                      </Button>
                      <Button
                        type="submit"
                        color="secondary"
                        size="medium"
                        variant={
                          category === 'Broadband' ? 'contained' : 'outlined'
                        }
                        onClick={() => setCategory('Broadband')}
                      >
                        Broadband
                      </Button>
                      <Button
                        type="submit"
                        color="secondary"
                        size="medium"
                        variant={
                          category === 'Call & Text' ? 'contained' : 'outlined'
                        }
                        onClick={() => setCategory('Call & Text')}
                      >
                        Call &amp; Text
                      </Button>
                      <Button
                        type="submit"
                        color="secondary"
                        size="medium"
                        variant={
                          category === 'Utility' ? 'contained' : 'outlined'
                        }
                        onClick={() => setCategory('Utility')}
                      >
                        Utility
                      </Button>
                      <Button
                        type="submit"
                        color="secondary"
                        size="medium"
                        variant={
                          category === 'PayTV' ? 'contained' : 'outlined'
                        }
                        onClick={() => setCategory('PayTV')}
                      >
                        PayTV
                      </Button>
                    </Scrollbars>
                  </div>
                )}
                {success[0].provider === 'GLOBE' && (
                  <div className="pills">
                    <Scrollbars style={{ height: 50 }}>
                      <Button
                        type="submit"
                        color="secondary"
                        size="medium"
                        variant={
                          category === 'Regular' ? 'contained' : 'outlined'
                        }
                        onClick={() => setCategory('Regular')}
                      >
                        Regular
                      </Button>
                      <Button
                        type="submit"
                        color="secondary"
                        size="medium"
                        variant={
                          category === 'Broadband' ? 'contained' : 'outlined'
                        }
                        onClick={() => setCategory('Broadband')}
                      >
                        Broadband
                      </Button>
                    </Scrollbars>
                  </div>
                )}
                {success[0].provider === 'SUN' && (
                  <div className="pills">
                    <Scrollbars style={{ height: 50 }}>
                      <Button
                        type="submit"
                        color="secondary"
                        size="medium"
                        variant={
                          category === 'Regular' ? 'contained' : 'outlined'
                        }
                        onClick={() => setCategory('Regular')}
                      >
                        Regular
                      </Button>
                      <Button
                        type="submit"
                        color="secondary"
                        size="medium"
                        variant={
                          category === 'Broadband' ? 'contained' : 'outlined'
                        }
                        onClick={() => setCategory('Broadband')}
                      >
                        Broadband
                      </Button>
                      <Button
                        type="submit"
                        color="secondary"
                        size="medium"
                        variant={
                          category === 'Call & Text' ? 'contained' : 'outlined'
                        }
                        onClick={() => setCategory('Call & Text')}
                      >
                        Call &amp; Text
                      </Button>
                    </Scrollbars>
                  </div>
                )} */}

                <section>
                  <Scrollbars
                    autoHeight
                    autoHeightMin={200}
                    autoHeightMax={600}
                  >
                    {success
                      .slice()
                      .sort((a, b) =>
                        a.denomination > b.denomination ? 1 : -1,
                      )
                      .map(promo => (
                        <div
                          onClick={() => {
                            setSelectedProduct({
                              productCode: promo.productCode,
                              productName: promo.productCode,
                              description: promo.description,
                              amount: promo.denomination,
                            });
                            setIsActive({ value: promo.productCode });
                          }}
                        >
                          {category === promo.category ? (
                            <div
                              key={promo.productCode}
                              className={
                                isActive.value === ''
                                  ? 'product-list'
                                  : isActive.value === promo.productCode
                                  ? 'active product-list'
                                  : 'product-list'
                              }
                            >
                              <div>{promo.description}</div>
                              <div>PHP {promo.denomination}.00</div>
                            </div>
                          ) : (
                            ''
                          )}
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

            {isReview && !showProducts && selectedProduct.productCode !== '' && (
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

                    <p className="text-center" style={{ marginBottom: 8 }}>
                      Total Amount
                    </p>
                    <H5 className="text-center" margin="0 0 80px">
                      PHP {numberCommas(selectedProduct.amount)}
                    </H5>

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

            <Dialog show={isSuccess && Boolean(paySuccess)} size="small">
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
