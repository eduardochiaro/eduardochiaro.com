'use server';
import prisma from '@/utils/prisma';

type SkillData = {
  name: FormDataEntryValue | null;
  type: FormDataEntryValue | null;
  logo: FormDataEntryValue | null;
  percentage: FormDataEntryValue | null;
};

async function addSkill(data: SkillData) {
  const skillData: any = {
    name: data.name as string,
    type: data.type as string,
    logo: data.logo as string,
    percentage: parseInt(data.percentage as string),
    createdAt: new Date(),
  };
  return prisma.skill.create({
    data: {
      ...skillData,
    },
  });
}

const updateSkill = async (id: string, data: SkillData) => {
  const skillData: any = {
    name: data.name as string,
    type: data.type as string,
    logo: data.logo as string,
    percentage: parseInt(data.percentage as string),
    updatedAt: new Date(),
  };
  return prisma.skill.update({
    where: {
      id: parseInt(id),
    },
    data: skillData,
  });
};

const deleteSkill = async (id: string) => {
  return prisma.skill.delete({
    where: {
      id: parseInt(id),
    },
  });
};

export { addSkill, updateSkill, deleteSkill };
