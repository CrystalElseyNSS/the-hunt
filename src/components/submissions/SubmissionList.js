import React, { useContext } from "react"
import { SubmissionContext } from "./SubmissionProvider"
import Submission from "./Submission"
import "./Submission.css"


export default () => {
    const { submissions } = useContext(SubmissionContext)

    let activeUser = parseInt(sessionStorage.getItem("user"))
    const activeUserSubmissions = submissions.filter(sub => sub.userId === activeUser)


    return (
        <>
            

                <header className="submission__header">
                    <h4 className="submission__heading">Your Current Job Targets:</h4>
                </header>
                
                <section>
                    {activeUserSubmissions.map(sub => {
                        return <Submission key={sub.id} value={sub.id} submission={sub} />})
                    }
                        
                </section>

           
        </>
    )
    
}