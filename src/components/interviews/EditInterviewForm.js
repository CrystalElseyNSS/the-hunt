import React, { useContext, useState, useEffect } from "react"
import { Button } from "reactstrap"
import DatePicker from "react-datepicker"
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
        .then(toggleEdit)
    }
    
    return (

        <>
            <form className="form__editInterview">

                <fieldset className="form--field">
                    <select
                        defaultValue={selectedInterview.companyName}
                        name="companyId"
                        onChange={handleInterviewChange}                  
                    >
                        <option>Select a Company</option>
                            {thisUsersCompanies.map(co => (
                                <option key={co.id} value={co.id}>{co.companyName}</option>
                            ))}
                    </select>
                </fieldset>  

                <fieldset className="form--field">
                    <label htmlFor="editInt--contact">Interviewer:</label>
                    <input
                        name="contact"
                        type="text"
                        defaultValue={selectedInterview.contact}
                        onChange={handleInterviewChange}
                    />
                </fieldset>

                <fieldset className="form--field">
                    <label htmlFor="editInt--title">Title:</label>
                    <input
                        name="title"
                        type="text"
                        defaultValue={selectedInterview.title}
                        onChange={handleInterviewChange}
                    />
                </fieldset>

                <fieldset className="form--field">
                    <label htmlFor="editInt--email">Email:</label>
                    <input
                        name="email"
                        type="text"
                        defaultValue={selectedInterview.email}
                        onChange={handleInterviewChange}
                    />
                </fieldset>

                <fieldset className="form--field">
                    <label htmlFor="editInt--date">Date:</label>
                    <div>
                        {<DatePicker 
                            placeholderText="Click to select a date"
                            selected={new Date(interviewDate)} 
                            onChange={(dateSelected => setInterviewDate(dateSelected))} />}
                    </div>
                </fieldset>

                <fieldset className="form--field">
                    <label htmlFor="editInt--time">Time:</label>
                    <input
                        type="time"
                        name="time"
                        defaultValue={selectedInterview.time}
                        onChange={handleInterviewChange}
                    />
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