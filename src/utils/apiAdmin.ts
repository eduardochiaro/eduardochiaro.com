import axios from 'axios';

const createEditItem = <T>(url: string, form: { [key: string]: any }, isUpdate = true) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(form)) {
    if (typeof value === 'object' && value !== null && Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value);
    }
  }

  return axios<T>({
    method: isUpdate ? 'PUT' : 'POST',
    url: isUpdate ? `${url}/${form.id}` : `${url}/create`,
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
