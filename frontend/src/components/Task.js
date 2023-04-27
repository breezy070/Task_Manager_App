import {FaEdit, FaCheckDouble, FaRegTrashAlt} from "react-icons/fa";

//the +1 is so that the index doesnt start at 0, for this app we want it to start at 1
const Task = ({task, index, deleteTask, getSingleTask, setToComplete}) => {
  return (
    <div className={task.completed ? "task completed" : "task"}>
        <p>
            <b>{index + 1}. </b>
            {task.name}
        </p>
        <div className="task-icons">
            <FaCheckDouble color="green" onClick={() => 
            setToComplete(task)}/>
            <FaEdit color="purple" onClick={() => 
            getSingleTask(task)}/>
            <FaRegTrashAlt color="red" onClick={() => {
              deleteTask(task._id)
            }}/>
        </div>
    </div>
  )
}

export default Task