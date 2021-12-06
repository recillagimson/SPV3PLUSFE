import * as React from 'react';

import AccountAmount from './AccountAmount';
import Meralco from './Meralco';
import PruLife from './PruLife';
import Smart from './Smart';
import RFID from './RFID';
import SkyCable from './SkyCable';

import { ComponentProps } from './types';

export default function RenderReceipt({ billerCode, data }: ComponentProps) {
  return (
    <>
      {billerCode === 'MECOR' && <Meralco data={data} />}
      {billerCode === 'PRULI' && <PruLife data={data} />}
      {billerCode === 'MWCOM' && <AccountAmount data={data} />}
      {billerCode === 'MWSIN' && <AccountAmount data={data} />}
      {billerCode === 'ETRIP' && <AccountAmount data={data} />}
      {billerCode === 'SMART' && <Smart data={data} />}
      {billerCode === 'RFID1' && <RFID data={data} />}
      {billerCode === 'SKY01' && <SkyCable data={data} />}
    </>
  );
}
