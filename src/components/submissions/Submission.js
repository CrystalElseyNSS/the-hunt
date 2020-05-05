import React, { useState } from "react"
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap"
import { EditSubmissionForm } from "../submissions/EditSubmissionForm"
import TaskList from "../tasks/TaskList"
import "./Submission.css"

export default (props) => {
    
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const [editModal, setEditModal] = useState(false)
    const toggleEdit = () => setEditModal(!editModal)
    const [selectedSubmission, setSubmission] = useState({submission: {id:0}})

    return (
        <>
            <section className="submission">
                <div className="submission__company">Company: {props.submission.companyName}</div>
                <div className="submission__position">Position: {props.submission.position}</div>
                <div className="submission__dateApplied">Date Applied: {props.submission.dateApplied}</div>
                <Button onClick={toggle} color="info" size="sm">Follow Up</Button>{' '}
                <Button color="info" size="sm"
                    onClick={() => {
                        setSubmission(selectedSubmission)
                        toggleEdit()}}
                >Edit</Button>{' '}
            </section>

            <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        <p className="form--heading">Target Practice:</p>
                    </ModalHeader>
                    <ModalBody>
                        <TaskList toggler={toggle} />
                    </ModalBody>
            </Modal>  

            <Modal isOpen={editModal} toggle={toggleEdit}>
                <ModalBody>
                    <EditSubmissionForm key={selectedSubmission.submission.id} toggleEdit={toggleEdit} {...selectedSubmission} />
                </ModalBody>
            </Modal>
        </>
    )
}   