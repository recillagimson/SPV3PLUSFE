import styled from 'styled-components/macro';

export const RatesContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

export const Rate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 0;

  :not(:last-of-type) {
    border-bottom: 1px solid #f3f4f9;
  }
`;

export const Spacer = styled.span`
  flex: 1 1 auto;
`;

export const CurrencyContainer = styled.span`
  display: flex;
  flex-direction: column;
`;

export const Currency = styled.p`
  color: #526372;
  font-size: 14px;
  margin: 0;
  line-height: 21px;
`;

export const CurrentFull = styled.p`
  color: #a9b1b8;
  font-size: 12px;
  margin: 0;
  line-height: 18px;
`;

export const Rates = styled.span`
  color: #526372;
  font-size: 14px;
  line-height: 21px;
`;
