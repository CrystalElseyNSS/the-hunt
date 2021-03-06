import React, { useState, useEffect } from "react"
import { Nav, NavItem, NavLink } from 'reactstrap';
import { CompanyProvider } from "./companies/CompanyProvider"
import CompanyForm from "./companies/CompanyForm"
import { SubmissionProvider } from "./submissions/SubmissionProvider"
import { SubmissionTaskProvider } from "./submissionTasks/SubmissionTasksProvider"
import SubmissionForm from "./submissions/SubmissionForm"
import SubmissionList from "./submissions/SubmissionList"
import { InterviewProvider } from "./interviews/InterviewProvider"
import { InterviewTaskProvider } from "./interviewTasks/InterviewTasksProvider"
import { InterviewToDosProvider } from "./tasks/InterviewToDosProvider"
import InterviewForm from "./interviews/InterviewForm"
import InterviewList from "./interviews/InterviewList"
import { TaskProvider } from "./tasks/TaskProvider"
import { ConnectionProvider } from "./connections/ConnectionProvider"
import { ConnectionForm } from "./connections/ConnectionForm"
import { ConnectionList } from "./connections/ConnectionList"
import "./Dashboard.css"

export const Dashboard = () => {
    const [activeList, setActiveList] = useState("submissionContainer")
    const [components, setComponents] = useState()

    const showInterviews = () => (
        <InterviewProvider>
            <InterviewTaskProvider>
                <InterviewToDosProvider>                        
                    <article className="interviewContainer">
                        <section><InterviewForm /></section>
                        <section className="interviewList"><InterviewList /></section>
                    </article>  
                </InterviewToDosProvider>
            </InterviewTaskProvider>
        </InterviewProvider>
    )

    const showSubmissions = () => (
        <SubmissionProvider>
            <SubmissionTaskProvider>
                <article className="submissionContainer">
                    <section className="submissionForm">
                        <CompanyForm />
                        <SubmissionForm />
                    </section>
                    <section className="submissionList">
                        <SubmissionList />
                    </section> 
                </article>
            </SubmissionTaskProvider>
        </SubmissionProvider>
    )

    const showConnections = () => (
        <ConnectionProvider>
            <article className="connectionContainer">
                <section className="connectionForm">
                    <ConnectionForm />
                </section>
                <section className="connectionList">
                    <ConnectionList />
                </section> 
            </article>                
        </ConnectionProvider>
    )

    useEffect(() => {
        if (activeList === "interviewContainer") {
            setComponents(showInterviews)
        } else if (activeList === "submissionContainer") {
            setComponents(showSubmissions)
        } else if (activeList === "connectionContainer") {
            setComponents(showConnections)
        }
    }, [activeList])

    return (
        <>
            <CompanyProvider>
                <TaskProvider>
                    
                    <header className="headerContainer">
                        <div className="logo"></div>
                    </header>

                    <nav>
                        <Nav className="navBar" tabs>
                            <NavItem>
                                <NavLink active onClick={() => setActiveList("submissionContainer")}>Submissions</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink active onClick={() => setActiveList("interviewContainer")}>Interviews</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink active onClick={() => setActiveList("connectionContainer")}>Connections</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={() => {
                                    sessionStorage.clear()
                                    window.location.reload()}}>
                                    Logout
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </nav>
                              
                    <main className="mainContainer">
                        {components}
                    </main>

                </TaskProvider>
            </CompanyProvider>
        </>
    )
}