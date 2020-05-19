import React from "react"
import { Table } from 'reactstrap';
import "./Resources.css"

export default () => {
    
    return (
        <>
        <section className="resourcesPage">
            <header className="resources__header">
                <p className="form--heading">Be Prepared</p>
            </header>
            
            <header className="resources__img">
                <div className="imgOne"></div>
            </header>

            <Table striped>
                <tbody>
                    <tr></tr>  
                    <tr>
                        <th className="link" scope="row">
                            <a target="blank" href="https://www.nytimes.com/2016/10/22/business/how-to-write-a-cover-letter-that-stands-out.html">How to Write a Cover Letter People Will Actually Read</a>
                        </th>
                        <td className="source">New York Times</td>
                    </tr>  
                    <tr></tr>  
                    <tr>
                        <th className="link" scope="row">
                            <a target="blank" href="https://www.roberthalf.com/blog/job-market/best-job-search-apps">11 Best Job Search Apps to Save You Time</a>
                        </th>
                        <td className="source">Robert Half Staffing</td>
                    </tr>   
                </tbody>
            </Table>

            <header className="resources__img">
                <div className="imgTwo"></div>
            </header>

            <Table>
                <tbody>
                    <tr>
                        <th className="link" scope="row">
                            <a target="blank" href="https://www.forbes.com/sites/jacquelynsmith/2013/01/11/how-to-ace-the-50-most-common-interview-questions/#5e73ad164624">How To Ace The 50 Most Common Interview Questions</a>
                        </th>
                        <td className="source">Forbes Magazine</td>
                    </tr>
                    <tr>
                        <th className="link" scope="row">
                            <a target="blank" href="https://www.businessnewsdaily.com/8364-post-interview-mistakes.html">Things You Should Never Do During and After a Job Interview</a>
                        </th>
                        <td className="source">Business News Daily</td>
                    </tr>  
                </tbody>
            </Table>

            <header className="resources__img">
                <div className="imgThree"></div>
            </header>

            <Table>
                <tbody>
                    <tr>
                        <th className="link" scope="row">
                            <a target="blank" href="https://www.theguardian.com/careers/2015/aug/19/seven-ways-to-boost-confidence-at-a-job-interview">Seven Ways to Boost Confidence at a Job Interview</a>
                        </th>
                        <td className="source">Forbes Magazine</td>
                    </tr> 
                    <tr>
                        <th className="link" scope="row">
                            <a target="blank" href="https://www.forbes.com/sites/dailymuse/2012/05/30/4-non-annoying-ways-to-follow-up-after-an-interview/#2c1225fd7097">Four Non-Annoying Ways to Follow Up After an Interview</a>
                        </th>
                        <td className="source">Forbes Magazine</td>
                    </tr> 
                </tbody>
            </Table>
        </section>
        </>
    )
}
       


