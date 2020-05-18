import React, { useState, useEffect } from "react"

export const InterviewContext = React.createContext()

export const InterviewProvider = (props) => {
    const [interviews, setInterviews] = useState([])

    const getInterviews = () => {
        return fetch("http://localhost:8080/interviews")
        .then(res => res.json())
        .then(setInterviews)
    }
    
    const addInterview = interview => {
        return fetch("http://localhost:8080/interviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(interview)
        })
        .then((res) => {
            const createdInterview = res.json()
            return createdInterview
        })
        .then((res) => {
            getInterviews()
            const finalInterviewObj = res
            return finalInterviewObj
        })
    }

    const updateInterview = interview => {
        return fetch(`http://localhost:8080/interviews/${interview.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(interview)
        })
            .then(getInterviews)
    }

    const deleteInterview = interviewId => {
        return fetch(`http://localhost:8080/interviews/${interviewId}`, {
            method: "DELETE"
        })
            .then(getInterviews)
    }

    useEffect(() => {
        getInterviews()
    }, [])

    useEffect(() => {
        console.log("****  INTERVIEW APPLICATION STATE CHANGED  ****")
    }, [interviews])

    return (
        <InterviewContext.Provider value={{
            interviews, addInterview, deleteInterview, updateInterview
        }}>
            {props.children}
        </InterviewContext.Provider>
    )
}