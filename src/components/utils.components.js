import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {

    const token = sessionStorage.getItem('qqrv')

    return token ? children : <Navigate to="login" replace />

}

export { ProtectedRoute }