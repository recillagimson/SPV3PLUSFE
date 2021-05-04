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
import { doSignOut } from 'app/components/Helpers';

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
import Button from '../Elements/Button';

export default function Sidebar() {
  const history = useHistory();
  const profile: boolean | UserProfileState = useSelector(selectUser);
  const loginName: string = useSelector(selectLoggedInName);

  const [isLogout, setIsLogout] = React.useState(false);
  const [fakeLoading, setFakeLoading] = React.useState(false);

  const [show, setShow] = React.useState(true);
  const gotoProfile = () => {
    history.push('/profile');
  };

  const gotoUpgradeTier = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (e && e.stopPropagation) e.stopPropagation(); // stop propagation of click into the parent element

    history.push('/tier-upgrade');
  };

  const onLogout = () => {
    setFakeLoading(true);
    // we might not need this next two lines, check the logout out scenario
    // delete if not needed anymore
    // dispatch(appActions.getTokenReset());
    // dispatch(appActions.getIsAuthenticated(false));
    // deleteCookie('spv_uat_hmc');
    // deleteCookie('spv_uat');
    // deleteCookie('spv_expire');
    // deleteCookie('spv_cat');
    // deleteCookie('spv_uat_u');

    // setTimeout(() => {
    //   const publicURL = process.env.PUBLIC_URL || '';
    //   window.location.replace(`${publicURL}/`);
    // }, 1000);
    doSignOut();
  };

  return (
    <>
      <Wrapper id="sidebarNavigation">
        <img
          src={`${process.env.PUBLIC_URL}/img/SPLogo.png`}
          alt="SquidPay"
          className="sp-logo"
        />
        <div className="user-info" role="presentation" onClick={gotoProfile}>
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
              <strong>Gold Member</strong>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={gotoUpgradeTier}
              >
                Upgrade
              </Button>
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
          {/* <NavButton as={NavLink} to="/dashboard"> */}
          <NavButton onClick={() => alert('For Development')}>
            <QRCodeIcon />
            User QR Code
          </NavButton>
          {/* <NavButton as={NavLink} to="/dashboard"> */}
          <NavButton onClick={() => alert('For Development')}>
            <AccountIcon />
            Account Verification
          </NavButton>
          {/* <NavButton as={NavLink} to="/dashboard"> */}
          <NavButton onClick={() => alert('For Development')}>
            <PromosIcon />
            Promos
          </NavButton>
          <NavButton as={NavLink} to="/settings">
            <AccountSecurityIcon />
            Account Security
          </NavButton>
          {/* <NavButton as={NavLink} to="/dashboard"> */}
          <NavButton onClick={() => alert('For Development')}>
            <MerchantInquiryIcon />
            Merchant Inquiry
          </NavButton>
          {/* <NavButton as={NavLink} to="/dashboard"> */}
          <NavButton onClick={() => alert('For Development')}>
            <HelpCenterIcon />
            Help Centre
          </NavButton>
          {/* <NavButton as={NavLink} to="/dashboard"> */}
          <NavButton onClick={() => alert('For Development')}>
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
<<<<<<< HEAD
        <IconButton onClick={gotoProfile}>
          <FontAwesomeIcon icon="angle-right" />
        </IconButton>
      </div>
      <Navigation>
        <NavButton as={NavLink} to="/sendmoney">
          Send Money
        </NavButton>
        <NavButton as={NavLink} to="/buyload">
          Buy Load
        </NavButton>
        <NavButton as={NavLink} to="/scanqr">
          Scan QR
        </NavButton>
        {/* <NavButton as={NavLink} to="/"> */}
        <NavButton as={NavLink} to="/dashboard">
          <svg
            width="34"
            height="26"
            viewBox="0 0 34 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 10.2564C7 9.90511 7.1843 9.5796 7.4855 9.39888L16.7316 3.85121C17.0368 3.66812 17.4162 3.66099 17.728 3.83248L26.9308 8.89401C27.2504 9.06977 27.4489 9.40554 27.4489 9.77023V24.0269C27.4489 24.5791 27.0012 25.0269 26.4489 25.0269H8C7.44771 25.0269 7 24.5791 7 24.0269V10.2564Z"
              fill="#E0AC39"
              stroke="#38434D"
              strokeWidth="1.12"
            />
            <path
              d="M27.8443 9.26131L32.4007 13.0492C32.5654 13.159 32.6752 13.3785 32.6752 13.5432C32.6752 13.7079 32.6203 13.8726 32.5105 13.9824L31.0832 15.6842C30.9734 15.8489 30.8087 15.9038 30.5891 15.9038C30.4245 15.9038 30.2598 15.8489 30.15 15.7391L17.2493 5.14408C17.1395 5.03429 16.9748 4.97939 16.8651 4.97939C16.7004 4.97939 16.5357 5.03429 16.4259 5.14408L3.52523 15.7391C3.41544 15.8489 3.25075 15.9038 3.08606 15.9038C2.86648 15.9038 2.70179 15.8489 2.592 15.6842L1.16469 13.9824C1.10979 13.8726 1 13.7079 1 13.5432C1 13.3785 1.10979 13.159 1.27448 13.0492L15.1633 1.57582C15.6024 1.24644 16.2063 1.02686 16.8651 1.02686C17.4689 1.02686 18.0728 1.24644 18.5119 1.57582L23.4526 5.63815L27.8443 9.26131Z"
              fill="#E0AC39"
              stroke="#38434D"
              strokeWidth="1.12"
            />
            <rect
              x="14"
              y="16"
              width="5"
              height="9"
              rx="1"
              fill="white"
              stroke="#38434D"
              strokeWidth="1.12"
            />
          </svg>
          Home
        </NavButton>
        <NavButton as={NavLink} to="/transaction-history">
          <svg
            width="31"
            height="26"
            viewBox="0 0 31 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.308 14.3402H14.2004L14.1011 14.3898C13.1912 14.8305 12.1907 15.0516 11.1798 15.0353C10.1556 15.0523 9.1415 14.8313 8.21719 14.3898L8.11789 14.3402H7.29033C5.61848 14.3511 4.01882 15.0229 2.8405 16.209C1.66218 17.3951 1.00087 18.9991 1.00091 20.671V22.4502C0.991789 22.7874 1.05149 23.1229 1.17635 23.4363C1.30122 23.7497 1.48863 24.0343 1.72715 24.2728C1.96568 24.5114 2.25032 24.6988 2.56368 24.8237C2.87705 24.9485 3.21257 25.0082 3.54978 24.9991H18.843C19.178 25.0002 19.51 24.935 19.8197 24.8073C20.1294 24.6796 20.4109 24.4919 20.6478 24.255C20.8847 24.0181 21.0724 23.7367 21.2001 23.4269C21.3278 23.1172 21.393 22.7852 21.3919 22.4502V20.671C21.3832 18.9946 20.7134 17.3894 19.528 16.204C18.3426 15.0187 16.7374 14.3489 15.0611 14.3402H14.308Z"
              fill="#E0AC39"
              stroke="#38434D"
              strokeWidth="1.12"
            />
            <path
              d="M18.2886 12.7926L21.8554 16.3511C21.9453 16.4449 22.0532 16.5196 22.1727 16.5708C22.2921 16.622 22.4206 16.6486 22.5505 16.649C22.6805 16.649 22.8092 16.6226 22.9287 16.5714C23.0482 16.5202 23.156 16.4453 23.2457 16.3511L29.3779 10.2686C29.5635 10.0842 29.6703 9.83502 29.6758 9.57346C29.672 9.31152 29.565 9.06166 29.3779 8.87831L28.1696 7.67008C28.0834 7.57302 27.9777 7.49533 27.8593 7.44213C27.7409 7.38893 27.6125 7.36142 27.4827 7.36142C27.3529 7.36142 27.2246 7.38893 27.1062 7.44213C26.9878 7.49533 26.8821 7.57302 26.7959 7.67008L22.5754 11.8079L20.9202 10.1527C20.829 10.0568 20.7193 9.98049 20.5976 9.92832C20.476 9.87614 20.345 9.84924 20.2127 9.84924C20.0803 9.84924 19.9494 9.87614 19.8277 9.92832C19.7061 9.98049 19.5963 10.0568 19.5051 10.1527L18.2886 11.3693C18.1169 11.5533 18.0221 11.7961 18.0238 12.0478C18.0168 12.3203 18.1112 12.5857 18.2886 12.7926Z"
              fill="#F9ECAA"
              stroke="#38434D"
              strokeWidth="1.12"
            />
            <path
              d="M11.1799 13.0492C14.5072 13.0492 17.2045 10.3519 17.2045 7.0246C17.2045 3.69731 14.5072 1 11.1799 1C7.85258 1 5.15527 3.69731 5.15527 7.0246C5.15527 10.3519 7.85258 13.0492 11.1799 13.0492Z"
              fill="white"
              stroke="#38434D"
              strokeWidth="1.12"
            />
          </svg>
          Account Verification
        </NavButton>
        <NavButton as={NavLink} to="/quick-guide">
          <svg
            width="16"
            height="26"
            viewBox="0 0 16 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.33264 20.2907C2.15674 20.2873 1.98197 20.3195 1.81879 20.3853C1.65561 20.451 1.50738 20.5491 1.38298 20.6735C1.25858 20.7979 1.16055 20.9461 1.09479 21.1093C1.02902 21.2724 0.996873 21.4472 1.00025 21.6231V23.6672C0.993464 24.0237 1.12724 24.3685 1.37265 24.6272C1.50023 24.7495 1.65072 24.8453 1.81547 24.9092C1.98022 24.9732 2.15598 25.0039 2.33264 24.9996H8.95322C9.12912 25.003 9.30389 24.9708 9.46707 24.9051C9.63025 24.8393 9.77846 24.7413 9.90287 24.6169C10.0273 24.4925 10.1253 24.3442 10.1911 24.1811C10.2568 24.0179 10.289 23.8431 10.2856 23.6672V21.6231C10.2834 21.2704 10.1424 20.9328 9.89297 20.6834C9.64356 20.434 9.30592 20.2929 8.95322 20.2907H8.54771V11.5019C8.54771 11.1485 8.40733 10.8096 8.15746 10.5598C7.90758 10.3099 7.56869 10.1695 7.21531 10.1695H2.34918C2.17328 10.1661 1.99851 10.1983 1.83533 10.2641C1.67215 10.3298 1.52394 10.4278 1.39954 10.5522C1.27513 10.6766 1.17711 10.8249 1.11134 10.988C1.04558 11.1512 1.01342 11.326 1.01679 11.5019V13.5874C1.01342 13.7633 1.04558 13.9381 1.11134 14.1012C1.17711 14.2644 1.27513 14.4126 1.39954 14.537C1.52394 14.6614 1.67215 14.7595 1.83533 14.8252C1.99851 14.891 2.17328 14.9231 2.34918 14.9198H2.7547V20.2907H2.33264Z"
              fill="#E0AC39"
              stroke="#38434D"
              strokeWidth="1.12"
            />
            <path
              d="M5.63463 8.18333C7.61826 8.18333 9.2263 6.57529 9.2263 4.59167C9.2263 2.60804 7.61826 1 5.63463 1C3.65101 1 2.04297 2.60804 2.04297 4.59167C2.04297 6.57529 3.65101 8.18333 5.63463 8.18333Z"
              fill="#F9ECAA"
              stroke="#38434D"
              strokeWidth="1.12"
            />
            <path
              d="M12.4263 14.4401H15.2944C15.3671 14.4385 15.4393 14.4503 15.5071 14.4749C15.5748 14.4994 15.6368 14.5362 15.6893 14.5832C15.7419 14.6302 15.784 14.6864 15.8134 14.7487C15.8427 14.8109 15.8587 14.8779 15.8604 14.946C15.8537 15.0812 15.7907 15.2086 15.6849 15.3009C15.5791 15.3932 15.439 15.4431 15.2944 15.4398H12.4263C12.2817 15.4431 12.1416 15.3932 12.0358 15.3009C11.93 15.2086 11.867 15.0812 11.8604 14.946C11.862 14.8779 11.878 14.8109 11.9073 14.7487C11.9367 14.6864 11.9788 14.6302 12.0314 14.5832C12.0839 14.5362 12.1459 14.4994 12.2136 14.4749C12.2814 14.4503 12.3536 14.4385 12.4263 14.4401Z"
              fill="#E0AC39"
            />
            <path
              d="M11.1914 13.4404H12.8465C12.8892 13.4381 12.9319 13.4446 12.972 13.4594C13.0121 13.4742 13.0487 13.497 13.0797 13.5264C13.1107 13.5559 13.1353 13.5913 13.1521 13.6306C13.169 13.6698 13.1776 13.7121 13.1776 13.7549C13.1765 13.7969 13.167 13.8383 13.1497 13.8766C13.1324 13.9149 13.1076 13.9493 13.0767 13.9779C13.0459 14.0064 13.0096 14.0285 12.97 14.0428C12.9305 14.0571 12.8885 14.0633 12.8465 14.0611H11.1914C11.1071 14.0633 11.0254 14.0326 10.9635 13.9754C10.9017 13.9181 10.8646 13.839 10.8604 13.7549C10.8614 13.7125 10.8708 13.6707 10.8881 13.632C10.9053 13.5932 10.93 13.5582 10.9607 13.529C10.9914 13.4998 11.0276 13.477 11.0672 13.4617C11.1068 13.4465 11.149 13.4393 11.1914 13.4404Z"
              fill="#E0AC39"
            />
          </svg>
          Quick Guide
        </NavButton>
        <NavButton as={NavLink} to="/">
          <svg
            width="25"
            height="26"
            viewBox="0 0 25 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.8862 4.77428L13.2058 1.16316C12.8961 1.05847 12.5719 1.00346 12.2451 1.00018C11.9009 0.996411 11.5586 1.05153 11.2329 1.16316L2.59541 4.7657C2.12206 4.97109 1.71895 5.3102 1.43555 5.74139C1.15215 6.17259 1.00078 6.67713 1 7.19312C1 16.3367 6.24084 22.6926 11.293 24.7941C11.6161 24.93 11.9632 25 12.3137 25C12.6643 25 13.0113 24.93 13.3344 24.7941C17.3658 23.0786 23.6274 17.4089 23.6274 7.19312C23.6086 6.66303 23.4331 6.15038 23.1232 5.71989C22.8134 5.2894 22.3829 4.96036 21.8862 4.77428Z"
              fill="#E0AC39"
              stroke="#38434D"
              strokeWidth="1.14"
            />
            <path
              d="M10.0746 7.72493H5.27122C4.74066 7.72493 4.31055 8.15504 4.31055 8.68561C4.31055 9.21617 4.74066 9.64629 5.27122 9.64629H10.0746C10.6052 9.64629 11.0353 9.21617 11.0353 8.68561C11.0353 8.15504 10.6052 7.72493 10.0746 7.72493Z"
              fill="white"
            />
            <path
              d="M19.6822 11.559H11.9968C11.4662 11.559 11.0361 11.9891 11.0361 12.5197C11.0361 13.0503 11.4662 13.4804 11.9968 13.4804H19.6822C20.2128 13.4804 20.6429 13.0503 20.6429 12.5197C20.6429 11.9891 20.2128 11.559 19.6822 11.559Z"
              fill="white"
            />
          </svg>
          Settings
        </NavButton>
=======
      </Wrapper>
      <Dialog size="xsmall" show={isLogout}>
        <LogoutWrapper>
          {fakeLoading && <Loading position="absolute" />}
          <p>
            <strong>Logout</strong>
          </p>
          <p>Aww... You're leaving already?</p>
>>>>>>> 5afa8a0c3ca57203bb3fa14be7cb9585c5ff54bf

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
