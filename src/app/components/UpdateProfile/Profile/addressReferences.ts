/**
 * Fetch the address references
 * Region, Province, City/Municipality, Barangay
 */

import { getCookie } from 'app/components/Helpers';
import spdCrypto from 'app/components/Helpers/EncyptDecrypt';
import { request } from 'utils/request';
import {
  getRequestPassphrase,
  getResponsePassphrase,
} from 'utils/useRequestPassphrase';

const clientToken: any = getCookie('spv_cat');
const token: any = clientToken ? JSON.parse(clientToken) : '';

/**
 * Get Regions
 * @returns         returns the array result
 */
export const getRegions = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.access_token}`,
    },
  };

  try {
    const apirequest: any = await request(
      `${process.env.REACT_APP_API_URL}/address/regions`,
      options,
    );

    if (apirequest && apirequest.data) {
      const respPhrase: any = await getResponsePassphrase(
        token,
        apirequest.data.id,
      );

      if (respPhrase && respPhrase.id) {
        let decryptedData = spdCrypto.decrypt(
          apirequest.data.payload,
          respPhrase.passPhrase,
        );
        if (decryptedData) {
          return decryptedData;
        }
      }
    }
    return false;
  } catch (err) {
    return false;
  }
};

/**
 * Get Provinces
 * @param code      string code of region
 * @returns         returns the array result
 */
export const getProvinces = async (code: string) => {
  if (!code && code === '') {
    return null;
  }

  const requestPassphrase: any = await getRequestPassphrase(token);

  let payload = '';
  if (requestPassphrase) {
    payload = spdCrypto.encrypt(
      JSON.stringify({ region_code: code }),
      requestPassphrase.passPhrase,
    );
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id: requestPassphrase.id, payload: payload }),
  };

  try {
    const apirequest: any = await request(
      `${process.env.REACT_APP_API_URL}/address/provinces`,
      options,
    );

    if (apirequest && apirequest.data) {
      const respPhrase: any = await getResponsePassphrase(
        token,
        apirequest.data.id,
      );

      if (respPhrase && respPhrase.id) {
        let decryptedData = spdCrypto.decrypt(
          apirequest.data.payload,
          respPhrase.passPhrase,
        );
        if (decryptedData) {
          return decryptedData;
        }
      }
    }
    return false;
  } catch (err) {
    return false;
  }
};

/**
 * Get Cities/Municipalities
 * @param code      string code of province
 * @returns         returns the array result
 */
export const getCities = async (code: string) => {
  if (!code && code === '') {
    return null;
  }

  const requestPassphrase: any = await getRequestPassphrase(token);

  let payload = '';
  if (requestPassphrase) {
    payload = spdCrypto.encrypt(
      JSON.stringify({ province_code: code }),
      requestPassphrase.passPhrase,
    );
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id: requestPassphrase.id, payload: payload }),
  };

  try {
    const apirequest: any = await request(
      `${process.env.REACT_APP_API_URL}/address/municipalities`,
      options,
    );

    if (apirequest && apirequest.data) {
      const respPhrase: any = await getResponsePassphrase(
        token,
        apirequest.data.id,
      );

      if (respPhrase && respPhrase.id) {
        let decryptedData = spdCrypto.decrypt(
          apirequest.data.payload,
          respPhrase.passPhrase,
        );
        if (decryptedData) {
          return decryptedData;
        }
      }
    }
    return false;
  } catch (err) {
    return false;
  }
};

/**
 * Get Barangays
 * @param code      string code of city/municipality
 * @returns         returns the array result
 */
export const getBarangays = async (code: string) => {
  if (!code && code === '') {
    return null;
  }

  const requestPassphrase: any = await getRequestPassphrase(token);

  let payload = '';
  if (requestPassphrase) {
    payload = spdCrypto.encrypt(
      JSON.stringify({ municipality_code: code }),
      requestPassphrase.passPhrase,
    );
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id: requestPassphrase.id, payload: payload }),
  };

  try {
    const apirequest: any = await request(
      `${process.env.REACT_APP_API_URL}/address/barangays`,
      options,
    );

    if (apirequest && apirequest.data) {
      const respPhrase: any = await getResponsePassphrase(
        token,
        apirequest.data.id,
      );

      if (respPhrase && respPhrase.id) {
        let decryptedData = spdCrypto.decrypt(
          apirequest.data.payload,
          respPhrase.passPhrase,
        );
        if (decryptedData) {
          return decryptedData;
        }
      }
    }
    return false;
  } catch (err) {
    return false;
  }
};
