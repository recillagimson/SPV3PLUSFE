import styled, { css } from 'styled-components/macro';

import { StyleConstants } from 'styles/StyleConstants';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > .bayad-center {
    margin-top: 20px;
    width: 100px;
  }
`;

export const ContainerTitle = styled.section`
  color: #38434d;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  text-transform: capitalize;
  margin: 0;
`;

export const Wrapper = styled.section<{
  isBoolean?: boolean;
}>`
  background: ${StyleConstants.WHITE};
  border-radius: 10px;
  width: 100%;
  margin: 0 auto;

  ${({ isBoolean }) =>
    !isBoolean &&
    css`
      outline: none;
      cursor: default;
    `}
`;

export const WrapperHeader = styled.div<{
  isCustom?: boolean;
}>`
  padding: 20px;
  border-bottom: 1px solid ${StyleConstants.LIGHT_BORDER_COLOR};

  ${({ isCustom }) =>
    isCustom &&
    css`
      display: flex;
      justify-content: space-between;
      align-items: center;

      input {
        width: 300px;
      }
    `}
`;

export const WrapperContent = styled.div`
  padding: 20px;

  .title {
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    color: ${StyleConstants.MAIN_TEXT};
    margin: 0 0 25px;
  }
`;

export const BillersOptions = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: row;
`;

export const BillerOptionsItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  width: 100px; // For 9 columns 2 rows biller options
  transition: opacity 0.3ms ease-in;

  img {
    display: block;
    height: 50px;
  }

  p {
    color: ${StyleConstants.LABEL_TEXT};
    font-size: 12px;
    line-height: 18px;
    font-weight: 400;
    margin: 0 0 15px;
  }

  &:hover {
    opacity: 0.85;
  }
`;

export const BillersList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const BillersListItem = styled.li`
  border: 1px solid #efefef;
  border-radius: 10px;
  cursor: pointer;
  padding: 15px;
  margin-bottom: 15px;

  display: flex;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }

  img {
    width: 100px;
    margin-right: 20px;
  }

  p {
    color: ${StyleConstants.LABEL_TEXT};
    font-size: 12px;
    line-height: 18px;
    font-weight: 400;
    margin: 0;
    text-transform: capitalize;
  }
`;

export const FormWrapper = styled.form`
  margin: 20px 0;
`;

export const FormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 50px;

  button {
    margin-right: 10px;
    width: 150px;

    &::last-child {
      margin-right: 0;
    }
  }
`;

export const FieldSubtext = styled.span`
  font-size: 12px;
  font-weight: 400;
  font-style: normal;
  line-height: 18px;
`;

export const ReviewContainer = styled.div<{
  width?: string;
}>`
  margin: 0 auto;
  text-align: center;

  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}

  .review-title {
    color: #38434d;
    font-size: 24px;
    font-weight: 600;
    line-height: 36px;
    text-align: center;
  }

  .mecor-message {
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    margin: 0 0 25px;
  }
`;

export const ReviewTotal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 40px 0 0;
  width: 100%;

  .bayad-center {
    width: 100px;
  }

  p {
    margin: 0;
    text-align: center;
  }

  .total-description,
  .service-fees,
  .other-fees {
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
    line-height: 21px;
  }

  .other-fees {
    margin-bottom: 30px;
  }

  .total-amount {
    color: #38434d;
    font-size: 18px;
    font-weight: 800;
    line-height: 30px;
    margin: 5px 0 10px;
  }

  button {
    width: 200px;
    margin: 40px auto 0;
  }
`;

export const ReviewListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
    line-height: 21px;
    margin: 0;

    &:first-child {
      margin-right: 5px;
    }
  }
`;

export const DetailsWrapper = styled.div<{
  padding?: string;
}>`
  ${({ padding }) =>
    padding &&
    css`
      padding: ${padding};
    `}
`;

export const ConfirmationMessage = styled.p`
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  line-height: 21px;
  margin: 10px 0 0;
`;

export const SuccessWrapper = styled.div`
  box-shadow: 0px 12px 15px rgba(140, 152, 164, 0.1);
  margin: 10px auto 20px;
  position: relative;
  background: #faedab;
  padding: 20px;

  display: flex;
  align-items: center;
  flex-direction: column;

  .success-message {
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    margin-top: 20px;
  }

  .date {
    font-size: 12px;
    font-weight: 400;
    font-style: normal;
    line-height: 18px;
    margin: 5px 0;
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

export const NoteWrapper = styled.div`
  margin-top: 40px;

  p {
    font-size: 12px;
    font-weight: normal;
    margin: 0;

    span {
      color: ${StyleConstants.LABEL_TEXT};
      margin-left: 5px;
    }
  }

  .important {
    color: ${StyleConstants.NEGATIVE};
    margin-bottom: 20px;
  }
`;

export const DialogActions = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    margin-top: 20px;

    &[color='primary'] {
      margin-right: 20px;
    }
  }
`;

export const DisconnectionMessage = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
`;

export const PayBillCTAContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  img {
    width: 100px;
  }

  button {
    margin-top: 20px;
  }
`;

// added by habs
export const Biller = styled.div`
  border: 1px solid ${StyleConstants.borderColor};
  border-radius: ${StyleConstants.radius.medium};
  padding: ${StyleConstants.spacing[12]} ${StyleConstants.spacing[16]};
  margin-bottom: ${StyleConstants.spacing[12]};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 79px;
  font-size: 0.85rem;

  &[role='button'] {
    cursor: pointer;

    &:hover {
      border-color: ${StyleConstants.color.gray3};
    }
  }

  .biller-img {
    display: inline-block;
    margin-right: 12px;
    width: 70px;
    text-align: center;

    img {
      max-height: 50px;
    }
  }
`;

export const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  border: 0;
  background-color: transparent;
  padding: 4px;
  width: 95px;
  margin: 0 1px 12px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  color: inherit;
  border-radius: ${StyleConstants.radius.small};

  img {
    width: auto;
    height: 48px;
  }

  span {
    font-size: 0.8rem;
    padding-bottom: 4px;
  }

  &:hover {
    background-color: ${StyleConstants.color.tones.mute};
  }
`;
