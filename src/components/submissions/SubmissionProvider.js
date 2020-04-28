import React, { useState, useEffect } from "react"

export const SubmissionContext = React.createContext()

export const SubmissionProvider = (props) => {
    const [submissions, setSubmissions] = useState([])

    const getSubmissions = () => {
        return fetch("http://localhost:8080/submissions")
            .then(res => res.json())
            .then(setSubmissions)
    }

    const addSubmission = submission => {
        return fetch("http://localhost:8080/submissions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(submission)
        })
            .then(getSubmissions)
    }

    useEffect(() => {
        getSubmissions()
    }, [])

    useEffect(() => {
        console.log("****  SUBMISSION APPLICATION STATE CHANGED  ****")
    }, [submissions])

    return (
        <SubmissionContext.Provider value={{
            submissions, addSubmission
        }}>
            {props.children}
        </SubmissionContext.Provider>
    )
}