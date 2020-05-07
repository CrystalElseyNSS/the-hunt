import React, {useContext} from "react"
import { addDays, format } from "date-fns"
import { SubmissionContext } from "../submissions/SubmissionProvider"

import "./Task.css"

export default (props) => {
    const { submissions } = useContext(SubmissionContext)
    const thisSubmission = submissions.find(sub => sub.id === props.submissionId)
    const dueDate = format(addDays(new Date(thisSubmission.dateApplied), 5), "MM/dd/yyyy")

    return (
        <>
            <section key={props.task.id} className="task">
                <div className="task__description">To Do: {props.task.task}</div>
                <div className="task__dueDate">Due Date: {dueDate}</div>
                <div className="task__completed">{props.task.completed ? "Completed!" : "Not completed"}</div>
            </section>
        </>
        
    )
    
}   