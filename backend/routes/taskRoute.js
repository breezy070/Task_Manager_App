const express = require('express');
const Task = require("../models/taskModel");
const router = express.Router(); //defining a router with express
const {createTask, getTasks, getTask, deleteTask, updateTask} = require("../controllers/taskController");



//CRUD OPERATIONS
//since we are using express router, we change app.post/get to router.post/get
//the comment on top was before we moved the CRUD operation code to the controllers folder

// router.route("/").get(getTasks).post(createTask); -> appends the "/" to use .post and .get
// router.route("/:id").get(getTask).delete(deleteTask).put(updateTask); appends the "/:id" to use .get , .delete and .put

//Create a task
router.post("/", createTask);
// GET/Read tasks
router.get("/", getTasks);
//get a single Task by _id
router.get("/:id", getTask);
//delete a task
router.delete("/:id", deleteTask);
//update a task: the difference between using patch and put is that with put you have to specify the change in all of the fields. with the patch method you can specify just a single property that you wish to update
router.put("/:id", updateTask);


module.exports = router;