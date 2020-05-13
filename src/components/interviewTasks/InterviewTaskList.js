import React, { useContext, useState, useEffect } from "react"
import { InterviewContext } from "../interviews/InterviewProvider"
import { TaskContext } from "../tasks/TaskProvider"
import { InterviewTaskContext } from "./InterviewTasksProvider"
import InterviewTask from "./InterviewTask"

export default (props) => {

    const { interviews } = useContext(InterviewContext)
    const { tasks } = useContext(TaskContext)
    const { interviewTasks } = useContext(InterviewTaskContext)
    const [thisUsersTasksforThisInterview, setUsersTasks] = useState([])
    useEffect(() => {
        const tasksForThisInterview = interviewTasks.filter(intTask => intTask.interviewId === props.interviewId)
        const userInterviewTasks = tasksForThisInterview.map(intTask => {
            const foundTask = tasks.find(task => intTask.taskId === task.id)
            return foundTask
        })
        setUsersTasks(userInterviewTasks)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [interviews, tasks, interviewTasks])
    
    return (
        <>
            <section>                    
                {thisUsersTasksforThisInterview.map(task => {
                    
                    return <InterviewTask key={task.id} task={task} interviewId={props.interviewId} />
                })}
            </section>
        </>
    )   
}