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

export const HelpCenterHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e7eaf2;

  h3 {
    margin: 0;
  }
`;

export const HelpCenterBack = styled.p`
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  margin: 0;
`;

export const HelpCenterContent = styled.div`
  padding: 20px;

  h3 {
    margin: 0;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    color: #38434d;
    font-size: 24px;
    font-weight: 600;
    line-height: 36px;
    margin: 0 0 20px;
  }
`;

export const SearchBar = styled.input`
  background: #ffffff;
  border: 1px solid #ced4da;
  box-sizing: border-box;
  border-radius: 5px;
  font-size: 16px;
  height: 50px;
  padding: 6px 12px;
  width: 100%;

  &:focus: {
    outline: 0;
  }
`;

export const List = styled.ul`
  margin: 30px 0 0;
  padding: 0;

  li {
    list-style: none;
  }
`;

export const ListItem = styled.li`
  border-bottom: 1px solid #f3f4f9;
  display: flex;
  justify-content: space-between;
  padding: 15px 0;

  svg {
    cursor: pointer;
  }

  &:first-child {
    border-top: 1px solid #f3f4f9;
  }
`;

export const ItemTitle = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin: 0;
`;

export const HelpCenterDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const HelpCenterTitleDescription = styled.h3`
  color: #38434d;
  font-size: 24px;
  font-weight: 600;
  line-height: 36px;
  margin: 0;
`;

export const HelpCenterDate = styled.span`
  color: #a9b1b8;
  font-size: 12px;
  font-weight: 400;
  line-height: 17px;
  margin: 0;
`;

export const HelpCenterDescription = styled.p`
  color: #526372;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin: 0;
`;
