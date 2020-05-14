import React, { useContext, useState, useEffect } from "react"
import { SubmissionContext } from "../submissions/SubmissionProvider"
import { TaskContext } from "../tasks/TaskProvider"
import { SubmissionTaskContext } from "../submissionTasks/SubmissionTasksProvider"
import SubmissionTask from "./SubmissionTask"

export default (props) => {

    const { submissions } = useContext(SubmissionContext)
    const { tasks } = useContext(TaskContext)
    const { submissionTasks } = useContext(SubmissionTaskContext)
    const [thisUsersTasksforThisSubmission, setUsersTasks] = useState([])
    
    useEffect(() => {
        const tasksForThisSubmission = submissionTasks.filter(subTask => subTask.submissionId === props.submissionId)
        const userSubmissionTasks = tasksForThisSubmission.map(subTask => {
            const foundTask = tasks.find(task => subTask.taskId === task.id)
            return foundTask
        })
        setUsersTasks(userSubmissionTasks)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submissions, tasks, submissionTasks])

    return (
        <>
            <section>                    
                {thisUsersTasksforThisSubmission.map(task => {
                    return <SubmissionTask key={task.id} task={task} submissionId={props.submissionId}  />
                })}
            </section>
        </>
    )   
}