import React, { useEffect, useState } from "react";

const StarCheckbox = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const item = props.item;

  const toggleStarCheckbox = () => {
    toggleImportantApiCall();
    setIsChecked(!isChecked);
  };

  const toggleImportantApiCall = async () => {
    const apiUrl = "http://localhost:2020/todoTask/toggleImportant";

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todoTask_id: item.todoTask_id }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      window.location.reload();
      return data;
    } catch (error) {
      console.error("Error toggling isImportant:", error);
    }
  };

  useEffect(() => {
    const hasImportantTask = item.todoTask_isImportant ?? false;

    setIsChecked(hasImportantTask);
  }, []);

  return (
    <svg
      className={`w-6 h-6 ms-2 ${
        isChecked ? "text-yellow-300" : "text-gray-300 dark:text-gray-500"
      }`}
      onClick={toggleStarCheckbox}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 22 20"
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  );
};

export default StarCheckbox;
