/**
 * This component will display an Primary ID list and Upload component
 * @prop {function} onSuccess     callback when user successfully uploaded an id
 */
import * as React from 'react';

import Box from 'app/components/Box';
import H5 from 'app/components/Elements/H5';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function PrimaryIDsComponent() {
  return (
    <Box title="Choose a Primary ID" titleBorder>
      <H5>
        <FontAwesomeIcon icon="id-card" />
        Primary ID
      </H5>
    </Box>
  );
}
