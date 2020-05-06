// import React, { useState, useEffect } from "react"

// export const TaskContext = React.createContext()

// export const TaskProvider = (props) => {
//     const [tasks, setTasks] = useState([])

//     const getTasks = () => {
//         return fetch("http://localhost:8080/tasks")
//             .then(res => res.json())
//             .then(setTasks)
//     }

//     const addTask = task => {
//         return fetch("http://localhost:8080/tasks", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(task)
//         })
//             .then(getTasks)
//     }

//     useEffect(() => {
//         getTasks()
//     }, [])

//     useEffect(() => {
//         console.log("****  Task APPLICATION STATE CHANGED  ****")
//     }, [tasks])

//     return (
//         <TaskContext.Provider value={{
//             tasks, addTask
//         }}>
//             {props.children}
//         </TaskContext.Provider>
//     )
// }