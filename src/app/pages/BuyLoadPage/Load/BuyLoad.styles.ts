import styled from 'styled-components/macro';
import { media } from 'styles/media';
import { StyleConstants } from 'styles/StyleConstants';

export const ProviderButton = styled.button`
  width: 90px;
  margin: 0 3px ${StyleConstants.spacing[12]};
  display: block;
  outline: 0;
  border: 0;
  background-color: ${StyleConstants.color.white};
  font-size: 0.9rem;
  color: inherit;
  cursor: pointer;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    /* padding: ${StyleConstants.spacing[4]}; */
    border-radius: ${StyleConstants.radius.small};
    border: 1px solid ${StyleConstants.borderColor};
    margin-bottom: 4px;
    overflow: hidden;
    min-height: 78px;

    img {
      object-fit: contain;
    }
  }

  &:focus-visible .icon {
    box-shadow: 0 0 2px 2px ${StyleConstants.FOCUS_COLOR};
  }

  &:hover .icon {
    border-color: ${StyleConstants.color.primaryyellow};
  }

  ${media.medium`
    margin: 0 ${StyleConstants.spacing[4]} ${StyleConstants.spacing[12]};
  `}
`;

export const CategoryList = styled.div`
  white-space: nowrap;
  width: 100%;
  overflow: auto;
  margin: 32px 0 0;
`;

export const ProductList = styled.div`
  margin: 24px 0;
  padding: 2px 2px 0;
  border-bottom: 1px solid ${StyleConstants.borderColor};

  ${media.medium`
    max-height: 51vh;
    overflow-y: auto;
  `}
`;

export const ProductButton = styled.button<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  width: 100%;
  cursor: pointer;
  background-color: ${p =>
    p.selected ? StyleConstants.color.tones.mute : StyleConstants.color.white};
  border: 0;
  border-top: 1px solid ${StyleConstants.borderColor};
  padding: ${StyleConstants.spacing[16]} ${StyleConstants.spacing[12]};

  span {
    width: 50%;
    text-align: left;

    &:first-child {
      font-weight: 700;
    }

    &:last-child {
      text-align: right;
    }
  }

  &:hover {
    background-color: ${StyleConstants.color.highlight};
  }
`;

export const ReviewWrapper = styled.div`
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
`;
