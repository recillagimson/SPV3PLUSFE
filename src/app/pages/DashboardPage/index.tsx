import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';

import Loading from 'app/components/Loading';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import Button from 'app/components/Elements/Button';
import IconButton from 'app/components/Elements/IconButton';
import Grid from 'app/components/Elements/Grid';
import List from 'app/components/List';
import ListItem from 'app/components/List/ListItem';
import ListItemText from 'app/components/List/ListItemText';
import Dialog from 'app/components/Dialog';
import H3 from 'app/components/Elements/H3';

// import H5 from 'app/components/Elements/H5';

// import PromosDeals from 'app/components/PromosDeals';

import { numberCommas } from 'app/components/Helpers';
import { TierIDs } from 'app/components/Helpers/Tiers';

/** svg icons */
import AddMoney from 'app/components/Assets/AddMoney';
import SendMoney from 'app/components/Assets/SendMoney';
import SendToBank from 'app/components/Assets/SendToBank';
import PayBills from 'app/components/Assets/PayBills';
import BuyLoad from 'app/components/Assets/BuyLoad';
import QRCode from 'app/components/Assets/QRCode';
import QuickGuide from 'app/components/Assets/QuickGuide';
// import Others from 'app/components/Assets/Others';
import NewsUpdate from 'app/components/Assets/NewsUpdate';
import tierUpgrade from 'app/components/Assets/tier_upgrade.png';

import Balance from './Balance';
import ButtonFlexWrapper from './ButtonFlex';
import DashboardButton from './Button';

/** selectors */
import { selectUser } from 'app/App/slice/selectors';
import { useContainerSaga } from './slice';
import {
  selectLoading,
  // selectError,
  selectData,
  selectTransactionData,
} from './slice/selectors';

export function DashboardPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = useContainerSaga();
  const user: any = useSelector(selectUser);

  const loading = useSelector(selectLoading);
  // const error: any = useSelector(selectError);
  const dashData: any = useSelector(selectData);
  const transactionData: any = useSelector(selectTransactionData);
  const flags: any = window['spFlags'];

  const [showUpgrade, setShowUpgrade] = React.useState(false);

  React.useEffect(() => {
    dispatch(actions.getFetchLoading());
    dispatch(actions.getTransactionLoading());
  }, [actions, dispatch]);

  let balanceInfo = '000.00';
  if (dashData && dashData.balance_info) {
    balanceInfo = numberCommas(dashData.balance_info.available_balance);
  }

  let transactionItems: React.ReactNode | undefined = (
    <ListItem>
      <p style={{ textAlign: 'center', padding: 10 }}>
        {' '}
        No Transactions
        <small style={{ display: 'block' }}>
          You haven’t made any transactions yet
        </small>
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
            primary={`PHP ${numberCommas(
              parseFloat(i.signed_total_amount).toFixed(2),
            )}`}
            color={i.transaction_category.transaction_type}
            small
          />
        </ListItem>
      );
    });
  }

  let isBronze = false;
  if (
    user &&
    user.user_account &&
    user.user_account.tier_id &&
    user.user_account.tier_id !== ''
  ) {
    isBronze = user.user_account.tier_id === TierIDs.bronze;
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
              onClick={() => history.push('/add-money')}
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
              onClick={() => history.push('/add-money')}
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
        <DashboardButton onClick={() => history.push('/add-money')}>
          <AddMoney />
          Add Money
        </DashboardButton>
        <DashboardButton
          onClick={
            isBronze
              ? () => setShowUpgrade(true)
              : () => history.push('/sendmoney')
          }
          disabled={flags && !flags.send_money_enabled}
        >
          <SendMoney />
          Send Money
        </DashboardButton>
        <DashboardButton
          onClick={
            isBronze
              ? () => setShowUpgrade(true)
              : () => history.push('/send-to-bank')
          }
          disabled={flags && !flags.send_to_bank_ubp_enabled}
        >
          <SendToBank />
          Send To Bank
        </DashboardButton>
        <DashboardButton onClick={() => history.push('/pay-bills')}>
          <PayBills />
          Pay Bills
        </DashboardButton>
        <DashboardButton
          onClick={() => history.push('/buyload')}
          disabled={flags && !flags.buy_load_enabled}
        >
          <BuyLoad />
          Buy Load
        </DashboardButton>
        <DashboardButton
          onClick={() => history.push('/generateqr')}
          disabled={flags && !flags.send_money_via_qr_enabled}
        >
          <QRCode />
          QR Code
        </DashboardButton>
        <DashboardButton onClick={() => alert('Feature coming soon')}>
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

      {/* <div style={{ padding: '20px 0' }}>
        <H5>Promos and Deals</H5>
        <PromosDeals />
      </div> */}
      {/* Show upgrade notification */}
      <Dialog show={showUpgrade} size="small">
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <img
            src={tierUpgrade}
            alt="Upgrade your tier to unlock other services"
          />
          <H3 margin="30px 0 10px">Oops!</H3>
          <p style={{ marginBottom: 35 }}>
            Uh-no! You need to upgrade your account to unlock other SquidPay
            services.
          </p>
          <Button
            fullWidth
            onClick={() => history.push('/tiers')}
            variant="contained"
            color="primary"
            size="large"
            style={{
              marginBottom: '10px',
            }}
          >
            Upgrade Now
          </Button>
          <Button
            fullWidth
            onClick={() => setShowUpgrade(false)}
            variant="outlined"
            color="secondary"
            size="large"
          >
            Upgrade Later
          </Button>
        </div>
      </Dialog>
    </ProtectedContent>
  );
}