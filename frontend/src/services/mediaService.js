import axiosInstance from './axiosConfig';

const endpoint = '/medias';

const getAll = () => axiosInstance.get(endpoint);
const getById = (id) => axiosInstance.get(`${endpoint}/${id}`);
const create = (data) => axiosInstance.post(endpoint, data);
const update = (id, data) => axiosInstance.put(`${endpoint}/${id}`, data);
const remove = (id) => axiosInstance.delete(`${endpoint}/${id}`);

export default { getAll, getById, create, update, remove };
