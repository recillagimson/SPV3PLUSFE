import { createImmediatelyInvokedArrowFunction } from 'typescript';

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
