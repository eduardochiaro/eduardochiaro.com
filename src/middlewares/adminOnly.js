import { getSession } from 'next-auth/react';

const adminOnly = async (req, res, next) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401);
    res.json({ error: 'Unauthorized' });
    return;
  }
  await next();
  return;
}

export default adminOnly;