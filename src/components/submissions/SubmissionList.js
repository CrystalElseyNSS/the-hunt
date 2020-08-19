import React, { useContext, useEffect, useState } from "react"
import { Table } from 'reactstrap';
import { SubmissionContext } from "./SubmissionProvider"
import Submission from "./Submission"
import "./Submission.css"

export default () => {
    const { submissions } = useContext(SubmissionContext)
    const sortedSubmissions = submissions.sort((a,b) => {
        return new Date(a.dateApplied).getTime() - new Date(b.dateApplied).getTime()
    })
    let activeUser = parseInt(sessionStorage.getItem("user"))
    const [userSubmissions, setUserSubmissions] = useState([])

    useEffect(() => {
        const activeUserSubmissions = sortedSubmissions.filter(sub => sub.userId === activeUser)
        setUserSubmissions(activeUserSubmissions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submissions])

    return (
        <>
            <header className="submission__header">
                <p className="form--heading">Active Job Targets</p>
            </header>

            <Table className="submissionTable" hover>
                
                <tbody>
               
                
                                     
                        {userSubmissions.map(sub => {
                            return <Submission key={sub.id} value={sub.id} submission={sub} />
                        })}
                    
                </tbody>
            </Table>
        </>
    )   
}