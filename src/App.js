import { Routes, Route } from "react-router-dom"
import { ProtectedRoute } from "./components/utils.components"

// pages
import { Login, AddUser, Jobs, Clients, JobEntry, JobDetails } from "./pages"

const App = () => {
  return (
    <Routes>
      <Route element={<Login />} path="login" />
      <Route element={
        <ProtectedRoute>
          <Clients />
        </ProtectedRoute>
      } path="/" />
      <Route element={
        <ProtectedRoute>
          <AddUser />
        </ProtectedRoute>
      } path="add_user" />
      <Route element={
        <ProtectedRoute>
          <Jobs />
        </ProtectedRoute>
      } path="jobs" />
      <Route element={
        <ProtectedRoute>
          <JobDetails />
        </ProtectedRoute>
      } path="job_details/:reg_num" />
      <Route element={
        <ProtectedRoute>
          <Clients />
        </ProtectedRoute>
      } path="clients" />
      <Route element={
        <ProtectedRoute>
          <JobEntry />
        </ProtectedRoute>
      } path="job_entry" />
    </Routes>
  )
}

export default App