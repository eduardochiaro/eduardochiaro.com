import { NextRequest } from 'next/server';

const getFieldsFromForm = async (request: NextRequest, fields: string[], files?: string[]) => {
  const formData = await request.formData();
  const data: { [key: string]: any } = {};
  fields.forEach((field) => {
    data[field] = formData.get(field) as string;
  });
  if (files && files.length > 0) {
    files.forEach((file) => {
      const fileData = formData.get(file) as Blob | null;
      if (fileData) {
        data[file] = fileData;
      }
    });
  }
  return data;
};

export default getFieldsFromForm;
