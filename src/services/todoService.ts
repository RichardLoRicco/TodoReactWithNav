import axios from "axios";
import { Todo, NewTodo } from "../types";

const baseUrl = "http://localhost:3000/api";

const getAllTodos = () => {
  return axios
    .get<Todo[]>(`${baseUrl}/todos`)
    .then((response) => response.data);
};

const createNewTodo = (newTodoObject: NewTodo) => {
  return axios
    .post<Todo>(`${baseUrl}/todos`, newTodoObject)
    .then((response) => response.data);
};

const deleteTodo = (id: number) => {
  return axios
    .delete<Todo>(`${baseUrl}/todos/${id}`)
    .then((response) => response.data);
};

const updateTodo = (updatedTodoObject: Todo) => {
  return axios
    .put<Todo>(`${baseUrl}/todos/${updatedTodoObject.id}`, updatedTodoObject)
    .then((response) => response.data);
};

export default {
  getAllTodos,
  createNewTodo,
  deleteTodo,
  updateTodo,
};
