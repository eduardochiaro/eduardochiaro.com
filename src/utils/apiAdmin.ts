import axios from 'axios';

const createEditItem = <T>(url: string, form: { [key: string]: any }, create = true) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(form)) {
    formData.append(key, value);
  }

  return axios<T>({
    method: create ? 'PUT' : 'POST',
    url: create ? `${url}/${form.id}` : `${url}/create`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data;',
    },
  });
};

const deleteItem = <T>(url: string, id: number) => {
  return axios<T>({
    method: 'DELETE',
    url: `${url}/${id}`,
  });
};

export { createEditItem, deleteItem };
