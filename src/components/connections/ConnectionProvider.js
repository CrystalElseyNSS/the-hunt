import React, { useState, useEffect } from "react"

export const ConnectionContext = React.createContext()

export const ConnectionProvider = (props) => {
    const [connections, setConnections] = useState([])

    const getConnections = () => {
        fetch("http://localhost:8080/connections")
        .then(res => {
            return res.json()
        })
        .then(setConnections)
    }
    
    const addConnection = connection => {
        return fetch("http://localhost:8080/connections", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(connection)
        })
        .then(getConnections)
    }

    const updateConnection = connection => {
        return fetch(`http://localhost:8080/connections/${connection.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(connection)
        })
        .then(getConnections)
    }

    const deleteConnection = connectionId => {
        return fetch(`http://localhost:8080/connections/${connectionId}`, {
            method: "DELETE"
        })
        .then(getConnections)
    }

    useEffect(() => {
        getConnections()
    }, [])

    useEffect(() => {
        console.log("****  CONNECTION APPLICATION STATE CHANGED  ****")
    }, [connections])

    return (
        <ConnectionContext.Provider value={{
            connections, addConnection, deleteConnection, updateConnection
        }}>
            {props.children}
        </ConnectionContext.Provider>
    )
}