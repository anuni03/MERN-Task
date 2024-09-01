import React from "react";

// Function to format the current date
const getCurrentDate = () => {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date().toLocaleDateString("en-US", options); // Format: e.g., Mon, Aug 31, 2024
};

const Sidebar = ({ focusInput, toggleSearchBar, totalToDos, completedTasksCount }) => {
  return (
    <div className="sidebar">
      <div className="projects">
        <h3>TODO</h3>
        <ul>
          <li>
            <span className="task-count">{getCurrentDate()}</span> {/* Current Date */}
          </li>
        </ul>
      </div>
      <button className="add-task-btn" onClick={focusInput}>
        + Add task
      </button>
      <ul className="menu">
        <li onClick={toggleSearchBar}>Search</li> {/* Toggle search bar visibility */}
        <li>
          Inbox <span className="task-count">{totalToDos}</span> {/* Total ToDos */}
        </li>
        <li>
          Completed Tasks <span className="task-count">{completedTasksCount}</span> {/* Completed Tasks */}
        </li>
      </ul>

      <div className="stats">
        <div className="stats-item">Total Tasks: {totalToDos}</div> {/* Dynamic Total Tasks */}
        <div className="stats-item">Completed: {completedTasksCount}</div> {/* Dynamic Completed Tasks */}
        <div className="stats-item">Pending: {totalToDos - completedTasksCount}</div> {/* Dynamic Pending Tasks */}
      </div>
    </div>
  );
};

export default Sidebar;
