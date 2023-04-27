import { useState, useEffect } from "react"
import {toast} from "react-toastify"
import Task from "./Task"
import TaskForm from "./TaskForm"
import axios from "axios";
import { SERVER_URL } from "../App";
import loadingImg from "../assets/loader.gif"






const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        completed: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setisEditing] = useState(false);
    const [taskID, setTaskID] = useState("");


    const {name} = formData;
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    //getting the tasks for the task list
    const getTasks = async () => {
        setIsLoading(true);
        try {
           const {data} = await axios.get(`${SERVER_URL}/api/tasks`); //we dont need the whole response, so we destructure it and grab just the data from the response object
           setTasks(data); //setting the tasks state to the data returned
           setIsLoading(false);
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    };

    //useEffect to start the getTasks function as soons as the page loads
    useEffect(() => {
      getTasks()
    }, []);
    



    const createTask = async (e) => {
        e.preventDefault();
        // const data = JSON.stringify(formData);

        if (name === "") {
            return toast.error("Task name field cannot be empty !")
        }

        try {
            await axios.post(`${SERVER_URL}/api/tasks`, formData);
            toast.success("Task added successfully !")
            setFormData({...formData, name: ""});
            getTasks();
        } catch (error) {
            toast.error(error.message)
        }

    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${SERVER_URL}/api/tasks/${id}`);
            getTasks();
            toast.success("Task deleted successfully !")
        } catch (error) {
            toast.error(error.message)
        }
    };

    const getSingleTask = async (task) => {
        try {
            setFormData({name: task.name, completed: false});
            setTaskID(task._id);
            setisEditing(true);

        } catch (error) {
            toast.error(error.message)
        }
    };

    //filtering the completed tasks, we are using tasks as a dependency so that it triggers everytime the tasks component changes
    useEffect(() => {
        const completedTask = tasks.filter((task) => {
            return task.completed === true
        });
        setCompletedTasks(completedTask)
    }, [tasks])

    const updateTask = async (e) => {
        e.preventDefault();
        if (name === "") {
            return toast.error("Input field cannot be empty")
        }
        try {
            await axios.put(`${SERVER_URL}/api/tasks/${taskID}`, formData)
            setFormData({...formData, name: ""});
            setisEditing(false);
            toast.success("Task updated successfully !")
            getTasks();
        } catch (error) {
            toast.error(error.message)
        }
    };

    const setToComplete = async (task) => {
        const newFormData = {
            name: task.name,
            completed: true
        };
        try {
            await axios.put(`${SERVER_URL}/api/tasks/${task._id}`, newFormData);
            getTasks();
            toast.success("Task set to completed !")
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <div>
        <h2>Task Manager</h2>
        <TaskForm name={name} handleInputChange={handleInputChange} createTask={createTask} isEditing={isEditing} updateTask={updateTask}/>

        {tasks.length > 0 && (
            <div className="--flex-between --pb">
                <p>
                    <b>Total Tasks: </b> {tasks.length}
                </p>
                <p>
                    <b>Completed Tasks: </b> {completedTasks.length}
                </p>
            </div>  
        )}



        <hr/>
        {
            isLoading && (
                <div className="--flex-center">
                    <img src={loadingImg} alt="loading" />
                </div>
            )
        }
        {
            !isLoading && tasks.length === 0 ? (
                <p className="--py">No task found. Please add a task.</p>
            ) : (
                <>
                    {
                        tasks.map((task, index) => {
                            return (
                                <Task key={task._id} task={task} index={index} deleteTask={deleteTask} getSingleTask={getSingleTask} setToComplete={setToComplete}/>
                            )
                        })

                    }
                </>
            )
        }
        
    </div>
  )
}

export default TaskList