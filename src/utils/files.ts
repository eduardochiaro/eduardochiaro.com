import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import mime from 'mime-types';

const uploadFile = async (file: File, path: string) => {
  const data = await file.arrayBuffer();

  const mimeType = file.type;
  const newName = nanoid() + '.' + mime.extension(mimeType);
  // save file to disk
  await fs.appendFile(`${path}/${newName}`, Buffer.from(data));

  return {
    name: newName,
    type: mimeType,
  };
};

const deleteFile = async (fileName: string, path: string) => {
  try {
    const filePath = `${path}/${fileName}`;
    const fs = require('fs');
    return fs.unlink(filePath, async (err: any) => {
      if (err) {
        console.error('Error deleting file:', err);
        return false;
      } else {
        console.log('File deleted successfully');
        return false;
      }
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

export { uploadFile, deleteFile };
