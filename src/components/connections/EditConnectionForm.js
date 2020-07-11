import React, { useContext, useState, useEffect } from "react"
import { Button } from "reactstrap"
import { ConnectionContext } from "./ConnectionProvider"
import { CompanyContext } from "../companies/CompanyProvider"

export const EditConnectionForm = ({ selectedConnection, toggleEdit }) => {
    const { updateConnection } = useContext(ConnectionContext)
    const { companies } = useContext(CompanyContext)
    let activeUser = parseInt(sessionStorage.getItem("user"))
    const thisUsersCompanies = companies.filter(co => co.userId === activeUser)
    const [ updatedConnection, setConnection ] = useState(selectedConnection)
    
    const handleConnectionChange = (evt) => {
        const newConnection = Object.assign({}, updatedConnection)
        newConnection[evt.target.name] = evt.target.value
        setConnection(newConnection)
    }
    
    const editConnection = () => {
        updateConnection({
            companyId: parseInt(updatedConnection.companyId),
            name: updatedConnection.name,
            notes: updatedConnection.notes,
            id: updatedConnection.id
        })
        .then(toggleEdit)
    }
    
    return (

        <>
            <form className="form__editConnection">

                <fieldset className="form--field">
                    <select
                        defaultValue={selectedConnection.companyName}
                        name="companyId"
                        onChange={handleConnectionChange}                  
                    >
                        <option>Select a Company</option>
                            {thisUsersCompanies.map(co => (
                                <option key={co.id} value={co.id}>{co.companyName}</option>
                            ))}
                    </select>
                </fieldset>  

                <fieldset className="form--field">
                    <label htmlFor="editConn--name">Connectioner:</label>
                    <input
                        name="name"
                        type="text"
                        defaultValue={selectedConnection.name}
                        onChange={handleConnectionChange}
                    />
                </fieldset>

                <fieldset className="form--field">
                    <label htmlFor="editConn--title">Notes:</label>
                    <input
                        name="notes"
                        type="text"
                        defaultValue={selectedConnection.notes}
                        onChange={handleConnectionChange}
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
                            editConnection()
                        }}
                    >
                        Save
                    </Button>
                                
                </div>           

            </form>
        </>
    )

}