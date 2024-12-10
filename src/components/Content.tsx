import { ContentProps } from "../types";
import { displayDueDate } from "../utils";
import hamburger from '../assets/public/images/hamburger.png'
import plus from '../assets/public/images/plus.png';
import trash from '../assets/public/images/trash.png';

const Content = ({
  currentTodos,
  currentSection,
  handleAddNewClick,
  handleCompletionToggle,
  handleTodoClick,
  handleDeleteClick,
}: ContentProps) => {
  return (
    <>
    <header>
      <label htmlFor="sidebar_toggle">
        <img src={hamburger} alt="Toggle Sidebar" />
      </label>
      <dl>
        <dt><time>{currentSection.title}</time></dt>
        <dd>{currentTodos.length}</dd>
      </dl>
    </header>
      <main>
        <label htmlFor="new_item" onClick={handleAddNewClick}>
          <img src={plus} alt="Add Todo Item" />
          <h2>Add new to do</h2>
        </label>

        <table cellSpacing="0">
          <tbody>
            {currentTodos.map((todo) => (
              <tr key={todo.id} data-id={todo.id}>
                <td
                  className="list_item"
                  onClick={(event) => handleCompletionToggle(event, todo.id)}
                >
                  <input
                    type="checkbox"
                    name={`item_${todo.id}`}
                    id={`item_${todo.id}`}
                    checked={todo.completed}
                    onChange={() => console.log("This shouldn't happen")}
                  />
                  <span className="check"></span>
                  <label
                    htmlFor={`item_${todo.id}`}
                    onClick={(event) => handleTodoClick(event, todo.id)}
                  >
                    {todo.title} - {displayDueDate(todo)}
                  </label>
                </td>
                <td
                  className="delete"
                  onClick={() => handleDeleteClick(todo.id)}
                >
                  <img src={trash} alt="Delete" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default Content;
