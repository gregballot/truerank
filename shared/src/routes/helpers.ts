import { z, ZodType } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const zStringBoolean = (): ZodType<boolean, any, any> =>
  z.preprocess((val) => {
    if (val === 'true' || val === true) return true;
    if (val === 'false' || val === false) return false;
    return val;
  }, z.boolean());
