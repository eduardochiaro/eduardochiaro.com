'use server';
import prisma from '@/utils/prisma';

type ResumeData = {
  company: FormDataEntryValue | null;
  position: FormDataEntryValue | null;
  description: FormDataEntryValue | null;
  startDate: FormDataEntryValue | null;
  endDate: FormDataEntryValue | null;
  location: FormDataEntryValue | null;
};

const addResume = async (data: ResumeData) => {
  const resumeData: any = {
    company: data.company as string,
    position: data.position as string,
    description: data.description as string,
    startDate: new Date(data.startDate as string),
    endDate: new Date(data.endDate as string),
    location: data.location as string,
    createdAt: new Date(),
  };
  return prisma.resume.create({
    data: {
      ...resumeData,
    },
  });
};
const updateResume = async (id: string, data: ResumeData) => {
  const resumeData: any = {
    company: data.company as string,
    position: data.position as string,
    description: data.description as string,
    startDate: new Date(data.startDate as string),
    endDate: new Date(data.endDate as string),
    location: data.location as string,
    updatedAt: new Date(),
  };
  return prisma.resume.update({
    where: {
      id: parseInt(id),
    },
    data: resumeData,
  });
};
const deleteResume = async (id: string) => {
  return prisma.resume.delete({
    where: {
      id: parseInt(id),
    },
  });
};
const getResume = async () => {
  return prisma.resume.findMany({
    orderBy: {
      startDate: 'desc',
    },
  });
};

export { addResume, updateResume, deleteResume, getResume };
