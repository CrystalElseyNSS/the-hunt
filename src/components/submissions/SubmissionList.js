import React, { useContext, useEffect, useState } from "react"
import { SubmissionContext } from "./SubmissionProvider"
import Submission from "./Submission"
import "./Submission.css"

export default () => {
    const { submissions } = useContext(SubmissionContext)
    let activeUser = parseInt(sessionStorage.getItem("user"))
    const [userSubmissions, setUserSubmissions] = useState([])

    useEffect(() => {
        const activeUserSubmissions = submissions.filter(sub => sub.userId === activeUser)
        setUserSubmissions(activeUserSubmissions)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [submissions]
    )

    return (
        <>
            <header className="submission__header">
                <p className="form--heading">Job Targets</p>
            </header>
                
            <section>                    
                {userSubmissions.map(sub => {
                    return <Submission key={sub.id} value={sub.id} submission={sub} />
                })}
            </section>
        </>
    )
    
}