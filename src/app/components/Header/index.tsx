/**
 * Header Component
 * @prop {boolean} isLoggedIn       If user is logged in, display will be different
 */
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import ButtonLink from 'app/components/Elements/ButtonLink';

import { Props } from './type';

import Wrapper from './Wrapper';
import Navigation from './Navigation';
import IconButton from '../Elements/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function HeaderComponent({ isLoggedIn }: Props) {
  const publicURL = process.env.PUBLIC_URL || '';

  return (
    <Wrapper isLoggedIn={isLoggedIn}>
      <div className="wrapped">
        {!isLoggedIn && (
          <img
            src={`${publicURL}/img/SPLogo.png`}
            alt="SquidPay"
            className="logo"
          />
        )}

        {!isLoggedIn && (
          <Navigation>
            <ButtonLink
              as={NavLink}
              size="medium"
              to={`${publicURL}/`}
              color="secondary"
            >
              User
            </ButtonLink>
            <ButtonLink
              as={NavLink}
              size="medium"
              to={`${publicURL}/`}
              color="secondary"
            >
              Merchant
            </ButtonLink>
            <ButtonLink
              as={NavLink}
              size="medium"
              to={`${publicURL}/`}
              color="secondary"
            >
              Partner
            </ButtonLink>
            <ButtonLink
              as={NavLink}
              size="medium"
              to={`${publicURL}/`}
              color="secondary"
            >
              Login
            </ButtonLink>
            <ButtonLink
              size="medium"
              to={`${publicURL}/register`}
              color="primary"
              variant="outlined"
            >
              Register
            </ButtonLink>
          </Navigation>
        )}

        {isLoggedIn && (
          <Navigation>
            <IconButton onClick={() => alert('notifications')}>
              <FontAwesomeIcon icon="bell" />
            </IconButton>
          </Navigation>
        )}
      </div>
    </Wrapper>
  );
}
