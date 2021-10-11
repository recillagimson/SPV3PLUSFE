/**
 * Loading Page
 * @prop {string}   position      CSS position value, default: relative
 * @prop {boolean}  big           Used for page loading, will have a big size default: false
 */
import * as React from 'react';

import Wrapper from './Wrapper';
import loading from './loading_light.gif';
import loadingDark from './loading_dark.gif';

type Props = {
  position?: string;
  big?: boolean;
  invert?: boolean;
};

function Loading(props: Props) {
  return (
    <Wrapper
      id="loadingIndicator"
      position={props.position || 'relative'}
      big={props.big || undefined}
      invert={props.invert || undefined}
    >
      <img src={props.invert ? loading : loadingDark} alt="" />
    </Wrapper>
  );
}

export default Loading;
