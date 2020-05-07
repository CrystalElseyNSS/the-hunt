import React, { useContext, useEffect, useState } from "react"
import { InterviewContext } from "./InterviewProvider"
import Interview from "./Interview"
import "./Interview.css"

export default () => {
    const { interviews } = useContext(InterviewContext)
    let activeUser = parseInt(sessionStorage.getItem("user"))
    const [userInterviews, setUserInterviews] = useState([])

    useEffect(() => {
        const activeUserInterviews = interviews.filter(int => int.userId === activeUser)
        setUserInterviews(activeUserInterviews)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [interviews])

    return (
        <>
            <header className="interview__header">
                <p className="form--heading">Scheduled Interviews</p>
            </header>
                
            <section>                    
                {userInterviews.map(int => {
                    return <Interview key={int.id} value={int.id} interview={int} />
                })}
            </section>
        </>
    )   
}