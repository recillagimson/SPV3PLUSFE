/**
 * Application Helpers
 */
import { removeSentryUser } from 'utils/sentry';

// email and mobile regex validation
export const regExEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; // email must be in valid format ie: example@domain.com
export const regExIsGonnaBeEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@/; // pattern for when user is going to type an email (if there is an [at] sign at the value) ie: 123@
export const regExMobile = /^0(9)\d{9}$/; // number must start with 0 followed by 9 and have 9 more digit after ie: 09171234567

// password strength regex
export const regExPassword = /.{12,}$/; // password should be 12 or more characters
// export const regExStrongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&_])(?=.{12,})/; // eslint-disable-line no-useless-escape
export const regExStrongPassword = new RegExp(
  '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{12,})',
);
export const regExMediumPassword = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/;
export const regExWeakPassword = /.{2,}$/;

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

  // if days is 0, set expiration after 1 hour
  if (days === 0) {
    d.setTime(d.getTime() + 1 * 3600 * 1000);
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

/**
 * Logout Function
 * NOTE: it was defined here, so that we will only modify one function for all necessary deletion whether in cookies or other storage
 */
export function doSignOut() {
  deleteCookie('spv_uat_hmc');
  deleteCookie('spv_uat');
  deleteCookie('spv_expire');
  deleteCookie('spv_cat');
  deleteCookie('spv_uat_u');
  deleteCookie('spv_uat_f');

  removeSentryUser(); // remove user in the sentry

  // set a delay, in the component where this will be called, set a loading indicator to delay the logout
  setTimeout(() => {
    window.location.replace(`${process.env.PUBLIC_URL}/`);
  }, 800);
}

/**
 * Format number with commas
 * Changes: Removed the RegEx which causes error on Safari Browser
 *          Replaced with an updated toLocaleString
 * @param {number}  num       number to format
 *
 * @returns                   returns the formatted string number
 */
export function numberCommas(
  num: number | string = 0,
  digit: number = 2,
): string {
  const n = typeof num === 'number' ? num.toString() : num;

  // Number will converted with fixed 2 decimal and converted to number with commas using toLocaleString and return it
  return Number(parseFloat(n).toFixed(digit)).toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: digit,
  });
}

/**
 * Convert File Size
 */
export function fileSize(size: number = 0) {
  const fSize = typeof size === 'number' ? size : parseInt(size);
  if (fSize === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(fSize) / Math.log(k));
  return parseFloat((fSize / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Convert string to title case
 * @param {string}  text      text to transform
 */
export function toTitleCase(text: string = '') {
  if (text === '') {
    return text; // return the text if it is empty
  }

  return text.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

/**
 * Sort Array
 * Use only this helper if you are sorting through an array of objects
 * @param {array}   arr     the array to sort (length should be greater than 1)
 * @param {string}  key     Object key name to compare the values
 * @param {string}  sort    Sort method 'ASC' | 'DESC' default: 'ASC'
 *
 * @returns {array}         returns the sorted array
 */
export function sortBy(
  arr: any[] = [],
  key: string = '',
  sort: 'ASC' | 'DESC' = 'ASC',
  key2: string = '',
) {
  // return immediately if function doesn't have the proper array and keys
  if ((arr && arr.length === 0) || key === '') {
    console.warn(
      'Sort By function should have an array with length greater than 1 and a key specified',
    );
    return null;
  }

  arr.sort((a, b) => {
    if (sort === 'ASC') {
      if (key2 && key2 !== '') {
        return a[key][key2] < b[key][key2] ? -1 : 1;
      }

      return a[key] < b[key] ? -1 : 1;
    }

    if (sort === 'DESC') {
      if (key2 && key2 !== '') {
        return b[key][key2] < a[key][key2] ? -1 : 1;
      }

      return b[key] < a[key] ? -1 : 1;
    }

    return 0; //default return value (no sorting)
  });

  return arr;
}

/**
 * Mask characters
 * @param {string}  text          the string to be masked
 * @param {number}  first         retain the first n characters
 * @param {number}  last          retain the last n characters
 *
 * @returns masked string except last 4 digits
 */
export function maskCharacters(
  text: any = '',
  first: number = 0,
  last: number = 0,
) {
  if (!text) {
    return '';
  }

  if (first && first > 0 && !last) {
    const head = text.slice(0, first);
    const body = text.slice(first);
    return head + body.replace(/./g, '*');
  }

  if (last && last > 0 && !first) {
    const body = text.slice(0, -last);
    const tail = text.slice(-last);
    return body.replace(/./g, '*') + tail;
  }

  if (first && last && first > 0 && last > 0) {
    const head = text.slice(0, first);
    const body = text.slice(first, -last);
    const tail = text.slice(-last);

    return head + body.replace(/./g, '*') + tail;
  }

  // /\w(?=(?:\W*\w){4})/g
  return text.replace(/\w(?=\w{4,}$)/g, '*');
}

/**
 * Mask Mobile Number
 * @param {string}  value     Mobile number
 */
export function maskMobileNumber(value: string) {
  if (!value) {
    return '';
  }

  const head = value.slice(0, 2);
  const body = value.slice(2, -4);
  const tail = value.slice(-4);

  return head + body.replace(/./g, '*') + tail;
}

/**
 * Mask Email
 * @param {string}  value     Email address
 */
export function maskEmailAddress(value: string) {
  if (!value) {
    return '';
  }

  const split = value.split('@');
  const head = split[0].slice(0, 3);
  const body = split[0].slice(3);

  return head + body.replace(/./g, '*') + '@' + split[1];
}
