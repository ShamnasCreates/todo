export type TodoTask = {
  id: number;
  text: string;
  completed: boolean;
}

export type TodoList = 
{
  taskList : TodoTask[]; 
  date: string; 
}

