// models/ToDoModel.js
const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
  toDo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false, 
  },
  completedDate: {
    type: Date,
    default: null, // Initially, no date is set for completion
  }
},
{ timestamps: true });

module.exports = mongoose.model("ToDo", toDoSchema);
