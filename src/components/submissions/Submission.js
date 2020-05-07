import React, { useState, useContext, useEffect } from "react"
import { format } from "date-fns"
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
    const { submissions, deleteSubmission } = useContext(SubmissionContext)
    const foundCompany = companies.find(co => co.id === props.submission.companyId) || {}
    const formattedAppDate = format(new Date(props.submission.dateApplied), "MM/dd/yyyy")

    useEffect(() => {
        const savedSubmission = submissions.find(saved => saved.id === selectedSubmission.id)
        setSubmission(savedSubmission)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submissions])

    useEffect(() => {
        const deletedSubmission = submissions.find(deleted => deleted.id === selectedSubmission.id)
        setSubmission(deletedSubmission)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submissions])
    
    return (
        <>
            <section key={props.submission.id} className="submission">
                <div className="submission__company">Company: {foundCompany.companyName}</div>
                <div className="submission__position">Position: {props.submission.position}</div>
                <div className="submission__dateApplied">Date Applied: {formattedAppDate}</div>
                <Button onClick={toggle} color="info" size="sm">Follow Up</Button>{' '}
                <Button 
                    color="info" 
                    size="sm"
                    onClick={() => {
                        toggleEdit()}}
                    >Edit
                </Button>{' '}
                <Button 
                    color="info" 
                    size="sm"
                    onClick={() => {
                        deleteSubmission(props.submission.id)
                    }}>Delete
                </Button>
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