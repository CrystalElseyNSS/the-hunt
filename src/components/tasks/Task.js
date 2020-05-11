import React, { useContext, useState, useEffect } from "react"
import { Button } from "reactstrap"
import { addDays, format } from "date-fns"
import { SubmissionContext } from "../submissions/SubmissionProvider"
import { TaskContext } from "./TaskProvider"

import "./Task.css"


export default (props) => {
    const { submissions } = useContext(SubmissionContext)
    const { updateTask } = useContext(TaskContext)
    const thisSubmission = submissions.find(sub => sub.id === props.submissionId)


    const [isComplete, setAsComplete] = useState(props.task.isComplete)
    const toggleComplete = () => setAsComplete(!isComplete)

    const dueDate = format(addDays(new Date(thisSubmission.dateApplied), 5), "MM/dd/yyyy")

    useEffect(() => {
        updateTask({
            id: props.task.id,
            task: props.task.task,
            isComplete: isComplete
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isComplete])

    return (
        <>
            <div key={props.task.id} className="task">
                <p className="task__description">
                    <span role="img" aria-label="bow">🏹 </span>
                    To Do: {props.task.task}
                </p>
                <p className="task__dueDate">
                    <span role="img" aria-label="target">🎯 </span>
                    Due Date: {dueDate}</p>
                <Button 
                    color="info"
                    size="sm" 
                    onClick={toggleComplete}>{isComplete ? "✔️" : "Complete"}
                </Button>
            </div>
        </>
    )
}   