import React, { useRef } from "react"
import "./Auth.css"


const Login = props => {
    const email = useRef()
    const password = useRef()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8080/users?email=${email.current.value}`)
            .then(_ => _.json())
            .then(user => {
                if (user.length) {
                    return user[0]
                }
                return false
            })
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists && exists.password === password.current.value) {
                    sessionStorage.setItem("user", exists.id)
                    props.toggle()
                } else if (exists && exists.password !== password.current.value) {
                    window.alert("Password does not match")
                } else if (!exists) {
                    window.alert("User account does not exist")
                }
            })
    }

    return (
        <article className="loginContainer">
            <header className="headerContainer">
                <h1 className="header--name">The Hunt</h1>
                <h2 className="header--tagline">Ready. Aim. Hired.</h2>
            </header>
            <form className="loginForm" onSubmit={handleLogin}>
                <h4 className="loginHeader">Please sign in: </h4>
                <fieldset>
                    <label htmlFor="email"> Email Address </label>
                    <input ref={email} type="email"
                        id="email"
                        className="form-control"
                        required 
                        autoFocus 
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="password"> Password </label>
                    <input ref={password} type="password"
                        id="password"
                        className="form-control"
                        required 
                    />
                </fieldset>
                <fieldset>
                    <button type="submit" className="loginBtn">
                        Sign in 
                    </button>
                </fieldset>
            </form>
        </article>
    )
}

export default Login