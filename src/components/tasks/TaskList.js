import React from "react"
import "./Task.css"

export default () => {

    return (
        <>
            <article className="taskContainer">
                
                <div className="task">
                    <h5>Follow up on Application by Email</h5>
                    <p>Due: 5 days after submission</p>
                </div>

                <div className="task">
                    <h5>Follow up on Application by Phone</h5>
                    <p>Due: 10 days after submission</p>
                </div>

                <div className="task">
                    <h5>Have you scheduled an interview?</h5>
                    <p>Yes / No</p>
                </div>

                <div className="task">
                    <h5>Prepare for interview</h5>
                    <p>Due: 2 days before interview</p>
                </div>

                <div className="task">
                    <h5>Send interview thank you email</h5>
                    <p>Due: 1 day after email</p>
                </div>

                <div className="task">
                    <h5>Follow up on job status</h5>
                    <p>Due: 5 days after interview</p>
                </div>

            </article>
        </>
    )
}