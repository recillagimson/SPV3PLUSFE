/**
 * User Info
 * For use on user profile
 * UI based on Figma design under Profile (center aligned ui)
 * URL: https://www.figma.com/file/ziJMVfZ8Rj5jsJzH45ydT0/Squidpay?node-id=446%3A3623
 */
import * as React from 'react';
import styled from 'styled-components/macro';

import Avatar from 'app/components/Elements/Avatar';
import H2 from 'app/components/Elements/H2';
import { StyleConstants } from 'styles/StyleConstants';

const Wrapper = styled.div`
  text-align: center;
  padding: 40px 25px;

  p {
    margin: 0 0 0;
  }

  small {
    display: block;

    strong {
      color: ${StyleConstants.GOLD};
    }
  }
`;

type UserInfoProps = {
  profile?: any;
};

export default function UserInfoComponent({ profile }: UserInfoProps) {
  if (!profile) {
    return null;
  }

  return (
    <Wrapper>
      <Avatar size="large" />
      <H2>Juan Dela Cruz</H2>
      <p>09752321517</p>
      <small>
        Status: <strong>Gold Member</strong>
      </small>
    </Wrapper>
  );
}
