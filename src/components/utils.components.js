import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {

    const token = localStorage.getItem('qqrv')

    return token ? children : <Navigate to="login" replace />

}

export { ProtectedRoute }