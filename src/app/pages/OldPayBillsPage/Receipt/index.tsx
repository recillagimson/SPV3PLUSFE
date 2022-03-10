import * as React from 'react';

import { ComponentProps } from './types';

import AccountAmount from './AccountAmount';
import Meralco from './Meralco';
import PruLife from './PruLife';
import Smart from './Smart';
import RFID from './RFID';
import SkyCable from './SkyCable';
import CreditCards from './CreditCards';
import ETrip from './ETrip';
import PLDT from './PLDT';
import HomeCredit from './HomeCredit';
import Converge from './Converge';
import Ineco from './Ineco';

export default function RenderReceipt({ billerCode, data }: ComponentProps) {
  return (
    <>
      {billerCode === 'MECOR' && <Meralco data={data} />}
      {billerCode === 'PRULI' && <PruLife data={data} />}
      {billerCode === 'ASLNK' && <PruLife data={data} />}
      {billerCode === 'MWCOM' && <AccountAmount data={data} />}
      {billerCode === 'MWSIN' && <AccountAmount data={data} />}
      {billerCode === 'ETRIP' && <AccountAmount data={data} />}
      {billerCode === 'SMART' && <Smart data={data} />}
      {billerCode === 'RFID1' && <RFID data={data} />}
      {billerCode === 'ETRIP' && <ETrip data={data} />}
      {billerCode === 'SKY01' && <SkyCable data={data} />}
      {billerCode === 'MBCCC' && <CreditCards data={data} />}
      {billerCode === 'BPI00' && <CreditCards data={data} />}
      {billerCode === 'UNBNK' && <CreditCards data={data} />}
      {billerCode === 'BNKRD' && <AccountAmount data={data} />}
      {billerCode === 'BNKD1' && <AccountAmount data={data} />}
      {billerCode === 'MECOP' && <AccountAmount data={data} />}
      {billerCode === 'PLDT6' && <PLDT data={data} />}
      {billerCode === 'HCPHL' && <HomeCredit data={data} />}
      {billerCode === 'CNVRG' && <Converge data={data} />}
      {billerCode === 'INEC1' && <Ineco data={data} />}
      {billerCode === 'VIECO' && <AccountAmount data={data} />}
      {billerCode === 'DVOLT' && <AccountAmount data={data} />}
    </>
  );
}
