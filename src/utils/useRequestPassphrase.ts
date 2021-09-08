/**
 * Fetch for requesting passphrase (encrypting or decrypting passphrase)
 * NOTE: use this to request for the encryption passphrase
 */
import { request } from 'utils/request';

/**
 * Get Request Passphrase (for encrypting)
 * @param {string}  token   this should be the client token ie: token.access_token;
 * @returns                 returns either boolean | object { id: string; passPhrase: string }
 */
export async function getRequestPassphrase(token: string) {
  // return immediately if we didn't specify token
  if (!token || (token && token === '')) {
    return null;
  }

  let response: boolean | string | {} = '';

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const apiRequest = await request(
      `${process.env.REACT_APP_API_URL}/payloads/generate`,
      options,
    );
    response = apiRequest; // return the response object { id: string; passPhrase: string }
  } catch (err) {
    response = false;
  }

  return response;
}

/**
 * Get Response Passphrase (for decrypting)
 * @param {string}  token   this should be the client token ie: token.access_token;
 * @param {string}  id      API payload response ID for reference on retrieving the passphrase
 * @returns                 returns either boolean | object { id: string; passPhrase: string }
 */
export async function getResponsePassphrase(token: string, id: string) {
  // return immediately if we didn't specify token
  if (!token || (token && token === '')) {
    return null;
  }

  let response: boolean | string | {} = '';

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const apiRequest = await request(
      `${process.env.REACT_APP_API_URL}/payloads/${id}/key`,
      options,
    );
    response = apiRequest; // return the response object { id: string; passPhrase: string }
  } catch (err) {
    response = false;
  }

  return response;
}
