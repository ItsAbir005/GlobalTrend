import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getTasks = async () => {
  const response = await axios.get(`${BASE_URL}/tasks`);
  return response.data;
};

export const createTask = async (title) => {
  const response = await axios.post(`${BASE_URL}/tasks`, { title });
  return response.data;
};

export const updateTask = async (id, data) => {
  const response = await axios.patch(`${BASE_URL}/tasks/${id}`, data);
  return response.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${BASE_URL}/tasks/${id}`);
};
