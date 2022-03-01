import { nanoid } from "nanoid";
import { use } from "next-api-middleware";
import checkPostAccess from "../middlewares/checkPostAccess";

const captureErrors = async (req, res, next) => {
  try {
    // Catch any errors that are thrown in remaining
    // middleware and the API route handler
    await next();
  } catch (err) {
    res.status(500);
    res.json({ error: err });
  }
};

const addRequestId = async (req, res, next) => {
  // Apply header
  res.setHeader("X-Response-ID", nanoid());

  // Let remaining middleware and API route execute
  await next();
};

export default use(
    addRequestId,
    checkPostAccess,
    //captureErrors
);
