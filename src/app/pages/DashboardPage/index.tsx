import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import Button from 'app/components/Elements/Button';
import IconButton from 'app/components/Elements/IconButton';
import Grid from 'app/components/Elements/Grid';
import List from 'app/components/List';
import ListItem from 'app/components/List/ListItem';
import ListItemText from 'app/components/List/ListItemText';
import H5 from 'app/components/Elements/H5';

import PromosDeals from 'app/components/PromosDeals';

import { numberCommas } from 'app/components/Helpers';

/** svg icons */
import AddMoney from 'app/components/Assets/AddMoney';
import SendMoney from 'app/components/Assets/SendMoney';
import SendToBank from 'app/components/Assets/SendToBank';
import PayBills from 'app/components/Assets/PayBills';
import BuyLoad from 'app/components/Assets/BuyLoad';
import QRCode from 'app/components/Assets/QRCode';
import QuickGuide from 'app/components/Assets/QuickGuide';
import Others from 'app/components/Assets/Others';
import NewsUpdate from 'app/components/Assets/NewsUpdate';

import Balance from './Balance';
import ButtonFlexWrapper from './ButtonFlex';
import DashboardButton from './Button';

/** selectors */
import { useContainerSaga } from './slice';
import {
  selectLoading,
  selectError,
  selectData,
  selectTransactionData,
} from './slice/selectors';
import Loading from 'app/components/Loading';

export function DashboardPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = useContainerSaga();
  const loading = useSelector(selectLoading);
  const error: any = useSelector(selectError);
  const dashData: any = useSelector(selectData);
  const transactionData: any = useSelector(selectTransactionData);

  React.useEffect(() => {
    dispatch(actions.getFetchLoading());
    dispatch(actions.getTransactionLoading());
  }, [actions, dispatch]);

  let balanceInfo = '000.00';
  if (dashData && dashData.balance_info) {
    balanceInfo = numberCommas(
      parseFloat(dashData.balance_info.available_balance).toFixed(2),
    );
  }

  let transactionItems: React.ReactNode | undefined = (
    <ListItem flex>
      <p style={{ textAlign: 'center', padding: 10 }}>
        {' '}
        No transaction history
      </p>
    </ListItem>
  );

  if (transactionData && transactionData.length > 0) {
    transactionItems = transactionData.map(i => {
      const date = DateTime.fromISO(i.created_at).toFormat('LLLL dd, yyyy\ntt');
      return (
        <ListItem flex key={i.id}>
          <ListItemText
            bold
            primary={i.transaction_category.title}
            secondary={date}
            style={{
              flexGrow: 1,
            }}
            small
          />
          <ListItemText
            bold
            align="right"
            primary={numberCommas(parseFloat(i.signed_total_amount).toFixed(2))}
            color={i.transaction_category.transaction_type}
            small
          />
        </ListItem>
      );
    });
  }

  return (
    <ProtectedContent>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {loading && <Loading position="fixed" />}

      <Grid columns="35% 1fr" gap="30px">
        <Box
          title="Squid Balance"
          footerBorder
          footer={
            <Button
              color="secondary"
              size="medium"
              onClick={() => history.push('/addmoney')}
            >
              Add Money
            </Button>
          }
          footerAlign="center"
        >
          <Balance>
            <span className="currency">PHP</span>
            <span className="amount">{balanceInfo}</span>
            <IconButton
              size="small"
              color="primary"
              onClick={() => history.push('/addmoney')}
            >
              <FontAwesomeIcon icon="plus" />
            </IconButton>
          </Balance>
        </Box>

        <Box
          title="Transaction History"
          footerBorder
          footer={
            <Button
              color="secondary"
              size="medium"
              onClick={() => history.push('/transaction-history')}
            >
              View Transaction History
            </Button>
          }
          footerAlign="center"
        >
          <List divider padding="10px 25px">
            {transactionItems}
          </List>
        </Box>
      </Grid>

      <ButtonFlexWrapper>
        <DashboardButton onClick={() => history.push('/addmoney')}>
          <AddMoney />
          Add Money
        </DashboardButton>
        <DashboardButton onClick={() => history.push('/sendmoney')}>
          <SendMoney />
          Send Money
        </DashboardButton>
        <DashboardButton onClick={() => history.push('/onlinebank')}>
          <SendToBank />
          Send To Bank
        </DashboardButton>
        <DashboardButton>
          <PayBills />
          Pay Bills
        </DashboardButton>
        <DashboardButton>
          <BuyLoad />
          Buy Load
        </DashboardButton>
        <DashboardButton>
          <QRCode />
          QR Code
        </DashboardButton>
        <DashboardButton>
          <QuickGuide />
          SquidPay Quick Guide
        </DashboardButton>
        <DashboardButton
          as="a"
          href="https://www.facebook.com/SquidPay/"
          target="_blank"
        >
          <NewsUpdate />
          News and Update
        </DashboardButton>
      </ButtonFlexWrapper>

      <div style={{ padding: '20px 0' }}>
        <H5>Promos and Deals</H5>
        <PromosDeals />
      </div>
      {/* <div>
        <Box
          title="Sample Container for Box UI"
          titleBorder
          footerBorder
          footer={
            <>
              <Button size="medium" color="primary" variant="contained">
                SEND
              </Button>
              <Button size="medium" color="secondary" variant="outlined">
                CANCEL
              </Button>
            </>
          }
          footerAlign="right"
        >
          <div style={{ padding: '25px' }}>
            <p>
              This element has a parent container that has a padding. The
              content element of this box component has no padding, so it's up
              to the child elements container to have the padding
            </p>
          </div>
          <div>
            <p>This element has a parent container that has no padding</p>
          </div>
        </Box>
      </div>
      <div></div>
      <Grid columns="1fr 1fr" gap="0 25px" alignItems="start">
        <Box
          title="Box UI with Button in Title"
          titleBorder
          titleAction={
            <IconButton onClick={() => alert('clicked')}>
              <FontAwesomeIcon icon="trash" />
            </IconButton>
          }
          footerBorder
          footer={
            <>
              <Button size="medium" color="primary" variant="contained">
                SEND
              </Button>
              <Button size="medium" color="secondary" variant="outlined">
                CANCEL
              </Button>
            </>
          }
          footerAlign="center"
        >
          <div style={{ padding: '25px' }}>
            <p>
              This is inside a grid element with 2 columns and action footer
              aligned center
            </p>
          </div>
        </Box>
        <Box title="Box UI" titleBorder>
          <div style={{ padding: '25px' }}>
            <p>This element has no action footer buttons</p>
          </div>
        </Box>

        <Box>
          <div style={{ padding: '25px' }}>
            <p>this element are child elements only, no title and footer</p>
          </div>
        </Box>
      </Grid> */}
    </ProtectedContent>
  );
}
