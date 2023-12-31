import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ShareToDo = (props) => {
  const [allUsers, setAllUsers] = useState([]);
  const [privateToDos, setprivateToDos] = useState([]);
  const [publicToDos, setpublicToDos] = useState([]);

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedToDo, setSelectedToDo] = useState("");

  const getAllUsers = async () => {
    const apiUrl = `http://localhost:2020/users/`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setAllUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchPrivateData = async () => {
    const apiUrl = `http://localhost:2020/todoList/privateTodosForUser/${sessionStorage.getItem(
      "user_id"
    )}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setprivateToDos(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchPublicData = async () => {
    const publicApiUrl = `http://localhost:2020/todoList/publicTodosForUser/${sessionStorage.getItem(
      "user_id"
    )}`;

    try {
      const response = await fetch(publicApiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setpublicToDos(data);
    } catch (error) {
      console.error("Error fetching public data:", error);
    }
  };

  const handleShareToDo = async () => {
    console.log(selectedUser);
    console.log(selectedToDo);
    if (!selectedUser || !selectedToDo) {
      return;
    }

    const apiUrl = "http://localhost:2020/TodoListMembers/create";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todoList_id: selectedToDo,
          user_id: selectedUser,
        }),
      });
      window.location.reload();
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error sharing to-do:", error);
    }
  };
  useEffect(() => {
    fetchPrivateData();
    fetchPublicData();
    getAllUsers();
  }, []);

  return (
    <>
      <div
        id="shareToDoModal"
        tabIndex="-1"
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Share to-do
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="shareToDoModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form onSubmit={handleShareToDo}>
              <div className="mb-5">
                <p className="text-sm">
                  You can only share a to do with a registered user
                </p>
              </div>
              <div className="grid gap-4 mb-5 sm:grid-cols-2 pb">
                <div>
                  <label
                    htmlFor="sharewith"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Share with
                  </label>
                  <select
                    id="sharewith"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Select User
                    </option>
                    {allUsers
                      .filter(
                        (user) =>
                          user.user_id != sessionStorage.getItem("user_id")
                      )
                      .map((user) => (
                        <option key={user.user_id} value={user.user_id}>
                          {user.user_fname + " " + user.user_lname}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="sharetodo"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    To-do to be shared
                  </label>
                  <select
                    id="sharetodo"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={selectedToDo}
                    onChange={(e) => setSelectedToDo(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Select To-Do
                    </option>
                    <optgroup label="Private To-Dos">
                      {privateToDos.map((todo) => (
                        <option key={todo.todoList_id} value={todo.todoList_id}>
                          {todo.todoList_name}
                        </option>
                      ))}
                    </optgroup>

                    <optgroup label="Public To-Dos">
                      {publicToDos.map((todo) => (
                        <option key={todo.todoList_id} value={todo.todoList_id}>
                          {todo.todoList_name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>
              <input
                type="button"
                onClick={handleShareToDo}
                className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-purple-700 dark:hover:bg-purple-800 dark:focus:ring-purple-900 sm:w-auto"
                value=" Share to-do"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareToDo;
