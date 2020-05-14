import React, { useContext, useRef } from "react"
import { InterviewPrepContext } from "./InterviewPrepProvider"
import { Button } from "reactstrap"
import "../interviews/Interview.css"

export default props => {
    const { addInterviewPrep } = useContext(InterviewPrepContext)
    const answerOne = useRef()
    const answerTwo = useRef()
    const answerThree = useRef()

    const constructNewIntPrep = () => {
        addInterviewPrep ({
            interviewId: parseInt(props.selectedInterview.id),
            answerOne: answerOne.current.value,
            answerTwo: answerTwo.current.value,
            answerThree: answerThree.current.value
        })
        .then(props.toggler)
    }

    return (
        <form className="intPrepForm">  

            <fieldset>
                <div className="form-group">
                    <label htmlFor="intPrepForm--answerOne">Why do you want to work for this company? </label>
                    <input
                        type="textarea"
                        id="intPrepForm--answerOne"
                        ref={answerOne}
                        autoFocus
                        className="form-control"
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="intPrepForm--answerTwo">What makes you the best candidate for this role? </label>
                    <input
                        type="textarea"
                        id="intPrepForm--answerTwo"
                        ref={answerTwo}
                        autoFocus
                        className="form-control"
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="intPrepForm--answerThree">What questions do you have for the interviewer? </label>
                    <input
                        type="textarea"
                        id="intPrepForm--answerThree"
                        ref={answerThree}
                        autoFocus
                        className="form-control"
                    />
                </div>
            </fieldset>

            <div className="form--field">
                <Button
                    id="intPrepForm--saveBtn"
                    type="submit"
                    color="info"
                    size="sm"
                    onClick={evt => {
                        evt.preventDefault()
                        constructNewIntPrep()
                    }}
                >
                    Save
                </Button>
                                
                </div> 

        </form>
    )
}