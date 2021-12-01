/**
 * Avatar Upload Component
 * @prop {string}     image         avatar image
 * @prop {function}   onChange      returns the selected image (filelist)
 */
import * as React from 'react';
import styled from 'styled-components/macro';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Avatar from 'app/components/Elements/Avatar';
import { StyleConstants } from 'styles/StyleConstants';

const Wrapper = styled.div`
  display: inline-block;
  position: relative;

  label {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 28px;
    height: 28px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    transition: 0.3s ease;
    border-radius: 50%;
    cursor: pointer;
    outline: 0;
    font-size: 0.9rem;
    background-color: ${StyleConstants.BUTTONS.primary.main};
    color: ${StyleConstants.BUTTONS.primary.textColor};
    opacity: 0.8;

    &:focus-visible {
      box-shadow: 0 0 2px 2px ${StyleConstants.FOCUS_COLOR};
    }

    &:hover {
      /* background-color: ${StyleConstants.GRAY_BG};
      color: inherit; */
      opacity: 1;
    }

    svg {
      margin-left: 1px;
    }

    input {
      width: 0;
      height: 0;
      visibility: hidden;
      display: none;
    }
  }
`;

export default function AvatarUpload({
  image,
  onChange,
}: {
  image?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Wrapper>
      <Avatar image={image || undefined} size="xlarge" />
      <label htmlFor="avatar-upload">
        <FontAwesomeIcon icon="camera" />

        <input
          type="file"
          accept="image/*"
          id="avatar-upload"
          name="avatar-upload"
          onChange={onChange}
        />
      </label>
    </Wrapper>
  );
}
