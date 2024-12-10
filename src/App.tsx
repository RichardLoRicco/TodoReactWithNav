import './assets/stylesheets/reset.css';
import './assets/stylesheets/todo_v2.css';
import { useState, useEffect } from "react";
import todoService from "./services/todoService";
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";
import Modal from "./components/Modal";
import {
  addDueDate,
  findTodo,
  sortTodosByCompletion,
  filterTodos,
  groupTodosByDueDate,
  createDueDateTallies,
  sortDueDateTallies,
} from "./utils";

import { Todo, SelectedTodo, TodoWithDueDate, CurrentSection } from "./types";

const App = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<SelectedTodo>(null);
  const [currentTodos, setCurrentTodos] = useState<Todo[]>([]);
  const [currentSection, setCurrentSection] = useState<CurrentSection>({
    title: "",
    type: 'all',
  });
  
  useEffect(() => {
    todoService.getAllTodos().then((data) => {
      const sortedTodoData = sortTodosByCompletion(data);
      setAllTodos(sortedTodoData);
      setCurrentTodos(sortedTodoData);
      setCurrentSection({ title: "All Todos", type: 'all' });
    });
  }, []);

  const allTodosWithDueDates: TodoWithDueDate[] = allTodos.map((todo) =>
    addDueDate(todo)
  );
  
  const completedTodos = filterTodos(true, null, allTodosWithDueDates);
  const allTodosByDueDate = groupTodosByDueDate(allTodosWithDueDates);
  const completedTodosByDueDate = groupTodosByDueDate(completedTodos);
  const allTodoTallies = createDueDateTallies(allTodosByDueDate);
  const completedTodoTallies = createDueDateTallies(completedTodosByDueDate);
  const sortedDueDateTallies = sortDueDateTallies(allTodoTallies);
  const sortedCompletedDueDateTallies = sortDueDateTallies(completedTodoTallies);
 
  const handleAddNewClick = () => {
    setSelectedTodo(null);
    setModalStatus(true);
  };

  const handleTodoClick = (event: React.MouseEvent, id: number) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedTodo(findTodo(allTodos, id));
    setModalStatus(true);
  };

  const handleCompletionToggle = (_event: React.MouseEvent, id: number) => {
    const todo = allTodos.find((todo) => todo.id === id)!;
    const changedTodo: Todo = { ...todo, completed: !todo.completed };
    todoService
      .updateTodo(changedTodo)
      .then((returnedTodo) => {
        setAllTodos(
          allTodos.map((todo) => (todo.id === id ? returnedTodo : todo))
        );

        if (currentSection.type === 'completed') {
          setCurrentTodos(
            currentTodos.map((todo) => (todo.id === id ? returnedTodo : todo))
            .filter((todo) => todo.completed)
          );
        } else {
          setCurrentTodos(
            currentTodos.map((todo) => (todo.id === id ? returnedTodo : todo))
          );
        }
      })
      .catch((error) => console.error("Failed to update todo:", error));
  };

  const handleDeleteClick = (id: number) => {
    todoService
      .deleteTodo(id)
      .then(() => {
        setAllTodos(allTodos.filter((todo) => todo.id !== id));
        setCurrentTodos(currentTodos.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.error("Failed to delete todo:", error));
  };

  const closeModal = () => {
    setModalStatus(false);
    setSelectedTodo(null);
  };

  const handleAllTodosNavClick = () => {
    setCurrentTodos(allTodos);
    setCurrentSection({ title: "All Todos", type: 'all' });
  };

  const handleAllListNavClick = (event: React.MouseEvent) => {
    const dueDate = event.currentTarget.querySelector("time")?.textContent;
    if (dueDate) {
      setCurrentTodos(allTodosByDueDate[dueDate]);
      setCurrentSection({ title: dueDate, type: 'all' });
    }
  };

  const handleAllCompletedTodosNavClick = () => {
    setCurrentTodos(completedTodos);
    setCurrentSection({ title: "Completed Todos", type: 'completed' });
  };

  const handleCompletedListNavClick = (event: React.MouseEvent) => {
    const dueDate = event.currentTarget.querySelector("time")?.textContent;
    if (dueDate) {
      setCurrentTodos(completedTodosByDueDate[dueDate]);
      setCurrentSection({ title: dueDate, type: 'completed' });
    }
  };

  return (
    <div>
      <Sidebar
        allTodos={allTodos}
        completedTodos={completedTodos}
        sortedDueDateTallies={sortedDueDateTallies}
        handleAllTodosNavClick={handleAllTodosNavClick}
        handleAllListNavClick={handleAllListNavClick}
        sortedCompletedDueDateTallies={sortedCompletedDueDateTallies}
        handleAllCompletedTodosNavClick={handleAllCompletedTodosNavClick}
        handleCompletedListNavClick={handleCompletedListNavClick}
        currentSection={currentSection}
      />
      <div id="items">
        <Content
          currentTodos={currentTodos}
          currentSection={currentSection}
          handleAddNewClick={handleAddNewClick}
          handleCompletionToggle={handleCompletionToggle}
          handleTodoClick={handleTodoClick}
          handleDeleteClick={handleDeleteClick}
        />

        {modalStatus && (
          <Modal
            allTodos={allTodos}
            setAllTodos={setAllTodos}
            currentTodos={currentTodos}
            setCurrentTodos={setCurrentTodos}
            selectedTodo={selectedTodo}
            closeModal={closeModal}
            currentSection={currentSection} 
            setCurrentSection={setCurrentSection}
          />
        )}
      </div>
    </div>
  );
};

export default App;
