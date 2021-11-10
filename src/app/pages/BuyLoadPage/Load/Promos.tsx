import * as React from 'react';
import { PromoObject } from './types';

import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Dialog from 'app/components/Dialog';
import H5 from 'app/components/Elements/H5';
import Button from 'app/components/Elements/Button';
import Avatar from 'app/components/Elements/Avatar';
import Flex from 'app/components/Elements/Flex';
import CircleIndicator from 'app/components/Elements/CircleIndicator';

import { CategoryList, ProductList, ProductButton } from './BuyLoad.styles';
import { numberCommas } from 'app/components/Helpers';
import useFetch from 'utils/useFetch';
import Paragraph from 'app/components/Elements/Paragraph';
import Loading from 'app/components/Loading';

type PromosProps = {
  avatar: string;
  mobile: string;
  promos: PromoObject[];
  onSelect: (promo: {
    product_name: string;
    product_code: string;
    description: string;
    mobile_number: string;
    amount: number;
  }) => void;
};

/**
 * Promo display
 * @returns {string}    returns the selected product code
 */
export default function Promos({
  avatar,
  mobile,
  promos,
  onSelect,
}: PromosProps) {
  const { loading, error, response, goFetch, fetchReset } = useFetch();

  const [category, setCategory] = React.useState('');
  const [categories, setCategories] = React.useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = React.useState('');
  const [apiError, setApiError] = React.useState({ show: false, msg: '' });

  React.useEffect(() => {
    if (promos && promos.length > 0) {
      const cats: string[] = Array.from(new Set(promos.map(x => x.category)));
      setCategories(cats);
      setCategory(cats[0]);
    }
  }, [promos]);

  React.useEffect(() => {
    if (response) {
      const i = promos.findIndex(j => j.productCode === selectedProduct);
      onSelect({
        ...response,
        description: i !== -1 ? promos[i].description : '',
      });
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
        if (i === 302) {
          setApiError({
            msg: 'Transaction failed. Please try again.',
            show: true,
          });
          return;
        }
        if (i === 401) {
          setApiError({
            msg: 'User profile not updated.',
            show: true,
          });
          return;
        }
        if (i === 402) {
          setApiError({
            msg: 'Transaction denied due to insufficient Squidpay Balance.',
            show: true,
          });
          return;
        }
        if (i === 405) {
          setApiError({
            msg: 'Oh No! You have exceeded your monthly limit.',
            show: true,
          });
          return;
        }
        if (i === 406) {
          setApiError({
            msg:
              'Oops! To completely access all Squidpay services, please update your profile. Thank you.',
            show: true,
          });
          return;
        }
        if (i === 501) {
          setApiError({
            msg: 'Mobile number prefix is not supported.',
            show: true,
          });
          return;
        }
        if (i === 502) {
          setApiError({
            msg: 'Mobile number is not supported.',
            show: true,
          });
          return;
        }

        return;
      });
    }

    if (!errorCode && err.errors) {
      if (err.errors.mobile_number && err.errors.mobile_number.length > 0) {
        setApiError({
          msg: err.errors.mobile_number.join('\n'),
          show: true,
        });
      }
      if (err.errors.product_code && err.errors.product_code.length > 0) {
        setApiError({
          msg: err.errors.product_code.join('\n'),
          show: true,
        });
      }
      if (err.errors.product_name && err.errors.product_name.length > 0) {
        setApiError({
          msg: err.errors.product_name.join('\n'),
          show: true,
        });
      }
      if (err.errors.amount && err.errors.amount.length > 0) {
        setApiError({
          msg: err.errors.amount.join('\n'),
          show: true,
        });
      }
    }

    if (!errorCode && !err.errors && err.response) {
      setApiError({
        msg: err.response.statusText,
        show: true,
      });
    }
  };

  const onNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    const i = promos.findIndex(j => j.productCode === selectedProduct);
    if (i !== -1) {
      const payload = {
        mobile_number: mobile,
        product_code: promos[i].productCode,
        product_name: promos[i].productCode,
        amount: promos[i].denomination,
      };

      goFetch(
        '/buy/load/validate',
        'POST',
        JSON.stringify(payload),
        '',
        true,
        true,
      );
    }
  };

  const onCloseDialog = () => {
    setApiError({ show: false, msg: '' });
  };

  return (
    <>
      {loading && <Loading position="absolute" />}
      <Flex justifyContent="center">
        <Avatar
          image={avatar || ''}
          size="large"
          style={{ marginBottom: '10px' }}
        />
      </Flex>
      <H5 className="text-center">{mobile}</H5>

      {categories && categories.length > 0 && (
        <CategoryList>
          <Scrollbars style={{ height: 50 }}>
            {categories.map((p, i: number) => (
              <Button
                key={i}
                type="submit"
                color="secondary"
                size="medium"
                variant={category === p ? 'contained' : 'outlined'}
                onClick={() => {
                  setCategory(p);
                  setSelectedProduct('');
                }}
              >
                {p}
              </Button>
            ))}
          </Scrollbars>
        </CategoryList>
      )}

      <ProductList>
        {promos
          .slice()
          .sort((a, b) => (a.denomination > b.denomination ? 1 : -1))
          .map((promo, n) => {
            if (category === promo.category) {
              return (
                <ProductButton
                  key={n}
                  onClick={() => {
                    setSelectedProduct(promo.productCode);
                  }}
                  selected={promo.productCode === selectedProduct}
                >
                  <span>{promo.description}</span>
                  <span>PHP {numberCommas(promo.denomination)}</span>
                </ProductButton>
              );
            }
            return null;
          })}
      </ProductList>

      <Flex justifyContent="flex-end">
        <Button
          type="submit"
          color="primary"
          size="large"
          variant="contained"
          onClick={onNext}
          disabled={selectedProduct === ''}
        >
          Next
        </Button>
      </Flex>

      <Dialog show={apiError.show} size="xsmall">
        <div style={{ margin: '20px', textAlign: 'center' }}>
          <CircleIndicator size="medium" color="danger">
            <FontAwesomeIcon icon="times" />
          </CircleIndicator>
          <H5 margin="10px 0 5px">Oops! Transaction Error</H5>
          <Paragraph size="small" align="center" margin="0 0 30px">
            {apiError.msg}
          </Paragraph>

          <Button
            fullWidth
            onClick={onCloseDialog}
            variant="outlined"
            size="medium"
          >
            Ok
          </Button>
        </div>
      </Dialog>
    </>
  );
}
