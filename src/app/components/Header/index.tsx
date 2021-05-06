/**
 * Header Component
 * @prop {boolean} isLoggedIn       If user is logged in, display will be different
 */
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import ButtonLink from 'app/components/Elements/ButtonLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from 'app/components/Elements/IconButton';
import { useHistory } from 'react-router-dom';
import { Props } from './type';
import Wrapper from './Wrapper';
import Navigation from './Navigation';
import MenuToggle from './MenuToggle';

export default function HeaderComponent({ isLoggedIn, blankPage }: Props) {
  const history = useHistory();
  const [show, setShow] = React.useState(false);

  const onToggleMenu = () => {
    if (isLoggedIn) {
      const sidebar = document.querySelector('#sidebarNavigation');

      sidebar?.classList.toggle('show');
      return;
    }
    setShow(prev => !prev);
  };

  if (blankPage) {
    return null;
  }

  return (
    <Wrapper isLoggedIn={isLoggedIn} className={show ? 'show' : undefined}>
      <div className="wrapped">
        {!isLoggedIn && (
          <img src="./img/SPLogo.png" alt="SquidPay" className="logo" />
        )}

        <div className="menu-buttons">
          {!isLoggedIn && (
            <Navigation className="mainNav">
              <ButtonLink as={NavLink} size="medium" to="/" color="secondary">
                User
              </ButtonLink>
              <ButtonLink as={NavLink} size="medium" to="/" color="secondary">
                Merchant
              </ButtonLink>
              <ButtonLink as={NavLink} size="medium" to="/" color="secondary">
                Partner
              </ButtonLink>
              <ButtonLink as={NavLink} size="medium" to="/" color="secondary">
                Login
              </ButtonLink>
              <ButtonLink
                size="medium"
                to="/register"
                color="primary"
                variant="contained"
              >
                Register
              </ButtonLink>
            </Navigation>
          )}

          {isLoggedIn && (
            <Navigation>
              <IconButton onClick={() => history.push('/notifications')}>
                <FontAwesomeIcon icon="bell" />
              </IconButton>
            </Navigation>
          )}

          <MenuToggle onClick={onToggleMenu} />
        </div>
      </div>
    </Wrapper>
  );
}
