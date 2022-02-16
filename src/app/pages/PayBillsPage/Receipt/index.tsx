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
import PagIbigFund from './PagIbigFund';
import Cignal from './Cignal';
import SSSRealEstate from './SSSRealEstate';
import PagIbigFund3 from './PagIbigFund3';
import AngelesElectric from './AngelesElectric';
import PampangaElectric from './PampangaElectric';
import WorldVision from './WorldVision';
import NationalHouseAuthority from './NationalHouseAuthority';

export default function RenderReceipt({
  billerCode,
  data,
  formData,
}: ComponentProps) {
  console.log(billerCode);
  return (
    <>
      {billerCode === 'MECOR' && <Meralco data={data} formData={formData} />}
      {billerCode === 'PRULI' && <PruLife data={data} formData={formData} />}
      {billerCode === 'ASLNK' && <PruLife data={data} formData={formData} />}
      {billerCode === 'MWCOM' && (
        <AccountAmount data={data} formData={formData} />
      )}
      {billerCode === 'MWSIN' && (
        <AccountAmount data={data} formData={formData} />
      )}
      {billerCode === 'SMART' && <Smart data={data} formData={formData} />}
      {billerCode === 'RFID1' && <RFID data={data} formData={formData} />}
      {billerCode === 'ETRIP' && <ETrip data={data} formData={formData} />}
      {billerCode === 'SKY01' && <SkyCable data={data} formData={formData} />}
      {billerCode === 'MBCCC' && (
        <CreditCards data={data} formData={formData} />
      )}
      {billerCode === 'BPI00' && (
        <CreditCards data={data} formData={formData} />
      )}
      {billerCode === 'UNBNK' && (
        <CreditCards data={data} formData={formData} />
      )}
      {billerCode === 'BNKRD' && (
        <AccountAmount data={data} formData={formData} />
      )}
      {billerCode === 'BNKD1' && (
        <AccountAmount data={data} formData={formData} />
      )}
      {billerCode === 'MECOP' && (
        <AccountAmount data={data} formData={formData} />
      )}
      {billerCode === 'PLDT6' && <PLDT data={data} formData={formData} />}
      {billerCode === 'HCPHL' && <HomeCredit data={data} formData={formData} />}
      {billerCode === 'CNVRG' && <Converge data={data} formData={formData} />}
      {billerCode === 'INEC1' && <Ineco data={data} formData={formData} />}
      {billerCode === 'VIECO' && (
        <AccountAmount data={data} formData={formData} />
      )}
      {billerCode === 'DVOLT' && (
        <AccountAmount data={data} formData={formData} />
      )}
      {billerCode === 'HDMF1' && (
        <PagIbigFund data={data} formData={formData} />
      )}
      {billerCode === 'HDMF3' && (
        <PagIbigFund3 data={data} formData={formData} />
      )}
      {billerCode === 'CGNAL' && <Cignal data={data} formData={formData} />}
      {billerCode === 'SSS03' && (
        <SSSRealEstate data={data} formData={formData} />
      )}
      {billerCode === 'AECOR' && (
        <AngelesElectric data={data} formData={formData} />
      )}
      {billerCode === 'PELC2' && (
        <PampangaElectric data={data} formData={formData} />
      )}
      {billerCode === 'WLDVS' && (
        <WorldVision data={data} formData={formData} />
      )}
      {billerCode === 'NHA01' && (
        <NationalHouseAuthority data={data} formData={formData} />
      )}
    </>
  );
}
