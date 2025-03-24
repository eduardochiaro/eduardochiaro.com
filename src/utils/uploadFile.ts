import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import mime from 'mime-types';

export default async function uploadFile(file: File, path: string) {
  const data = await file.arrayBuffer();

  const mimeType = file.type;
  const newName = nanoid() + '.' + mime.extension(mimeType);
  // save file to disk
  await fs.appendFile(`${path}/${newName}`, Buffer.from(data));

  return {
    name: newName,
    type: mimeType,
  };
}
