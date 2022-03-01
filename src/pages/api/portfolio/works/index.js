import apiWithMiddleware from '../../../../lib/apiWithMiddleware';
import prisma from '../../../../lib/prisma';
import NextCors from 'nextjs-cors';

import Cors from 'cors'

// Initializing the cors middleware

const origin = [/eduardochiaro\.com$/];

function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}

const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    origin,
    methods: ['POST']
  })
)


const handler = async (req, res) => {
  await cors(req, res);
  const jobs = await prisma.job.findMany({
    where: {
      deletedAt: null
    }
  });
  res.status(200).json({ results: jobs });
}
export default handler;