/**
 * User Info
 * For use on user profile
 * UI based on Figma design under Profile (center aligned ui)
 * URL: https://www.figma.com/file/ziJMVfZ8Rj5jsJzH45ydT0/Squidpay?node-id=446%3A3623
 *
 * @prop {object}     profile       Logged In User profile
 * @prop {function}   onEdit        callback to edit profile
 * @prop {string}     tier          Current tier of user
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Avatar from 'app/components/Elements/Avatar';
import H2 from 'app/components/Elements/H2';
import Button from 'app/components/Elements/Button';

const Wrapper = styled.div`
  text-align: center;
  padding: 40px 25px;

  p {
    margin: 0 0 2px;
  }

  small {
    margin-bottom: 5px;
    display: block;

    strong {
      color: ${StyleConstants.GOLD};
    }
  }

  button {
    margin: 5px 0 0;
  }
`;

type UserInfoProps = {
  login?: string;
  profile?: any;
  tier: string;
  onEdit: () => void;
};

export default function UserInfoComponent({
  login,
  profile,
  onEdit,
  tier,
}: UserInfoProps) {
  return (
    <Wrapper>
      <Avatar size="large" />
      <H2>
        {profile
          ? `${profile.first_name} ${profile.middle_name} ${profile.last_name}`
          : '-'}
      </H2>
      <p>{login}</p>
      <small>
        <strong>{Boolean(tier) ? tier : '-'}</strong>{' '}
        <Button
          onClick={onEdit}
          color="secondary"
          variant="contained"
          size="small"
        >
          Upgrade
        </Button>
      </small>
      <Button onClick={onEdit} color="primary" variant="contained">
        <FontAwesomeIcon icon="pen" /> Edit Profile
      </Button>
    </Wrapper>
  );
}
