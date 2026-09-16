import api from './api';

export const uploadFile = async (fileObject) => {
  const formData = new FormData();
  formData.append('file', fileObject);

  // Do NOT manually set Content-Type header so Axios/browser sets boundary automatically
  const response = await api.post('/files', formData);
  return response.data;
};

export const getFiles = async () => {
  const response = await api.get('/files');
  return response.data;
};

export const getFileById = async (id) => {
  const response = await api.get(`/files/${id}`);
  return response.data;
};

export const downloadFile = async (id, originalName) => {
  const response = await api.get(`/files/${id}/download`, {
    responseType: 'blob'
  });

  // Create temporary Blob URL to trigger native browser file download
  const blob = new Blob([response.data], { type: response.headers['content-type'] });
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', originalName || 'download');
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(downloadUrl);
};

export const deleteFile = async (id) => {
  const response = await api.delete(`/files/${id}`);
  return response.data;
};
