import { nanoid } from "nanoid";
import { use } from "next-api-middleware";
import checkPostAccess from "../middlewares/checkPostAccess";

const addRequestId = async (req, res, next) => {
  // Apply header
  res.setHeader("X-Response-ID", nanoid());

  // Let remaining middleware and API route execute
  await next();
};

export default use(
    addRequestId,
    checkPostAccess
);
