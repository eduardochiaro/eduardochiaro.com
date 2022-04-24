import { getSession } from "next-auth/react";

const checkMethodAccess = async (req, res, next) => {
  const session = await getSession({ req });
  // run cors middleware
  if ([ "POST", "DELETE", "PUT", "PATCH" ].includes(req.method)) {
    if (!session) {
      res.status(401);
      res.json({ error: 'Unauthorized' });
      return;
    }
  }
  await next();
  return;
}

export default checkMethodAccess;