import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const adminOnly = async (req: NextApiRequest, res: NextApiResponse, next: () => Promise<void>) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401);
    res.json({ error: 'Unauthorized' });
    return;
  }
  await next();
  return;
};

export default adminOnly;
