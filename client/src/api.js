import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/tasks';

export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTask = async (title) => {
  const response = await axios.post(API_URL, { title });
  return response.data;
};

export const updateTask = async (id, data) => {
  const response = await axios.patch(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
