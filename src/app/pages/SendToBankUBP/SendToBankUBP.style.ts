import styled, { css } from 'styled-components';
import { StyleConstants } from 'styles/StyleConstants';

export const BodyWrapper = styled.section`
  padding: 24px;
  min-height: 348px;
`;

export const OTPWrapper = styled.div<{
  display?: string;
  alignment?: string;
  direction?: string;
  justify?: string;
  margin?: string;
  width?: string;
}>`
  margin: 20px;

  ${({ display }) =>
    display &&
    css`
      display: ${display};
    `}

  ${({ alignment }) =>
    alignment &&
    css`
      align-items: ${alignment};
    `}
	
	${({ justify }) =>
    justify &&
    css`
      justify-content: ${justify};
    `}

	${({ direction }) =>
    direction &&
    css`
      flex-direction: ${direction};
    `}

  ${({ margin }) =>
    margin &&
    css`
      margin: ${margin};
    `}

  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}

  .pin-input {
    margin: 0 0 5px;

    input {
      border-radius: ${StyleConstants.BUTTON_RADIUS};
      background-color: ${StyleConstants.GRAY_BG};
      appearance: textfield;
      border: 1px solid transparent;
      margin: 2px 5px;
      font-size: 1.25rem;
      width: 50px;
      height: 50px;
      text-align: center;
      outline: 0;

      &:hover,
      &:focus {
        border-color: ${StyleConstants.GOLD};
      }

      &[data-valid='false'] {
        background-color: transparent;
        color: ${StyleConstants.BUTTONS.danger.main};
        border-color: ${StyleConstants.BUTTONS.danger.main};
      }
    }
  }

  .pin-description {
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    margin: 10px 0;
  }

  .resend-code {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    margin-top: 20px;

    span {
      color: ${StyleConstants.GOLD};
      cursor: pointer;
    }
  }
`;

export const ConfirmationMessage = styled.p`
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  line-height: 21px;
  margin: 10px 0 0;
`;

export const TransferButtonWrapper = styled.section`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;

  > * {
    max-width: 382px;
  }
`;

export const ContentImage = styled.img<{
  margin?: string;
}>`
  max-width: 100%;

  ${({ margin }) =>
    margin &&
    css`
      margin: ${margin};
    `}
`;

export const ReviewContainer = styled.div`
  margin: auto auto;
  max-width: 340px;
  width: 100%;
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

export const ReviewTotal = styled.div`
  margin: 40px 0 0;
  width: 100%;

  p {
    margin: 0;
    text-align: center;
  }

  .total-description,
  .service-fee {
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
    line-height: 21px;
  }

  .total-amount {
    font-size: 18px;
    font-weight: 800;
    line-height: 27px;
    margin: 10px 0;
  }

  .service-fee {
    margin-bottom: 40px;
  }

  button {
    margin: 40px 0 0;
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
    width: 49%;

    &:last-child {
      text-align: right;
    }
  }
`;

export const TotalAmountWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-block-start: 65px;
  margin-block-end: 97px;
`;

export const TotalAmountTitle = styled.p`
  margin-block-end: 8px;
  padding: 0;
  font-size: 14px;
  line-height: 21px;
  font-weight: 400;
  text-align: center;
`;

export const TotalAmountValue = styled.p`
  margin: 0;
  padding: 0;
  font-weight: 400;
  font-size: 18px;
  text-align: center;
  line-height: 27px;
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

export const ImageLogoWrapper = styled.img`
  width: 225px !important;
  /* margin-inline: -35px; */
  margin-block-end: 15px;
  height: auto;
`;

interface LogoSectionProps {
  justifyContent?: string;
}

export const LogoSection = styled.section<LogoSectionProps>`
  display: flex;
  width: 100%;
  justify-content: ${({ justifyContent }) => justifyContent};
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
