import { useEffect, useState, useRef } from "react";
import ToDo from "./components/ToDo";
import axios from "axios";
import { baseURL } from "./utils/constant";
import Popup from "./components/Popup";
import Sidebar from "./components/Sidebar";
import { FiSearch } from "react-icons/fi"; // Import search icon

function App() {
  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  const [showSearchBar, setShowSearchBar] = useState(false); // State to toggle search bar visibility
  const [completedCount, setCompletedCount] = useState(0);

  const inputRef = useRef(null); // Create a ref for the input field

  useEffect(() => {
    axios
      .get(`${baseURL}/get`)
      .then((res) => {
        setToDos(res.data);
        setCompletedCount(res.data.filter((todo) => todo.completed).length);
      })
      .catch((err) => console.log(err));
  }, [updateUI]);

  const saveToDo = () => {
    if (!input.trim()) {
      alert("Please enter a task."); // Show alert if input is empty
      return;
    }
    axios
      .post(`${baseURL}/save`, { toDo: input, date: new Date().toISOString() }) // Save the current date with each task
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setInput("");
      })
      .catch((err) => console.log(err));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      saveToDo();
    }
  };

  // Function to focus on the input when "Add Task" or "Search" is clicked and highlight it
  const focusInput = () => {
    inputRef.current.focus();
    inputRef.current.classList.add("input-highlight"); // Add the highlight class

    // Remove the highlight after a delay
    setTimeout(() => {
      inputRef.current.classList.remove("input-highlight");
    }, 1500);
  };

  // Function to handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase()); // Convert to lowercase for case-insensitive search
  };

  // Toggle search bar when clicking search in the sidebar
  const toggleSearchBar = () => {
    setShowSearchBar((prev) => !prev); // Toggle the search bar's visibility
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0); // Optional: focus on the search bar
  };

  // Filter tasks based on the search term
  const filteredToDos = toDos.filter((todo) =>
    todo.toDo.toLowerCase().includes(searchTerm)
  );

  // Separate tasks into incomplete and completed
  const incompleteTasks = filteredToDos.filter((todo) => !todo.completed);
  const completedTasks = filteredToDos.filter((todo) => todo.completed);

  // Calculate counts for Inbox, Today, and Completed tasks
  const totalToDos = toDos.length;

  return (
    <div className="app-layout">
      <Sidebar
        focusInput={focusInput}
        toggleSearchBar={toggleSearchBar}
        totalToDos={totalToDos}
        completedTasksCount={completedCount} // Pass completed tasks count
      />
      <div>
        <div className="container">
          {/* Render the search bar only when showSearchBar is true */}
          {showSearchBar && (
            <div className="search-bar">
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <FiSearch className="search-icon" />
            </div>
          )}

          <div className="input_holder">
            <input
              ref={inputRef} // Attach the ref to the input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="Add a ToDo....."
            />
            <button onClick={saveToDo}>Add</button>
          </div>

          <div className="list-container">
            <div className="incomplete-list">
              <h3>Incomplete Tasks</h3>
              {incompleteTasks.map((el) => (
                <ToDo
                  key={el._id}
                  text={el.toDo}
                  id={el._id}
                  completed={el.completed}
                  completedDate={el.completedDate}
                  createdAt={el.createdAt}
                  updatedAt={el.updatedAt}
                  setUpdateUI={setUpdateUI}
                  setShowPopup={setShowPopup}
                  setPopupContent={setPopupContent}
                  setCompletedCount={setCompletedCount}
                />
              ))}
            </div>

            <div className="completed-list">
              <h3>Completed Tasks</h3>
              {completedTasks.map((el) => (
                <ToDo
                  key={el._id}
                  text={el.toDo}
                  id={el._id}
                  completed={el.completed}
                  completedDate={el.completedDate}
                  createdAt={el.createdAt}
                  updatedAt={el.updatedAt}
                  setUpdateUI={setUpdateUI}
                  setShowPopup={setShowPopup}
                  setPopupContent={setPopupContent}
                  setCompletedCount={setCompletedCount}
                />
              ))}
            </div>
          </div>
        </div>
        {showPopup && (
          <Popup
            setShowPopup={setShowPopup}
            popupContent={popupContent}
            setUpdateUI={setUpdateUI}
          />
        )}
      </div>
    </div>
  );
}

export default App;
