"use client";

import { useState } from "react";
import clsx from "clsx";

export default function TaskView() {
  const [index, setIndex] = useState(false);

  function handleClick() {
    setIndex(!index);
  }

  return (
    <div>
      <div
        className={clsx("flex justify-between bg-whiteX rounded-full", {
          "bg-yellowX": !index,
          "bg-greenX": index,
        })}
      >
        <div
          className={clsx(
            "min-h-20 min-w-12 text-blackX rounded-l-full flex justify-center items-center p-4",
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
        <p
          className={clsx(
            "min-h-20 w-full text-blackX outline-none grow flex items-center",
            { "bg-yellowX": !index, "bg-greenX": index },
          )}
        >
          Add Task
        </p>
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
