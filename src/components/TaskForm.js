import React, { useState } from "react";

const TaskForm = ({ onAddTask, type, activeTask, onClose }) => {
  const [title, setTitle] = useState(activeTask?.title || "");
  const [description, setDescription] = useState(activeTask?.description || "");
  const [status, setStatus] = useState(activeTask?.status || "To Do");

  const handleAddTask = e => {
    e.preventDefault();
    if (title) {
      onAddTask({ title, description, status });
      setTitle("");
      setDescription("");
      setStatus("To Do");
    }
  };

  return (
    <div className="flex flex-col justify-center align-center">
      {type === "delete" ? (
        <div>
          <h3 className="mt-6">Do you want to delete this task?</h3>
          <div className="flex flex-row w-96 justify-end mt-8">
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-24 self-center mr-4"
              type="button"
            >
              No
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-24 self-center"
              type="button"
              onClick={handleAddTask}
            >
              Yes
            </button>
          </div>
        </div>
      ) : (
        <React.Fragment>
          <form className="flex flex-col mt-8" onSubmit={handleAddTask}>
            <input
              className="w-96 self-center border p-2 text-sm"
              type="text"
              placeholder="Task Title"
              value={title}
              required
              onChange={e => setTitle(e.target.value)}
            />
            <textarea
              className="w-96 self-center border p-2 mt-2 mb-2 text-sm"
              placeholder="Task Description"
              value={description}
              required
              onChange={e => setDescription(e.target.value)}
            />
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="block w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline p-2 mb-6 text-sm"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-96 self-center"
              type="submit"
            >
              {type === "update" ? "Update Task" : "Add Task"}
            </button>
          </form>
        </React.Fragment>
      )}
    </div>
  );
};

export default TaskForm;
