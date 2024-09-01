// src/components/ToDo.jsx
import { AiFillEdit } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { baseURL } from "../utils/constant";
import { useState } from "react";

const ToDo = ({
  text,
  id,
  completed,
  completedDate,
  createdAt,
  updatedAt,
  setUpdateUI,
  setShowPopup,
  setPopupContent,
  setCompletedCount,
}) => {
  const [isCompleted, setIsCompleted] = useState(completed);
  const [showUpdatedAt, setShowUpdatedAt] = useState(false); // State to track if the task was updated

  const deleteTodo = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res.data);
      if (isCompleted) {
        setCompletedCount((prev) => prev - 1); // Decrease count if a completed task is deleted
      }
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateToDo = () => {
    setPopupContent({ text, id });
    setShowPopup(true);
    setShowUpdatedAt(true); // Set this to true when the task is updated
  };

  const toggleCompleted = () => {
    const newCompletedStatus = !isCompleted;
    setIsCompleted(newCompletedStatus);
    setCompletedCount((prev) => prev + (newCompletedStatus ? 1 : -1)); // Increment or decrement completed tasks count
    axios
      .put(`${baseURL}/toggleComplete/${id}`, {
        completed: newCompletedStatus,
      })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
      });
  };

  // Format date to the desired format: day/month/year with short month names
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="toDo">
      <div className="toDo-checkbox-container">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={toggleCompleted}
          className="toDo-checkbox"
        />
      </div>
      <div className="toDo-content">
        <span className={`toDo-text ${isCompleted ? "completed" : ""}`}>{text}</span>
        {isCompleted && completedDate && (
          <div className="complete">
            <span className="completed-date">
              Achieved on: {formatDate(completedDate)}
            </span>
          </div>
        )}
        <div className="timestamps">
          {!isCompleted && !showUpdatedAt && (
            <span className="created-date">
              Created at: {formatDate(createdAt)}
            </span>
          )}
          {showUpdatedAt && !isCompleted && (
            <span className="updated-date">
              Updated at: {formatDate(updatedAt)}
            </span>
          )}
        </div>
      </div>
      <div className="icons">
        <AiFillEdit className="icon" onClick={updateToDo} />
        <RxCross1 className="icon" onClick={deleteTodo} />
      </div>
    </div>
  );
};

export default ToDo;
