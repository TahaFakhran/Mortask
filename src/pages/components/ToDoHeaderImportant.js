function ToDoHeaderImportant() {
  return (
    <>
      <div className="md:pt-1 pb-5 flex flex-col md:flex-row items-start md:items-center justify-between">
        <p
          tabIndex="0"
          className="flex-shrink-0 focus:outline-none text-lg md:text-2xl font-bold leading-normal text-gray-800 dark:text-white mb-2 md:mb-0"
        >
          {"Important"}
        </p>
      </div>
    </>
  );
}

export default ToDoHeaderImportant;
