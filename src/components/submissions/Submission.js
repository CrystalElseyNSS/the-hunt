import React, { useState } from "react"
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap"
import TaskList from "../tasks/TaskList"
import "./Submission.css"

export default (props) => {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    return (
        <>
            <section className="submission">
                <div className="submission__company">Company: {props.submission.companyName}</div>
                <div className="submission__position">Position: {props.submission.position}</div>
                <div className="submission__dateApplied">Date Applied: {props.submission.dateApplied}</div>
                <Button onClick={toggle} color="info" size="sm">Track Progress</Button>{' '}
            </section>

            <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        <p className="form--heading">Target Practice:</p>
                    </ModalHeader>
                    <ModalBody>
                        <TaskList toggler={toggle} />
                    </ModalBody>
            </Modal>  
        </>
    )
}   