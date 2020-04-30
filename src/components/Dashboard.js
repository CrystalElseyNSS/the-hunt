import React from "react"
import "./Dashboard.css"
import { SubmissionProvider } from "./submissions/SubmissionProvider"
import SubmissionForm from "./submissions/SubmissionForm"
import SubmissionList from "./submissions/SubmissionList"
import { CompanyProvider } from "./companies/CompanyProvider"
import CompanyForm from "./companies/CompanyForm"

export const Dashboard = () => {

    return (
        <>
            
        
            <main className="mainContainer">
                <header className="headerContainer">
                    <div className="logo"></div>
                </header>

                <section className="submissionContainer">
                    <div className="submission__form">
                        <SubmissionProvider>
                            <CompanyProvider>
                                    <CompanyForm />
                                    <SubmissionForm />
                            </CompanyProvider>
                        </SubmissionProvider>
                    </div>
                    <div className="submission__list">
                        <SubmissionProvider>
                            <SubmissionList />
                        </SubmissionProvider>                   
                    </div> 
                </section>

                <section className="alertContainer"></section>   

            </main>
        </>
    )
}