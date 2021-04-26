/**
 * Sidebar Component
 *
 * NOTE: the svg files here maybe moved into the assets if this will be used in other components
 */
import * as React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useDispatch } from 'react-redux';

import Avatar from 'app/components/Elements/Avatar';
import IconButton from 'app/components/Elements/IconButton';
import { deleteCookie } from 'app/components/Helpers';

// import { appActions } from 'app/App/slice';
import Wrapper from './Wrapper';
import Navigation from './Navigation';
import NavButton from './NavButton';

export default function Sidebar() {
  const history = useHistory();
  // const dispatch = useDispatch();

  const [show, setShow] = React.useState(false);

  const gotoProfile = () => {
    history.push('/profile');
  };

  const onLogout = () => {
    // we might not need this next two lines, check the logging out scenario
    // delete if not needed anymore
    // dispatch(appActions.getTokenReset());
    // dispatch(appActions.getIsAuthenticated(false));
    deleteCookie('spv_uat_hmc');
    deleteCookie('spv_uat');
    deleteCookie('spv_expire');
    deleteCookie('spv_cat');

    const publicURL = process.env.PUBLIC_URL || '';

    window.location.replace(`${publicURL}/`);
  };

  return (
    <Wrapper className={show ? 'show' : undefined}>
      <img src="/img/SPLogo.png" alt="SquidPay" className="sp-logo" />
      <IconButton
        className="btn-trigger"
        onClick={() => setShow(prev => !prev)}
      >
        <FontAwesomeIcon icon="times" />
      </IconButton>
      <div className="user-info">
        <Avatar
          image="https://source.unsplash.com/random/120x120"
          size="medium"
        />
        <div className="user-short-details">
          <p className="name">Juan Dela Cruz</p>
          <p className="mobile">Mobile</p>
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
        <NavButton as={NavLink} to="/">
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

        <NavButton as={NavLink} to="/">
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.9098 15.3285L22.1917 14.3836C22.3463 13.4652 22.3463 12.5274 22.1917 11.609L23.9098 10.6641C24.1179 10.5434 24.2767 10.3532 24.3584 10.127C24.4402 9.90071 24.4394 9.65289 24.3564 9.42711C23.8393 7.72967 22.9601 6.16462 21.7794 4.83997C21.6131 4.67112 21.3953 4.56255 21.1603 4.53143C20.9254 4.50031 20.6868 4.54843 20.4823 4.66817L18.7643 5.61309C18.0506 5.04996 17.2611 4.59017 16.4192 4.24726V2.30588C16.4145 2.06573 16.3261 1.83474 16.1693 1.6528C16.0125 1.47087 15.797 1.34941 15.5601 1.30943C13.8291 0.896858 12.0254 0.896858 10.2944 1.30943C10.0617 1.35046 9.85137 1.47356 9.70165 1.65638C9.55192 1.83921 9.47269 2.06964 9.47833 2.30588V4.23866C8.60664 4.57929 7.79694 5.06105 7.08169 5.66463L5.36367 4.67677C5.16004 4.55401 4.92072 4.50414 4.68501 4.53536C4.44931 4.56658 4.23122 4.67703 4.06656 4.84857C2.88854 6.17512 2.00965 7.73954 1.48953 9.43569C1.40653 9.66148 1.40582 9.9093 1.48752 10.1356C1.56922 10.3618 1.7281 10.552 1.9362 10.6727L3.65423 11.6176C3.53394 12.5385 3.53394 13.4712 3.65423 14.3922L1.9362 15.3371C1.7281 15.4578 1.56922 15.648 1.48752 15.8742C1.40582 16.1005 1.40653 16.3483 1.48953 16.5741C2.00965 18.2702 2.88854 19.8347 4.06656 21.1612C4.23122 21.3327 4.44931 21.4432 4.68501 21.4744C4.92072 21.5056 5.16004 21.4558 5.36367 21.333L7.08169 20.3881C7.80558 20.9615 8.61031 21.4247 9.46975 21.7625V23.7039C9.47935 23.9267 9.55346 24.1419 9.68309 24.3234C9.81271 24.5049 9.99227 24.6448 10.1999 24.7261H10.2772C12.0164 25.0913 13.8124 25.0913 15.5516 24.7261H15.6117C15.8354 24.6585 16.0325 24.523 16.1757 24.3382C16.3188 24.1535 16.4009 23.9288 16.4106 23.6953V21.7539C17.2525 21.411 18.042 20.9512 18.7557 20.3881L20.4737 21.333C20.6773 21.4558 20.9167 21.5056 21.1524 21.4744C21.3881 21.4432 21.6062 21.3327 21.7708 21.1612C22.9784 19.837 23.8892 18.2702 24.4423 16.5655V16.5054C24.4864 16.2782 24.4589 16.0429 24.3635 15.8321C24.2681 15.6213 24.1095 15.4453 23.9098 15.3285ZM12.9144 16.1875C12.06 16.1875 11.2407 15.8482 10.6366 15.244C10.0325 14.6399 9.69309 13.8206 9.69309 12.9662C9.69309 12.1119 10.0325 11.2925 10.6366 10.6884C11.2407 10.0843 12.06 9.74494 12.9144 9.74494C13.768 9.74721 14.5861 10.0873 15.1897 10.6909C15.7933 11.2946 16.1334 12.1126 16.1357 12.9662C16.138 13.3899 16.0562 13.8098 15.8951 14.2017C15.734 14.5935 15.4968 14.9495 15.1973 15.2491C14.8977 15.5487 14.5417 15.7859 14.1498 15.947C13.758 16.1081 13.338 16.1898 12.9144 16.1875Z"
              fill="#E0AC39"
              stroke="#38434D"
              strokeWidth="1.15"
            />
            <path
              d="M2.00508 1.06035H6.96159C7.22288 1.06485 7.47194 1.17182 7.65511 1.3582C7.83828 1.54459 7.9409 1.79548 7.94086 2.0568C7.94087 2.18726 7.91503 2.31641 7.86485 2.43683C7.81467 2.55725 7.74113 2.66654 7.64849 2.75838C7.55584 2.85023 7.44593 2.92281 7.32509 2.97194C7.20424 3.02108 7.07486 3.0458 6.94441 3.04466H1.98791C1.85786 3.04581 1.72889 3.02104 1.60851 2.9718C1.48814 2.92256 1.37879 2.84985 1.28683 2.75788C1.19487 2.66592 1.12214 2.55656 1.0729 2.43619C1.02366 2.31582 0.998893 2.18685 1.00004 2.0568C0.998872 1.9249 1.02414 1.79409 1.07435 1.6721C1.12455 1.55011 1.19867 1.43942 1.29235 1.34655C1.38602 1.25367 1.49735 1.18049 1.61976 1.13134C1.74217 1.08218 1.87319 1.05805 2.00508 1.06035Z"
              fill="#E0AC39"
            />
            <path
              d="M18.8676 22.8448H23.824C24.0883 22.8448 24.3418 22.9498 24.5287 23.1367C24.7155 23.3236 24.8205 23.577 24.8205 23.8413C24.8205 23.9718 24.7947 24.1009 24.7445 24.2213C24.6943 24.3417 24.6208 24.451 24.5281 24.5429C24.4355 24.6347 24.3256 24.7073 24.2047 24.7564C24.0839 24.8056 23.9545 24.8303 23.824 24.8292H18.8676C18.7371 24.8303 18.6077 24.8056 18.4869 24.7564C18.366 24.7073 18.2561 24.6347 18.1635 24.5429C18.0708 24.451 17.9973 24.3417 17.9471 24.2213C17.8969 24.1009 17.8711 23.9718 17.8711 23.8413C17.8711 23.577 17.9761 23.3236 18.1629 23.1367C18.3498 22.9498 18.6033 22.8448 18.8676 22.8448Z"
              fill="#E0AC39"
            />
          </svg>
          Privacy
        </NavButton>
        <NavButton as={NavLink} to="/">
          <svg
            width="16"
            height="25"
            viewBox="0 0 16 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.4233 7.13252L4.8 7.44072C5.14007 6.97272 5.55011 6.55979 6.01572 6.21645C6.4468 5.94123 6.95149 5.80386 7.46259 5.82263C7.96751 5.82817 8.46152 5.97016 8.89232 6.23357C9.05833 6.31353 9.20169 6.43375 9.30936 6.58328C9.41702 6.73282 9.48556 6.90691 9.50873 7.08971C9.50687 7.21685 9.4767 7.34198 9.42042 7.45601C9.36415 7.57004 9.28321 7.67011 9.18342 7.74893C8.80111 8.04953 8.39117 8.31325 7.95913 8.53657L7.8564 8.58794C6.5722 9.29853 4.66301 10.3601 4.66301 12.8686V13.2025C4.66188 13.3827 4.69655 13.5613 4.76499 13.728C4.83343 13.8948 4.93429 14.0462 5.06171 14.1736C5.18914 14.3011 5.34058 14.4019 5.50729 14.4704C5.67399 14.5388 5.85263 14.5735 6.03283 14.5723H8.71254C8.89274 14.5735 9.07138 14.5388 9.23808 14.4704C9.40479 14.4019 9.55626 14.3011 9.68368 14.1736C9.81111 14.0462 9.91197 13.8948 9.98041 13.728C10.0488 13.5613 10.0835 13.3827 10.0824 13.2025V13.0142C10.0824 12.8943 10.168 12.7145 10.5875 12.432C10.7844 12.295 11.0155 12.158 11.2895 11.9953C11.5463 11.8412 11.8374 11.67 12.1456 11.4817C12.8175 11.0712 13.3998 10.5296 13.8579 9.88927C14.407 9.07031 14.6882 8.10105 14.6627 7.11539C14.637 6.26265 14.4235 5.42609 14.0372 4.66541C13.6509 3.90473 13.1015 3.2387 12.4282 2.71486C11.11 1.62913 9.46121 1.02516 7.75367 1.0026C6.37578 0.967331 5.0125 1.29193 3.79834 1.94435C2.67449 2.59963 1.71656 3.50482 0.998763 4.5898C0.899457 4.73358 0.829552 4.89555 0.793012 5.06643C0.756472 5.23732 0.754034 5.41373 0.785853 5.58556C0.817672 5.75738 0.883103 5.92123 0.97841 6.06769C1.07372 6.21416 1.19703 6.34036 1.34124 6.43905L2.89938 7.63763C3.18036 7.85758 3.53686 7.9576 3.89125 7.91591C4.24563 7.87422 4.5692 7.6942 4.79146 7.41504L4.4233 7.13252Z"
              fill="#E0AC39"
              stroke="#38434D"
              strokeWidth="1.15"
            />
            <path
              d="M7.73701 16.6099C7.13929 16.6099 6.55497 16.7872 6.05798 17.1192C5.56099 17.4513 5.17363 17.9233 4.94489 18.4755C4.71615 19.0278 4.65631 19.6354 4.77292 20.2217C4.88953 20.8079 5.17737 21.3464 5.60002 21.769C6.02268 22.1917 6.56116 22.4795 7.1474 22.5961C7.73364 22.7128 8.34131 22.6529 8.89353 22.4242C9.44576 22.1954 9.91776 21.8081 10.2498 21.3111C10.5819 20.8141 10.7592 20.2298 10.7592 19.6321C10.7569 18.8312 10.4378 18.0639 9.8715 17.4976C9.30522 16.9313 8.53784 16.6122 7.73701 16.6099Z"
              stroke="#38434D"
              strokeWidth="1.12"
            />
            <path
              d="M4.99657 23.4333H12.7018C12.9001 23.4443 13.0861 23.5333 13.2192 23.6808C13.3523 23.8284 13.4217 24.0225 13.4124 24.2209C13.417 24.3188 13.4022 24.4165 13.369 24.5087C13.3357 24.6008 13.2847 24.6855 13.2187 24.7579C13.1527 24.8302 13.073 24.8888 12.9843 24.9304C12.8956 24.9719 12.7996 24.9956 12.7018 25H4.99657C4.89872 24.9956 4.8027 24.9719 4.714 24.9304C4.62531 24.8888 4.54567 24.8302 4.47967 24.7579C4.41367 24.6855 4.3626 24.6008 4.32936 24.5087C4.29612 24.4165 4.28139 24.3188 4.28599 24.2209C4.27665 24.0225 4.34606 23.8284 4.47915 23.6808C4.61223 23.5333 4.7982 23.4443 4.99657 23.4333Z"
              fill="#E0AC39"
            />
          </svg>
          Help
        </NavButton>
      </Navigation>
      <div className="logout">
        <NavButton onClick={onLogout} fullWidth>
          <svg
            width="37"
            height="26"
            viewBox="0 0 37 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M35.7346 14.0417C36.0065 13.7555 36.1582 13.3757 36.1582 12.9809C36.1582 12.5861 36.0065 12.2063 35.7346 11.9201L25.2638 1.44939C25.0549 1.23615 24.787 1.09024 24.4946 1.03039C24.2021 0.970547 23.8985 0.999502 23.6226 1.11353C23.3467 1.22756 23.1112 1.42145 22.9464 1.67031C22.7815 1.91918 22.6948 2.21165 22.6975 2.51016V8.49833H14.2285C14.0312 8.49604 13.8355 8.53319 13.6529 8.60761C13.4702 8.68203 13.3043 8.79221 13.1648 8.93168C13.0253 9.07115 12.9151 9.2371 12.8407 9.41977C12.7663 9.60243 12.7291 9.79814 12.7314 9.99537V15.9835C12.7242 16.1821 12.758 16.3799 12.8307 16.5648C12.9034 16.7497 13.0134 16.9176 13.1539 17.0581C13.2944 17.1986 13.4623 17.3086 13.6472 17.3813C13.8321 17.454 14.0299 17.4878 14.2285 17.4806H22.706V23.4688C22.7034 23.7673 22.7901 24.0597 22.9549 24.3086C23.1198 24.5575 23.3553 24.7514 23.6311 24.8654C23.907 24.9794 24.2107 25.0084 24.5031 24.9485C24.7956 24.8887 25.0635 24.7428 25.2724 24.5295L35.7346 14.0417Z"
              fill="#E0AC39"
              stroke="#38434D"
              strokeMiterlimit="10"
            />
            <path
              d="M16.7188 24.2386V21.7493C16.7069 21.555 16.6249 21.3716 16.488 21.2331C16.3511 21.0947 16.1687 21.0106 15.9745 20.9965H10.7392C10.4757 21.0011 10.2141 20.9527 9.96969 20.8543C9.72531 20.7559 9.50318 20.6094 9.31648 20.4235C9.12979 20.2376 8.98233 20.0161 8.88286 19.7721C8.78338 19.5282 8.73392 19.2667 8.73739 19.0033V7.02693C8.74189 6.49821 8.9545 5.99254 9.32917 5.61947C9.70385 5.24639 10.2104 5.03595 10.7392 5.03372H15.9745C16.1712 5.0315 16.3592 4.95237 16.4983 4.81328C16.6374 4.67418 16.7166 4.48616 16.7188 4.28947V1.79154C16.7067 1.59813 16.6243 1.41579 16.4873 1.27876C16.3503 1.14173 16.1679 1.05943 15.9745 1.0473H10.7392C9.15099 1.0473 7.62788 1.67819 6.50488 2.80119C5.38188 3.92419 4.75098 5.44731 4.75098 7.03548V19.0118C4.75098 20.6 5.38188 22.1231 6.50488 23.2461C7.62788 24.3691 9.15099 25 10.7392 25H15.9745C16.1735 24.9955 16.3628 24.9133 16.5019 24.771C16.641 24.6287 16.7188 24.4376 16.7188 24.2386V24.2386Z"
              stroke="#38434D"
              strokeMiterlimit="10"
            />
            <path
              d="M0.661384 15.2137H4.60502C4.79498 15.2311 4.97049 15.3224 5.09371 15.4681C5.21693 15.6137 5.27799 15.8019 5.26373 15.9921C5.27193 16.0865 5.26137 16.1817 5.23265 16.272C5.20393 16.3623 5.15762 16.4461 5.0964 16.5184C5.03517 16.5908 4.96024 16.6503 4.8759 16.6936C4.79157 16.7369 4.69951 16.763 4.60502 16.7706H0.661384C0.566899 16.763 0.474848 16.7369 0.390517 16.6936C0.306187 16.6503 0.231249 16.5908 0.170023 16.5184C0.108797 16.4461 0.0624921 16.3623 0.0337737 16.272C0.00505535 16.1817 -0.00550533 16.0865 0.00269409 15.9921C-0.0115681 15.8019 0.049481 15.6137 0.172699 15.4681C0.295916 15.3224 0.471424 15.2311 0.661384 15.2137Z"
              fill="#F9ECAA"
            />
            <path
              d="M5.97356 18.088H13.7325C13.8303 18.0924 13.9262 18.116 14.0149 18.1575C14.1035 18.199 14.183 18.2576 14.249 18.3299C14.315 18.4023 14.366 18.4869 14.3992 18.5789C14.4324 18.671 14.4471 18.7687 14.4425 18.8664C14.4519 19.0647 14.3825 19.2587 14.2495 19.4061C14.1165 19.5535 13.9307 19.6424 13.7325 19.6535H5.97356C5.77535 19.6424 5.58952 19.5535 5.45655 19.4061C5.32357 19.2587 5.2542 19.0647 5.26353 18.8664C5.25893 18.7687 5.27365 18.671 5.30686 18.5789C5.34008 18.4869 5.39113 18.4023 5.45708 18.3299C5.52303 18.2576 5.60259 18.199 5.69122 18.1575C5.77984 18.116 5.87579 18.0924 5.97356 18.088Z"
              fill="#F9ECAA"
            />
          </svg>
          Log Out
        </NavButton>
      </div>
    </Wrapper>
  );
}
