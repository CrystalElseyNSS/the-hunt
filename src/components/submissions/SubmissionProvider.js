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
            .then((res) => {
                const createdSubmission = res.json()
                return createdSubmission
            })
            .then((res) => {
                getSubmissions()
                const finalSubmissionObj = res
                return finalSubmissionObj
            })
    }

    const updateSubmission = submission => {
        return fetch(`http://localhost:8080/submissions/${submission.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(submission)
        })
            .then(getSubmissions)
    }

    const deleteSubmission = submissionId => {
        return fetch(`http://localhost:8080/submissions/${submissionId}`, {
            method: "DELETE"
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
            submissions, addSubmission, deleteSubmission, updateSubmission
        }}>
            {props.children}
        </SubmissionContext.Provider>
    )
}