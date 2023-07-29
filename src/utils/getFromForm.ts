import { NextApiRequest } from 'next';
import formidable, { File } from 'formidable';
import { firstValues } from 'formidable/src/helpers/firstValues.js';
import { readBooleans } from 'formidable/src/helpers/readBooleans.js';

export type FieldTypes = { fields: { [key: string]: string }; files: { [key: string]: File } };

const getFromForm = (req: NextApiRequest, exceptions: string[] = [], booleanFields: string[] = []) => {
  const form = formidable({});
  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fieldsMultiple, filesMultiple) => {
      if (err) return reject(err);
      const fieldsSingle = firstValues(form, fieldsMultiple, exceptions);
      const fields = readBooleans(fieldsSingle, booleanFields);
      const files = firstValues(form, filesMultiple, exceptions);
      resolve({ fields, files });
    });
  });
};

export default getFromForm;
