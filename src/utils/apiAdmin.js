import axios from 'axios';

const apiAdmin = (url, form, create = true) => {

  const formData = new FormData();
  for (const [key, value] of Object.entries(form)) {
    formData.append(key, value);
  }

  return axios({
    method: create ? 'PUT' : 'POST',
    url: create ? `${url}/${form.id}` : `${url}/create`,
    data: formData,
    headers: {
      'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
    },
  })
}

export default apiAdmin;