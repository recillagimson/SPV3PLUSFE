import CryptoJS from 'crypto-js';

// Encryption/Decryption formatter
const formatter = {
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

const spdCrypto = {
  /**
   * Encrypt Data
   * @param {string} payload    pass a json.stringify payload to encrypt
   * @param {string} phrase     pass a passphrase retrieved from the API to be use in encryption
   * @returns                   will return an encrypted string
   */
  encrypt: (payload: string, phrase: string) =>
    CryptoJS.AES.encrypt(payload, phrase, {
      format: formatter,
    }).toString(),
  /**
   * decrypt Data
   * @param {string} payload    pass a stringified payload to decrypt
   * @param {string} phrase     pass a passphrase retrieved from the API to be use in decryption
   * @returns                   will return the decrypted parsed data or null if there is an error in decrypting data
   */
  decrypt: (payload: string, phrase: string) => {
    // decrypt data
    const dd = CryptoJS.AES.decrypt(payload, phrase, {
      format: formatter,
    }).toString(CryptoJS.enc.Utf8);

    if (dd) {
      // return a parsed data
      return JSON.parse(dd);
    }
    return null;
  },
};

export default spdCrypto;
