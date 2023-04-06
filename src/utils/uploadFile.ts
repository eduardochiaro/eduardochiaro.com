import type { Files, File } from 'formidable';
import fs from 'fs';
import { join } from 'path';

const uploadFile = (files: Files, name = '', uploadPath = './public/uploads/') => {
  if (!files[name as keyof File]) {
    return null;
  }
  const file = files[name as keyof File] as unknown as File;
  const oldPath = file.filepath;
  const extension = file.originalFilename?.split('.').pop();
  const newName = file.newFilename + '.' + extension;

  fs.renameSync(oldPath, join(uploadPath, newName));
  return newName;
}

export default uploadFile;