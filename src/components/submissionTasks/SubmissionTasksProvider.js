import React, { useState, useEffect } from "react"

export const SubmissionTaskContext = React.createContext()

export const SubmissionTaskProvider = (props) => {
    const [submissionTasks, setSubmissionTasks] = useState([])

    const getSubmissionTasks = () => {
        return fetch("http://localhost:8080/submissionTasks")
            .then(res => res.json())
            .then(setSubmissionTasks)
    }

    const addSubmissionTask = submissionTask => {
        return fetch("http://localhost:8080/submissionTasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(submissionTask)
        })
            .then(getSubmissionTasks)
    }

    const updateSubmissionTask = submissionTask => {
        return fetch(`http://localhost:8080/submissionTasks/${submissionTask.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(submissionTask)
        })
            .then(getSubmissionTasks)
    }

    useEffect(() => {
        getSubmissionTasks()
    }, [])

    useEffect(() => {
        console.log("****  SUBMISSIONTASK APPLICATION STATE CHANGED  ****")
    }, [submissionTasks])

    return (
        <SubmissionTaskContext.Provider value={{
            submissionTasks, addSubmissionTask, updateSubmissionTask
        }}>
            {props.children}
        </SubmissionTaskContext.Provider>
    )
}