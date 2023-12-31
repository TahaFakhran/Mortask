import React, { useState, useEffect } from "react";
import { Tooltip } from 'flowbite-react';
const MonthViewCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tasksForUser, setTasksForUser] = useState([]);

  const prevMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };

  const nextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const startDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();
  const totalDays = getDaysInMonth(
    currentMonth.getMonth(),
    currentMonth.getFullYear()
  );

  const daysArray = Array.from({ length: startDay }, (_, i) => null);
  const daysOfMonth = Array.from({ length: totalDays }, (_, i) => i + 1);

  const renderTasksForDay = (day) => {
    const dayTasks = tasksForUser.filter((task) => {
      const taskDate = new Date(task.todoTask_deadline);
      return (
        taskDate.getDate() === day &&
        taskDate.getMonth() === currentMonth.getMonth() &&
        taskDate.getFullYear() === currentMonth.getFullYear()
      );
    });

    if (dayTasks.length === 0) {
      return null;
    }

    return (
      <div className="mb-2 space-y-2">
        <Tooltip content="Tooltip content">
          {dayTasks.map((task, index) => (
            <div key={index} className="p-3 rounded-lg bg-purple-700 text-white">
              <div className="text-sm font-semibold">{task.todoTask_name}</div>
            </div>
          ))}
        </Tooltip>
      </div>
    );
  };

  const emptyDayClasses =
    "mb-2 p-3 rounded-lg bg-gray-700 text-white hidden xl:inline-block";

  useEffect(() => {
    const fetchTasksForUser = async () => {
      try {
        const userId = sessionStorage.getItem("user_id");
        const response = await fetch(
          `http://localhost:2020/todoTask/user/${userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setTasksForUser(data);
      } catch (error) {
        console.error("Error fetching tasks for user:", error);
      }
    };

    fetchTasksForUser();
  }, [currentMonth]);

  return (
    <div className="p-5 sm:ml-64 h-full">
      <div className="px-1 sm:px-5 w-full">
        <div className="w-full mt-7 p-5 bg-gray-800 border border-gray-700 rounded-lg shadow-sm sm:p-6 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <button
                onClick={prevMonth}
                className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                &lt;
              </button>
            </div>
            <h2 className="text-xl font-bold text-white">
              {currentMonth.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <div>
              <button
                onClick={nextMonth}
                className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                &gt;
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-7 gap-2">
            <div className="hidden xl:inline-block text-left text-white">
              Sun
            </div>
            <div className="hidden xl:inline-block text-left text-white">
              Mon
            </div>
            <div className="hidden xl:inline-block text-left text-white">
              Tue
            </div>
            <div className="hidden xl:inline-block text-left text-white">
              Wed
            </div>
            <div className="hidden xl:inline-block text-left text-white">
              Thu
            </div>
            <div className="hidden xl:inline-block text-left text-white">
              Fri
            </div>
            <div className="hidden xl:inline-block text-left text-white">
              Sat
            </div>
            {daysArray.map((day, index) => (
              <div
                key={index}
                className={
                  day !== null
                    ? "mb-2 p-3 rounded-lg bg-gray-700 text-white"
                    : emptyDayClasses
                }
              >
                {day !== null ? (
                  <>
                    <div className="mb-1 font-semibold">{day}</div>
                    {renderTasksForDay(day)}
                  </>
                ) : null}
              </div>
            ))}
            {daysOfMonth.map((day, index) => (
              <div
                key={index}
                className="mb-2 p-3 rounded-lg bg-gray-700 text-white"
              >
                <div className="mb-1 font-semibold">{day}</div>
                {renderTasksForDay(day)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthViewCalendar;
