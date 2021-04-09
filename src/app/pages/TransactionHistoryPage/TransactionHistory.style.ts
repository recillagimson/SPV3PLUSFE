import styled, { css } from 'styled-components';

export const Wrapper = styled.section<{
	isBoolean?: boolean;
}>`
  background: #fff;
  border-radius: 10px;
  width: 930px;
  margin: 0 auto;

	${({ isBoolean }) =>
		!isBoolean &&
		css`
			outline: none;
			cursor: default;
		`}
`;

export const TransactionHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e7eaf2;

  h3 {
    margin: 0;
  }
`;

export const TransactionContent = styled.div`
  padding: 20px;

  h3 {
    margin: 0;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;

  button {
    margin-right: 12px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const TransactionTitle = styled.p`
  color: #000;
  margin: 24px 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

export const TransactionList = styled.ul`
  margin: 0;
  padding: 0;
`;

export const TransactionListItem = styled.li`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e7eaf3; 
  padding: 10px 0;
`;

export const ListContainer = styled.div``;

export const ListTitle = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

export const ListDescription = styled.p<{
	textAlign?: string;
}>`
  margin: 0;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;

  ${({ textAlign }) =>
		textAlign &&
		css`
      text-align: ${textAlign};
		`}
`;
