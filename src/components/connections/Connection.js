import React, { useState, useContext, useEffect } from "react"
import { ConnectionContext } from "./ConnectionProvider"
import { Button, Modal, ModalBody } from "reactstrap"
import { EditConnectionForm } from "./EditConnectionForm"
import { CompanyContext } from "../companies/CompanyProvider"
import "./Connection.css"

export default (props) => {
    
    const { companies } = useContext(CompanyContext)
    const [selectedConnection, setConnection] = useState(props.connection)
    const { connections, deleteConnection } = useContext(ConnectionContext)
    const foundCompany = companies.find(co => co.id === props.connection.companyId) || {}
    const [editModal, setEditModal] = useState(false)
    const toggleEdit = () => setEditModal(!editModal)

    useEffect(() => {
        const savedConnection = connections.find(int => int.id === selectedConnection.id)
        setConnection(savedConnection)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [connections])

    useEffect(() => {
        const deletedConnection = connections.find(delInt => delInt.id === selectedConnection.id)
        setConnection(deletedConnection)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [connections])
   
    return (
        <>
            <section key={props.connection.id} className="connection">
                <div className="connection__company">Company: {foundCompany.companyName}</div>
                <div className="connection__name">Name: {props.connection.name}</div>
                <div className="connection__notes">Notes: {props.connection.notes}</div>

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
                        deleteConnection(props.connection.id)
                    }}>Delete
                </Button>
            </section>

            <Modal isOpen={editModal} toggle={toggleEdit}>
                <ModalBody>
                    <EditConnectionForm key={selectedConnection.id} toggleEdit={toggleEdit} selectedConnection={selectedConnection} />
                </ModalBody>
            </Modal>

        </>
        
    )
    
}   