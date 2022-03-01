import { getSession } from "next-auth/react";

const checkPostAccess = async (req, res, next) => {
  const session = await getSession({ req });
  // run cors middleware
  if (req.method == "POST") {
    if (!session) {
      res.status(401);
      res.json({ error: 'Unauthorized' });
      return;
    }
  }
  await next();
  return;
}

export default checkPostAccess;