/**
 * small helpers specific to upload or tier only
 */

/**
 * Validate Files
 * @param file      file to validate
 * @param accept    string array of accepted files (default: ['image/png', 'image/jpg', 'application/pdf'])
 * @returns         returns true if invalid
 */
export function validateFiles(
  file: { type: any; size: any },
  accept: string[] = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'application/pdf',
  ],
  size: number = 1048576, // bytes
) {
  return !accept.includes(file.type) || file.size > size;
}

export const createFile = (file: any) => {
  return new File([new ArrayBuffer(file.size)], file.name, {
    type: file.type,
    lastModified: file.lastModified,
  });
};

/**
 * helper for requesting a response passphrase
 */
/**
 * Get a response passphrase for decryption
 * @param {string}  id    request passphrase id
 * @return                Returns the result from the api call
 */
export async function getResponsePassphrase(
  id: string,
  token: { access_token: string },
) {
  const requestURL = `${process.env.REACT_APP_API_URL}/payloads/${id}/key`;

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${token.access_token}`,
    },
  };

  try {
    const apirequest = await fetch(requestURL, options);
    const response = await apirequest.json();

    return response;
  } catch (err) {
    return false;
  }
}
