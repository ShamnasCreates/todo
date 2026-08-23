"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";

// Date Navigation
export default function DateNav({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = use(params);
  const { push } = useRouter();
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [text, setText] = useState("");

  // for validating url
  let currentDate = new Date();
  let dateFormat = currentDate.toLocaleDateString().replaceAll("/", "-");
  let dateCheck = date.replaceAll("-", "/");

  // Validate date
  useEffect(() => {
    if (!isValidDate(new Date(dateCheck))) {
      goToToday();
    }

    setTextFormat()
  });

  function getMonSun() {
    // this current week 
    let thisDate = new Date(dateCheck);
    let diffMonday;
    if (thisDate.getDay() != 0)
    {
      diffMonday = 1 - thisDate.getDay();   
    }else 
    {
      diffMonday = -6; 
    }
    
    let currentMonday = new Date(thisDate)
    currentMonday.setDate(currentMonday.getDate() + diffMonday)
    let currentSunday = new Date(thisDate)
    currentSunday.setDate(currentSunday.getDate() + diffMonday + 6)  

    // last week 
    let lastWeek = new Date(dateCheck);
    lastWeek.setDate(lastWeek.getDate() - 7)
    let diffMondayLastWeek;
    if (lastWeek.getDay() != 0)
    {
      diffMondayLastWeek = 1 - lastWeek.getDay();   
    }else 
    {
      diffMondayLastWeek = -6; 
    }
  
    let lastMonday = new Date(lastWeek)
    lastMonday.setDate(lastMonday.getDate() + diffMondayLastWeek)
    let lastSunday = new Date(lastWeek)
    lastSunday.setDate(lastSunday.getDate() + diffMondayLastWeek + 6)


    // next week 
    let nextWeek = new Date(dateCheck);
    nextWeek.setDate(nextWeek.getDate() + 7)
    let diffMondayNextWeek;
    if (nextWeek.getDay() != 0)
    {
      diffMondayNextWeek = 1 - nextWeek.getDay();   
    }else 
    {
      diffMondayNextWeek = -6; 
    }

    let nextMonday = new Date(nextWeek)
    nextMonday.setDate(nextMonday.getDate() + diffMondayLastWeek)
    let nextSunday = new Date(nextWeek)
    nextSunday.setDate(nextSunday.getDate() + diffMondayLastWeek + 6)


    // too compare to end of sunday 
    lastSunday.setHours(23, 59, 59, 999);
    currentSunday.setHours(23, 59, 59, 999);
    nextSunday.setHours(23, 59, 59, 999);


    return [lastMonday, lastSunday, currentMonday, currentSunday, nextMonday, nextSunday]

  }



  function setTextFormat()
  {

    let check = new Date(); 



    let today = new Date(dateCheck);

    if (today.getDate() == check.getDate())
    {
      setText("Today");
      return; 
    } 
    else if (today.getDate() + 1 == check.getDate())
    {
      setText("Yesterday");
      return; 
    }
    else if (today.getDate() - 1 == check.getDate())
    {
      setText("Tomorrow");
      return; 
    }


    // name it Monday - Sunday with Last, Current, Next 
    // Time works backwards 
    let monSun = getMonSun();
    let day = new Date(dateCheck).getDay();
    //          to                                                 from 
    if (check.getTime() <= monSun[1].getTime() && check.getTime() >= monSun[0].getTime())
    {
      // next week
      setText("Next " + weekday[day]);
      return;

    } else if (check.getTime() <= monSun[3].getTime() && check.getTime() >= monSun[2].getTime())
    {
      // this week
      setText(weekday[day]);
      return;
    }
    else if(check.getTime() <= monSun[5].getTime() && check.getTime() >= monSun[4].getTime())
    {
      // last week 
      setText("Last " + weekday[day]);
      return;
    
    }
    else 
    {
      setText(date);
      return;
    }

  }

  // go to current date
  function goToToday() {
    push("/todo/" + dateFormat);
  }

  function setYeterday() {
    let thisDay = new Date(date);
    thisDay.setDate(thisDay.getDate() - 1);

    let yesterdayFormat = thisDay.toLocaleDateString().replaceAll("/", "-");
    push("/todo/" + yesterdayFormat);
  }

  function setTomorrow() {
    let thisDay = new Date(date);
    thisDay.setDate(thisDay.getDate() + 1);

    let tomorrowFormat = thisDay.toLocaleDateString().replaceAll("/", "-");
    push("/todo/" + tomorrowFormat);
  }

  function isValidDate(date : Date) {
    return date instanceof Date && !isNaN(date.getTime());
  }

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="font-libre text-4xl mt-8 mb-6">{text}</div>

      <div className="flex flex-row gap-x-2 noselect">
        <button
          onClick={setYeterday}
          style={{ fontSize: 32 }}
          className="material-symbols-outlined bg-whiteX text-blackX rounded-full cursor-pointer"
        >
          arrow_left
        </button>

        <button
          onClick={goToToday}
          style={{ fontSize: 12 }}
          className="material-symbols-outlined material-symbols-filled bg-whiteX text-blackX rounded-full p-2.5 cursor-pointer"
        >
          square
        </button>

        <button
          onClick={setTomorrow}
          style={{ fontSize: 32 }}
          className="material-symbols-outlined bg-whiteX text-blackX rounded-full cursor-pointer"
        >
          arrow_right
        </button>
      </div>
    </div>
  );
}
