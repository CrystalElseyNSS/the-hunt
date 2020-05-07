import React from "react"
import "./Task.css"

export default (props) => {

    return (
        <>
            <section key={props.task.id} className="task">
                <div className="task__description">To Do: {props.task.task}</div>
                {/* <div className="task__dueDate">Due Date: {task.dueDate}</div> */}
                <div className="task__completed">{props.task.completed ? "Completed!" : "Not completed"}</div>
            </section>
        </>
        
    )
    
}   