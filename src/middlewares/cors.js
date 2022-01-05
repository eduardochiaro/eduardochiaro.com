import cors from 'cors';
import runMiddleware from '../lib/runMiddleware';

const origin = process.env.NODE_ENV == "production" ? [/eduardochiaro\.com$/] : "*";
const corsOptions = cors({
  origin,
})

export default async function corsMiddleware (req, res) {
  return runMiddleware(req, res, corsOptions);
}