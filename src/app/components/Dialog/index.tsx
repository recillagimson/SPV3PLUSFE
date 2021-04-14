/**
 * Dialog Component
 * @prop  {string}    size        Dialog size oneOf 'small' | 'medium' | 'large' | 'xlarge' | undefined
 * @prop  {boolean}   show        show/hide dialog
 * @prop  {string}    title       Dialog title
 * @prop  {function}  onClick     function callback for OK button, if not defined, will not show the button
 * @prop  {function}  onClose     function callback for Cancel button, if not defined, will not show the button
 * @prop  {string}    okText      text for the OK button, default: OK
 * @prop  {string}    cancelText  text for the cancel button, default: CANCEL
 * @prop  {string}    message     message body, if defined will show the message, OPTIONAL
 * @prop  {node}      children    if message is not defined, children will be the default, this will be overwritter by message, define only one of them
 */
import * as React from 'react';
import { CSSTransition } from 'react-transition-group';

import Button from 'app/components/Elements/Button';

import Wrapper from './Wrapper';
import Title from './Title';
import Actions from './Action';

type Props = {
  size?: 'small' | 'medium' | 'large' | 'xlarge' | undefined;
  show: boolean;
  title?: string;
  message?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  onClose?: () => void;
  okText?: string;
  cancelText?: string;
};

export default function DialogComponent({
  size,
  show,
  title,
  message,
  children,
  okText,
  cancelText,
  onClick,
  onClose,
}: Props) {
  const nodeRef = React.useRef(null);
  let buttons: boolean = false;
  let okButton: React.ReactNode | undefined;
  let cancelButton: React.ReactNode | undefined;

  if (onClick) {
    buttons = true;
    okButton = (
      <Button
        onClick={onClick}
        color="primary"
        size="medium"
        variant="contained"
      >
        {okText || 'OK'}
      </Button>
    );
  }

  if (onClose) {
    buttons = true;
    cancelButton = (
      <Button onClick={onClose} size="medium" variant="contained">
        {cancelText || 'CANCEL'}
      </Button>
    );
  }

  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames="dialog"
      nodeRef={nodeRef}
      mountOnEnter
      unmountOnExit
    >
      <Wrapper ref={nodeRef} size={size || undefined}>
        <div className="dialog-child">
          {title && <Title>{title}</Title>}
          <div className="dialog-content">
            {message && <p>{message}</p>}
            {(!message || message === '') &&
              children &&
              React.Children.toArray(children)}
          </div>
          {buttons && (
            <Actions>
              {okButton} {cancelButton}
            </Actions>
          )}
        </div>
      </Wrapper>
    </CSSTransition>
  );
}
