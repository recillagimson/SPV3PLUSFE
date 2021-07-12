/**
 * Sidebar Component
 * @prop {object}   flags       Feature flags for enabling/disabling
 *
 * NOTE: the svg files here maybe moved into the assets if this will be used in other components
 */
import * as React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

import Dialog from 'app/components/Dialog';
import Avatar from 'app/components/Elements/Avatar';
import IconButton from 'app/components/Elements/IconButton';

import Loading from 'app/components/Loading';
import Button from 'app/components/Elements/Button';

import HomeIcon from 'app/components/Assets/Home';
import QRCodeIcon from 'app/components/Assets/QRCodeSmall';
// import AccountIcon from 'app/components/Assets/Account';
import PromosIcon from 'app/components/Assets/Promos';
import AccountSecurityIcon from 'app/components/Assets/AccountSecurity';
import MerchantInquiryIcon from 'app/components/Assets/MerchantInquiry';
import HelpCenterIcon from 'app/components/Assets/HelpCenter';
import ContactUsIcon from 'app/components/Assets/ContactUs';
import LogoutIcon from 'app/components/Assets/Logout';
import { Tiers } from 'app/components/Helpers/Tiers';
import { doSignOut } from 'app/components/Helpers';

import Wrapper from './Wrapper';
import Navigation from './Navigation';
import NavButton from './NavButton';

/** selectors, actions */
// import { UserProfileState } from 'types/Default';
// import { appActions } from 'app/App/slice';
import { selectLoggedInName, selectUser } from 'app/App/slice/selectors';
import LogoutWrapper from './LogoutWrapper';
import { usePrevious } from '../Helpers/Hooks';

export default function Sidebar() {
  const history = useHistory();
  const profile: any = useSelector(selectUser);
  const loginName: string = useSelector(selectLoggedInName);
  const flags = window['spFlags'];

  const [isLogout, setIsLogout] = React.useState(false);
  const [fakeLoading, setFakeLoading] = React.useState(false);
  const [avatar, setAvatar] = React.useState('');

  const previousAvatar = usePrevious(profile ? profile.avatar_link : '');

  React.useEffect(() => {
    if (
      profile &&
      profile.avatar_link &&
      profile.avatar_link !== previousAvatar
    ) {
      setAvatar(profile.avatar_link);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const gotoProfile = () => {
    history.push('/profile');
  };

  const gotoUpgradeTier = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (e && e.stopPropagation) e.stopPropagation(); // stop propagation of click into the parent element

    // enable once tier upgrade is ready
    history.push('/tiers');
  };

  const onLogout = () => {
    setFakeLoading(true);

    doSignOut();
  };

  let tierName = '';
  if (
    profile &&
    profile.user_account &&
    profile.user_account.tier_id &&
    profile.user_account.tier_id !== ''
  ) {
    const tierIndex = Tiers.findIndex(
      j => j.id === profile.user_account.tier_id,
    );
    tierName = tierIndex !== -1 ? Tiers[tierIndex].class : '';
  }

  return (
    <>
      <Wrapper id="sidebarNavigation">
        <img
          src={`${process.env.PUBLIC_URL}/img/SPLogo.png`}
          alt="SquidPay"
          className="sp-logo"
        />
        <div className="user-info" role="presentation" onClick={gotoProfile}>
          <Avatar image={avatar !== '' ? avatar : undefined} size="large" />
          <div className="user-short-details">
            <p className="name">
              {typeof profile === 'object'
                ? `${profile.first_name} ${profile.last_name}`
                : ''}
            </p>
            <p className="mobile">{loginName}</p>
            <p className="status">
              <strong>{`${tierName} Member`}</strong>
            </p>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={gotoUpgradeTier}
            >
              Upgrade
            </Button>
          </div>
          <IconButton onClick={gotoProfile} className="btn-arrow">
            <FontAwesomeIcon icon="angle-right" />
          </IconButton>
        </div>
        <Navigation>
          <NavButton as={NavLink} to="/dashboard">
            <HomeIcon />
            Home
          </NavButton>
          {/* <NavButton as={NavLink} to="/dashboard"> */}
          {flags && flags.send_money_via_qr_enabled ? (
            <NavButton as={NavLink} to="/generateqr">
              <QRCodeIcon />
              QR Code
            </NavButton>
          ) : (
            <NavButton>
              <QRCodeIcon />
              QR Code
            </NavButton>
          )}

          {/* <NavButton as={NavLink} to="/dashboard">
            <AccountIcon />
            Account Verification
          </NavButton> */}
          {/* <NavButton as={NavLink} to="/dashboard"> */}
          <NavButton
            as="a"
            href="https://www.facebook.com/SquidPay/"
            target="_blank"
          >
            <PromosIcon />
            Promos
          </NavButton>
          {/* <NavButton as={NavLink} to="/dashboard"> */}
          <NavButton as={NavLink} to="/merchant-inquiry">
            <MerchantInquiryIcon />
            Merchant Inquiry
          </NavButton>
          <NavButton as={NavLink} to="/settings">
            <AccountSecurityIcon />
            Account Security
          </NavButton>
          {/* <NavButton as={NavLink} to="/dashboard"> */}
          <NavButton as={NavLink} to="/help-center">
            <HelpCenterIcon />
            Help Center
          </NavButton>
          {/* <NavButton as={NavLink} to="/dashboard"> */}
          <NavButton as={NavLink} to="/contact-us">
            <ContactUsIcon />
            Contact Us
          </NavButton>
          {/* <NavButton as={NavLink} to="/dashboard"> */}
        </Navigation>
        <div className="logout">
          <NavButton onClick={() => setIsLogout(prev => !prev)}>
            <LogoutIcon />
            Log Out
          </NavButton>
        </div>
      </Wrapper>
      <Dialog size="xsmall" show={isLogout}>
        <LogoutWrapper>
          {fakeLoading && <Loading position="absolute" />}
          <p>
            <strong>Logout</strong>
          </p>
          <p>Aww... You're leaving already?</p>
          <div className="buttons">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => setIsLogout(prev => !prev)}
            >
              Cancel
            </button>
            <button type="button" className="btn-logout" onClick={onLogout}>
              Log Out
            </button>
          </div>
        </LogoutWrapper>
      </Dialog>
    </>
  );
}
