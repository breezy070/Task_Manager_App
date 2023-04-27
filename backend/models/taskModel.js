const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Task name is required !"]
        },
        completed: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true
    }

);

const Task = mongoose.model("Task", taskSchema); //this creates the collection on the mongoDB, the name of the database was created on the .env file by specifying it.

module.exports = Task;