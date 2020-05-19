import React, { useContext, useState, useEffect } from "react"
import { InterviewContext } from "../interviews/InterviewProvider"
import { InterviewToDosContext } from "../tasks/InterviewToDosProvider"
import { InterviewTaskContext } from "./InterviewTasksProvider"
import InterviewTask from "./InterviewTask"

export default (props) => {

    const { interviews } = useContext(InterviewContext)
    const { interviewToDos } = useContext(InterviewToDosContext)
    const { interviewTasks } = useContext(InterviewTaskContext)
    const [thisUsersTasksforThisInterview, setUsersTasks] = useState([])
    useEffect(() => {
        const tasksForThisInterview = interviewTasks.filter(intTask => intTask.interviewId === props.interviewId)
        const userInterviewTasks = tasksForThisInterview.map(intTask => {
            const foundTask = interviewToDos.find(intToDo => intTask.interviewToDosId === intToDo.id)
            return foundTask
        })
        setUsersTasks(userInterviewTasks)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [interviews, interviewToDos, interviewTasks])
    
    return (
        <>
            <section>                    
                {thisUsersTasksforThisInterview.map(interviewToDos => {
                    
                    return <InterviewTask key={interviewToDos.id} interviewToDos={interviewToDos} interviewId={props.interviewId} />
                })}
            </section>
        </>
    )   
}