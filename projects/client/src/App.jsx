import axios from "axios"
import { useEffect, useState } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import LoginPage from "./pages/Login"
import { useDispatch, useSelector } from "react-redux"
import { axiosInstance } from "./api"
import { login } from "./redux/features/authSlice"
import Register from "./pages/Register"
import RegisterVerification from "./pages/RegisterVerification"
import { Box } from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import HomePage from "./pages/Home"
import AdminDashboard from "./components/admin/AdminDashboard"
import "./AdminDashboard.css"
import SideNavBar from "./components/SideNavBar"
import WarehouseManagement from "./components/admin/WarehouseManagement"
import ChangePassword from "./pages/profile/ChangePassword"
import Profile from "./pages/profile/Profile"
import AdminRoute from "./components/admin/AdminRoute"
import GuestRoute from "./components/GuestRoute"
import AddressList from "./pages/profile/AddressList"
import Product from "./pages/product/Product"
import ProductDetail from "./pages/product/ProductDetail"

function App() {
    const [message, setMessage] = useState("")
    const authSelector = useSelector((state) => state.auth)

    useEffect(() => {
        ;(async () => {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/greetings`
            )
            setMessage(data?.message || "")
        })()
    }, [])

    const [authCheck, setAuthCheck] = useState(false)

    const dispatch = useDispatch()

    const location = useLocation()

    const keepUserLoggedIn = async () => {
        try {
            const auth_token = localStorage.getItem("auth_token")

            if (!auth_token) {
                setAuthCheck(true)
                return
            }

            const response = await axiosInstance.get("/auth/refresh-token")

            dispatch(login(response.data.data))

            localStorage.setItem("auth_token", response.data.token)
            setAuthCheck(true)
        } catch (err) {
            console.log(err)
            setAuthCheck(true)
        } finally {
            setAuthCheck(true)
        }
    }

    useEffect(() => {
        keepUserLoggedIn()
    }, [])

    return (
        <>
            {authSelector.RoleId === 3 || authSelector.RoleId === 2 ? (
                <SideNavBar />
            ) : null}

            {location.pathname === "/login" ||
            location.pathname === "/register" ||
            location.pathname === "/reset-password-confirmation" ||
            location.pathname === "/request-reset-password" ||
            authSelector.RoleId === 3 ||
            authSelector.RoleId === 2 ? null : (
                <Box>
                    <Navbar />
                </Box>
            )}

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/login"
                    element={
                        <GuestRoute>
                            <LoginPage />
                        </GuestRoute>
                    }
                />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/register/verification"
                    element={<RegisterVerification />}
                />
                <Route
                    path="/admin-dashboard"
                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/warehouse-management"
                    element={<WarehouseManagement />}
                />

                {/* Profiling Route */}
                <Route path="/user/profile" element={<Profile />} />
                <Route
                    path="/user/profile/change-password"
                    element={<ChangePassword />}
                />
                <Route path="/user/profile/address" element={<AddressList />} />

                {/* Product Route */}
                <Route path="/product" element={<Product />} />

                <Route
                    path="/product/:id/:product_name"
                    element={<ProductDetail />}
                />
            </Routes>

            {location.pathname === "/login" ||
            location.pathname === "/register" ||
            location.pathname === "/reset-password-confirmation" ||
            location.pathname === "/request-reset-password" ||
            authSelector.RoleId === 3 ||
            authSelector.RoleId === 2 ? null : (
                <Box>
                    <Footer />
                </Box>
            )}
        </>
    )
}

export default App
