import React, { useContext, useRef, useState, useEffect } from "react"
import { Button } from "reactstrap"
import { CompanyContext } from "../companies/CompanyProvider"
import { ConnectionContext } from "./ConnectionProvider"
import "./Connection.css"

export const ConnectionForm = ( props ) => {

    const { companies } = useContext(CompanyContext)
    const { addConnection } = useContext(ConnectionContext)
    const name = useRef()
    const company = useRef()
    const notes = useRef()
    let activeUser = parseInt(sessionStorage.getItem("user"))
    const thisUsersCompanies = companies.filter(co => co.userId === activeUser)

    const handleInputChange = () => {
        name.current.value = ""
        company.current.value = "Select a Company"
        notes.current.value = ""
    }
    
    const constructNewConnection = () => {

        const companyId = parseInt(company.current.value)
        if (companyId === 0) {
            window.alert("Please enter a new company, or select an existing company from the dropdown")
        } else {
            addConnection({
                name: name.current.value,
                companyId: parseInt(company.current.value),
                notes: notes.current.value,
                userId: activeUser
            })
            .then(props.toggler)
        }
    }
    
    return (
        <>
            <form className="form__newConnection">

            <header className="connection__header">
                    <p className="form--heading">Add New Connection</p>
                </header>

                <fieldset className="form--field">
                    <select
                        defaultValue=""
                        name="newConn--company"
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
                    <label htmlform="newConn--name">Name:</label>
                    <input
                        type="text"
                        ref={name}
                        placeholder="Ex: Hogan Beard"
                        required
                    />
                </fieldset>

                <fieldset className="form--field">
                    <label htmlFor="newConn--source">Notes:</label>
                    <textarea
                        ref={notes}
                        required
                        rows="7"
                        cols="50"
                    ></textarea>
                </fieldset>

                <div className="form--field">
                    <Button 
                        id="newConn--submitBtn"
                        type="submit" 
                        color="info" 
                        size="sm"  
                        onClick={evt => {
                            evt.preventDefault()
                            constructNewConnection()
                            handleInputChange()
                        }}
                        >
                        Submit
                    </Button>
                </div>  

            </form>
        </>
        
    )
}