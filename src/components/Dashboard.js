import React from "react"
import "./Dashboard.css"
import { SubmissionProvider } from "./submissions/SubmissionProvider"
import SubmissionForm from "./submissions/SubmissionForm"
import { CompanyProvider } from "./companies/CompanyProvider"
import { PositionProvider } from "./positions/PositionProvider"
import CompanyForm from "./companies/CompanyForm"

export const Dashboard = () => {

    return (
        <>
            <header className="headerContainer">
                <h1 className="header--name">The Hunt</h1>
                <h2 className="header--tagline">Ready. Aim. Hired</h2>
            </header>
        
            <main className="mainContainer">

                <section className="submissionContainer">
                    <div className="submission__form">
                        <SubmissionProvider>
                            <CompanyProvider>
                                <PositionProvider>
                                    <CompanyForm />
                                    <SubmissionForm />
                                </PositionProvider>
                            </CompanyProvider>
                        </SubmissionProvider>
                    </div>
                    <div className="submission__list"></div> 
                </section>

                <section className="alertContainer"></section>   

            </main>
        </>
    )
}