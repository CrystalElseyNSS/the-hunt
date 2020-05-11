import React, { useContext, useState } from "react"
import { Button } from "reactstrap"
import { addDays, format } from "date-fns"
import { SubmissionContext } from "../submissions/SubmissionProvider"

import "./Task.css"


export default (props) => {
    const { submissions } = useContext(SubmissionContext)
    const thisSubmission = submissions.find(sub => sub.id === props.submissionId)
    const [isComplete, setAsComplete] = useState(false)
    const toggleTask = () => setAsComplete(!isComplete)
    const dueDate = format(addDays(new Date(thisSubmission.dateApplied), 5), "MM/dd/yyyy")

    return (
        <>
            <section key={props.task.id} className="task">
                <div className="task__description">To Do: {props.task.task}</div>
                <div className="task__dueDate">Due Date: {dueDate}</div>
                <Button 
                    color="info"
                    size="sm" 
                    onClick={toggleTask}>{isComplete ? "✔️" : "Complete"}
                </Button>
            </section>
        </>
    )
}   