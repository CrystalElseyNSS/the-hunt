import React, {useContext, useState } from "react"
import { Button } from "reactstrap"
import { addDays, format } from "date-fns"
import { SubmissionContext } from "../submissions/SubmissionProvider"
import "./Task.css"


export default (props) => {

    const { submissions } = useContext(SubmissionContext)
    const thisSubmission = submissions.find(sub => sub.id === props.submissionId)
    const taskOneDueDate = format(addDays(new Date(thisSubmission.dateApplied), 7), "MM/dd/yyyy")
    const taskTwoDueDate = format(addDays(new Date(thisSubmission.dateApplied), 14), "MM/dd/yyyy")

    const [isCompleted, setAsCompleted] = useState(false)
    const toggleTaskOne = () => setAsCompleted(!isCompleted)

    const [isComplete, setAsComplete] = useState(false)
    const toggleTaskTwo = () => setAsComplete(!isComplete)

    return (
        <>
            <article className="taskContainer">

                <section className="applicationTasks">
                    <header className="task--heading">Great shot! Time to Follow Up...</header>
                    
                    <div className="task">
                        <p>
                            <span role="img" aria-label="bow">🏹 </span>
                            Send an email to follow up on your application
                        </p>
                        <p>
                            <span role="img" aria-label="target">🎯 </span>
                            Due Date: {taskOneDueDate} 
                        </p>
                        <Button 
                            color="info"
                            size="sm" 
                            onClick={toggleTaskOne}>{isCompleted ? "✔️" : "Complete"}
                        </Button>
                    </div>

                    <div className="task">
                        <p>
                            <span role="img" aria-label="bow">🏹 </span>
                            Call the hiring manager to follow up on your application</p>
                        <p>
                            <span role="img" aria-label="target">🎯 </span>
                            Due Date: {taskTwoDueDate}
                        </p>
                        <Button 
                            color="info"
                            size="sm" 
                            onClick={toggleTaskTwo}>{isComplete ? "✔️" : "Complete"}
                        </Button>
                    </div>
                </section>

            </article>
        </>
    )
}