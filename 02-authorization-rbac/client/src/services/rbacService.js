import api from './api';

export const getPublicEndpoint = async () => {
  const response = await api.get('/authorization/public');
  return response.data;
};

export const getAuthenticatedEndpoint = async () => {
  const response = await api.get('/authorization/authenticated');
  return response.data;
};

export const getRoleProtectedEndpoint = async () => {
  const response = await api.get('/authorization/role-protected');
  return response.data;
};

export const getPermissionProtectedEndpoint = async () => {
  const response = await api.get('/authorization/permission-protected');
  return response.data;
};
