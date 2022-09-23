import { nanoid } from 'nanoid';

const addRequestId = async (req, res, next) => {
  // Apply header
  res.setHeader('X-Response-ID', nanoid());

  // Let remaining middleware and API route execute
  await next();
};

export default addRequestId;