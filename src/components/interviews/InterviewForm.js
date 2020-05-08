import React, { useContext, useRef, useState } from "react"
import DatePicker from "react-datepicker"
import { Button } from "reactstrap"
import { CompanyContext } from "../companies/CompanyProvider"
import { InterviewContext } from "./InterviewProvider"
import "react-datepicker/dist/react-datepicker.css"
import "../submissions/Submission.css"
import "./Interview.css"

export default props => {

    const { companies } = useContext(CompanyContext)
    const { addInterview } = useContext(InterviewContext)
    const company = useRef()
    const contact = useRef()
    const title = useRef()
    const email = useRef()
    const date = useRef()
    const time = useRef()
    let activeUser = parseInt(sessionStorage.getItem("user"))
    const thisUsersCompanies = companies.filter(co => co.userId === activeUser)
    const [interviewDate, setInterviewDate] = useState(null)

    const handleInterviewChange = () => {
        company.current.value = "Select a Company"
        contact.current.value = ""
        email.current.value = ""
        title.current.value = ""
    }
    
    const constructNewInterview = () => {
        const companyId = parseInt(company.current.value)
        if (companyId === 0) {
            window.alert("Please select a company from the dropdown")
        } else {
            addInterview({
                companyId: parseInt(company.current.value),
                contact: contact.current.value,
                title: title.current.value,
                email: email.current.value,
                date: interviewDate,
                time: time.current.value,
                userId: activeUser
            })
            .then(setInterviewDate)
            .then(props.toggler)
        }
    }

    return (
        <>
            <form className="interviewForm">

                <header className="interview__header">
                    <p className="form--heading">Log New Interview</p>
                </header>

                <fieldset className="form--field">
                    <select
                        defaultValue=""
                        name="newInt--company"
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
                    <label htmlFor="newInt--contact">Interviewer:</label>
                    <input
                        type="text"
                        ref={contact}
                        placeholder="Ex: Thomas Green" 
                        required
                    />
                </fieldset>

                <fieldset className="form--field">
                    <label htmlFor="newInt--title">Title:</label>
                    <input
                        type="text"
                        ref={title}
                        placeholder="Sr. Project Manager"
                        required
                    />
                </fieldset>

                <fieldset className="form--field">
                    <label htmlFor="newInt--email">Email:</label>
                    <input
                        type="text"
                        ref={email}
                        placeholder="Jane@thiscompany.com"  
                        required
                    />
                </fieldset>

                <fieldset className="form--field">
                    <label htmlFor="newInt--date">Date:</label>
                    <div 
                        required 
                        ref={date}>
                            {<DatePicker 
                                placeholderText="Click to select a date"
                                selected={interviewDate} 
                                onChange={(dateSelected => setInterviewDate(dateSelected))} />}
                    </div>
                </fieldset>

                <fieldset className="form--field">
                    <label htmlFor="newInt--time">Time:</label>
                    <input
                        type="time"
                        ref={time}
                        required
                    />
                </fieldset>

                <div className="form--field">
                    <Button 
                        id="newInt--submitBtn"
                        type="submit" 
                        color="info" 
                        size="sm"  
                        onClick={evt => {
                            evt.preventDefault()
                            constructNewInterview()
                            handleInterviewChange()}}
                        >
                        Save
                    </Button>
                </div>  

            </form>
        </>
        
    )
}