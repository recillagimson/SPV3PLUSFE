import * as React from 'react';
import { useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import Box from 'app/components/Box';
import H5 from 'app/components/Elements/H5';
import TierRequirementList from 'app/components/Tier/TierRequirementList';
import Button from 'app/components/Elements/Button';
import Note from 'app/components/Elements/Note';
import Dialog from 'app/components/Dialog';
import Loading from 'app/components/Loading';
import H3 from 'app/components/Elements/H3';

import minor from 'app/components/Assets/minors.png';
import tierUpgradeImg from 'app/components/Assets/tier_upgrade_pending.png';

import { TierRequirements } from './Requirements';

import { selectUserToken, selectUserTier } from 'app/App/slice/selectors';
import {
  selectValidateLoading,
  selectValidateError,
  selectValidateData,
} from './slice/selectors';

import { containerActions as actions } from './slice';

/**
 * Platinum Upgrade Page
 * Will walk to all the process of upgrade to platinum
 */
export default function PlatinumUpgradeComponent() {
  const history = useHistory();
  const location: any = useLocation();
  const dispatch = useDispatch();
  const loggedInUser: any = useSelector(selectUserToken);
  const currentTier: any = useSelector(selectUserTier);

  const loading = useSelector(selectValidateLoading);
  const error = useSelector(selectValidateError);
  const success = useSelector(selectValidateData);

  const [showPending, setShowPending] = React.useState(false);
  const [isMinor, setIsMinor] = React.useState(false);
  const [showMinor, setShowMinor] = React.useState(false);
  const [tier, setTier] = React.useState({
    name: '',
    id: '',
  });

  React.useEffect(() => {
    if (location && location.state && Object.keys(location.state).length > 0) {
      setTier({
        name: location.state.name || '',
        id: location.state.id || '',
      });
    }
  }, [location]);

  React.useEffect(() => {
    if (currentTier) {
      const data = {
        tier_id: currentTier.id,
      };

      dispatch(actions.getValidateLoading(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTier]);

  React.useEffect(() => {
    if (loggedInUser && loggedInUser.birth_date) {
      const bdate = loggedInUser.birth_date.split('-');

      const currentYear = new Date().getFullYear();
      if (currentYear - parseInt(bdate[0], 10) < 18) {
        setIsMinor(true);
      } else {
        setIsMinor(false);
      }
    }
  }, [loggedInUser]);

  React.useEffect(() => {
    if (success) {
      setShowPending(false);
      dispatch(actions.getValidateReset());
    }

    if (error && Object.keys(error).length > 0) {
      onApiError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, error]);

  const onApiError = (err: { code?: any; errors?: any }) => {
    if (err.code && err.code === 422) {
      if (
        err.errors &&
        err.errors.error_code &&
        err.errors.error_code.length > 0
      ) {
        err.errors.error_code.map(j => {
          if (j === 410) {
            setShowPending(true);
            return null;
          }
          return null;
        });
      }
    }

    dispatch(actions.getValidateReset());
  };

  const gotoNext = () => {
    if (isMinor) {
      setShowMinor(prev => !prev);
      return;
    }
    window.location.href = 'mailto:support@squid.ph';
  };

  let idx = -1;
  if (tier && tier.id !== '') {
    idx = TierRequirements.findIndex(j => j.id === tier.id);
  }

  return (
    <>
      <Box
        title={tier.name}
        titleBorder
        withPadding
        footerAlign="right"
        footer={
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={gotoNext}
          >
            {!isMinor ? 'Send Request' : 'Next'}
          </Button>
        }
      >
        {loading && <Loading position="absolute" />}
        <Note style={{ margin: '0 0 20px' }}>
          To upgrade your limit, send us at least (1) Proof of Residence and
          Proof of Income at support@squid.ph
        </Note>
        <H5>Requirements</H5>
        {idx !== -1 && (
          <TierRequirementList
            requirements={TierRequirements[idx].requirement}
          />
        )}
        {isMinor && <Note>*Minors can only upgrade to Silver tier.</Note>}
      </Box>

      {/* Show minor */}
      <Dialog show={showMinor} size="small">
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <img src={minor} alt="Minor" />

          <p style={{ margin: '20px 0' }}>
            Oops! Minors can only be upgraded to Silver Tiers
          </p>
          <Button
            fullWidth
            onClick={() => setShowMinor(false)}
            variant="contained"
            color="primary"
            size="large"
          >
            Close
          </Button>
        </div>
      </Dialog>

      <Dialog show={showPending} size="small">
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <img src={tierUpgradeImg} alt="Pending Upgrade Request" />
          <H3 margin="15px 0 20px">Oops!</H3>
          <p style={{ marginBottom: 30 }}>
            You already sent a tier upgrade request, kindly wait for the status
            of your pending request.
          </p>
          <Button
            fullWidth
            onClick={() => {
              history.push('/tiers');
              setShowPending(false);
            }}
            variant="contained"
            color="primary"
            size="large"
          >
            Ok
          </Button>
        </div>
      </Dialog>
    </>
  );
}
