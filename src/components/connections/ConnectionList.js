import React, { useContext, useEffect, useState } from "react"
import { ConnectionContext } from "./ConnectionProvider"
import Connection from "./Connection"
import "./Connection.css"

export const ConnectionList = () => {
    const { connections } = useContext(ConnectionContext)
    let activeUser = parseInt(sessionStorage.getItem("user"))
    const [userConnections, setUserConnections] = useState([])

    useEffect(() => {
        const activeUserConnections = connections.filter(c => c.userId === activeUser)
        setUserConnections(activeUserConnections)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [connections])

    return (
        <>
            <header className="connection__header">
                <p className="form--heading">Made Connections</p>
            </header>
                
            <section>                    
                {userConnections.map(conn => {
                    return <Connection key={conn.id} value={conn.id} connection={conn} />
                })}
            </section>
        </>
    )   
}