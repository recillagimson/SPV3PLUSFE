import * as React from 'react';
import { useLocation, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import Box from 'app/components/Box';
import H5 from 'app/components/Elements/H5';
import TierRequirementList from 'app/components/Tier/TierRequirementList';
import Button from 'app/components/Elements/Button';
import SilverProfile from 'app/components/UpdateProfile/Silver';
import H3 from 'app/components/Elements/H3';
import Dialog from 'app/components/Dialog';

import { TierIDs } from 'app/components/Helpers/Tiers';

import { TierRequirements } from './Requirements';
import PrimaryIDs from 'app/components/Tier/PrimaryID';
import SecondaryIDs from 'app/components/Tier/SecondaryID';
import Selfie from 'app/components/Tier/Selfie';
import Loading from 'app/components/Loading';

import tierUpgradeImg from 'app/components/Assets/tier_upgrade_pending.png';

/** selectors, actions */
import { selectUserTier } from 'app/App/slice/selectors';
import {
  selectValidateLoading,
  selectValidateError,
  selectValidateData,
} from './slice/selectors';

import { containerActions as actions } from './slice';

/**
 * Silver Upgrade Page
 * Will walk to all the process of upgrading to silver
 */
export default function SilverUpgradeComponent() {
  const history = useHistory();
  const location: any = useLocation();
  const dispatch = useDispatch();

  const currentTier: any = useSelector(selectUserTier);

  const loading = useSelector(selectValidateLoading);
  const error = useSelector(selectValidateError);
  const success = useSelector(selectValidateData);

  const [showPending, setShowPending] = React.useState(false);
  const [showRequirement, setShowRequirement] = React.useState(true);
  const [showProfile, setShowProfile] = React.useState(false);
  const [showPrimaryID, setShowPrimaryID] = React.useState(false);
  const [showSecondaryID, setShowSecondaryID] = React.useState(false);
  const [showSelfie, setShowSelfie] = React.useState(false);
  const [fromPrimary, setFromPrimary] = React.useState(true);
  const [tier, setTier] = React.useState({
    name: '',
    id: '',
  });
  const [photoID, setPhotoID] = React.useState<string[]>([]);
  const [selfieID, setSelfieID] = React.useState<string[]>([]);

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
    if (location && location.state && Object.keys(location.state).length > 0) {
      setTier({
        name: location.state.name || '',
        id: location.state.id || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

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
    setShowRequirement(prev => !prev);
    if (tier.id === TierIDs.silver) {
      setShowPrimaryID(prev => !prev);
    }
  };

  let idx = -1;
  if (tier && tier.id !== '') {
    idx = TierRequirements.findIndex(j => j.id === tier.id);
  }

  return (
    <>
      {showRequirement && (
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
              Next
            </Button>
          }
        >
          {loading && <Loading position="absolute" />}
          <H5>Requirements</H5>
          {idx !== -1 && (
            <TierRequirementList
              requirements={TierRequirements[idx].requirement}
            />
          )}
        </Box>
      )}

      {showPrimaryID && (
        <PrimaryIDs
          tierID={tier ? tier.id : ''}
          onSuccess={(bool: boolean, ids: string[]) => {
            setPhotoID(ids);
            setShowPrimaryID(false);
            setFromPrimary(true);
            if (bool) {
              setShowSelfie(true);
            } else {
              setShowSecondaryID(true);
            }
          }}
        />
      )}

      {showSecondaryID && (
        <SecondaryIDs
          tierID={tier ? tier.id : ''}
          onSuccess={(ids: string[]) => {
            setPhotoID(ids);
            setShowSecondaryID(false);
            setShowSelfie(true);
            setFromPrimary(false);
          }}
          onBack={() => {
            setShowSecondaryID(false);
            setShowPrimaryID(true);
          }}
        />
      )}

      {showSelfie && (
        <Selfie
          tierID={tier ? tier.id : ''}
          onSuccess={(ids: string[]) => {
            setSelfieID(ids);
            setShowSelfie(false);
            setShowProfile(true);
          }}
          onBack={() => {
            setShowSelfie(false);
            if (fromPrimary) {
              setShowPrimaryID(true);
            }
            if (!fromPrimary) {
              setShowSecondaryID(true);
            }
          }}
        />
      )}

      {showProfile && (
        <SilverProfile
          onSuccess={() => history.push('/tiers')}
          onCancel={() => {
            setShowProfile(false);
            setShowRequirement(true);
          }}
          isTierUpgrade
          idPhotoID={photoID}
          selfieID={selfieID}
        />
      )}

      <Dialog show={showPending} size="small">
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <img src={tierUpgradeImg} alt="Pending Silver Upgrade Request" />
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
