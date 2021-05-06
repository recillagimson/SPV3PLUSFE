/**
 * Box component on every content in our page
 * NOTE: refer to UI design in figma
 *       this component renders a UI of the white boxes containers
 *
 * @prop {string}     title           Title for the box
 * @prop {boolean}    titleBorder     show or hide bottom border in the title area
 * @prop {ReactNode}  titleAction     Buttons together with the title bar ie: <Box title="Sample" titleAction={<Button><FontAwesomeIcon icon="ellipsis" /></Button>}>Children</Box>
 * @prop {ReactNode}  children        This are the children inside this component wrapper ie: <Box>children</Box>
 * @prop {ReactNode}  footer          buttons to show in the footer
 * @prop {boolean}    footerBorder    show or hide top border in the footer area
 * @prop {boolean}    withPadding     If defined, will set a padding to the children wrapper
 *
 * Sample Usage:
 * <Box title="Sample Title" titleBorder={true} footer={<> <Button>Button1</Button> <Button>Button2</Button></>} footerBorder={false} withPadding>
 *   <div className="this-maybe-your-wrapping-element-in-children">
 *     <p>you may put a padding in your wrapping element for the children nodes</p>
 *     <p>this will be the children</p>
 *     <form>or this</form>
 *     <div>or this</div>
 *     <div>or any other valid html tags</div>
 *     <H1>you may also have styled-components as children</H1>
 *   </div>
 * </Box>
 */
import * as React from 'react';

import Wrapper from './Wrapper';
import Title from './Title';
import Footer from './Footer';

type BoxProps = {
  title?: string;
  titleBorder?: boolean;
  titleAction?: React.ReactNode;
  children: React.ReactNode | React.ReactNodeArray;
  footer?: React.ReactNode;
  footerBorder?: boolean;
  footerAlign?: 'left' | 'right' | 'center' | undefined;
  withPadding?: boolean;
};

export default function BoxComponent({
  title,
  titleBorder,
  titleAction,
  children,
  footer,
  footerBorder,
  footerAlign,
  withPadding,
}: BoxProps) {
  let showTitle = false;
  if (title && title !== '') {
    showTitle = true;
  }
  if (titleAction && React.isValidElement(titleAction)) {
    showTitle = true;
  }

  return (
    <Wrapper pad={withPadding}>
      {showTitle && (
        <Title
          border={titleBorder || undefined}
          hasbutton={Boolean(titleAction) || undefined}
        >
          {title ? <span className="bt-text">{title}</span> : ''} {titleAction}
        </Title>
      )}
      <div className="bt-child">{React.Children.toArray(children)}</div>
      {footer && React.isValidElement(footer) && (
        <Footer
          border={footerBorder || undefined}
          align={footerAlign || undefined}
        >
          {footer}
        </Footer>
      )}
    </Wrapper>
  );
}
