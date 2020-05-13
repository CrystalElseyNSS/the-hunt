import React, { useContext, useState, useEffect } from "react"
import { Button } from "reactstrap"
import { addDays, format } from "date-fns"
import { SubmissionContext } from "../submissions/SubmissionProvider"

import { SubmissionTaskContext } from "../submissionTasks/SubmissionTasksProvider"

import "./Task.css"

export default (props) => {
    const { submissions } = useContext(SubmissionContext)
    const { updateSubmissionTask, submissionTasks } = useContext(SubmissionTaskContext)
    const thisSubmission = submissions.find(sub => sub.id === props.submissionId)
    const relationship = submissionTasks.find(st => st.submissionId === props.submissionId && st.taskId === props.task.id)
    const [isComplete, setAsComplete] = useState(relationship.isComplete)
    const toggleComplete = () => setAsComplete(!isComplete)
    const [newDueDate, setDueDate] = useState()

    useEffect(() => {
        updateSubmissionTask({
            submissionId: thisSubmission.id,
            taskId: props.task.id,
            isComplete: isComplete,
            id: relationship.id
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isComplete])

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
                    onClick={toggleComplete} >{isComplete ? "✔️" : "Complete"}
                </Button>
            </div>
        </>
    )
}   