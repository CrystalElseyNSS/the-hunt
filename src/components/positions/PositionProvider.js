import React, { useState, useEffect } from "react"

export const PositionContext = React.createContext()

export const PositionProvider = (props) => {
    const [positions, setPositions] = useState([])

    const getPositions = () => {
        return fetch("http://localhost:8080/positions")
            .then(res => res.json())
            .then(setPositions)
    }

    const addPosition = position => {
        return fetch("http://localhost:8080/positions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(position)
        })
            .then(getPositions)
    }

    useEffect(() => {
        getPositions()
    }, [])

    useEffect(() => {
        console.log("****  POSITION APPLICATION STATE CHANGED  ****")
    }, [positions])

    return (
        <PositionContext.Provider value={{
            positions, addPosition
        }}>
            {props.children}
        </PositionContext.Provider>
    )
}