import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { rmFile } from 'rm-file';

const uploadPath = './public/uploads/';

export async function DELETE(
  request: NextRequest,
  props: {
    params: Promise<{ pid: string }>;
  },
) {
  const params = await props.params;
  const { pid } = params;
  await prisma.resumeProject.delete({
    where: { id: parseInt(pid) },
  });
  return NextResponse.json({ action: 'resumeProject deleted' });
}
