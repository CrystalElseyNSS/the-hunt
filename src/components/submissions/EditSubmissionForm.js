import React, { useContext, useState } from "react"
import { Button } from "reactstrap"
// import DatePicker from "react-datepicker"
// import { format } from "date-fns"
import { SubmissionContext } from "./SubmissionProvider"
import { CompanyContext } from "../companies/CompanyProvider"

export const EditSubmissionForm = ({ selectedSubmission, toggleEdit }) => {
   
    const { companies } = useContext(CompanyContext)
    const { updateSubmission } = useContext(SubmissionContext)
    const [ updatedSubmission, setSubmission ] = useState(selectedSubmission)
    let activeUser = parseInt(sessionStorage.getItem("user"))
    const thisUsersCompanies = companies.filter(co => co.userId === activeUser)
    // const [dateApplied, setApplicationDate] = useState(null)

    const handleSubmissionChange = (event) => {
        const newSubmission = Object.assign({}, updatedSubmission)
        newSubmission[event.target.name] = event.target.value
        setSubmission(newSubmission)
        console.log(updatedSubmission)
    }
  
    const editSubmission = () => {
        const companyId = parseInt(updatedSubmission.companyName)
        const foundCompany = companies.find(co => co.id === companyId)
        
        updateSubmission({
            companyName: foundCompany,
            position: updatedSubmission.position,
            // dateApplied: format(dateApplied, "MM/dd/yyy"),
            userId: activeUser,
            id: updatedSubmission.id
        })
        .then(toggleEdit)
    }
    // }
    return (

        <form className="form__editSubmission">

            <fieldset className="form--field">
                <select
                    defaultValue={selectedSubmission.companyName}
                    name="companyName"
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

            {/* <fieldset className="form--field">
                <label htmlFor="editSub--date">Date Applied:</label>
                <div required> 
                        {<DatePicker 
                            placeholderText="Click to select a date"
                            selected={dateApplied} 
                            onChange={(dateEntered => setApplicationDate(dateEntered).then({handleSubmissionChange}))} />}
                </div>
            </fieldset> */}

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