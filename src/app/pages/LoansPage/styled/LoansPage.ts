import styled from 'styled-components/macro';

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

  transition: all 0.4s ease;

  &:hover {
    border: 1px solid #737373;
    filter: grayscale(0.6);
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
  overflow: ${({ selected }) => (selected ? 'auto' : 'hidden')};
  width: 100%;
  margin: 24px 0;
`;

export const Spacer = styled.span`
  flex: 1 1 auto;
`;

export const ReferenceNumberContainer = styled.section`
  display: flex;
  flex-direction: row;
  min-height: 60px;
  padding: 10px 15px;
  font-size: 16px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background: #f0f0f0;
  border-radius: 5px;
`;
