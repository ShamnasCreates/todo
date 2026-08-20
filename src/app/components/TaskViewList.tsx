"use client";

import { db } from "../lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import TaskView from "./TaskView";

// list of taskviews, 
export default function TaskViewList({
  params,
}: {
  params: Promise<{ date: string }>;
}) {

  // return a list of todos based on date of url 
  const todayDo = useLiveQuery(async () => {

    // Query Dexie's API
    const friends = await db.todoDate
      .where("date")
      .equals((await params).date)
      .sortBy("todo_id");

    let todoArray = [];

    for (const todo of friends) {
      let test = await db.todo.where("id").equals(todo.todo_id).first();

      todoArray.push(test);
    }

    console.log(todoArray);
    // Return result
    return todoArray;
  });

  // renders list of items 
  return (
    <ul className="grow gap-5 flex flex-col overflow-y-auto overflow-hidden scroll min-h-0">
      {todayDo?.map((todo) => (
        <li className="" key={todo.id}>
          <TaskView id={todo.id} task={todo.task} completed={todo.completed} />
        </li>
      ))}
    </ul>
  );
}
