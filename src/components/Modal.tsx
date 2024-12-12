import { SyntheticEvent, useState } from "react";
import { Todo, NewTodo, ModalProps, SelectedTodo, CurrentSection } from "../types";
import todoService from "../services/todoService";

import { validateDay, validateMonth, validateYear, validTitle, getFilteredTodos, sortTodosByCompletion } from "../utils";

const Modal = ({
  allTodos,
  setAllTodos,
  currentTodos,
  setCurrentTodos,
  selectedTodo,
  closeModal,
  currentSection,
  setCurrentSection,
}: ModalProps) => {
  const [title, setTitle] = useState<string>(
    selectedTodo ? selectedTodo.title : ""
  );
  const [day, setDay] = useState<string>(
    selectedTodo && selectedTodo.day ? selectedTodo.day : ""
  );
  const [month, setMonth] = useState<string>(
    selectedTodo && selectedTodo.month ? selectedTodo.month : ""
  );
  const [year, setYear] = useState<string>(
    selectedTodo && selectedTodo.year ? selectedTodo.year : ""
  );
  const [completed, setCompleted] = useState<boolean>(
    selectedTodo && selectedTodo.completed ? selectedTodo.completed : false
  );
  const [description, setDescription] = useState<string>(
    selectedTodo && selectedTodo.description ? selectedTodo.description : ""
  );

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    switch (event.currentTarget.name) {
      case "title":
        setTitle(event.currentTarget.value);
        break;
      case "due_day":
        setDay(event.currentTarget.value);
        break;
      case "due_month":
        setMonth(event.currentTarget.value);
        break;
      case "due_year":
        setYear(event.currentTarget.value);
        break;
      case "description":
        setDescription(event.currentTarget.value);
        break;
      default:
    }
  };

  const handleFormSubmission = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validTitle(title)) {
      alert("You must enter a title at least 3 characters long.");
      return;
    }

    if (selectedTodo) {
      handleEditSubmission();
    } else {
      handleNewSubmission();
    }
  };

  const handleEditSubmission = () => {
    const id = selectedTodo!.id;

    const updatedTodo: Todo = {
      id: id,
      title: title,
      day: validateDay(day),
      month: validateMonth(month),
      year: validateYear(year),
      completed: completed,
      description: description,
    };

    todoService
      .updateTodo(updatedTodo)
      .then((returnedTodo) => {
        const updatedAllTodos = allTodos.map(todo => todo.id === id ? returnedTodo : todo);
        setAllTodos(updatedAllTodos);
        setCurrentTodos(getFilteredTodos(updatedAllTodos, currentSection));
      })
      .catch((error) => console.error("Failed to update todo:", error));

    closeModal();
  };

  const handleNewSubmission = () => {
    const newTodo: NewTodo = {
      title: title,
      day: day,
      month: month,
      year: year,
      completed: completed,
      description: description,
    };

    todoService
      .createNewTodo(newTodo)
      .then((returnedTodo) => {
        const updatedAllTodos = sortTodosByCompletion(allTodos.concat(returnedTodo));
        const newSection: CurrentSection = { title: "All Todos", type: 'all' };
        setAllTodos(updatedAllTodos);
        setCurrentSection(newSection);
        setCurrentTodos(getFilteredTodos(updatedAllTodos, newSection));
      })
      .catch((error) => console.error("Failed to add new todo:", error));

    closeModal();
  };

  const handleMarkAsComplete = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!selectedTodo) {
      alert("Cannot mark as complete as item has not been created yet!");
    } else {
      setCompleted(true);
      const changedTodo: SelectedTodo = { ...selectedTodo, completed: true };
      todoService
        .updateTodo(changedTodo)
        .then((returnedTodo) => {
          setAllTodos(
            allTodos.map(todo =>
              todo.id === changedTodo.id ? returnedTodo : todo
            ))
          setCurrentTodos(
            currentTodos.map(todo => todo.id === changedTodo.id ? returnedTodo : todo)
          );
          closeModal();
        })
        .catch((error) => console.error("Failed to update todo:", error));
    }
  };

  return (
    <>
      <div className="modal" id="modal_layer" onClick={closeModal}></div>
      <div className="modal" id="form_modal">
        <form action="" method="post" onSubmit={handleFormSubmission}>
          <fieldset>
            <ul>
              <li>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Item 1"
                  value={title}
                  onChange={handleInputChange}
                />
              </li>
              <li>
                <label htmlFor="due">Due Date</label>
                <div className="date">
                  <select
                    id="due_day"
                    name="due_day"
                    value={day}
                    onChange={handleInputChange}
                  >
                    <option>Day</option>
                    <option value="01">1</option>
                    <option value="02">2</option>
                    <option value="03">3</option>
                    <option value="04">4</option>
                    <option value="05">5</option>
                    <option value="06">6</option>
                    <option value="07">7</option>
                    <option value="08">8</option>
                    <option value="09">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                  </select>{" "}
                  /
                  <select
                    id="due_month"
                    name="due_month"
                    value={month}
                    onChange={handleInputChange}
                  >
                    <option>Month</option>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>{" "}
                  /
                  <select
                    id="due_year"
                    name="due_year"
                    value={year}
                    onChange={handleInputChange}
                  >
                    <option>Year</option>
                    <option>2014</option>
                    <option>2015</option>
                    <option>2016</option>
                    <option>2017</option>
                    <option>2018</option>
                    <option>2019</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                    <option>2023</option>
                    <option>2024</option>
                    <option>2025</option>
                  </select>
                </div>
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  cols={Number("50")}
                  name="description"
                  rows={Number("7")}
                  placeholder="Description"
                  value={description}
                  onChange={handleInputChange}
                ></textarea>
              </li>
              <li>
                <input type="submit" value="Save" />
                <button name="complete" onClick={handleMarkAsComplete}>
                  Mark As Complete
                </button>
              </li>
            </ul>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default Modal;
