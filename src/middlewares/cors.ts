import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

//const origin = process.env.NODE_ENV == "production" ? [/eduardochiaro\.com$/] : "*";
//const origin = [/eduardochiaro\.com$/];

const cors = Cors({
  origin: process.env.NEXTAUTH_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    cors(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default runMiddleware;
