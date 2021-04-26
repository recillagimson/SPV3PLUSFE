/**
 * Basic style that looks like a button
 * Extend this style for use in <button> and <a> tags
 * @prop {string}   color       defined button color one of ('default' | 'primary' | 'secondary' | 'danger') default: 'default'
 * @prop {string}   size        button size one of ('small' | 'medium' | 'large') default: 'medium'
 * @prop {string}   variant     the variant of the design one of ('contained' | 'outlined' | 'default') default: 'default'
 * @prop {boolean}  fullWidth   render a full width button style
 *
 * any props that is passed down will be the elements html valid attributes
 */
import { css } from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

type Props = {
  color?: 'default' | 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  variant?: 'contained' | 'outlined' | 'default';
  fullWidth?: boolean;
};

const defaultstyle = css<Props>`
  background-color: ${StyleConstants.WHITE};

  ${p =>
    p.color === 'primary' &&
    `
    color: ${StyleConstants.BUTTONS.primary.main};

    &:focus,
    &:hover {
      color: ${StyleConstants.BUTTONS.primary.dark};
    }
  `};
  ${p =>
    p.color === 'secondary' &&
    `
    color: ${StyleConstants.BUTTONS.secondary.main};

    &:focus,
    &:hover {
      color: ${StyleConstants.BUTTONS.secondary.dark};
    }
  `};

  ${p =>
    p.color === 'danger' &&
    `
    color: ${StyleConstants.BUTTONS.danger.main};

    &:focus,
    &:hover {
      color: ${StyleConstants.BUTTONS.danger.dark};
    }
  `};
  ${p =>
    (!p.color || p.color === 'default') &&
    `
    color: ${StyleConstants.BUTTONS.neutral.main};

    &:focus,
    &:hover {
      color: ${StyleConstants.BUTTONS.neutral.dark};
    }
  `};
`;

const contained = css<Props>`
  ${p =>
    p.color === 'primary' &&
    `
    background-color: ${StyleConstants.BUTTONS.primary.main};
    color: ${StyleConstants.BUTTONS.primary.textColor};

    &:focus,
    &:hover {
      background-color: ${StyleConstants.BUTTONS.primary.dark};
    }
  `};
  ${p =>
    p.color === 'secondary' &&
    `
    background-color: ${StyleConstants.BUTTONS.secondary.main};
    color: ${StyleConstants.WHITE};

    &:focus,
    &:hover {
      background-color: ${StyleConstants.BUTTONS.secondary.dark};
    }
  `};

  ${p =>
    p.color === 'danger' &&
    `
    background-color: ${StyleConstants.BUTTONS.danger.main};
    color: ${StyleConstants.WHITE};

    &:focus,
    &:hover {
      background-color: ${StyleConstants.BUTTONS.danger.dark};
    }
  `};
  ${p =>
    (!p.color || p.color === 'default') &&
    `
    background-color: ${StyleConstants.BUTTONS.neutral.main};
    color: ${StyleConstants.BUTTONS.neutral.textColor};

    &:focus,
    &:hover {
      background-color: ${StyleConstants.BUTTONS.neutral.dark};
    }
  `};
`;

const outlined = css<Props>`
  background-color: ${StyleConstants.WHITE};

  ${p =>
    p.color === 'primary' &&
    `
    border-color: ${StyleConstants.BUTTONS.primary.main};
    color: ${StyleConstants.BUTTONS.mainTextColor};

    &:focus,
    &:hover {
      border-color: ${StyleConstants.BUTTONS.primary.dark};
    }
  `};
  ${p =>
    p.color === 'secondary' &&
    `
    border-color: ${StyleConstants.BUTTONS.secondary.main};
    color: ${StyleConstants.BUTTONS.mainTextColor};

    &:focus,
    &:hover {
      border-color: ${StyleConstants.BUTTONS.secondary.dark};
    }
  `};

  ${p =>
    p.color === 'danger' &&
    `
    border-color: ${StyleConstants.BUTTONS.danger.main};
    color: ${StyleConstants.BUTTONS.danger.main};

    &:focus,
    &:hover {
      border-color: ${StyleConstants.BUTTONS.danger.dark};
      color: ${StyleConstants.BUTTONS.danger.dark};
    }
  `};
  ${p =>
    (!p.color || p.color === 'default') &&
    `
    border-color: ${StyleConstants.BUTTONS.neutral.main};
    color: ${StyleConstants.BUTTONS.mainTextColor};

    &:focus,
    &:hover {
      border-color: ${StyleConstants.BUTTONS.neutral.dark};
    }
  `};
`;

const ButtonStyle = css<Props>`
  border: 1px solid transparent;
  text-decoration: none;
  text-align: center;
  outline: 0;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  border-radius: ${StyleConstants.BUTTON_RADIUS};
  width: ${p => (p.fullWidth ? '100%' : 'auto')};
  display: inline-block;

  ${p =>
    p.size === 'small' &&
    `
    padding: 6px 12px;
    font-size: 0.8rem;
  `}

  ${p =>
    (!p.size || p.size === 'medium') &&
    `
    padding: 8px 15px;
    font-size: 0.9rem;
  `}

  ${p =>
    p.size === 'large' &&
    `
    padding: 13px 20px;
  `}

  ${p => p.variant === 'contained' && contained};
  ${p => p.variant === 'outlined' && outlined};
  ${p => (!p.variant || p.variant === 'default') && defaultstyle};

  .svg-inline--fa {
    margin: 0 3px;
  }
`;

export default ButtonStyle;
