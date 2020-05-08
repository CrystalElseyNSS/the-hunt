import React from "react"
import "./Dashboard.css"
import { SubmissionProvider } from "./submissions/SubmissionProvider"
import SubmissionForm from "./submissions/SubmissionForm"
import SubmissionList from "./submissions/SubmissionList"
import InterviewList from "./interviews/InterviewList"
import InterviewForm from "./interviews/InterviewForm"
import { CompanyProvider } from "./companies/CompanyProvider"
import { SubmissionTaskProvider } from "./submissionTasks/SubmissionTasksProvider"
import { InterviewProvider } from "./interviews/InterviewProvider"
import CompanyForm from "./companies/CompanyForm"


export const Dashboard = () => {

    return (
        <>
            <SubmissionProvider>
            <CompanyProvider>
            <SubmissionTaskProvider>
            <InterviewProvider>
                                
                <header className="headerContainer">
                    <div className="logo"></div>
                </header>
                                
                <main className="mainContainer">

                    <article className="submissionContainer">
                        <section className="submissionForm">
                            <CompanyForm />
                            <SubmissionForm />
                        </section>
                        <section className="submissionList">
                            <SubmissionList />
                        </section> 
                    </article>

                    <article className="interviewContainer">
                        <section>
                            <InterviewForm />
                        </section>
                        <section className="interviewList">
                            <InterviewList />
                        </section>
                    </article>   
                                    
                </main>

        </InterviewProvider>
        </SubmissionTaskProvider>
        </CompanyProvider>
        </SubmissionProvider>
        </>
    )
}