import React, { useContext, useState, useEffect } from "react"
import { Button } from "reactstrap"
import { addDays, subDays, format } from "date-fns"
import { InterviewContext } from "../interviews/InterviewProvider"
import { InterviewTaskContext } from "./InterviewTasksProvider"
import "../tasks/Task.css"

export default (props) => {
    const { interviews } = useContext(InterviewContext)
    const { updateInterviewTask, interviewTasks } = useContext(InterviewTaskContext)
    const thisInterview = interviews.find(int => int.id === props.interviewId)
    const relationship = interviewTasks.find(intTask => intTask.interviewId === props.interviewId && intTask.interviewToDosId === props.interviewToDos.id)
    const [isComplete, setAsComplete] = useState(relationship.isComplete)
    const toggleComplete = () => setAsComplete(!isComplete)
    const [newDueDate, setDueDate] = useState()
    
    useEffect(() => {
        updateInterviewTask({
            interviewId: thisInterview.id,
            interviewToDosId: props.interviewToDos.id,
            isComplete: isComplete,
            id: relationship.id
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isComplete])

    useEffect(() => {
        let dueDate = thisInterview.date
        if (props.interviewToDos.id === 1) {
            dueDate = format(subDays(new Date(thisInterview.date), 4), "MM/dd/yyyy")
        } else if (props.interviewToDos.id === 2 ) {
            dueDate = format(subDays(new Date(thisInterview.date), 2), "MM/dd/yyyy")
        } else if (props.interviewToDos.id === 3) {
            dueDate = format(addDays(new Date(thisInterview.date), 1), "MM/dd/yyyy")
        } else if (props.interviewToDos.id === 4) {
            dueDate = format(addDays(new Date(thisInterview.date), 7), "MM/dd/yyyy")
        }
        return setDueDate(dueDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newDueDate])

    return (
        <>
            <div key={props.interviewToDos.id} className="task">
                <p className="task__description">
                    <span role="img" aria-label="bow">🏹 </span>
                    To Do: {props.interviewToDos.task}
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