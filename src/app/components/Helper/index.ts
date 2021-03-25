/**
 * Application Helpers
 */
const regExEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

/**
 * Validate Email
 * @param {string} email
 *
 * @returns       true if valid else false
 */
export function validateEmail(email: string = '') {
  return regExEmail.test(String(email).toLowerCase());
}
