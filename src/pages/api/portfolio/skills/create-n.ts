import type { NextApiRequest, NextApiResponse } from 'next';
import apiWithMiddleware from '@/utils/apiWithMiddleware';
import prisma from '@/utils/prisma';
import cors from '@/middlewares/cors';
import getFromForm, { FieldTypes } from "@/utils/getFromForm";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);
  if (req.method === 'POST') {
    const { fields: { percentage, name, type, logo } } = await getFromForm(req) as FieldTypes;
    const skill = await prisma.skill.create({
      data: { name, type, logo, percentage: parseInt(percentage || '0'), createdAt: new Date() },
    });
    res.status(200).json({ ...skill });
  } else {
    res.status(200).json({});
  }
};
export default apiWithMiddleware(handler);
