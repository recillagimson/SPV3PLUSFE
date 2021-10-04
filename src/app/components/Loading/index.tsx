/**
 * Loading Page
 * @prop {string}   position      CSS position value, default: relative
 * @prop {boolean}  big           Used for page loading, will have a big size default: false
 */
import * as React from 'react';
import Lottie from 'react-lottie-player/dist/LottiePlayerLight';

import Wrapper from './Wrapper';
import loadingWhite from './loading_white.json';
import loadingBlack from './loading_black.json';

type Props = {
  position?: string;
  big?: boolean;
  invert?: boolean;
};

export default function Loading(props: Props) {
  let size = props.big ? '180px' : '120px';
  let src = props.invert ? loadingWhite : loadingBlack;
  const [animationData, setAnimationData] = React.useState<any>(false);

  React.useEffect(() => {
    import(`./loading_black.json`).then(setAnimationData);
    return () => {
      setAnimationData(false);
    };
  }, []);

  return (
    <Wrapper
      position={props.position || 'relative'}
      big={props.big || undefined}
      invert={props.invert || undefined}
    >
      {animationData && (
        <Lottie
          play
          loop
          animationData={src}
          style={{
            width: size,
            height: size,
          }}
        />
      )}
    </Wrapper>
  );
}
