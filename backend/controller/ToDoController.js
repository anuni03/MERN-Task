const ToDoModel = require("../models/ToDoModel");

// Fetch all ToDos
module.exports.getToDos = async (req, res) => {
  const toDos = await ToDoModel.find();
  res.send(toDos);
};

// Save a new ToDo
module.exports.saveToDo = (req, res) => {
  const { toDo } = req.body;
  ToDoModel.create({ toDo })
    .then((data) => {
      console.log("Saved Successfully...");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

// Update an existing ToDo (for text only)
module.exports.updateToDo = (req, res) => {
  const { id } = req.params;
  const { toDo } = req.body;
  ToDoModel.findByIdAndUpdate(id, { toDo })
    .then(() => {
      res.send("Updated Successfully...");
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

// Mark a ToDo as completed or not completed and set the completion date
module.exports.toggleCompleteToDo = (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  // Set the completedDate based on the completed status
  const completedDate = completed ? new Date() : null;

  ToDoModel.findByIdAndUpdate(id, { completed, completedDate })
    .then(() => {
      res.send("Completion status updated successfully...");
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};

// Delete a ToDo
module.exports.deleteToDo = (req, res) => {
  const { id } = req.params;

  ToDoModel.findByIdAndDelete(id)
    .then(() => {
      res.send("Deleted Successfully...");
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};
