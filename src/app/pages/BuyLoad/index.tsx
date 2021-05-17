import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import Loading from 'app/components/Loading';
import H1 from 'app/components/Elements/H1';
import H2 from 'app/components/Elements/H2';
import H3 from 'app/components/Elements/H3';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Button from 'app/components/Elements/Button';
import A from 'app/components/Elements/A';
import Flex from 'app/components/Elements/Flex';
import Ratio from 'app/components/Elements/Ratio';
import Card from 'app/components/Elements/Card/Card';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import InputIconWrapper from 'app/components/Elements/InputIconWrapper';
import IconButton from 'app/components/Elements/IconButton';
import Dialog from 'app/components/Dialog';

// For the custom sidebar for the pills
import { Scrollbars } from 'react-custom-scrollbars';

import Wrapper from './Wrapper';
import Promo from './PromoCard/Promo';

// For the list of promo
import GlobeCallAndText from './Network/Globe/GlobeSurf.json';

import Grid from '@material-ui/core/Grid';

// FontAwesome import
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { regExMobile } from 'app/components/Helpers';

export function BuyLoad() {
  const [mobile, setMobile] = React.useState({ value: '', error: false });
  const [amount, setAmount] = React.useState({ value: '', error: false });
  const [selectedPromo, setSelectedPromo] = React.useState({
    code: '',
    title: '',
    description: '',
    amount: '',
  });

  // Behavior
  const [showList, setShowList] = React.useState(true);
  const [showReview, setShowReview] = React.useState(false);
  const [showNext, setShowNext] = React.useState(false);
  const [showActive, setShowActive] = React.useState('regular');

  //  Network
  const [selectedNetwork, setSelectedNetwork] = React.useState('');

  // List
  const [showGlobeRegular, setShowGlobeRegular] = React.useState(true);
  const [showGlobeCallAndText, setShowGlobeCallAndText] = React.useState(false);
  const [showGlobeSurf, setShowGlobeSurf] = React.useState(false);

  // Dialog box
  const [isSuccess, setIsSuccess] = React.useState(true);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    let error = false;

    if (mobile.value === '') {
      error = true;
      setMobile({ ...mobile, error: true });
    }

    if (mobile.value !== '' && !/^0(9)/.test(mobile.value)) {
      error = true;
      setMobile({ ...mobile, error: true });
    }

    if (!regExMobile.test(mobile.value)) {
      error = true;
      setMobile({ ...mobile, error: true });
    }

    if (selectedPromo.code === '') {
      if (amount.value === '') {
        error = true;
        setAmount({ ...amount, error: true });
      }

      if (parseFloat(amount.value) <= 0) {
        error = true;
        setAmount({ ...amount, error: true });
      }
    }

    if (!error) {
      setShowList(false);
      setShowReview(true);
      setShowNext(false);
    }
  };

  const onClickPay = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    setIsSuccess(true);
    setShowReview(false);
    setSelectedNetwork('');
    setShowList(true);

    const data = {
      mobile: mobile.value,
      amount:
        selectedPromo.code !== ''
          ? selectedPromo.code
          : parseFloat(amount.value),
    };
    console.log(data);
    // enable code below to integrate api
    // dispatch(actions.getFetchLoading(data));
  };

  // This functions for Globe Network only
  const onClickGlobe = () => {
    setSelectedNetwork('globe');
    setShowNext(true);
  };

  const onClickGlobeRegular = () => {
    setShowGlobeRegular(true);
    setShowGlobeCallAndText(false);
    setShowGlobeSurf(false);
    setShowActive('regular');
  };

  const onClickGlobeCallAndText = () => {
    setShowGlobeCallAndText(true);
    setShowGlobeRegular(false);
    setShowGlobeSurf(false);
    setShowActive('callAndText');
  };

  const onClickGlobeSurf = () => {
    setShowGlobeSurf(true);
    setShowGlobeCallAndText(false);
    setShowGlobeRegular(false);
    setShowActive('surf');
  };

  const onClickTM = () => {
    setSelectedNetwork('tm');
    setShowNext(true);
  };

  // Dialog on click
  const onCloseSuccessDialog = () => {
    setIsSuccess(false);
  };

  // Replace the first 7 digit of mobile number in the receipt
  let replaceFirst7 = (mobile: string) => {
    return mobile.replace(/^.{1,7}/, m => '*'.repeat(m.length));
  };

  const action = (
    <>
      <Flex justifyContent="flex-end">
        <Button
          type="submit"
          color="primary"
          size="medium"
          variant="contained"
          onClick={onSubmit}
        >
          Next
        </Button>
      </Flex>
    </>
  );

  const globe = (
    <>
      <img
        src="/telecom/globe.png"
        alt="Globe Logo"
        style={{ width: '100%' }}
        className="circle"
      ></img>
    </>
  );

  return (
    <>
      <Helmet>
        <title>Buy Load</title>
      </Helmet>

      <Wrapper>
        <Card
          title={showReview ? 'Review Load' : 'Buy Load'}
          size="medium"
          footer={showNext ? action : undefined}
        >
          {showList && (
            <>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3} md={3} lg={2}>
                  <div className="grid">
                    <Ratio size="1x1" fit="contain" onClick={onClickGlobe}>
                      <img
                        src="/telecom/globe.png"
                        alt="Globe Logo"
                        className="circle"
                      />
                    </Ratio>
                    <span className="network-name">Globe</span>
                  </div>
                </Grid>
                <Grid item xs={6} sm={3} md={3} lg={2}>
                  <div className="grid">
                    <Ratio size="1x1" fit="cover" onClick={onClickTM}>
                      <img
                        src="https://www.rechargestatic.com/spree/taxons/30000791/product/recharge_touchmobile_philippines.png?1533819668"
                        alt="Globe Logo"
                        className="circle"
                      />
                    </Ratio>
                    <span className="network-name">TM</span>
                  </div>
                </Grid>
              </Grid>

              <br />
              {selectedNetwork === 'globe' && (
                <>
                  <div className="pills">
                    <Scrollbars style={{ height: 50 }}>
                      <Button
                        type="submit"
                        color="secondary"
                        size="small"
                        variant={
                          showActive === 'regular' ? 'contained' : 'outlined'
                        }
                        onClick={onClickGlobeRegular}
                      >
                        Regular
                      </Button>
                      <Button
                        type="submit"
                        color="secondary"
                        size="small"
                        variant={
                          showActive === 'callAndText'
                            ? 'contained'
                            : 'outlined'
                        }
                        className="ml-2"
                        onClick={onClickGlobeCallAndText}
                      >
                        Call & Text
                      </Button>
                      <Button
                        type="submit"
                        color="secondary"
                        size="small"
                        variant={
                          showActive === 'surf' ? 'contained' : 'outlined'
                        }
                        className="ml-2"
                        onClick={onClickGlobeSurf}
                      >
                        Surf
                      </Button>
                    </Scrollbars>
                  </div>
                  <br />

                  <Field>
                    <Label>Mobile Number</Label>
                    <Input
                      type="text"
                      placeholder="Email or Mobile No."
                      value={mobile.value}
                      autoComplete="off"
                      onChange={e =>
                        setMobile({
                          value: e.currentTarget.value,
                          error: false,
                        })
                      }
                    />
                    {mobile.error && (
                      <ErrorMsg formError>
                        Please enter valid mobile number (09 + 9 digit number)
                        ie: 09xxxxxxxxx
                      </ErrorMsg>
                    )}
                  </Field>

                  {selectedPromo.description !== '' && (
                    <>
                      <div className="selected-promo">
                        <small>You selected</small>
                        <h5 className="fw-bold mb-0">{selectedPromo.title}</h5>
                        <small>PHP {selectedPromo.amount}</small>
                        <div
                          onClick={() =>
                            setSelectedPromo({
                              code: '',
                              title: '',
                              description: '',
                              amount: '',
                            })
                          }
                        >
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="remove-selected-promo"
                          />
                        </div>
                      </div>
                      <br />
                    </>
                  )}

                  {selectedPromo.description === '' && (
                    <>
                      {showGlobeRegular && (
                        <>
                          <Field>
                            <Label>Enter Amount</Label>
                            <Input
                              type="number"
                              min="1"
                              placeholder="0.00"
                              value={amount.value}
                              autoComplete="off"
                              onChange={e =>
                                setAmount({
                                  value: e.currentTarget.value,
                                  error: false,
                                })
                              }
                            />
                            {amount.error && (
                              <ErrorMsg formError>* Invalid Amount</ErrorMsg>
                            )}
                          </Field>

                          <br />
                          <Flex justifyContent="center">
                            <Grid container xs={12} sm={10} md={6} spacing={3}>
                              <Grid item xs={6} sm={4}>
                                <Ratio size="1x1">
                                  <div
                                    className="regular-load-btn"
                                    onClick={() =>
                                      setAmount({
                                        value: '10.00',
                                        error: false,
                                      })
                                    }
                                  >
                                    <div>
                                      <small>PHP</small>
                                      <h4>10</h4>
                                    </div>
                                  </div>
                                </Ratio>
                              </Grid>
                              <Grid item xs={6} sm={4}>
                                <Ratio size="1x1">
                                  <div
                                    className="regular-load-btn"
                                    onClick={() =>
                                      setAmount({
                                        value: '20.00',
                                        error: false,
                                      })
                                    }
                                  >
                                    <div>
                                      <small>PHP</small>
                                      <h4>20</h4>
                                    </div>
                                  </div>
                                </Ratio>
                              </Grid>
                              <Grid item xs={6} sm={4}>
                                <Ratio size="1x1">
                                  <div
                                    className="regular-load-btn"
                                    onClick={() =>
                                      setAmount({
                                        value: '30.00',
                                        error: false,
                                      })
                                    }
                                  >
                                    <div>
                                      <small>PHP</small>
                                      <h4>30</h4>
                                    </div>
                                  </div>
                                </Ratio>
                              </Grid>
                              <Grid item xs={6} sm={4}>
                                <Ratio size="1x1">
                                  <div
                                    className="regular-load-btn"
                                    onClick={() =>
                                      setAmount({
                                        value: '50.00',
                                        error: false,
                                      })
                                    }
                                  >
                                    <div>
                                      <small>PHP</small>
                                      <h4>50</h4>
                                    </div>
                                  </div>
                                </Ratio>
                              </Grid>
                              <Grid item xs={6} sm={4}>
                                <Ratio size="1x1">
                                  <div
                                    className="regular-load-btn"
                                    onClick={() =>
                                      setAmount({
                                        value: '100.00',
                                        error: false,
                                      })
                                    }
                                  >
                                    <div>
                                      <small>PHP</small>
                                      <h4>100</h4>
                                    </div>
                                  </div>
                                </Ratio>
                              </Grid>
                              <Grid item xs={6} sm={4}>
                                <Ratio size="1x1">
                                  <div
                                    className="regular-load-btn"
                                    onClick={() =>
                                      setAmount({
                                        value: '150.00',
                                        error: false,
                                      })
                                    }
                                  >
                                    <div>
                                      <small>PHP</small>
                                      <h4>150</h4>
                                    </div>
                                  </div>
                                </Ratio>
                              </Grid>
                              <Grid item xs={6} sm={4}>
                                <Ratio size="1x1">
                                  <div
                                    className="regular-load-btn"
                                    onClick={() =>
                                      setAmount({
                                        value: '500.00',
                                        error: false,
                                      })
                                    }
                                  >
                                    <div>
                                      <small>PHP</small>
                                      <h4>500</h4>
                                    </div>
                                  </div>
                                </Ratio>
                              </Grid>
                              <Grid item xs={6} sm={4}>
                                <Ratio size="1x1">
                                  <div
                                    className="regular-load-btn"
                                    onClick={() =>
                                      setAmount({
                                        value: '600.00',
                                        error: false,
                                      })
                                    }
                                  >
                                    <div>
                                      <small>PHP</small>
                                      <h4>600</h4>
                                    </div>
                                  </div>
                                </Ratio>
                              </Grid>
                              <Grid item xs={6} sm={4}>
                                <Ratio size="1x1">
                                  <div
                                    className="regular-load-btn"
                                    onClick={() =>
                                      setAmount({
                                        value: '900.00',
                                        error: false,
                                      })
                                    }
                                  >
                                    <div>
                                      <small>PHP</small>
                                      <h4>900</h4>
                                    </div>
                                  </div>
                                </Ratio>
                              </Grid>
                            </Grid>
                          </Flex>
                        </>
                      )}
                    </>
                  )}

                  {showGlobeCallAndText && (
                    <>
                      <Scrollbars style={{ height: 300 }}>
                        {/* <section
                          onClick={() =>
                            setSelectedPromo({
                              code: 'TMXSHKF10',
                              description: 'TM ALL-NET SURF 10',
                              amount: '10.00',
                            })
                          }
                        >
                          <Promo
                            image={globe}
                            title="TM ALL-NET SURF 10"
                            description="Unli calls to Globe/TM
                        Unli texts to Globe/TM
                        1 hour mobile internet
                        Valid for 1 day"
                            amount="PHP 10.00"
                          ></Promo>
                        </section> */}
                        {/* <Promo
                          image={globe}
                          title="TM ALL-NET SURF 10"
                          description="Unli calls to Globe/TM
                        Unli texts to Globe/TM
                        1 hour mobile internet
                        Valid for 1 day"
                          amount="PHP 10.00"
                        ></Promo> */}

                        {/* <span
                          onClick={() =>
                            setSelectedPromo({
                              code: 'TMXSHKF10',
                              description: 'TM ALL-NET SURF 10',
                              amount: '10.00',
                            })
                          }
                        >
                          <Globe></Globe>
                        </span> */}
                        {GlobeCallAndText.map((globeCallAndText, index) => {
                          return (
                            <span
                              onClick={() =>
                                setSelectedPromo({
                                  code: globeCallAndText.code,
                                  title: globeCallAndText.title,
                                  description: globeCallAndText.description,
                                  amount: globeCallAndText.amount,
                                })
                              }
                            >
                              <Promo>
                                <Grid container wrap="nowrap" spacing={2}>
                                  <Grid item xs={2} md={1}>
                                    {globe}
                                  </Grid>
                                  <Grid item xs={10} md={11}>
                                    <p className="promo-title">
                                      {globeCallAndText.code}
                                    </p>
                                    <p className="promo-description">
                                      {globeCallAndText.description}
                                    </p>
                                    <p className="promo-amount">
                                      {globeCallAndText.amount}
                                    </p>
                                  </Grid>
                                </Grid>
                              </Promo>
                            </span>
                          );
                        })}
                        <br />
                      </Scrollbars>
                    </>
                  )}
                  {showGlobeSurf && <>List of Surf Promo</>}
                </>
              )}
            </>
          )}
          {showReview && (
            <>
              <Flex justifyContent="center">
                <Grid item xs={12} sm={10} md={8}>
                  <Ratio size="21x9" fit="contain">
                    {selectedNetwork === 'globe' && globe}
                  </Ratio>
                  <h6 className="text-center fw-bold">Globe</h6>
                  <br />
                  <Grid container>
                    <Grid item xs={6}>
                      <p className="review-text">Mobile Number</p>
                      <p className="review-text">Selected Load</p>
                      <p className="review-text">Total Amount</p>
                    </Grid>
                    <Grid item xs={6}>
                      <div className="text-right">
                        <p className="review-text">{mobile.value}</p>
                        <p className="review-text">
                          {selectedPromo.code ? selectedPromo.code : 'Regular'}
                        </p>
                        <p className="review-text">
                          {selectedPromo.amount
                            ? selectedPromo.amount
                            : amount.value}
                        </p>
                      </div>
                    </Grid>
                  </Grid>
                  <br />
                  <Button
                    type="submit"
                    color="primary"
                    size="medium"
                    variant="contained"
                    fullWidth={true}
                    onClick={onClickPay}
                  >
                    Pay Bill
                  </Button>
                </Grid>
              </Flex>
              <br />
            </>
          )}

          {/* {isSuccess && (
            <>
              <h3>Success Message</h3>
            </>
          )} */}

          <Dialog show={isSuccess} size="small">
            <div className="dialog">
              <div className="logoContainer">
                <img src="./img/SPLogo.png" alt="SquidPay" className="logo" />
              </div>
              <div className="bg-lightgold">
                <section className="text-center">
                  <CircleIndicator size="medium" color="primary">
                    <FontAwesomeIcon icon="check" />
                  </CircleIndicator>
                  <p className="message">Load purchase successful!</p>
                </section>
                <section className="details">
                  <Grid container>
                    <Grid item xs={6}>
                      <span className="description">Phone Number</span>
                    </Grid>
                    <Grid item xs={6}>
                      <span className="value">
                        {replaceFirst7(mobile.value)}
                      </span>
                    </Grid>
                    <Grid item xs={6}>
                      <span className="description">Selected Load</span>
                    </Grid>
                    <Grid item xs={6}>
                      <span className="value">
                        PHP{' '}
                        {selectedPromo.amount
                          ? selectedPromo.amount
                          : amount.value}
                      </span>
                    </Grid>
                    <Grid item xs={6}>
                      <span className="description">Transaction Number</span>
                    </Grid>
                    <Grid item xs={6}>
                      <span className="value">0000001</span>
                    </Grid>
                  </Grid>
                </section>
                <section className="total">
                  <span>Total amount</span>
                  <p>
                    PHP{' '}
                    {selectedPromo.amount ? selectedPromo.amount : amount.value}
                  </p>
                  <span>Service Fee: PHP 0.00</span>
                </section>
                <section className="date">
                  <span>04 March, 2021, 3:26 PM</span>
                </section>
              </div>
              <Button
                fullWidth
                onClick={onCloseSuccessDialog}
                variant="contained"
                color="primary"
              >
                Ok
              </Button>
              <span className="note">
                You will receive a notification to confirm your transaction
              </span>
            </div>
          </Dialog>
        </Card>
      </Wrapper>
    </>
  );
}
