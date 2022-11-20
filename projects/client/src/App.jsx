import axios from "axios"
import logo from "./logo.svg"
import "./App.css"
import { useEffect, useState } from "react"

import Profile from "./pages/profile/Profile"
import { Route, Routes } from "react-router-dom"
import ChangePassword from "./pages/profile/ChangePassword"

function App() {
    const [message, setMessage] = useState("")

    useEffect(() => {
        ;(async () => {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/greetings`
            )
            setMessage(data?.message || "")
        })()
    }, [])
    return (
        <>
            <Routes>
                <Route path="/profile" element={<Profile />} />
                <Route
                    path="/profile/change-password"
                    element={<ChangePassword />}
                />
            </Routes>
        </>
    )
}

export default App
