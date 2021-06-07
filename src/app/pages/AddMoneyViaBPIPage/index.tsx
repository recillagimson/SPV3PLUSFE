import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

import Loading from 'app/components/Loading';
import H3 from 'app/components/Elements/H3';
import H5 from 'app/components/Elements/H5';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Button from 'app/components/Elements/Button';
import Flex from 'app/components/Elements/Flex';
import InputTextWrapper from 'app/components/Elements/InputTextWrapper';
import Card from 'app/components/Elements/Card/Card';
import Dialog from 'app/components/Dialog';
import CircleIndicator from 'app/components/Elements/CircleIndicator';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// From this folder
import Wrapper from './Wrapper';

/** slice */
// import { useContainerSaga } from './slice';
// import { selectLoading, selectError, selectData } from './slice/selectors';
export function AddMoneyViaBPI() {
  const [amount, setAmount] = React.useState({
    value: '',
    error: false,
    errormsg: '',
  });
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [showForm, setShowForm] = React.useState(true);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    let error = false;
    // Check amount if it's valid
    if (amount.value === '') {
      error = true;
      setAmount({
        ...amount,
        error: true,
        errormsg: 'Oops! This field cannot be empty.',
      });
    }

    // Check amount if it's less than
    if (parseFloat(amount.value) <= 0) {
      error = true;
      setAmount({
        ...amount,
        error: true,
        errormsg: 'You entered invalid amount.',
      });
    }

    if (!error) {
      const data = {
        amount: parseFloat(amount.value),
      };

      console.log(data);
      // dispatch payload to saga
      // dispatch(actions.getFetchLoading(data));
    }
  };

  // const { actions } = useContainerSaga();
  // const dispatch = useDispatch();

  // const loading = useSelector(selectLoading);
  // const error: any = useSelector(selectError);
  // const success: any = useSelector(selectData);

  // const profile: boolean | UserProfileState = useSelector(selectUser);
  // const loginName: string = useSelector(selectLoggedInName);
  // const [amount, setAmount] = React.useState({
  //   value: '',
  //   error: false,
  //   errormsg: '',
  // });
  // const [isSuccess, setIsSuccess] = React.useState(false);
  // const [showForm, setShowForm] = React.useState(true);

  // const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   if (e && e.preventDefault) e.preventDefault();

  //   let error = false;
  //   // Check amount if it's valid
  //   if (amount.value === '') {
  //     error = true;
  //     setAmount({ ...amount, error: true, errormsg: 'Cannot be empty' });
  //   }

  //   // Check amount if it's less than
  //   if (parseFloat(amount.value) <= 0) {
  //     error = true;
  //     setAmount({ ...amount, error: true, errormsg: 'Invalid Amount' });
  //   }

  //   if (!error) {
  //     const data = {
  //       amount: parseFloat(amount.value),
  //     };

  //     // dispatch payload to saga
  //     dispatch(actions.getFetchLoading(data));
  //   }
  // };

  // React.useEffect(() => {
  //   return () => {
  //     dispatch(actions.getFetchReset());
  //   };
  // }, [actions, dispatch]);

  // React.useEffect(() => {
  //   if (success) {
  //     setShowForm(false);
  //     setIsSuccess(true);
  //   }
  // }, [success]);

  // const [showForm, setShowForm] = React.useState(true);
  // const [amount, setAmount] = React.useState({
  //   value: '',
  //   error: false,
  //   errormsg: '',
  // });
  return (
    <>
      <Helmet>
        <title>Add Money Via BPI</title>
      </Helmet>

      <Wrapper>
        {/* {loading && <Loading position="absolute" />} */}
        <Card title="Online Bank" size="medium">
          <img
            src={`${process.env.PUBLIC_URL}/bpi.png`}
            alt="BPI Logo"
            style={{
              width: '150px',
              height: '73px',
              margin: '0 auto',
              display: 'block',
            }}
          ></img>

          <Field>
            {showForm && (
              <>
                <Label>Amount</Label>
                <InputTextWrapper>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount.value}
                    autoComplete="off"
                    onChange={e =>
                      setAmount({
                        value: e.currentTarget.value,
                        error: false,
                        errormsg: '',
                      })
                    }
                    error={amount.error ? true : undefined}
                  />
                  <span>PHP</span>
                </InputTextWrapper>

                {amount.error && (
                  <>
                    <ErrorMsg formError>{amount.errormsg}</ErrorMsg>
                  </>
                )}
                <br />
                <Flex justifyContent="flex-end">
                  <Button
                    type="submit"
                    color="primary"
                    size="large"
                    variant="contained"
                    onClick={onSubmit}
                  >
                    Next
                  </Button>
                </Flex>
              </>
            )}

            {/* {isSuccess && (
              <>
                
              </>
            )} */}

            <Dialog show={isSuccess} size="xsmall">
              <div style={{ margin: '20px', textAlign: 'center' }}>
                <img
                  src={`${process.env.PUBLIC_URL}/img/SPLogo.png`}
                  alt="SquidPay"
                  style={{ padding: '0 50px 30px', width: '100%' }}
                />
                <CircleIndicator size="medium" color="primary">
                  <FontAwesomeIcon icon="check" />
                </CircleIndicator>
                <H5 margin="10px 0 30px">Transaction successful</H5>
                <Button
                  fullWidth
                  // onClick={onClick}
                  variant="contained"
                  color="primary"
                  size="medium"
                >
                  Ok
                </Button>
              </div>
            </Dialog>

            <Dialog show={false} size="xsmall">
              <div style={{ margin: '20px', textAlign: 'center' }}>
                <CircleIndicator size="medium" color="danger">
                  <FontAwesomeIcon icon="times" />
                </CircleIndicator>
                <H5 margin="10px 0 20px">Transaction failed</H5>
                <Button
                  fullWidth
                  // onClick={onClick}
                  variant="outlined"
                  size="medium"
                >
                  Ok
                </Button>
              </div>
            </Dialog>
          </Field>
        </Card>
      </Wrapper>
    </>
  );
}
