import { SidebarProps } from "../types";

const Sidebar = ({
  allTodos,
  completedTodos,
  sortedDueDateTallies,
  handleAllTodosNavClick,
  handleAllListNavClick,
  sortedCompletedDueDateTallies,
  handleAllCompletedTodosNavClick,
  handleCompletedListNavClick,
  currentSection,
}: SidebarProps) => {

  return (
    <div id="sidebar">
      <section id="all">
        <div id="all_todos">
          <header
            data-title="All Todos"
            data-total={allTodos.length}
            id="all_header"
            className={currentSection.type === 'all' 
              && currentSection.title === "All Todos" 
              ? "active" : ""}
          >
            <dl onClick={handleAllTodosNavClick}>
              <dt>All Todos</dt>
              <dd>{allTodos.length}</dd>
            </dl>
          </header>
        </div>
        <article id="all_lists">
          {sortedDueDateTallies.map((todoTally) => {
            const dueDate = Object.keys(todoTally)[0];
            return (
              <dl
                key={dueDate}
                data-title={dueDate}
                data-total={todoTally[dueDate]}
                className={currentSection.type === 'all' 
                  && currentSection.title === dueDate 
                  ? "active" : ""}
                onClick={handleAllListNavClick}
              >
                <dt>
                  <time>{dueDate}</time>
                </dt>
                <dd>{todoTally[dueDate]}</dd>
              </dl>
            );
          })}
        </article>
      </section>
      <section className="completed" id="completed_items">
        <div id="completed_todos">
          <header
            data-title="Completed"
            data-total={completedTodos.length}
            id="all_done_header"
            className={currentSection.type === 'completed' 
              && currentSection.title === "Completed Todos" 
              ? "active" : ""}
          >
            <dl onClick={handleAllCompletedTodosNavClick}>
              <dt>Completed</dt>
              <dd>{completedTodos.length ? completedTodos.length : 0}</dd>
            </dl>
          </header>
        </div>
        <article id="completed_lists">
          {sortedCompletedDueDateTallies.map((completedTodoTally) => {
            const dueDate = Object.keys(completedTodoTally)[0];
            return (
            <dl 
              key={dueDate}
              data-title={dueDate}
              data-total={completedTodoTally[dueDate]}
              id={dueDate}
              className={currentSection.type === 'completed' 
                && currentSection.title === dueDate 
                ? "active" : ""}
              onClick={handleCompletedListNavClick}
            >
              <dt><time>{dueDate}</time></dt>
              <dd>{completedTodoTally[dueDate]}</dd>
            </dl>
            )
          })}
        </article>
      </section>
    </div>
  );
};

export default Sidebar;
