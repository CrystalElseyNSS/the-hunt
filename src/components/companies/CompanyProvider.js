import React, { useState, useEffect } from "react"

export const CompanyContext = React.createContext()

export const CompanyProvider = (props) => {
    const [companies, setCompanies] = useState([])

    const getCompanies = () => {
        return fetch("http://localhost:8080/companies")
            .then(res => res.json())
            .then(setCompanies)
    }

    const addCompany = company => {
        return fetch("http://localhost:8080/companies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(company)
        })
            .then(getCompanies)
    }

    useEffect(() => {
        getCompanies()
    }, [])

    useEffect(() => {
        console.log("****  COMPANY APPLICATION STATE CHANGED  ****")
    }, [companies])

    return (
        <CompanyContext.Provider value={{
            companies, addCompany
        }}>
            {props.children}
        </CompanyContext.Provider>
    )
}