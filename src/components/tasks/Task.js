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

    useEffect(() => {
        updateTask({
            id: props.task.id,
            task: props.task.task,
            isComplete: isComplete
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isComplete])

    const [newDueDate, setDueDate] = useState()

    useEffect(() => {
        let dueDate = thisSubmission.dateApplied
        if (props.task.id === 1) {
            dueDate = format(addDays(new Date(thisSubmission.dateApplied), 7), "MM/dd/yyyy")
        } else {
            dueDate = format(addDays(new Date(thisSubmission.dateApplied), 14), "MM/dd/yyyy")
        }
        return setDueDate(dueDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newDueDate])

    return (
        <>
            <div key={props.task.id} className="task">
                <p className="task__description">
                    <span role="img" aria-label="bow">🏹 </span>
                    To Do: {props.task.task}
                </p>
                <p className="task__dueDate">
                    <span role="img" aria-label="target">🎯 </span>
                    Due Date: {newDueDate}</p>
                <Button 
                    color="info"
                    size="sm" 
                    onClick={toggleComplete}>{isComplete ? "✔️" : "Complete"}
                </Button>
            </div>
        </>
    )
}   