import * as React from 'react';
import CircleIndicator from 'app/components/Elements/CircleIndicator';

/**
 * Biller logo
 * NOTE: this component will check if the path to the logo is accessible.
 * @param biller      Biller name
 * @param path        image path
 * @param ...rest     rest of valid props for image tag
 * @returns ReactComponent
 */
export default function BillerLogo({
  biller,
  path,
  size,
  ...rest
}: {
  biller: string;
  path: string;
  size?: 'small' | 'medium' | 'large' | undefined;
  [name: string]: any;
}) {
  const [isAccessible, setIsAccessible] = React.useState(true);

  const onImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsAccessible(false);
    e.currentTarget.onerror = null; // remove the onerror event to prevent loop
  };

  return isAccessible ? (
    <img src={path} alt={biller} {...rest} onError={onImageError} />
  ) : (
    <CircleIndicator size={size ? size : 'medium'} color="primary">
      {biller ? biller.charAt(0) : 'SP'}
    </CircleIndicator>
  );
}
