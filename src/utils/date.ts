import { format as dfFormat, formatDistanceToNow as dfDistance, parse as dfParse } from 'date-fns';

export const format = (date: string | number | Date | null | undefined, fmt: string, fallback = ''): string => {
  if (!date) return fallback;
  try {
    return dfFormat(new Date(date), fmt);
  } catch {
    return fallback;
  }
};

export const fromNow = (date: string | number | Date | null | undefined, suffix = true, fallback = ''): string => {
  if (!date) return fallback;
  try {
    return dfDistance(new Date(date), { addSuffix: suffix });
  } catch {
    return fallback;
  }
};

export const parse = (value: string, fmt: string): Date => {
  return dfParse(value, fmt, new Date());
};

const dateUtils = { format, fromNow, parse };

export default dateUtils;
