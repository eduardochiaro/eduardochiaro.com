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
    const { fields: { categoryId, url, name, description } } = await getFromForm(req) as FieldTypes;

    const bookmark = await prisma.bookmark.create({
      data: { url, name, description, categoryId: parseInt(categoryId), createdAt: new Date() },
    });
    res.status(200).json({ ...bookmark });
  } else {
    res.status(200).json({});
  }
};
export default apiWithMiddleware(handler);
