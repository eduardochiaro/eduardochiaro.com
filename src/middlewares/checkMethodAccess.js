import { getSession } from "next-auth/react";

const checkMethodAccess = async (req, res, next) => {
  const session = await getSession({ req });
  // run cors middleware
  if (req.method.includes([ "POST", "DELETE", "PUT", "PATCH" ])) {
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