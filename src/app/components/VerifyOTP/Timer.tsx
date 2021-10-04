import * as React from 'react';
import Span from 'app/components/Elements/Span';

type TimerProps = {
  /**
   * Callback when countdown reach 0
   */
  onStop: () => void;
  /**
   * Countdown
   */
  count: number;
  /**
   * Start the countdown
   */
  start: boolean;
  /**
   * Timer Interval
   * @default 1000 (1sec)
   */
  interval?: number;
  /**
   * Steps to deduct from the countdown
   * @default 1
   */
  step?: number;
};
export default function Timer({
  count,
  start,
  interval = 1000,
  step = 1,
  onStop,
}: TimerProps) {
  const [countdown, setCountdown] = React.useState(count);

  React.useEffect(() => {
    setTimeout(() => {
      setCountdown(countdown - step);
    }, interval);

    if (countdown === 0) {
      onStop();
    }
  }, [countdown, interval, onStop, start, step]);

  return (
    <Span
      color="primary"
      style={{ width: 20, textAlign: 'center', display: 'inline-block' }}
    >
      {countdown}
    </Span>
  );
}
