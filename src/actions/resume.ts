'use server';
import prisma from '@/utils/prisma';
import { deleteFile, uploadFile } from '@/utils/files';

type ResumeData = {
  name: FormDataEntryValue | null;
  company: FormDataEntryValue | null;
  description: FormDataEntryValue | null;
  startDate?: FormDataEntryValue | null;
  endDate?: FormDataEntryValue | null;
  location: FormDataEntryValue | null;
  file?: FormDataEntryValue | null;
  tags?: FormDataEntryValue | null;
};

const addResume = async (data: ResumeData) => {
  const resumeData: any = {
    company: data.company as string,
    name: data.name as string,
    description: data.description as string,
    startDate: new Date(data.startDate as string),
    endDate: new Date(data.endDate as string),
    location: data.location as string,
    createdAt: new Date(),
  };
  if (data.file && data.file instanceof File) {
    if (data.file.size > 0) {
      const fileUploaded = await uploadFile(data.file, 'public/uploads');
      resumeData['file'] = {
        create: {
          name: data.company as string,
          path: fileUploaded.name,
          type: fileUploaded.type,
        },
      };
    }
  }
  if (data.tags) {
    const parsedTags = JSON.parse(data.tags as string);
    const newTags = parsedTags
      .filter((x: any) => x.new && !x.deleted && x.id == null)
      ?.map((x: any) => {
        return { name: x.name };
      });
    const appendTags = parsedTags
      .filter((x: any) => x.new && !x.deleted && x.id > 0)
      ?.map((x: any) => {
        return { id: x.id };
      });
    resumeData['tags'] = {
      create: newTags,
      connect: appendTags,
    };
  }

  return prisma.resume.create({
    data: {
      ...resumeData,
    },
  });
};
const updateResume = async (id: string, data: ResumeData) => {
  const resumeData: any = {
    company: data.company as string,
    name: data.name as string,
    description: data.description as string,
    startDate: new Date(data.startDate as string),
    endDate: new Date(data.endDate as string),
    location: data.location as string,
    updatedAt: new Date(),
  };
  if (data.file && data.file instanceof File) {
    if (data.file.size > 0) {
      const fileUploaded = await uploadFile(data.file, 'public/uploads');
      resumeData['file'] = {
        create: {
          name: data.company as string,
          path: fileUploaded.name,
          type: fileUploaded.type,
        },
      };
    }
  }
  if (data.tags) {
    const parsedTags = JSON.parse(data.tags as string);
    const newTags = parsedTags
      .filter((x: any) => x.new && !x.deleted && x.id == null)
      ?.map((x: any) => {
        return { name: x.name };
      });
    const appendTags = parsedTags
      .filter((x: any) => x.new && !x.deleted && x.id > 0)
      ?.map((x: any) => {
        return { id: x.id };
      });
    const deletedTags = parsedTags
      .filter((x: any) => x.deleted && x.id > 0)
      ?.map((x: any) => {
        return { id: x.id };
      });
    resumeData['tags'] = {
      create: newTags,
      connect: appendTags,
      disconnect: deletedTags,
    };
  }
  return prisma.resume.update({
    where: {
      id: parseInt(id),
    },
    data: resumeData,
  });
};
const deleteResume = async (id: string) => {
  const resume = await prisma.resume.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      file: true,
      projects: true,
    },
  });
  if (!resume) {
    throw new Error('Project not found');
  }
  // delete file from disk
  if (resume.file) {
    deleteFile(resume.file.path, 'public/uploads');
  }
  if (resume.projects) {
    resume.projects.forEach((project: any) => {
      deleteProject(project.id.toString());
    });
  }
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
    include: {
      file: true,
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
      projects: {
        select: {
          id: true,
          name: true,
          file: true,
        },
      },
    },
  });
};

const addProject = async (id: string, data: any) => {
  const projectData: any = {
    name: data.name as string,
    description: data.description as string,
  };

  if (data.file && data.file instanceof File) {
    if (data.file.size > 0) {
      const fileUploaded = await uploadFile(data.file, 'public/uploads');
      projectData['file'] = {
        create: {
          name: data.name as string,
          path: fileUploaded.name,
          type: fileUploaded.type,
        },
      };
    }
  }
  return prisma.resume.update({
    where: {
      id: parseInt(id),
    },
    data: {
      projects: {
        create: projectData,
      },
    },
  });
};
const deleteProject = async (id: string) => {
  const project = await prisma.resumeProject.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      file: true,
    },
  });
  if (!project) {
    throw new Error('Project not found');
  }
  // delete file from disk
  if (project.file) {
    deleteFile(project.file.path, 'public/uploads');
  }
  return prisma.resumeProject.delete({
    where: {
      id: parseInt(id),
    },
  });
};

export { addResume, updateResume, deleteResume, getResume, addProject, deleteProject };
