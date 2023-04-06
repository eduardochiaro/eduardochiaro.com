import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const checkMethodAccess = async (req: NextApiRequest, res: NextApiResponse, next: () => Promise<void>) => {
  const session = await getSession({ req });
  // run cors middleware
  if (['POST', 'DELETE', 'PUT', 'PATCH'].includes(req.method as string)) {
    if (!session) {
      res.status(401);
      res.json({ error: 'Unauthorized' });
      return;
    }
  }
  await next();
  return;
};

export default checkMethodAccess;
