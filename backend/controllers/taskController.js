const Task = require("../models/taskModel");


//CREATE A TASK
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

//GET ALL TASKS
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find(); //leaving find() empty brings all of the data, if you want specific you have to use find({})
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

//GET SINGLE TASK
const getTask = async (req,res) => {
    try {
        const {id} = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json(`no task found with the id: ${id}`)
        }
        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

//DELETE TASK
const deleteTask = async (req, res) => {
    try {
        const {id} = req.params;
        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json(`no task found with the id: ${id}`)
        }

        res.status(200).send("Task has been deleted")

    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

//UPDATE TASK
//_id =  the id of the task in the database
//req.body = the information/data you want to use to update whatever already exists in the DB
//new:true =   specify that you are trying to make a new entry to the database
//runValidators = it specifies that it should check for the required fields in the db Schema.
//for example, if you update the name to nothing, it will be accepted even though in Schema the name field is "required: true", this makes it so it takes that required into consideration
const updateTask = async (req, res) => {
    try {
        const {id} = req.params;
        const task = await Task.findByIdAndUpdate(
            {
                _id: id
            },
            req.body,
            {
                new: true,
                runValidators: true
            },
        );


        if (!task) {
            return res.status(404).json(`no task found with the id: ${id}`)
        }

        res.status(200).json(task)

    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

//since we will be exporting many functions, we put the export inside {}; createTask:createTask can be written as just createTask,
module.exports = {
    createTask: createTask,
    getTasks: getTasks,
    getTask: getTask,
    deleteTask: deleteTask,
    updateTask: updateTask
}



