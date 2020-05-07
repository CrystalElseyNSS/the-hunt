import React, { useContext, useRef, useState } from "react"
import DatePicker from "react-datepicker"
import { Button } from "reactstrap"
import { CompanyContext } from "../companies/CompanyProvider"
import { SubmissionContext } from "./SubmissionProvider"
import "react-datepicker/dist/react-datepicker.css"
import "./Submission.css"

export default props => {

    const { companies } = useContext(CompanyContext)
    const { addSubmission } = useContext(SubmissionContext)
    const company = useRef()
    const position = useRef()
    const date = useRef()
    let activeUser = parseInt(sessionStorage.getItem("user"))
    const thisUsersCompanies = companies.filter(co => co.userId === activeUser)
    const [dateApplied, setApplicationDate] = useState(null)
    
    const constructNewSubmission = () => {
        const companyId = parseInt(company.current.value)
        if (companyId === 0) {
            window.alert("Please enter a new company, or select an existing company from the dropdown")
        } else {
            addSubmission({
                companyId: parseInt(company.current.value),
                position: position.current.value,
                dateApplied: dateApplied,
                userId: activeUser
            })
            .then(setApplicationDate)
            .then(props.toggler)
        }
    }

    return (
        <>
            <form className="form__newSubmission">

                <fieldset className="form--field">
                    <select
                        defaultValue=""
                        name="newSub--company"
                        ref={company}
                        required                        
                    >
                        <option>Select a Company</option>
                            {thisUsersCompanies.map(co => (
                                <option key={co.id} value={co.id}>{co.companyName}</option>
                            ))}
                    </select>
                </fieldset>  

                <fieldset className="form--field">
                    <label htmlFor="newSub--position">Position Applied For:</label>
                    <input
                        type="text"
                        ref={position}
                        placeholder="Ex: Jr. Developer"
                        required
                    />
                </fieldset>

                <fieldset className="form--field">
                    <label htmlFor="newSub--date">Date Applied:</label>
                    <div 
                        required 
                        ref={date}>
                            {<DatePicker 
                                placeholderText="Click to select a date"
                                selected={dateApplied} 
                                onChange={(dateEntered => setApplicationDate(dateEntered))} />}
                    </div>
                </fieldset>

                <div className="form--field">
                    <Button 
                        id="newSub--submitBtn"
                        type="submit" 
                        color="info" 
                        size="sm"  
                        onClick={evt => {
                            evt.preventDefault()
                            constructNewSubmission()}}
                        >
                        Submit
                    </Button>
                </div>  

            </form>
        </>
        
    )
}