import * as React from 'react';
import { CSSTransition } from 'react-transition-group';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loading from 'app/components/Loading';
import Button from 'app/components/Elements/Button';
import Title from 'app/components/Elements/Title';
import { H4, Paragraph } from 'app/components/Typography';
import IconButton from 'app/components/Elements/IconButton';
import CircleIndicator from 'app/components/Elements/CircleIndicator';

import Wrapper from './Wrapper';
import Actions from './Action';

type MessageProps = {
  /**
   * Shows either a success or error message
   */
  status?: 'success' | 'error';
  /**
   * Message Header
   */
  heading?: string | React.ReactNode;
  /**
   * Message body
   */
  body?: string | React.ReactNode;
};

/** Common Props that have no dependency on other props */
type CommonProps = {
  /**
   * Pass a true/false value to show the modal
   */
  show: boolean;
  /**
   * If defined renders an OK button with primary color
   * @default 'undefined'
   */
  onClick?: () => void;
  /**
   * Ok text
   * @default 'Ok'
   */
  okText?: string;
  /**
   * If defined renders a Cancel button with secondary color
   * @default 'undefined'
   */
  onClose?: () => void;
  /**
   * Cancel Text
   * @default 'Cancel'
   */
  cancelText?: string;
  /**
   * Define the color of the cancel button
   * @default 'secondary'
   */
  cancelColor?: 'secondary' | 'danger';
  /**
   * If defined, will render an X button on the top right corner
   */
  onCloseButton?: () => void;
  /**
   * Title Text
   * If this is defined, will render a title text
   * @default 'undefined'
   */
  title?: string;
  /**
   * If message is defined, will ignore children and title
   */
  message?: MessageProps | undefined;
  /**
   * Modal Size
   * This is the max width of the modal
   * @default 'medium'
   */
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  /**
   * Show a loading icon
   */
  loading?: boolean;
  /**
   * Render the child content with no padding
   */
  noPadding?: boolean;
};

type ModalProps = CommonProps & React.HTMLAttributes<HTMLElement>;

/**
 * Modal Components
 * @typedef CommonProps
 */
export default function Modal({
  show,
  onClose,
  cancelText,
  cancelColor,
  message,
  onClick,
  okText,
  onCloseButton,
  title,
  size,
  children,
  loading,
  noPadding,
}: ModalProps) {
  const nodeRef = React.useRef(null);
  let hasMessage = false;
  let buttons: boolean = false;
  let okButton: React.ReactNode | undefined;
  let cancelButton: React.ReactNode | undefined;

  if (message && Object.keys(message).length > 0) {
    hasMessage = true;
  }

  if (onClick) {
    buttons = true;
    okButton = (
      <Button
        onClick={onClick}
        variant="contained"
        color="primary"
        size="large"
        fullWidth={hasMessage}
      >
        {okText || 'Ok'}
      </Button>
    );
  }

  if (!hasMessage && onClose) {
    buttons = true;
    cancelButton = (
      <Button
        onClick={onClose}
        variant="outlined"
        color={cancelColor || 'danger'}
        size="large"
      >
        {cancelText || 'Cancel'}
      </Button>
    );
  }

  return (
    <CSSTransition
      in={show}
      timeout={500}
      classNames="dialog"
      nodeRef={nodeRef}
      mountOnEnter
      unmountOnExit
    >
      <Wrapper
        ref={nodeRef}
        size={size || undefined}
        noPadding={noPadding || undefined}
      >
        <div className="dialog-child">
          {loading && <Loading position="absolute" />}
          {!hasMessage && title && <Title text={title} border />}
          {onCloseButton && (
            <IconButton
              onClick={onCloseButton}
              size="small"
              className="dialog-close"
            >
              <FontAwesomeIcon icon="times" />
            </IconButton>
          )}
          <div
            className={hasMessage ? 'dialog-content center' : 'dialog-content'}
          >
            {hasMessage && (
              <>
                {message?.status === 'success' ? (
                  <CircleIndicator size="medium" color="primary">
                    <FontAwesomeIcon icon="check" />
                  </CircleIndicator>
                ) : (
                  <CircleIndicator size="medium" color="danger">
                    <FontAwesomeIcon icon="times" />
                  </CircleIndicator>
                )}
                <H4 align="center" margin="10px 0 10px">
                  {message?.heading || ''}
                </H4>
                <Paragraph margin="0 0 5px" align="center">
                  {message?.body || ''}
                </Paragraph>
              </>
            )}
            {!hasMessage && children && React.Children.toArray(children)}
          </div>
          {buttons && (
            <Actions align={hasMessage ? 'center' : 'flex-end'}>
              {cancelButton}&nbsp;{okButton}
            </Actions>
          )}
        </div>
      </Wrapper>
    </CSSTransition>
  );
}
