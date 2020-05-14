import React, { useContext, useState, useEffect } from "react"
import { InterviewPrepContext } from "./InterviewPrepProvider"
import "../tasks/Task.css"

export default (props) => {
    const { interviewPreps } = useContext(InterviewPrepContext)
   


    const [selectedInterviewPrep, setInterviewPrep] = useState(props.interviewPrep)

    useEffect(() => {
        const thisIntPrep = interviewPreps.find(ip => ip.id === selectedInterviewPrep.id)
        setInterviewPrep(thisIntPrep)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [interviewPreps])






    return (
        <>
            <div key={selectedInterviewPrep.id} className="interviewPrep">
                <p className="intPrep__answer">
                    Why do you want to work for this company? {selectedInterviewPrep.answerOne}
                </p>
                <p className="intPrep__answer">
                    What makes you the best candidate for this role? {selectedInterviewPrep.answerTwo}
                </p>
                <p className="intPrep__answer">
                    What questions do you have for the interviewer? {selectedInterviewPrep.answerThree}
                </p>
               
            </div>
        </>
    )
}   