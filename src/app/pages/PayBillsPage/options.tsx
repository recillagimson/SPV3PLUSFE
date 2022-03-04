/**
 * For Rendering the Select option child
 * @param name        Name of the options that will be rendered in UI
 * @returns {array}
 */
export const RENDER_SELECT_ITEMS = (
  name: string,
): Array<{ value: string; label: string }> => {
  switch (name.toLowerCase()) {
    case 'pldt6_otherinfo.service':
      return [
        {
          value: 'PL',
          label: 'PLDT Landline',
        },
        {
          value: 'PD',
          label: 'PLDT DSL',
        },
        {
          value: 'PU',
          label: 'PLDT Ultera',
        },
      ];
    case 'mecop_amount':
      return [
        {
          value: '100.00',
          label: '100.00',
        },
        {
          value: '200.00',
          label: '200.00',
        },
        {
          value: '300.00',
          label: '300.00',
        },
        {
          value: '500.00',
          label: '500.00',
        },
        {
          value: '1000.00',
          label: '1000.00',
        },
      ];
    case 'smart_otherinfo.product':
      return [
        {
          value: 'c',
          label: 'Cellular/SUN',
        },
        {
          value: 'b',
          label: 'Bro',
        },
      ];
    case 'sss01_payment_type':
      return [
        {
          value: 'R',
          label: 'Employer',
        },
        {
          value: 'H',
          label: 'Household',
        },
      ];
    case 'sss01_platform_type':
    case 'sss02_platform_type':
    case 'sss03_otherinfo.platformtype':
      return [
        {
          value: 'OTC',
          label: 'Over the counter',
        },
        {
          value: 'SS',
          label: 'Self-service',
        },
      ];
    case 'sss02_payment_type':
    case 'sss03_otherinfo.payortype':
      return [
        {
          value: 'I',
          label: 'Individual',
        },
        {
          value: 'R',
          label: 'Employer',
        },
      ];
    case 'sss03_otherinfo.reltype':
      return [
        {
          value: 'LP',
          label: 'Loan Payment',
        },
      ];
    case 'sss02_loan_type':
      return [
        {
          value: 'SL',
          label: 'Salary Loan',
        },
        {
          value: 'CL',
          label: 'Calamity Loan',
        },
        {
          value: 'EL',
          label: 'Emergency Loan',
        },
        {
          value: 'EDL',
          label: 'Education Loan',
        },
        {
          value: 'SIL',
          label: 'Stock Investment Loan',
        },
        {
          value: 'SLE',
          label: 'Salary Loan Early Renewal Program (SLERP)',
        },
      ];
    case 'unbnk_otherinfo.service':
      return [
        {
          value: '0',
          label: 'Mastercard',
        },
        {
          value: '1',
          label: 'Visa',
        },
      ];
    case 'admsn_otherinfo.paymenttype':
      return [
        {
          value: 'B2',
          label: 'Old Accounts',
        },
        {
          value: 'DP',
          label: 'Down Payment',
        },
        {
          value: 'PT',
          label: 'Prelim Term',
        },
        {
          value: 'MT',
          label: 'Mid Term',
        },
        {
          value: 'FT',
          label: 'Final Term',
        },
      ];
    case 'admsn_otherinfo.term':
      return [
        {
          value: '1',
          label: 'First Sem',
        },
        {
          value: '2',
          label: 'Second Sem',
        },
        {
          value: '3',
          label: 'Summer',
        },
      ];
    case 'splan_otherinfo.plantype':
      return [
        {
          value: 'P',
          label: 'Pension Plan',
        },
        {
          value: 'E',
          label: 'Education Plan',
        },
      ];
    case 'hdmf1_otherinfo.paymenttype':
      return [
        {
          value: 'ST',
          label: 'Short-term Loan',
        },
        {
          value: 'MC',
          label: 'Membership Saving',
        },
        {
          value: 'HL',
          label: 'Housing Loan',
        },
        {
          value: 'MP2',
          label: 'Modified PAG-IBIG 2',
        },
      ];
    case 'hdmf3_otherinfo.paymenttype':
      return [
        {
          value: 'ST',
          label: 'Short-term Loan',
        },
        {
          value: 'MC',
          label: 'Membership Saving',
        },
        {
          value: 'HL',
          label: 'Housing Loan',
        },
        {
          value: 'CL',
          label: 'Calamity Loan',
        },
        {
          value: 'MP2',
          label: 'Modified PAG-IBIG 2',
        },
      ];
    case 'cgnal_otherinfo.externalentityname':
      return [
        {
          value: 'BAYAD',
          label: 'Bayad',
        },
      ];
    case 'wldvs_otherinfo.pledge':
      return [
        {
          value: 'OT',
          label: 'One Time',
        },
        {
          value: 'RD',
          label: 'Regular Donor',
        },
        {
          value: 'Unknown',
          label: 'Unknown',
        },
      ];
    case 'adnu1_otherinfo.accounttype':
      return [
        {
          value: 'ADNU1',
          label: 'ADNU1',
        },
      ];
    case 'apec1_otherinfo.soa':
      return [
        {
          value: '0',
          label: 'No SOA Presented',
        },
        {
          value: '1',
          label: 'APEC SOA',
        },
        {
          value: '2',
          label: 'ALECO SOA',
        },
      ];
    case 'apec1_otherinfo.paymenttype':
      return [
        {
          value: 'S',
          label: 'Cash Only',
        },
      ];
    case 'apecs_otherinfo.branchcode':
      return [
        { value: 'B04', label: 'Bacoor' },
        { value: 'A07', label: 'C. Raymundo' },
        { value: 'C02', label: 'Concepcion Dos' },
        { value: 'B03', label: 'Dasmariñas' },
        { value: 'A02', label: 'Doña Juana, QC' },
        { value: 'B11', label: 'España' },
        { value: 'B05', label: 'G. Tuazon' },
        { value: 'A09', label: 'Grace Park West' },
        { value: 'B12', label: 'JRU Lipa' },
        { value: 'B10', label: 'Kalumpang' },
        { value: 'C01', label: 'Las Piñas' },
        { value: 'A08', label: 'Marikina Heights' },
        { value: 'B01', label: 'Muntinlupa' },
        { value: 'C03', label: 'New Manila' },
        { value: 'A04', label: 'North Fairview' },
        { value: 'B09', label: 'Ortigas Ext.' },
        { value: 'B07', label: 'Pateros' },
        { value: 'B06', label: 'Roxas Boulevard' },
        { value: 'D01', label: 'San Pablo' },
        { value: 'B02', label: 'Sta. Rita Sucat' },
        { value: 'B08', label: 'Taytay' },
        { value: 'A10', label: 'Tondo' },
        { value: 'A01', label: 'V. Luna' },
        { value: 'Others', label: 'Others' },
      ];
    case 'apecs_otherinfo.paymenttype':
      return [
        {
          value: 'MISC',
          label: 'Miscellaneous',
        },
        {
          value: 'TF',
          label: 'Tuition Fee',
        },
        {
          value: 'AF',
          label: 'Admission Fee',
        },
        {
          value: 'OTH',
          label: 'Others',
        },
      ];
    case 'asvca_otherinfo.affiliatebranch':
      return [
        {
          value: 'ASVCA1',
          label: 'Olongapo (Colorview CATV)',
        },
        {
          value: 'ASVCA6',
          label: 'Iba (Colorview - Northwest)',
        },
        {
          value: 'ASVCA11',
          label: 'Lemery (Aclan Cable)',
        },
        {
          value: 'ASVCA7',
          label: 'Masinloc (Colorview - Northwest)',
        },
        {
          value: 'ASVCA12',
          label: 'Taal (Excelite CATV)',
        },
        {
          value: 'ASVCA8',
          label: 'Lucena (Quezon CATV)',
        },
        {
          value: 'ASVCA9',
          label: 'Tayabas (Tayabas Resources)',
        },
        {
          value: 'ASVCA10',
          label: 'Batangas (Batangas CATV)',
        },
        {
          value: 'ASVCA2',
          label: 'Subic (Subic CATV)',
        },
        {
          value: 'ASVCA15',
          label: 'Sariaya (Sariaya Cable)',
        },
        {
          value: 'ASVCA3',
          label: 'Barretto (Colorview CATV)',
        },
        {
          value: 'ASVCA27',
          label: 'Mabini (Batangas CATV)',
        },
        {
          value: 'ASVCA4',
          label: 'Castillejos (Wesky Cable)',
        },
        {
          value: 'ASVCA13',
          label: 'Padre Garcia (JM Cable)',
        },
        {
          value: 'ASVCA35',
          label: 'Mauban (Southeast Cable)',
        },
        {
          value: 'ASVCA5',
          label: 'San Marcelino (Subic CATV)',
        },
        {
          value: 'ASVCA14',
          label: 'Bauan (Batangas CATV)',
        },
      ];
    case 'clpco_otherinfo.powercompany':
      return [
        {
          value: 'CLPC',
          label: 'CLPC',
        },
      ];
    default:
      return [];
  }
};
