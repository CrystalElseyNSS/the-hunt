import React, { useContext, useRef } from "react"
import { CompanyContext } from "../companies/CompanyProvider"
import { Button } from "reactstrap"
import "./Company.css"

export default props => {

    const { addCompany } = useContext(CompanyContext)
    const companyName = useRef()
    let activeUser = parseInt(sessionStorage.getItem("user"))

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
            <form className="newCompanyForm">

             <fieldset className="form--field">
                    <div>
                        <label htmlFor="newCompany--name">Add New Company: </label>
                        <input
                            type="text"
                            id="newCompany--name"
                            ref={companyName}
                            placeholder="Ex: Lonely Planet"
                            autoFocus
                        />
                    </div>
                    <div>
                        <Button size="sm" color="info" type="submit" onClick={evt => {
                            evt.preventDefault()
                            constructNewCompany()
                            }}>
                            Save
                        </Button>
                    </div>
                </fieldset>

            </form>
        </>
    )
}