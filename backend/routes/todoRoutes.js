const express = require("express");
const { getToDos, saveToDo, updateToDo, toggleCompleteToDo, deleteToDo } = require("../controller/ToDoController");

const router = express.Router();

router.get("/get", getToDos);
router.post("/save", saveToDo);
router.put("/update/:id", updateToDo);
router.put("/toggleComplete/:id", toggleCompleteToDo); 
router.delete("/delete/:id", deleteToDo);

module.exports = router;
