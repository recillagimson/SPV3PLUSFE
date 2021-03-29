import CryptoJS from 'crypto-js';

const encDec = {
  stringify: function (cipherParams: {
    iv: string;
    salt: string;
    ciphertext: any;
  }) {
    const e: any = {
      ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64),
    };
    if (cipherParams.iv) e.iv = cipherParams.iv.toString();
    if (cipherParams.salt) e.s = cipherParams.salt.toString();

    return JSON.stringify(e);
  },
  parse: function (jsonStr: string) {
    const json = JSON.parse(jsonStr);
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(json.ct),
    });
    if (json.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(json.iv);
    if (json.s) cipherParams.salt = CryptoJS.enc.Hex.parse(json.s);
    return cipherParams;
  },
};

export default encDec;
