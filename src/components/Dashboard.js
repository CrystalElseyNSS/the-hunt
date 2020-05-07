import React from "react"
import "./Dashboard.css"
import { SubmissionProvider } from "./submissions/SubmissionProvider"
import SubmissionForm from "./submissions/SubmissionForm"
import SubmissionList from "./submissions/SubmissionList"
import { CompanyProvider } from "./companies/CompanyProvider"
import { TaskProvider } from "./tasks/TaskProvider"
import { SubmissionTaskProvider } from "./submissionTasks/SubmissionTasksProvider"
import CompanyForm from "./companies/CompanyForm"


export const Dashboard = () => {

    return (
        <>
            <SubmissionProvider>
                <CompanyProvider>
                    <TaskProvider>
                        <SubmissionTaskProvider>
                    <main className="mainContainer">

                        <header className="headerContainer">
                            <div className="logo"></div>
                        </header>

                        <article className="submissionContainer">
                            <section className="submissionForm">
                                <CompanyForm />
                                <SubmissionForm />
                            </section>
                            <section className="submissionList">
                                <SubmissionList />
                            </section> 
                        </article>

                        <article className="alertContainer"></article>   
                        
                    </main>
                    </SubmissionTaskProvider>
                    </TaskProvider>
                </CompanyProvider>
            </SubmissionProvider>
        </>
    )
}