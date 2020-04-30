import React from "react"
import "./Submission.css"

export default (props) => (
    <section className="submission">
        <div className="submission__position">Company: {props.submission.companyName}</div>
        <div className="submission__position">Position: {props.submission.position}</div>
        <div className="submission__dateApplied">Date Applied: {props.submission.dateApplied}</div>
    </section>
)