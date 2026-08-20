"use client";

import { useState } from "react";
import clsx from "clsx";
import { db, Todo } from "../lib/db";

// shows task view with different colors based on if task is completed, props based on todo type
export default function TaskView({ id, task, completed }: Todo) {
  const [index, setIndex] = useState(completed);

  // saves information in UI render and database
  async function handleClick() {
    await db.todo.update(id, { completed: !index });
    console.log(`Updated ${id} to ${index}`);
    setIndex(!index);
  }

  // return one task view
  return (
    <div>
      {/* entire taskview bar to color area that is missing colors due to flex  */}
      <div
        className={clsx("flex justify-between rounded-full", {
          "bg-yellowX": !index,
          "bg-greenX": index,
        })}
      >
        {/* left of task, noselect for checkbox */}
        <div
          className={clsx(
            "min-h-20 min-w-12 text-blackX rounded-l-full flex justify-center items-center p-4 noselect",
            { "bg-yellowX": !index, "bg-greenX": index },
          )}
        >
          <button
            onClick={handleClick}
            className={clsx(
              "material-symbols-outlined bg-blackX rounded-full p-2",
              { "text-yellowX": !index, "text-greenX": index },
            )}
            style={{ fontSize: 32 }}
          >
            {index ? "check_box" : "check_box_outline_blank"}
          </button>
        </div>
        {/* name of task  */}
        <p
          className={clsx(
            "min-h-20 w-full text-blackX outline-none grow flex items-center",
            { "bg-yellowX": !index, "bg-greenX": index },
          )}
        >
          {task}
        </p>

        {/* right of task  */}
        <div
          className={clsx("min-h-20 min-w-12 text-blackX rounded-r-full", {
            "bg-yellowX": !index,
            "bg-greenX": index,
          })}
        ></div>
      </div>
    </div>
  );
}
