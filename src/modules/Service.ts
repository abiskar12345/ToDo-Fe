import axios from "axios";
import qs from "qs";
import { API_BASE_URL } from "../configs/AppConfigs";

interface Todo {
  _id: string;
  name: string;
  dateTime: Date;
  shortDescription: string;
  status: string;
}
interface ListTodosResponse {
  data: Todo[];
}

interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

export const listTodos = (query: any): Promise<Todo[]> => {
  return new Promise<Todo[]>((resolve, reject) => {
    axios
      .get<ListTodosResponse>(
        `${API_BASE_URL}/api/v1/todo?${qs.stringify(query)}`,
        {}
      )
      .then((res) => resolve(res.data.data))
      .catch((err) => reject(err.response.data as ErrorResponse));
  });
};

export const addTodo = (payload: any): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    axios
      .post(`${API_BASE_URL}/api/v1/todo`, payload, {})
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data as ErrorResponse));
  });
};

export const updateTodo = (param: number, payload: any): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    axios
      .patch(`${API_BASE_URL}/api/v1/todo/${param}`, payload)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data as ErrorResponse));
  });
};

export const deleteTodo = (param: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    axios
      .delete(`${API_BASE_URL}/api/v1/todo/${param}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.data as ErrorResponse));
  });
};

export const getById = (param: string): Promise<Todo> => {
  return new Promise<Todo>((resolve, reject) => {
    axios
      .get(`${API_BASE_URL}/api/v1/todo/${param}`)
      .then((res) => resolve(res.data.data))
      .catch((err) => reject(err.response.data as ErrorResponse));
  });
};
