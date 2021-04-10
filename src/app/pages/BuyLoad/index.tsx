import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import Loading from 'app/components/Loading';
import H1 from 'app/components/Elements/H1';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Button from 'app/components/Elements/Button';
import A from 'app/components/Elements/A';
import Flex from 'app/components/Elements/Flex';
import Ratio from 'app/components/Elements/Ratio';
import Card from 'app/components/Elements/Card/Card';
import { Scrollbars } from 'react-custom-scrollbars';

import Wrapper from './Wrapper';

import Promo from './PromoCard/PromoCard';

import Grid from '@material-ui/core/Grid';

// get our fontawesome imports
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function BuyLoad() {
  const [mobile, setMobile] = React.useState({ value: '', error: false });
  const [amount, setAmount] = React.useState({ value: '', error: false });
  const [selectedPromo, setSelectedPromo] = React.useState({
    code: '',
    description: '',
    amount: '',
  });

  // Behavior
  const [showList, setShowList] = React.useState(true);
  const [showReview, setShowReview] = React.useState(false);
  const [showNext, setShowNext] = React.useState(false);
  const [showActive, setShowActive] = React.useState('regular');
  const [isSuccess, setIsSuccess] = React.useState(false);

  //  Network
  const [selectedNetwork, setSelectedNetwork] = React.useState('');

  // List
  const [showGlobeRegular, setShowGlobeRegular] = React.useState(true);
  const [showGlobeCallAndText, setShowGlobeCallAndText] = React.useState(false);
  const [showGlobeSurf, setShowGlobeSurf] = React.useState(false);

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
              {/* <Grid container> */}
              <Grid item xs={6} sm={3} md={3} lg={2} className="grid">
                <Ratio size="1x1" fit="contain" onClick={onClickGlobe}>
                  <img
                    src="/telecom/globe.png"
                    alt="Globe Logo"
                    className="circle"
                  />
                </Ratio>
                <span className="network-name">Globe</span>
              </Grid>
              {/* </Grid> */}

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
                        * Please enter your mobile (ie: 09xxxxxxxxx)
                      </ErrorMsg>
                    )}
                  </Field>

                  {selectedPromo.description !== '' && (
                    <>
                      <div className="selected-promo">
                        <small>You selected</small>
                        <h5 className="fw-bold mb-0">
                          {selectedPromo.description}
                        </h5>
                        <small>PHP {selectedPromo.amount}</small>
                        <div
                          onClick={() =>
                            setSelectedPromo({
                              code: '',
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
                        <section
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
                        </section>
                        {/* <Promo
                          image={globe}
                          title="TM ALL-NET SURF 10"
                          description="Unli calls to Globe/TM
                        Unli texts to Globe/TM
                        1 hour mobile internet
                        Valid for 1 day"
                          amount="PHP 10.00"
                        ></Promo> */}

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

          {isSuccess && (
            <>
              <h3>Success Message</h3>
            </>
          )}
        </Card>
      </Wrapper>
    </>
  );
}
