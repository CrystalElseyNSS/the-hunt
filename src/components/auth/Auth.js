import React from "react"
import Login from "./Login"
import Register from "./Register"
import "./Auth.css"

export default ({toggle}) => {
    return (
        <>
            <article className="authContainer">
                <Login toggle={toggle} />
                <Register toggle={toggle} />
            </article>
        </>
    )
}