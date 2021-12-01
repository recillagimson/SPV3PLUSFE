import * as React from 'react';

import Box from 'app/components/Box';
import Paragraph from 'app/components/Elements/Paragraph';
import Flex from 'app/components/Elements/Flex';
import Button from 'app/components/Elements/Button';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';

import bayadLogo from 'app/components/Assets/paybills/bayad-partner.png';

export default function FormFields() {
  return (
    <>
      <Box title="Pay Bills" titleBorder withPadding>
        <form>
          <Field>
            <Input type="text" value="" placeholder="sample" />
          </Field>
        </form>
        <Paragraph size="xsmall">
          <span className="text-red">IMPORTANT NOTE:</span> To avoid
          inconvenience, please input the exact amount of your total billing
          amount due and settle before your due date Please review to ensure
          that the details are correct before you proceed.
        </Paragraph>
        <Flex alignItems="flex-start" justifyContent="flex-end">
          <Button onClick={() => {}} color="primary" variant="contained">
            Next
          </Button>
        </Flex>
      </Box>
      <img
        src={bayadLogo}
        alt="Bayad Partner"
        style={{ width: 95, display: 'block', margin: '0 auto' }}
      />
    </>
  );
}
