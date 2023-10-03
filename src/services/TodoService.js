import axios from "axios";
import { getToken } from "./AuthService";

const BASE_URL = "http://localhost:8080/api/todos";

axios.interceptors.request.use((config) => {

    config.headers['Authorization'] = getToken();
    return config;

    }, (error) => {
        return Promise.reject(error);
    });

export const getAllTodos = () => axios.get(BASE_URL);

export const saveTodo = (todo) => axios.post(BASE_URL, todo);

export const getTodo = (todoId) => axios.get(`${BASE_URL}/${todoId}`);

export const updateTodo = (todoId, todo) => axios.put(`${BASE_URL}/${todoId}`, todo);

export const deleteTodo = (todoId) => axios.delete(`${BASE_URL}/${todoId}`);

export const completeTodo = (todoId) => axios.patch(`${BASE_URL}/${todoId}/complete`);

export const incompleteTodo = (todoId) => axios.patch(`${BASE_URL}/${todoId}/incomplete`);

