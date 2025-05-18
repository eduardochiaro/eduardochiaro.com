import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { rmFile } from 'rm-file';

const uploadPath = './public/uploads/';

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: { pid: string };
  },
) {
  const { pid } = params;
  const resumeProjectReturn = await prisma.resumeProject.findFirst({
    where: {
      id: parseInt(pid),
    },
  });
  await prisma.resumeProject.delete({
    where: { id: parseInt(pid) },
  });
  if (resumeProjectReturn && resumeProjectReturn.image) {
    await rmFile(`${uploadPath}${resumeProjectReturn.image}`);
  }
  return NextResponse.json({ action: 'resumeProject deleted' });
}
