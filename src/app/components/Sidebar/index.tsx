/**
 * Sidebar Component
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
import { deleteCookie } from 'app/components/Helpers';

import HomeIcon from 'app/components/Assets/Home';
import QRCodeIcon from 'app/components/Assets/QRCode';
import AccountIcon from 'app/components/Assets/Account';
import PromosIcon from 'app/components/Assets/Promos';
import AccountSecurityIcon from 'app/components/Assets/AccountSecurity';
import MerchantInquiryIcon from 'app/components/Assets/MerchantInquiry';
import HelpCenterIcon from 'app/components/Assets/HelpCenter';
import ContactUsIcon from 'app/components/Assets/ContactUs';
import LogoutIcon from 'app/components/Assets/Logout';

import Wrapper from './Wrapper';
import Navigation from './Navigation';
import NavButton from './NavButton';

/** selectors, actions */
// import { appActions } from 'app/App/slice';
import { selectLoggedInName, selectUser } from 'app/App/slice/selectors';
import { UserProfileState } from 'types/Default';
import LogoutWrapper from './LogoutWrapper';
import Loading from '../Loading';

export default function Sidebar() {
  const history = useHistory();
  const profile: boolean | UserProfileState = useSelector(selectUser);
  const loginName: string = useSelector(selectLoggedInName);

  const [isLogout, setIsLogout] = React.useState(false);
  const [fakeLoading, setFakeLoading] = React.useState(false);

  const gotoProfile = () => {
    history.push('/profile');
  };

  const onLogout = () => {
    setFakeLoading(true);
    // we might not need this next two lines, check the logout out scenario
    // delete if not needed anymore
    // dispatch(appActions.getTokenReset());
    // dispatch(appActions.getIsAuthenticated(false));
    deleteCookie('spv_uat_hmc');
    deleteCookie('spv_uat');
    deleteCookie('spv_expire');
    deleteCookie('spv_cat');
    deleteCookie('spv_uat_u');

    setTimeout(() => {
      const publicURL = process.env.PUBLIC_URL || '';
      window.location.replace(`${publicURL}/`);
    }, 1000);
  };

  return (
    <>
      <Wrapper id="sidebarNavigation">
        <img src="./img/SPLogo.png" alt="SquidPay" className="sp-logo" />
        <div className="user-info">
          <Avatar
            // image="https://source.unsplash.com/random/120x120"
            size="medium"
          />
          <div className="user-short-details">
            <p className="name">
              {typeof profile === 'object'
                ? `${profile.first_name} ${profile.middle_name} ${profile.last_name}`
                : ''}
            </p>
            <p className="mobile">{loginName}</p>
            <p className="status">
              Status: <strong>Gold Member</strong>
            </p>
          </div>
          <IconButton onClick={gotoProfile}>
            <FontAwesomeIcon icon="angle-right" />
          </IconButton>
        </div>
        <Navigation>
          <NavButton as={NavLink} to="/dashboard">
            <HomeIcon />
            Home
          </NavButton>
          <NavButton as={NavLink} to="/transaction-history">
            <QRCodeIcon />
            User QR Code
          </NavButton>
          <NavButton as={NavLink} to="/dashboard">
            <AccountIcon />
            Account Verification
          </NavButton>
          <NavButton as={NavLink} to="/dashboard">
            <PromosIcon />
            Promos
          </NavButton>
          <NavButton as={NavLink} to="/settings">
            <AccountSecurityIcon />
            Account Security
          </NavButton>
          <NavButton as={NavLink} to="/dashboard">
            <MerchantInquiryIcon />
            Merchant Inquiry
          </NavButton>
          <NavButton as={NavLink} to="/dashboard">
            <HelpCenterIcon />
            Help Centre
          </NavButton>
          <NavButton as={NavLink} to="/dashboard">
            <ContactUsIcon />
            Contact Us
          </NavButton>
        </Navigation>
        <div className="logout">
          <NavButton onClick={() => setIsLogout(prev => !prev)} fullWidth>
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
