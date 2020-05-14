import React, { useState, useEffect } from "react"

export const InterviewTaskContext = React.createContext()

export const InterviewTaskProvider = (props) => {
    const [interviewTasks, setInterviewTasks] = useState([])

    const getInterviewTasks = () => {
        return fetch("http://localhost:8080/interviewTasks")
            .then(res => res.json())
            .then(setInterviewTasks)
    }

    const addInterviewTask = interviewTask => {
        return fetch("http://localhost:8080/interviewTasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(interviewTask)
        })
            .then(getInterviewTasks)
    }

    const updateInterviewTask = interviewTask => {
        return fetch(`http://localhost:8080/interviewTasks/${interviewTask.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(interviewTask)
        })
            .then(getInterviewTasks)
    }

    useEffect(() => {
        getInterviewTasks()
    }, [])

    useEffect(() => {
        console.log("****  INTERVIEWTASK APPLICATION STATE CHANGED  ****")
    }, [interviewTasks])

    return (
        <InterviewTaskContext.Provider value={{
            interviewTasks, addInterviewTask, updateInterviewTask
        }}>
            {props.children}
        </InterviewTaskContext.Provider>
    )
}