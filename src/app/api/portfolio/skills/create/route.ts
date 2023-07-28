import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import getFromForm, { FieldTypes } from "@/utils/getFromForm";

export async function POST(
  request: NextRequest,
	response: NextResponse
) {
	const { fields: { percentage, name, type, logo } } = await getFromForm(request) as FieldTypes;
	const skill = await prisma.skill.create({
		data: { name, type, logo, percentage: parseInt(percentage || '0'), createdAt: new Date() },
	});
  if (skill) {
    return NextResponse.json(skill);
  }
  return new Response(null, {
    status: 400,
  });
}

