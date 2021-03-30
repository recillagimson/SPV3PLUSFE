/**
 * Application Helpers
 */
const regExEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const regExMobile = /^0(9)\d{9}$/; // number must start with 0 followed by 9 and have 9 more digit after ie: 09171234567

/**
 * Validate Email
 * @param {string} email
 *
 * @returns       true if valid else false
 */
export function validateEmail(email: string = '') {
  return regExEmail.test(String(email).toLowerCase());
}

/**
 * Validate Phone
 * @param {string}  mobile
 * @returns
 */
export function validatePhone(phone: string = '') {
  return regExMobile.test(phone);
}

/**
 * Display Time in a specific timezone
 * @param   {string}  offset    input the offset time ie: +8 or -7
 * @return  {object}            return a Date object
 */
export function intlDateTime(offset: any) {
  const d = new Date();

  // convert the date to milliseconds in UTC and add offset
  const utc = d.getTime() + d.getTimezoneOffset() * 60000;

  // return correct offset date and time
  // NOTE: do not mind the GMT +8 or any string, date and time is correct for the specified timezone
  return new Date(utc + 3600000 * offset);
}

/**
 * Set Cookie
 * @param {string} name
 * @param {string} value
 * @param {number} days
 *
 */
export function setCookie(name: string, value: string, days: number = 0) {
  const d = new Date(intlDateTime('+8'));

  if (days && days > 0) {
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  }

  // if days is 0, set expiration after 9 hours
  if (days === 0) {
    d.setTime(d.getTime() + 9 * 60 * 60 * 1000);
  }

  // set the expiry
  let expires = d.toUTCString(); // convert to UTC to properly set in cookie

  if (days === -1) {
    expires = 'Thu, 01 Jan 1970 00:00:00'; // expired date to delete the cookie
  }
  const domain = window.location.hostname; // set domain for the cookie
  if (window.location.protocol === 'https:') {
    document.cookie = `${name}=${value};path=/;expires=${expires};secure;samesite=strict;domain=${domain}`;
  } else {
    document.cookie = `${name}=${value};path=/;expires=${expires};samesite=strict;domain=${domain}`;
  }
}

/**
 * Get Cookie
 * @param {string} name
 *
 * @returns {string|null}
 */
export function getCookie(name: string) {
  const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return v ? v[2] : null;
}

/**
 * Delete Cookie
 * @param {string} name
 */
export function deleteCookie(name: string) {
  setCookie(name, '', -1);
}
