import React, { useContext, useRef } from "react"
import { CompanyContext } from "../companies/CompanyProvider"
import { Button } from "reactstrap"
import "../submissions/Submission.css"

export default props => {

    const { addCompany } = useContext(CompanyContext)
    const companyName = useRef()
    let activeUser = parseInt(sessionStorage.getItem("user"))

    const handleInputChange = () => {
        companyName.current.value = ""
    }

    const constructNewCompany = () => {
        if (companyName !== "") {
            addCompany({
                companyName: companyName.current.value,
                userId: activeUser
            })
            .then(props.toggler)
        }
    }

    return (
        <>
            <form className="form__newCompany">
            
                <header className="submission__header">
                    <p className="form--heading">Add New Submission</p>
                </header>

                <fieldset className="form--field">
                    <div><label htmlFor="newCo--name">Add New Company:</label></div>
                    <div><input
                        id="newCo--name"
                        type="text"
                        ref={companyName}
                        placeholder="Ex: Lonely Planet"
                        autoFocus
                    /></div>
                </fieldset>

                <div className="form--field">
                    <Button 
                        type="submit" 
                        id="newCo--saveBtn"
                        size="sm" 
                        color="info" 
                        onClick={evt => {
                            evt.preventDefault()
                            constructNewCompany()
                            handleInputChange()
                        }}
                    >
                        Save
                    </Button>
                </div>

            </form>
        </>
    )
}