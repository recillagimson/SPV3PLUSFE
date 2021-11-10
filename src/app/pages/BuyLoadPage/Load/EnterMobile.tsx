import * as React from 'react';

import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import Flex from 'app/components/Elements/Flex';
import Button from 'app/components/Elements/Button';
import ErrorMsg from 'app/components/Elements/ErrorMsg';

import useFetch from 'utils/useFetch';
import { regExMobile } from 'app/components/Helpers';

import { PromoObject } from './types';
import Loading from 'app/components/Loading';

type EnterMobileFormProps = {
  /**
   * Callback on validate
   * @return {array}      callback will return the retrieved promos
   */
  onSuccess: (promos: PromoObject[], mobile: string) => void;
};

/**
 * Enter Mobile Form
 * This component has the validation for the input mobile and retrieve the product promos
 * Returns the retrieved product promos to the parent component
 */
export default function EnterMobileForm({ onSuccess }: EnterMobileFormProps) {
  const { loading, response, error, goFetch, fetchReset } = useFetch();

  const [mobile, setMobile] = React.useState({
    value: '',
    error: false,
    msg: '',
  });

  React.useEffect(() => {
    if (response && response.length > 0) {
      onSuccess(response, mobile.value);
      fetchReset();
    }

    if (error) {
      onApiError(error);
      fetchReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, error]);

  const onApiError = (err: any) => {
    let errorCode = err.errors ? err.errors.error_code : false;
    if (errorCode && errorCode.length > 0) {
      errorCode.forEach((i: any) => {
        if (i === 501) {
          setMobile({
            ...mobile,
            msg: 'Mobile number prefix is not supported.',
            error: true,
          });
          return;
        }
        return;
      });
    }

    if (!errorCode && err.errors) {
      if (err.errors.mobile_number && err.errors.mobile_number.length > 0) {
        setMobile({
          ...mobile,
          msg: err.errors.mobile_number.join('\n'),
          error: true,
        });
      }
    }
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    let hasError = false;

    // first check if field is not empty
    if (mobile.value === '') {
      hasError = true;
      setMobile({
        ...mobile,
        error: true,
        msg: 'Please enter your mobile number',
      });
    }

    if (mobile.value !== '' && !regExMobile.test(mobile.value)) {
      hasError = true;
      setMobile({
        ...mobile,
        error: true,
        msg:
          'Please enter valid mobile number (09 + 9 digit number) ie: 09xxxxxxxxx',
      });
    }

    if (!hasError) {
      const payload = {
        mobile_number: mobile.value,
      };
      goFetch(
        '/buy/load/products',
        'POST',
        JSON.stringify(payload),
        '',
        true,
        true,
      );
    }
  };

  return (
    <form>
      {loading && <Loading position="absolute" />}
      <Field margin="0 0 32px">
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
    </form>
  );
}
