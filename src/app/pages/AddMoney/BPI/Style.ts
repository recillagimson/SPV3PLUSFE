import styled from 'styled-components/macro';

import { StyleConstants } from 'styles/StyleConstants';

export const ListAccount = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: ${StyleConstants.color.tones.mute};
  padding: ${StyleConstants.spacing[16]} ${StyleConstants.spacing[12]};
  border-radius: ${StyleConstants.radius.medium};
  margin-bottom: ${StyleConstants.spacing[12]};
  cursor: pointer;
  transition: background-color 0.2s ease-in;

  &:hover {
    background-color: ${StyleConstants.color.lightgray1};
  }

  .radio {
    display: block;
    width: 16px;
    height: 16px;
    padding: 1px;
    position: relative;
    background-color: ${StyleConstants.color.white};
    border-radius: 16px;
    border-width: 1px;
    border-style: solid;
    border-color: ${p =>
      p.selected ? StyleConstants.color.primaryyellow : StyleConstants.divider};

    &:after {
      content: '';
      display: block;
      width: 12px;
      height: 12px;
      border-radius: 12px;
      background-color: ${p =>
        p.selected
          ? StyleConstants.color.primaryyellow
          : StyleConstants.color.white};
    }
  }
`;
