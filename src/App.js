import React, { useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterDropdown from "./components/FilterDropdown";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [type, setType] = useState("create");
  const [filter, setFilter] = useState("All");
  const [openModal, setOpenModal] = useState(false);

  const addTask = task => {
    if (type === "delete") {
      setTasks(tasks.filter((_type, index) => index !== activeTaskId));
    } else if (type === "update") {
      setTasks(
        tasks.map((type, index) => (index === activeTaskId ? task : type))
      );
    } else {
      setTasks([...tasks, task]);
    }
    setOpenModal(false);
  };

  const updateTask = (task, id) => {
    setActiveTaskId(id);
    setActiveTask(task);
    setType("update");
    setOpenModal(true);
  };

  const deleteTask = (task, id) => {
    setActiveTaskId(id);
    setActiveTask(null);
    setOpenModal(true);
    setType("delete");
  };

  const filterTasks = status => {
    setFilter(status);
  };

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter(task => task.status === filter);

  return (
    <div className="App">
      <h1 className="text-2xl font-bold p-6 bg-sky-800 text-white">
        Task Management App
      </h1>
      <div className="container mx-auto my-6">
        <div className="flex flex-row mx-4 lg:mx-0 justify-between">
          <FilterDropdown onFilterChange={filterTasks} />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 my-0 rounded self-center"
            onClick={() => {
              setOpenModal(true);
              setType("create");
              setActiveTask(null)
            }}
          >
            Create Note
          </button>
        </div>
        <TaskList
          tasks={filteredTasks}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
        />
        <Modal center open={openModal} onClose={() => setOpenModal(false)}>
          <h2 className="text-xl font-medium">
            {type === "delete"
              ? "Are you sure?"
              : type === "create"
              ? "Add a new Task"
              : "Update task"}
          </h2>
          <TaskForm activeTask={activeTask} type={type} onClose={() => setOpenModal(false)} onAddTask={addTask} />
        </Modal>
      </div>
    </div>
  );
}

export default App;
