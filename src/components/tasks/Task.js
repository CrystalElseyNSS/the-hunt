import React from "react"
import "./Task.css"

export default (task) => {

    return (
        <>
            <section key={task.id} className="task">
                <div className="task__description">{task.task}</div>
                {/* <div className="task__dueDate">Due Date: {task.dueDate}</div> */}
                <div className="task__completed">{task.completed ? "Completed!" : "Not completed"}</div>
            </section>
        </>
        
    )
    
}   