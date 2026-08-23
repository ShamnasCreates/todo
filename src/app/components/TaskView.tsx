"use client";

import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { db, Todo } from "../lib/db";
import type { ChangeEvent, SyntheticEvent } from "react";

// shows task view with different colors based on if task is completed, props based on todo type
export default function TaskView({ id, task, completed }: Todo) {
  const [check, setCheck] = useState(completed);
  const [more, setMore] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(task);
  const taskView = useRef<HTMLDivElement>(null);
  const editText = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // close more options on outside click
    const handleMoreOutside = (e : MouseEvent) => {
      if (edit && !taskView.current?.contains(e.target as Node)) {
        setEdit(false);
        setText(task);
      }
      if (more && !taskView.current?.contains(e.target as Node)) {
        setMore(false);
      }
    };

    // focused on text to edit 
    if (edit) {
      editText.current?.focus();
    }

    // opens more options
    document.addEventListener("click", handleMoreOutside);
  });

  // saves information in UI render and database
  async function handleCheck() {
    await db.todo.update(id, { completed: !check });
    setCheck(!check);
  }

  // handles closing and opening the more options
  function handleMore() {
    // undo if edit is closed
    if (edit) {
      setEdit(false);
      setText(task);
    }
    setMore(!more);
  }

  // deletes view
  async function handleDelete() {
    // do not switch these statements, needs to be deleted in this order
    await db.todoDate.delete(id);
    await db.todo.delete(id);
  }

  // handle edit feature view
  async function handleEdit() {
    // updates before turning off
    if (edit) {
      await db.todo.update(id, { task: text });
    } 

    setEdit(!edit);
  }

  async function handleSubmitEdit(e : SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    await handleEdit();
  }

  function handleEditChange(e : ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  // return one task view
  return (
    <div className="flex flex-col" ref={taskView}>
      {/* entire taskview bar to color area that is missing colors due to flex  */}

      {/* top of view, basic */}
      <div
        className={clsx(
          "flex justify-between",
          { "bg-yellowX": !check, "bg-greenX": check },
          {
            " rounded-full": !more,
            "rounded-t-[42px] border-b border-blackX": more,
          },
        )}
      >
        {/* left of task, noselect for checkbox */}
        <div
          className={clsx(
            "min-h-20 min-w-12 text-blackX flex justify-center items-center p-4 noselect",
            { "bg-yellowX": !check, "bg-greenX": check },
            { "rounded-l-full": !more, "rounded-tl-[42px]": more },
          )}
        >
          <button
            onClick={handleCheck}
            className={clsx(
              "material-symbols-outlined bg-blackX rounded-full p-2 cursor-pointer",
              { "text-yellowX": !check, "text-greenX": check },
            )}
            style={{ fontSize: 32 }}
          >
            {check ? "check_box" : "check_box_outline_blank"}
          </button>
        </div>
        {/* name of task: conditional to edit */}
        {!edit ? (
          <p
            style={{ whiteSpace: "pre-wrap" }}
            className={clsx(
              "min-h-20 w-full text-blackX outline-none grow flex items-center overflow-x-scroll scroll",
              { "bg-yellowX": !check, "bg-greenX": check },
            )}
          >
            {text}
          </p>
        ) : (
          <form onSubmit={handleSubmitEdit} className="w-full">
            <input
              ref={editText}
              type="text"
              value={text}
              onChange={handleEditChange}
              className={clsx(
                "min-h-20 w-full text-blackX outline-none grow flex items-center overflow-x-scroll scroll",
                { "bg-yellowX": !check, "bg-greenX": check },
              )}
            ></input>
          </form>
        )}

        {/* right of task  */}
        <div
          className={clsx(
            "min-h-20 min-w-12 text-blackX flex justify-center items-center p-4 noselect",
            { "bg-yellowX": !check, "bg-greenX": check },
            { "rounded-r-full": !more, "rounded-tr-[42px]": more },
          )}
        >
          <button
            onClick={handleMore}
            className={clsx(
              "material-symbols-outlined bg-blackX rounded-full cursor-pointer",
              { "text-yellowX": !check, "text-greenX": check },
            )}
            style={{ fontSize: 32 }}
          >
            more_horiz
          </button>
        </div>
      </div>

      {/* bottom of view, more */}
      <div
        className={clsx(
          "flex min-h-10.5 justify-evenly",
          { "bg-yellowX": !check, "bg-greenX": check },
          { hidden: !more, "visible rounded-b-full": more },
        )}
      >
        {/* left side of bottom. edit */}
        <button
          onClick={handleEdit}
          className="text-blackX flex justify-center items-center w-full border-t border-r  rounded-bl-full"
        >
          {edit ? "Finish Edit" : "Edit"}
        </button>

        {/* right side of bottom, delete */}
        <button
          onClick={handleDelete}
          className="text-blackX  flex justify-center items-center w-full border-t border-l rounded-br-full"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
