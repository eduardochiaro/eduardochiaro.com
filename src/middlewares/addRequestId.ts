import type { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';

const addRequestId = async (req: NextApiRequest, res: NextApiResponse, next: () => Promise<void>) => {
  // Apply header
  res.setHeader('X-Response-ID', nanoid());

  // Let remaining middleware and API route execute
  await next();
};

export default addRequestId;
