import styled from 'styled-components';
import { StyleConstants } from 'styles/StyleConstants';

export const TransactionDetailsWrapper = styled.div`
  width: 100%;
  box-shadow: 0px 12px 15px rgba(140, 152, 164, 0.1);
  margin: 0 auto;
  position: relative;
`;

export const TransactionDetailsWrapperContent = styled.div`
  background: #faedab;
  padding: 20px;
  margin: 24px 0px 10px;

  h6 {
    font-size: 14px;
    font-weight: 600;
    line-height: 21px;
    margin: 0 auto;
    text-align: center;
  }
`;

export const TransactionDetailsList = styled.ul`
  margin: 20px 0;
  list-style: none;
  padding: 0;
  min-height: unset;
`;

export const TransactionDetailsListItem = styled.li`
  align-items: center;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    margin: 0;

    &:last-child {
      flex: 1;
      font-weight: 600;
      text-align: right;
      padding-left: 10px;
    }
  }
`;

export const CuttedImageWrapper = styled.img`
  &:first-child {
    position: absolute;
    top: -7px;
    width: 100%;
  }

  &:last-child {
    position: absolute;
    bottom: -7px;
    width: 100%;
  }
`;

export const PaddingWrapper = styled.div`
  padding: 20px;
  text-align: center;

  h3,
  p {
    text-align: left;
  }

  h3 {
    font-size: 18px;
    font-weight: 400;
    line-height: 27px;
    margin: 0 0 15px;
  }

  p {
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    margin: 0 0 70px;
  }

  button {
    margin: 50px 0 0;
  }
`;

export const StepsTitleWrapper = styled.div`
  background: #fff;
  padding: 10px 20px;
  border-radius: 12px;
`;

export const StepsTitleWrapperContent = styled.div<{ margin?: string }>`
  border-bottom: 1px solid lightgray;
  margin: ${p => (p.margin ? p.margin : '4px 0px 0px')};
`;

export const StepsWrapper = styled.div<{ large?: boolean }>`
  display: flex;
  align-items: center;
  margin: ${p => (p.large ? '20px 0' : '10px 0')};
`;

export const StepsWrapperContent = styled.div`
  margin: 0 0 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const NoteWrapper = styled.div`
  padding: 10px;
  background: #f0f0f0;
  margin: 0 0 20px;
  border-radius: 6px;
`;

export const ReferenceWrapper = styled.div`
  padding: 10px;
  background: ${StyleConstants.color.paleyellow2};
  color: ${StyleConstants.color.primaryyellow};
  margin: 0 0 4px;
  border-radius: 12px;
`;
