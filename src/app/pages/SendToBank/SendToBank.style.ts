import styled, { css } from 'styled-components';

export const Wrapper = styled.div<{
  display?: string;
  alignment?: string;
  direction?: string;
  justify?: string;
  margin?: string;
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

export const CTAWrapper = styled.div`
  display: flex;
`;

export const SendCTA = styled.div<{
  isBoolean?: boolean;
}>`
  background: #fff;
  border: 1px solid #f3f4f9;
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;
  margin-right: 30px;
  height: 250px;
  width: 400px;

  display: flex;
  justify-content: space-between;
`;

export const SendCTAContent = styled.div`
  padding: 20px;
`;

export const CTAList = styled.ul`
  padding: 0;
  margin: 20px 0 0;
  list-style: none;
`;

export const CTAListItem = styled.li`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  margin-bottom: 5px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SendCTALogo = styled.div`
  background: #e0ac3b;
  border-radius: 0px 10px 10px 0px;
  padding: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    color: #fff;
  }
`;

export const BankIcons = styled.img`
  cursor: pointer;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
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

export const ReviewContainer = styled.div`
  width: 380px;
  margin: 0 auto;
`;

export const ReviewTotal = styled.div`
  margin: 40px 0 0;
  
  p {
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
    line-height: 21px;
    margin: 0;
    text-align: center;

    &:nth-child(2) {
      font-size: 18px;
      font-weight: 800;
      line-height: 27px;
      margin: 10px 0 40px;
    }
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
  }
`;
