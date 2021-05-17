/**
 * Card
 * @prop {string} title     Card Header Title
 * @prop {node}   children  child elements
 * @prop {node}   action    action buttons
 */
import * as React from 'react';
import Wrapper from './Wrapper';

type Props = {
  title?: string;
  children: any;
  footer?: any;
  size?: 'small' | 'medium';
};

export default function CardComponent({
  title,
  children,
  footer,
  size,
}: Props) {
  return (
    <Wrapper size={size}>
      {title && <div className="title">{title}</div>}
      <div className="body">{React.Children.toArray(children)}</div>
      {footer && <div className="footer">{footer}</div>}
    </Wrapper>
  );
}
