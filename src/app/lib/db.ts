// db.ts
import { Dexie, Table, type EntityTable } from "dexie";

// Types 
interface Todo {
  id: number;
  task: string;
  completed: boolean;
}
interface TodoDate {
  todo_id: number;
  date: string;
}

// for typescript 
const db = new Dexie("TodoDate") as Dexie & {
  todo: EntityTable<Todo, "id">; // primary key "id" (for the typings only)
  todoDate: Table<TodoDate, number>; 
};

// Schema declaration:
db.version(2).stores({
  todo: "++id, task, completed", // primary key "id" (for the runtime!)
  todoDate: "todo_id, date",
});

// to reuse 
export type { Todo, TodoDate };
export { db };
