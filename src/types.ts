export interface Todo {
  id: number;
  title: string;
  day?: string;
  month?: string;
  year?: string;
  completed?: boolean;
  description?: string;
}

export type NewTodo = Omit<Todo, "id">;

export type TodoWithDueDate = Todo & { due_date: string }

export interface ContentProps {
  currentTodos: Todo[];
  currentSection: CurrentSection;
  handleAddNewClick: () => void;
  handleCompletionToggle: (event: React.MouseEvent, id: number) => void;
  handleTodoClick: (event: React.MouseEvent, id: number) => void;
  handleDeleteClick: (id: number) => void;
}

export type SelectedTodo = Todo | null;

export interface ModalProps {
  allTodos: Todo[];
  setAllTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  currentTodos: Todo[];
  setCurrentTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  selectedTodo: SelectedTodo;
  closeModal: () => void;
  currentSection: CurrentSection;
  setCurrentSection: React.Dispatch<React.SetStateAction<CurrentSection>>;
}

export interface SidebarProps {
  allTodos: Todo[];
  completedTodos: Todo[];
  sortedDueDateTallies: DueDateTally[];
  handleAllTodosNavClick: () => void;
  handleAllListNavClick: (event: React.MouseEvent) => void;
  sortedCompletedDueDateTallies: DueDateTally[];
  handleAllCompletedTodosNavClick: () => void;
  handleCompletedListNavClick: (event: React.MouseEvent) => void;
  currentSection: CurrentSection;
}

export interface TodosByDate {
  [dueDate: string]: TodoWithDueDate[];
}

export interface CurrentSection {
  title: string;
  type: 'all' | 'completed';
}

export interface DueDateTally {
  [dueDate: string]: number;
}
