import React, { useState, useEffect } from "react"

export const InterviewPrepContext = React.createContext()

export const InterviewPrepProvider = (props) => {
    const [interviewPreps, setInterviewPreps] = useState([])

    const getInterviewPreps = () => {
        return fetch("http://localhost:8080/interviewPrep")
        .then(res => res.json())
        .then(setInterviewPreps)
    }
    
    const addInterviewPrep = interviewPrep => {
        return fetch("http://localhost:8080/interviewPrep", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(interviewPrep)
        })
            .then(getInterviewPreps)
    }
    const updateInterviewPrep = interviewPrep => {
        return fetch(`http://localhost:8080/interviewPrep/${interviewPrep.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(interviewPrep)
        })
            .then(getInterviewPreps)
    }

    const deleteInterviewPrep = interviewPrepId => {
        return fetch(`http://localhost:8080/interviewPrep/${interviewPrepId}`, {
            method: "DELETE"
        })
            .then(getInterviewPreps)
    }

    useEffect(() => {
        getInterviewPreps()
    }, [])

    useEffect(() => {
        console.log("****  InterviewPrep APPLICATION STATE CHANGED  ****")
    }, [interviewPreps])

    return (
        <InterviewPrepContext.Provider value={{
            interviewPreps, addInterviewPrep, deleteInterviewPrep, updateInterviewPrep
        }}>
            {props.children}
        </InterviewPrepContext.Provider>
    )
}