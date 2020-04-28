import React, { useContext, useRef } from "react"
import { CompanyContext } from "../companies/CompanyProvider"
import { SubmissionContext } from "./SubmissionProvider"
import { Button } from "reactstrap"

export default props => {

    const { companies } = useContext(CompanyContext)
    const { addSubmission } = useContext(SubmissionContext)
    const companyName = useRef()
    const position = useRef()
    const dateApplied = useRef()


    const constructNewSubmission = () => {
        addSubmission({
            companyName: companyName,
            position: position.current.value,
            dateApplied: dateApplied.current.value
        })
        .then(props.toggler)
    }

    return (
        <>
            <form className="newSubmissionForm">

                <fieldset>
                    <div>
                        <label htmlFor="newSubmissionForm--selectCompany">Select Company: </label>
                        <select
                            defaultValue=""
                            name="newSubmissionForm--selectCompany"
                            ref={companyName}
                            id="newSubmissionForm--selectCompany"
                        >
                            <option>Select a location</option>
                            {companies.map(e => (
                                <option key={e.id} value={e.id}>
                                    {e.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>  

                <fieldset>
                    <div>
                        <label htmlFor="newSubmissionForm--position">Position Applied For:</label>
                        <input
                            type="text"
                            id="newSubmissionForm--position"
                            ref={position}
                            placeholder="Ex: Jr. Developer"
                            required
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <div>
                        <label htmlFor="newSubmissionForm--dateApplied">Date Applied:</label>
                        <input
                            type={Date}
                            id="newSubmissionForm--dateApplied"
                            ref={dateApplied}
                            placeholder="Ex: Jr. Developer"
                            required
                        />
                    </div>
                </fieldset>

                <Button type="submit" onClick={evt => {
                    evt.preventDefault()
                    constructNewSubmission()}}>
                    Save New Job Target
                </Button>

            </form>
        </>
    )
}