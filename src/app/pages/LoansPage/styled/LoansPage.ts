import styled from 'styled-components';

export const PartnerTile = styled.section`
  min-width: 100px;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 0;
  cursor: pointer;
  border: 1px solid #efefef;
  border-radius: 4px;

  > * {
    width: 54px;
    height: 21.08px;
  }
`;

export const CollapsibleHeader = styled.header`
  background: #f0f0f0;
  padding: 12px;
  width: 100%;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
`;

interface CollapsibleContentProps {
  selected?: boolean;
}

export const CollapsibleContent = styled.section<CollapsibleContentProps>`
  max-height: ${({ selected }) => (selected ? '1000px' : '0')};
  overflow: hidden;
  margin: 24px 0;
`;

export const Spacer = styled.span`
  flex: 1 1 auto;
`;
