import React, { useContext } from "react"
import { SubmissionContext } from "../submissions/SubmissionProvider"
import { TaskContext } from "./TaskProvider"
import { SubmissionTaskContext } from "../submissionTasks/SubmissionTasksProvider"
import Task from "./Task"

export default () => {

    const { submissions } = useContext(SubmissionContext)
    const { tasks } = useContext(TaskContext)
    const { submissionTasks } = useContext(SubmissionTaskContext)

    let activeUser = parseInt(sessionStorage.getItem("user"))
    const thisUsersSubmissions = submissions.filter(sub => sub.userId === activeUser)
    const submissionTaskRelationships = submissionTasks.map(subTask => thisUsersSubmissions.filter(userSub => userSub.id === subTask.submissionId)).flat()
    const thisUsersTasksforThisSubmission = tasks.map(task => submissionTaskRelationships.filter(rel => rel.taskId === task.id))
    
    return (
        <>
            <section>                    
                {thisUsersTasksforThisSubmission.map(task => {
                    return <Task key={task.id} value={task.id} task={task} />
                })}
            </section>
        </>
    )   
}