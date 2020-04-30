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

                <article className="submissionContainer">
                    <section className="submissionForm">
                        <SubmissionProvider>
                            <CompanyProvider>
                                    <CompanyForm />
                                    <SubmissionForm />
                            </CompanyProvider>
                        </SubmissionProvider>
                    </section>
                    <section className="submissionList">
                        <SubmissionProvider>
                            <SubmissionList />
                        </SubmissionProvider>                   
                    </section> 
                </article>

                <article className="alertContainer"></article>   

            </main>
        </>
    )
}