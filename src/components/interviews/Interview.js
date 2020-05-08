import React, { useState, useContext, useEffect } from "react"
import { format } from "date-fns"
import { Button } from "reactstrap"
import { CompanyContext } from "../companies/CompanyProvider"
import { InterviewContext } from "../interviews/InterviewProvider"
import "./Interview.css"

export default (props) => {
    
    const [selectedInterview, setInterview] = useState(props.interview)
    const { companies } = useContext(CompanyContext)
    const { interviews, deleteInterview } = useContext(InterviewContext)
    const foundCompany = companies.find(co => co.id === props.interview.companyId) || {}
    const formattedIntDate = format(new Date(props.interview.date), "MM/dd/yyyy")

    const [hours, minutes] = props.interview.time.split(":")
    const twelveHourCalculator = (hours % 12) || 12
    let AmOrPm = ""
    {hours >= 12 ? AmOrPm = " PM" : AmOrPm = " AM"}
    const formattedTime = twelveHourCalculator + ":" + minutes + AmOrPm

    useEffect(() => {
        const savedInterview = interviews.find(int => int.id === selectedInterview.id)
        setInterview(savedInterview)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [interviews])

    useEffect(() => {
        const deletedInterview = interviews.find(delInt => delInt.id === selectedInterview.id)
        setInterview(deletedInterview)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [interviews])
    
    return (
        <>
            <section key={props.interview.id} className="interview">
                <div className="interview__company">Company: {foundCompany.companyName}</div>
                <div className="interview__contact">Contact: {props.interview.contact}</div>
                <div className="interview__title">Title: {props.interview.title}</div>
                <div className="interview__email">Email: {props.interview.email}</div>
                <div className="interview__date">Date: {formattedIntDate}</div>
                <div className="interview__time">Time: {formattedTime}</div>

                <Button 
                    color="info" 
                    size="sm"
                    onClick={() => {
                        deleteInterview(props.interview.id)
                    }}>Delete
                </Button>
            </section>

        </>
        
    )
    
}   