/**
 * Basic style that looks like a button
 * Extend this style for use in <button> and <a> tags
 */
import { css } from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

type Props = {
  primary?: boolean;
  secondary?: boolean;
};

const ButtonStyle = css<Props>`
  border: 0;
  text-decoration: none;
  text-align: center;
  transition: outline 0.2s ease-in-out;
  outline: 1px solid transparent;
  padding: 15px;
  border-radius: ${StyleConstants.BORDER_RADIUS};
  transition: all 0.2s ease;
  color: #fff;
  cursor: pointer;
  width: 100%;
  font-size: inherit;

  ${p =>
    p.primary &&
    `
    background-color: ${StyleConstants.GOLD};
  `};
  ${p =>
    p.secondary &&
    `
    background-color: ${StyleConstants.BLACK};
  `};

  &:hover {
    ${p =>
      p.primary &&
      `
      background-color: ${StyleConstants.LINK_TEXT_GOLD_HOVER};
    `};
    ${p =>
      p.secondary &&
      `
      background-color: #000;
    `};
  }

  &:focus {
    ${p =>
      p.primary &&
      `
      outline-color ${StyleConstants.WHITE};
      background-color: ${StyleConstants.LINK_TEXT_GOLD_HOVER};
    `};
    ${p =>
      p.secondary &&
      `
      outline-color: ${StyleConstants.GOLD};
      background-color: #000;
    `};
  }
`;

export default ButtonStyle;
