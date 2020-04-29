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
                jobTitle: position.current.value,
                dateApplied: dateApplied
            })
            .then(setApplicationDate)
            .then(props.toggler)
        }
    }

    return (
        <>
            <form className="newSubmissionForm">

                <fieldset>
                    <div>
                        <select
                            defaultValue=""
                            name="newSubmissionForm--company"
                            ref={company}
                            id="newSubmissionForm--company"
                            required
                        >
                            <option>Select a Company</option>
                            {companies.map(co => (
                                <option key={co.id} value={co.id}>
                                    {co.companyName}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>  

                <fieldset>
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

                <fieldset>
                    
                        <label htmlFor="newSubmissionForm--dateApplied">Date Applied:</label>
                        <div 
                            id="newSubmissionForm--dateApplied"
                            required 
                            ref={date}>
                                {<DatePicker selected={props.dateApplied} onChange={handleChange} />}
                        </div>
                </fieldset>

                <Button type="submit" onClick={evt => {
                    evt.preventDefault()
                    constructNewSubmission()}}>
                    Save New Job Target
                </Button>

            </form>
        </>
        
    )
}