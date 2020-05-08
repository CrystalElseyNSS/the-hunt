import React, { useContext, useState, useEffect } from "react"
import { Button } from "reactstrap"
// import DatePicker from "react-datepicker"
import { InterviewContext } from "./InterviewProvider"
import { CompanyContext } from "../companies/CompanyProvider"

export const EditInterviewForm = ({ selectedInterview, toggleEdit }) => {
    const { updateInterview } = useContext(InterviewContext)
    const { companies } = useContext(CompanyContext)
    let activeUser = parseInt(sessionStorage.getItem("user"))
    const thisUsersCompanies = companies.filter(co => co.userId === activeUser)
    const [ interviewDate, setInterviewDate ] = useState(null)
    const [ updatedInterview, setInterview ] = useState(selectedInterview)
    
    useEffect(() => {
        setInterviewDate(updatedInterview.date)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const handleInterviewChange = (evt) => {
        const newInterview = Object.assign({}, updatedInterview)
        newInterview[evt.target.name] = evt.target.value
        setInterview(newInterview)
    }
    
    const editInterview = () => {
        updateInterview({
            companyId: parseInt(updatedInterview.companyId),
            contact: updatedInterview.contact,
            title: updatedInterview.title,
            email: updatedInterview.email,
            date: interviewDate,
            time: updatedInterview.time,
            userId: activeUser,
            id: updatedInterview.id
        })
        .then(setInterviewDate)
        .then(toggleEdit)
    }
    
    return (

        <>
            <form className="form__editInterview">

                <fieldset className="form--field">
                    <select
                        defaultValue={selectedInterview.companyName}
                        name="editInt--company"
                        required
                        onChange={handleInterviewChange}                  
                    >
                        <option>Select a Company</option>
                            {thisUsersCompanies.map(co => (
                                <option key={co.id} value={co.id}>{co.companyName}</option>
                            ))}
                    </select>
                </fieldset>  

                <div className="form--field">
                    <Button
                        id="editInt--saveBtn"
                        type="submit"
                        color="info"
                        size="sm"
                        onClick={evt => {
                            evt.preventDefault()
                            editInterview()
                        }}
                    >
                        Save
                    </Button>
                                
                </div>           

            </form>
        </>
    )

}