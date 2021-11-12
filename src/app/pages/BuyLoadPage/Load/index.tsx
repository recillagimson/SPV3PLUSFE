import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { DateTime } from 'luxon';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Dialog from 'app/components/Dialog';
import Flex from 'app/components/Elements/Flex';
import Box from 'app/components/Box';
import Receipt from 'app/components/Receipt';

import {
  // maskCharacters,
  numberCommas,
} from 'app/components/Helpers';
import useFetch from 'utils/useFetch';

import EnterMobileForm from './EnterMobile';
import ProviderSelect from './ProviderSelect';
import Promos from './Promos';

import { ProductObject, PromoObject } from './types';

import ReviewInfo from './ReviewInfo';
import Paragraph from 'app/components/Elements/Paragraph';

enum BuyLoadSteps {
  EnterMobile = 'EnterMobile',
  ShowProviders = 'ShowProviders',
  ShowProducts = 'ShowProducts',
  ShowReview = 'ShowReview',
}

export function BuyLoadPage() {
  const getAvatar = useFetch();

  const [avatarLink, setAvatarLink] = React.useState('');
  const [mobile, setMobile] = React.useState('');

  const [showSteps, setShowSteps] = React.useState<BuyLoadSteps>(
    BuyLoadSteps.EnterMobile,
  );

  const [promos, setPromos] = React.useState<PromoObject[]>([]); // all promose
  const [providers, setProviders] = React.useState<string[]>([]);
  const [selectedPromos, setSelectedPromos] = React.useState<PromoObject[]>([]);
  const [selectedProduct, setSelectedProduct] = React.useState<ProductObject>(
    {},
  );
  const [paySuccess, setPaySuccess] = React.useState({
    recipient_mobile_number: '',
    amount: 0,
    transaction_number: '',
    transaction_date: '',
  });

  const [isSuccess, setIsSuccess] = React.useState(false);

  React.useEffect(() => {
    return () => {
      setIsSuccess(false);
      setSelectedProduct({});
      setMobile('');
      setAvatarLink('');
      setPromos([]);
      setProviders([]);
      setPaySuccess({
        recipient_mobile_number: '',
        amount: 0,
        transaction_number: '',
        transaction_date: '',
      });
      setShowSteps(BuyLoadSteps.EnterMobile);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (getAvatar.response && getAvatar.response.link) {
      setAvatarLink(getAvatar.response.link);
    }
  }, [getAvatar.response]);

  const onSuccessMobileForm = (p: PromoObject[], mobile: string) => {
    setMobile(mobile);
    getAvatar.goFetch(`/user/${mobile}/avatar`, 'GET', '', '', true, true); // retrieve the avatar for entered mobile number
    // store the retrieved promos
    setPromos(p);

    // enable code below if filtering will be done on the FE side
    // const filterProviders = p.filter(j => j.productType === 'BUY LOAD');
    // console.log('filtered', filterProviders);
    // const prov: string[] = Array.from(
    //   new Set(filterProviders.map(x => x.provider)),
    // );

    // get the unique providers
    const prov: string[] = Array.from(new Set(p.map(x => x.provider)));

    setProviders(prov);
    // show next step
    setShowSteps(BuyLoadSteps.ShowProviders);
  };

  const onSelectProvider = (p: string) => {
    // filter the selected provider only
    const promo: PromoObject[] = promos.filter(x => p === x.provider);
    // set the selected provider promos
    setSelectedPromos(promo);
    // show next step
    setShowSteps(BuyLoadSteps.ShowProducts);
  };

  const onSelectProduct = (product: ProductObject) => {
    console.log(product);
    setSelectedProduct(product);
    setShowSteps(BuyLoadSteps.ShowReview);
  };

  const onPaySuccess = (pay: {
    recipient_mobile_number: string;
    amount: number;
    transaction_number: string;
    transaction_date: string;
  }) => {
    setPaySuccess(pay);
    setIsSuccess(true);
  };

  const onCloseSuccessDialog = () => {
    setIsSuccess(false);
    setShowSteps(BuyLoadSteps.EnterMobile);
    setSelectedProduct({});
    setMobile('');
    setAvatarLink('');
    setPromos([]);
    setProviders([]);
    setPaySuccess({
      recipient_mobile_number: '',
      amount: 0,
      transaction_number: '',
      transaction_date: '',
    });
  };

  let receiptDate = '';
  if (paySuccess && paySuccess.transaction_number) {
    const date = DateTime.fromISO(paySuccess.transaction_date);
    receiptDate = date.toFormat('dd LLLL yyyy, h:mm a');
  }

  return (
    <>
      <ProtectedContent>
        <Helmet>
          <title>Buy Load</title>
        </Helmet>

        <Box
          title={
            showSteps === BuyLoadSteps.ShowReview
              ? 'Review Load Purchase'
              : 'Buy Load'
          }
          titleBorder
          withPadding
        >
          {showSteps === BuyLoadSteps.EnterMobile && (
            <EnterMobileForm onSuccess={onSuccessMobileForm} />
          )}

          {showSteps === BuyLoadSteps.ShowProviders && (
            <ProviderSelect providers={providers} onSelect={onSelectProvider} />
          )}
          {showSteps === BuyLoadSteps.ShowProducts && (
            <Promos
              mobile={mobile}
              avatar={avatarLink}
              promos={selectedPromos}
              onSelect={onSelectProduct}
            />
          )}

          {showSteps === BuyLoadSteps.ShowReview && (
            <ReviewInfo
              product={selectedProduct}
              avatar={avatarLink}
              mobile={mobile}
              onSuccess={onPaySuccess}
            />
          )}

          {/* <Dialog show={validateApiMsg.error} size="xsmall">
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
          */}

          <Dialog show={isSuccess} size="small">
            <Receipt
              title="Load purchase successful!"
              total={paySuccess.amount.toString()}
              onClick={onCloseSuccessDialog}
              date={receiptDate}
            >
              <Flex justifyContent="space-between">
                <Paragraph size="small" margin="0 0 8px">
                  Mobile Number
                </Paragraph>
                <Paragraph size="small" margin="0 0 8px">
                  {paySuccess.recipient_mobile_number || ''}
                  {/* {maskMobileNumber(paySuccess.recipient_mobile_number || '')} */}
                </Paragraph>
              </Flex>
              <Flex justifyContent="space-between">
                <Paragraph size="small" margin="0 0 8px">
                  Load
                </Paragraph>
                <Paragraph size="small" margin="0 0 8px">
                  {selectedProduct.description}
                </Paragraph>
              </Flex>
              <Flex justifyContent="space-between">
                <Paragraph size="small" margin="0 0 8px">
                  Amount
                </Paragraph>
                <Paragraph size="small" margin="0 0 8px">
                  PHP {numberCommas(paySuccess.amount)}
                </Paragraph>
              </Flex>
              <Flex justifyContent="space-between">
                <Paragraph size="small" margin="0 0 8px">
                  Transaction Number
                </Paragraph>
                <Paragraph size="small" margin="0 0 8px">
                  {paySuccess.transaction_number}
                </Paragraph>
              </Flex>
            </Receipt>
          </Dialog>
        </Box>
      </ProtectedContent>
    </>
  );
}
