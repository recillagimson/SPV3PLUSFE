/**
 * Select Element
 * Props will be passed down to the native select tag
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Lottie from 'react-lottie-player/dist/LottiePlayerLight';

import loadingBlack from 'app/components/Loading/loading_black.json';

import FormElementStyle from './FormElementsStyle';
import { StyleConstants } from 'styles/StyleConstants';

const Wrapper = styled.div<{ full?: boolean }>`
  width: ${p => (p.full ? '100%' : 'auto')};
  display: ${p => (p.full ? 'block' : 'inline-block')};
  margin-right: ${p => (!p.full ? '15px' : '0')};
  padding: 0;
  position: relative;

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background-color: ${StyleConstants.WHITE_TRANSPARENT_BG};
  }

  .arrow {
    position: absolute;
    top: 50%;
    right: 7px;
    transform: translateY(-50%);
    z-index: 1;
  }

  select {
    ${FormElementStyle} // basic css style for all form elements
    padding: 13px 25px 13px 13px;
    background-color: transparent;
    appearance: none;
    position: relative;
    z-index: 2;
    width: 100%;
  }

  select:disabled + .arrow {
    z-index: 3;
  }

  // remove the arrow of select for lower version of ie
  select::-ms-expand {
    display: none;
  }
`;

interface SelectComponentProps extends React.SelectHTMLAttributes<any> {
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNodeArray | React.ReactNode;
  value: any;
  onChange?: (o: any) => void;
}

export default function SelectComponent({
  loading,
  fullWidth,
  children,
  value,
  onChange,
  ...rest
}: SelectComponentProps) {
  return (
    <Wrapper className="select-wrapper" full={fullWidth}>
      {loading && (
        <span className="loading">
          <Lottie
            play
            loop
            animationData={loadingBlack}
            style={{
              width: 40,
              height: 40,
            }}
          />
        </span>
      )}
      <select {...rest} value={value} onChange={onChange} tabIndex={0}>
        {children}
      </select>
      <FontAwesomeIcon className="arrow" icon="caret-down" />
    </Wrapper>
  );
}
