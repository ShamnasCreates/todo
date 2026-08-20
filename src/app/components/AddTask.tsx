"use client";

import { useRef, useState } from "react";
import { useEffect } from "react";
import { db } from "../lib/db";

export default function AddTask({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const [task, setTask] = useState("");

  const completed = false;

  // const [status, setStatus] = useState("");

  async function addTaskDate() {
    try {
      let date = (await params).date; 

      // Add the new friend!
      const todo_id = await db.todo.add({
        task,
        completed,
      });

      const todoDate_id = await db.todoDate.add({
        todo_id,
        date,
      });

      // setStatus(`Friend ${name} successfully added. Got id ${id}`);
      setTask("");
      console.log(`New Task with id ${todo_id}`);
      console.log(`New Date Task with id ${todoDate_id}`);
    } catch (error) {
      console.log("Error at addtaskDate()");
    }
  }


  function handleChange(e) {
    setTask(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await addTaskDate(); 
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between bg-whiteX rounded-full">
          <div className="min-h-20 min-w-12 bg-whiteX text-blackX rounded-l-full flex justify-center items-center p-4">
            <button
              className="material-symbols-outlined bg-blackX text-whiteX rounded-full"
              style={{ fontSize: 48 }}
            >
              add
            </button>
          </div>
          <input
            className="min-h-20 w-full bg-whiteX text-blackX outline-none grow"
            type="text"
            placeholder="Add Task"
            value={task}
            onChange={handleChange}
          />
          <div className="min-h-20 min-w-12 bg-whiteX text-blackX rounded-r-full"></div>
        </div>
      </form>
    </div>
  );
}
