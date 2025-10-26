import axios from 'axios';
import { TaskItem } from '../types/TaskItem';

const baseURL =
  process.env.REACT_APP_API_URL ??
  'https://basic-task-manager-server-1.onrender.com/api';


export const api = {
    getTasks: async () => {
        const response = await axios.get<TaskItem[]>(`${baseURL}/tasks`);
        return response.data;
    },

    createTask: async (description: string) => {
        const response = await axios.post<TaskItem>(`${baseURL}/tasks`, { description });
        return response.data;
    },

    updateTask: async (id: string, isCompleted: boolean) => {
        const response = await axios.put<TaskItem>(`${baseURL}/tasks/${id}`, { isCompleted });
        return response.data;
    },

    deleteTask: async (id: string) => {
        await axios.delete(`${baseURL}/tasks/${id}`);
    }
};

