import { CurrentSection, DueDateTally, Todo, TodosByDate, TodoWithDueDate } from "./types";

export const sortTodosByCompletion = (allTodos: Todo[]): Todo[] => {
  return allTodos.sort((a, b) => {
    if (a.completed && !b.completed) {
      return 1;
    } else if (!a.completed && b.completed) {
      return -1;
    } else {
      return 0;
    }
  });
}

export const findTodo = (allTodos: Todo[], todoId: number): Todo => {
  return allTodos.find(todo => todo.id === todoId)!;
} 

export const displayDueDate = (todo: Todo) => {
  const month = todo.month;
  const year = todo.year;

  if (month === '  ' || year === '    ' || !month || !year) {
    return "No Due Date";
  } else {
    return `${month}/${year.slice(-2)}`;
  }
}

export const addDueDate = (todo: Todo): TodoWithDueDate => {
  return {...todo, 'due_date': displayDueDate(todo) }
}


export const filterTodos = (filterByCompleted = false, dueDate = null, todos: TodoWithDueDate[]) => {
  if (!filterByCompleted && !dueDate) {
    return todos;

  } else if (!filterByCompleted && dueDate) {
    return todos.filter(todo => {
      return todo.due_date === dueDate;
    });

  } else if (filterByCompleted && !dueDate) {
    return todos.filter(todo => {
      return todo.completed;
    });

  } else {
    return todos.filter(todo => {
      return todo.completed && todo.due_date === dueDate;
    });
  }
}

export const validateDay = (day: string): string => {
  return Number(day) ? day : '  ';
}

export const validateMonth = (month: string): string => {
  return Number(month) ? month : '  ';
}

export const validateYear = (year: string): string => {
  return Number(year) ? year : '    ';
}

export const validTitle = (title: string): boolean => {
  return title.length >= 3;
}

export const groupTodosByDueDate = (todos: TodoWithDueDate[]) => {
  const todosByDate: TodosByDate = {};

  todos.forEach(todo => {
    if (todosByDate[todo.due_date]) {
      todosByDate[todo.due_date].push(todo);
    } else {
      todosByDate[todo.due_date] = [todo]
    }
  })
  return todosByDate;
}

export const createDueDateTallies = (groupedTodos: TodosByDate) => {
  const dueDateTally: DueDateTally[] = [];

  Object.keys(groupedTodos).forEach(dueDate => {
    dueDateTally.push({ [dueDate]: groupedTodos[dueDate].length });
  })

  return dueDateTally;
}

export const sortDueDateTallies = (dueDateTallies: DueDateTally[]) => {
  return dueDateTallies.sort((a, b) => {
    const monthA = Number(Object.keys(a)[0].slice(0, 2));
    const monthB = Number(Object.keys(b)[0].slice(0, 2));
    const yearA = Number(Object.keys(a)[0].slice(3, 5));
    const yearB = Number(Object.keys(b)[0].slice(3, 5));

    if (Object.keys(a)[0] === 'No Due Date') {
      return -1;
    } else if (Object.keys(b)[0] === 'No Due Date') {
      return 1;
    } else if (monthA < monthB) {
      return -1;
    } else if (monthA > monthB) {
      return 1;
    } else {
      if (yearA < yearB) {
        return -1
      } else if (yearA > yearB) {
        return 1;
      } else {
        return 0;
      }
    }
  })
}

export const getFilteredTodos = (allTodos: Todo[], currentSection: CurrentSection): Todo[] => {
  const allTodosWithDueDates: TodoWithDueDate[] = allTodos.map((todo) => addDueDate(todo));
  const { title, type } = currentSection;

  if (type === 'all') {
    if (title === "All Todos") {
      return allTodos;
    } else {
      const allTodosByDueDate = groupTodosByDueDate(allTodosWithDueDates);
      return allTodosByDueDate[title] || [];
    }
  } else {
    const completedTodos = allTodosWithDueDates.filter(todo => todo.completed);
    if (title === "Completed Todos") {
      return completedTodos;
    } else {
      const completedTodosByDueDate = groupTodosByDueDate(completedTodos);
      return completedTodosByDueDate[title] || [];
    }
  }
}