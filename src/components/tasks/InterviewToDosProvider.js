import React, { useState, useEffect } from "react"

export const InterviewToDosContext = React.createContext()

export const InterviewToDosProvider = (props) => {
    const [interviewToDos, setInterviewToDos] = useState([])

    const getInterviewToDos = () => {
        return fetch("http://localhost:8080/interviewToDos")
            .then(res => res.json())
            .then(setInterviewToDos)
    }

    const addInterviewToDo = interviewToDo => {
        return fetch("http://localhost:8080/interviewToDos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(interviewToDo)
        })
            .then(getInterviewToDos)
    }

    const updateInterviewToDos = interviewToDo => {
        return fetch(`http://localhost:8080/interviewToDos/${interviewToDo.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(interviewToDo)
        })
            .then(getInterviewToDos)
    }

    useEffect(() => {
        getInterviewToDos()
    }, [])

    useEffect(() => {
        console.log("****  tasksForInterview APPLICATION STATE CHANGED  ****")
    }, [interviewToDos])

    return (
        <InterviewToDosContext.Provider value={{
            interviewToDos, updateInterviewToDos, addInterviewToDo
        }}>
            {props.children}
        </InterviewToDosContext.Provider>
    )
}