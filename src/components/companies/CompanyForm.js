import React, { useContext, useRef } from "react"
import { CompanyContext } from "../companies/CompanyProvider"
import { Button } from "reactstrap"

export default props => {

    const { addCompany, companies } = useContext(CompanyContext)
    const companyName = useRef()

    const constructNewCompany = () => {
        if (companyName !== "") {
            
            addCompany({
                companyName: companyName.current.value,
            })
            .then(props.toggler)
        }
    }



    return (
        <>
            <form className="newCompanyForm">

                <fieldset>
                    <div>
                        <label htmlFor="newCompany--name">Add New Company Target:</label>
                        <input
                            type="text"
                            id="newCompany--name"
                            ref={companyName}
                            placeholder="Ex: Lonely Planet"
                            required
                            autoFocus
                        />
                    </div>
                    <div>
                        <Button type="submit" onClick={evt => {
                            evt.preventDefault()
                            constructNewCompany()
                            }}>
                            Save New Company
                        </Button>
                    </div>
                </fieldset>

            </form>
        </>
    )
}