import React, { useContext, useState, useEffect } from "react"
import { Button } from "reactstrap"
import DatePicker from "react-datepicker"
import { SubmissionContext } from "./SubmissionProvider"
import { CompanyContext } from "../companies/CompanyProvider"

export const EditSubmissionForm = ({ selectedSubmission, toggleEdit }) => {
   
    const { companies } = useContext(CompanyContext)
    const { updateSubmission } = useContext(SubmissionContext)
    let activeUser = parseInt(sessionStorage.getItem("user"))
    const thisUsersCompanies = companies.filter(co => co.userId === activeUser)
    const [dateApplied, setApplicationDate] = useState(null)
    const [ updatedSubmission, setSubmission ] = useState(selectedSubmission)

    useEffect(() => {
        setApplicationDate(updatedSubmission.dateApplied)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmissionChange = (event) => {
        const newSubmission = Object.assign({}, updatedSubmission)
        newSubmission[event.target.name] = event.target.value
        setSubmission(newSubmission)
    }
  
    const editSubmission = () => {
        
        updateSubmission({
            companyId: parseInt(updatedSubmission.companyId),
            position: updatedSubmission.position,
            dateApplied: dateApplied,
            userId: activeUser,
            id: updatedSubmission.id
        })
        .then(toggleEdit)
    }
    
    return (

        <form className="form__editSubmission">

            <fieldset className="form--field">
                <select
                    defaultValue={selectedSubmission.companyName}
                    name="companyId"
                    required   
                    onChange={handleSubmissionChange}                     
                >
                    <option>Select a Company</option>
                        {thisUsersCompanies.map(co => (
                            <option key={co.id} value={co.id}>{co.companyName}</option>
                        ))}
                </select>
            </fieldset>  

            <fieldset className="form--field">
                <label htmlFor="editSub--position">Position Applied For:</label>
                <input
                    name="position"
                    type="text"
                    defaultValue={selectedSubmission.position}
                    required
                    onChange={handleSubmissionChange}
                />
            </fieldset>

            <fieldset className="form--field">
                <label htmlFor="editSub--date">Date Applied:</label>
                <div required> 
                    {<DatePicker 
                        selected={new Date(dateApplied)} 
                        onChange={(selected => setApplicationDate(selected))} />}
                </div>
            </fieldset>

            <div className="form--field">
                <Button 
                    id="editSub--saveBtn"
                    type="submit" 
                    color="info" 
                    size="sm"  
                    onClick={evt => {
                        evt.preventDefault()
                        editSubmission()}}
                    >
                    Save
                </Button>
            </div>  

        </form>
    )
}