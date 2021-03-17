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

export default function HeaderComponent({ isLoggedIn }: Props) {
  return (
    <Wrapper isLoggedIn={isLoggedIn}>
      <div className="wrapped">
        <img src="/img/SPLogo.png" alt="SquidPay" className="logo" />

        {!isLoggedIn && (
          <Navigation>
            <ButtonLink as={NavLink} size="medium" to="/" color="secondary">
              User
            </ButtonLink>
            <ButtonLink as={NavLink} size="medium" to="/" color="secondary">
              Merchant
            </ButtonLink>
            <ButtonLink as={NavLink} size="medium" to="/" color="secondary">
              Partner
            </ButtonLink>
            <ButtonLink
              as={NavLink}
              size="medium"
              to="/login"
              color="secondary"
            >
              Login
            </ButtonLink>
            <ButtonLink
              size="large"
              to="/register"
              color="primary"
              variant="contained"
            >
              Register
            </ButtonLink>
          </Navigation>
        )}
      </div>
    </Wrapper>
  );
}
