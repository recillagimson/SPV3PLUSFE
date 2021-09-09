type TypographyProps = {
  margin?: string;
  padding?: string;
  align?: 'left' | 'right' | 'center';
  weight?: 'bold' | 'bolder' | 'light' | 'lighter' | 'regular';
  underline?: boolean;
  strikethrough?: boolean;
  size?: 'xsmall' | 'small' | 'regular';
  italic?: boolean;
  color?: 'primary' | 'secondary' | 'mute' | 'danger' | 'success';
};

export default TypographyProps;
