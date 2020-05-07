import React, { useState, useContext, useEffect } from "react"
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap"
import { EditSubmissionForm } from "../submissions/EditSubmissionForm"
import { CompanyContext } from "../companies/CompanyProvider"
import { SubmissionContext } from "./SubmissionProvider"
import TaskList from "../tasks/TaskList"
import "./Submission.css"

export default (props) => {
    
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const [editModal, setEditModal] = useState(false)
    const toggleEdit = () => setEditModal(!editModal)
    const [selectedSubmission, setSubmission] = useState(props.submission)
    const { companies } = useContext(CompanyContext)
    const { submissions } = useContext(SubmissionContext)
    const foundCompany = companies.find(co => co.id === props.submission.companyId) || {}

    useEffect(() => {
        const savedSubmission = submissions.find(saved => saved.id === selectedSubmission.id)
        setSubmission(savedSubmission)
    }, [submissions])
    
    return (
        <>
            <section key={props.submission.id} className="submission">
                <div className="submission__company">Company: {foundCompany.companyName}</div>
                <div className="submission__position">Position: {props.submission.position}</div>
                <div className="submission__dateApplied">Date Applied: {props.submission.dateApplied}</div>
                <Button onClick={toggle} color="info" size="sm">Follow Up</Button>{' '}
                <Button 
                    color="info" 
                    size="sm"
                    onClick={() => {
                        toggleEdit()}}
                >Edit</Button>{' '}
            </section>

            <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        <p className="form--heading">Target Practice:</p>
                    </ModalHeader>
                    <ModalBody>
                        <TaskList submissionId={props.submission.id} toggler={toggle} />
                    </ModalBody>
            </Modal>  

            <Modal isOpen={editModal} toggle={toggleEdit}>
                <ModalBody>
                    <EditSubmissionForm key={selectedSubmission.id} toggleEdit={toggleEdit} selectedSubmission={selectedSubmission} />
                </ModalBody>
            </Modal>
        </>
        
    )
    
}   