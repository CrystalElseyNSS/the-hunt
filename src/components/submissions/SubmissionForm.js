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
    const [dateApplied, setApplicationDate] = useState(new Date())
    const handleChange = (dateEntered => setApplicationDate(dateEntered))



    const constructNewSubmission = () => {
        const companyId = parseInt(company.current.value)
        const foundCompany = companies.find(co => co.id === companyId).companyName
        if (companyId === 0) {
            window.alert("Please enter a new company, or select an existing company from the dropdown")
        } else {
            addSubmission({
                companyName: foundCompany,
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
            <form className="newSubmissionForm">

                <fieldset className="form--field">
                    <div>
                        <select
                            defaultValue=""
                            name="newSubmissionForm--company"
                            ref={company}
                            id="newSubmissionForm--company"
                            required
                        >
                            <option>Select a Company</option>
                            {thisUsersCompanies.map(co => (
                                <option key={co.id} value={co.id}>
                                    {co.companyName}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>  

                <fieldset className="form--field">
                    <div>
                        <label htmlFor="newSubmissionForm--position">Position Applied For:</label>
                        <input
                            type="text"
                            id="newSubmissionForm--position"
                            ref={position}
                            placeholder="Ex: Jr. Developer"
                            required
                        />
                    </div>
                </fieldset>

                <fieldset className="form--field">
                    <section className="dateApplied">
                        <label htmlFor="newSubmissionForm--dateApplied">Date Applied:</label>
                        <div 
                            id="newSubmissionForm--dateApplied"
                            required 
                            ref={date}>
                                {<DatePicker placeholderText="Click to select a date"
                                adjustDateOnChange
                                selected={props.dateApplied} onChange={handleChange} />}
                        </div>
                    </section>
                </fieldset>

                <div>
                    <Button color="info" size="sm" className="form--field" type="submit" onClick={evt => {
                        evt.preventDefault()
                        constructNewSubmission()}}>
                        Submit
                    </Button>
                </div>  

            </form>
        </>
        
    )
}