import { Routes, Route } from "react-router-dom"

import { ProtectedRoute } from "./components/utils.components"

// pages
import { Login, Dashboard, AddUser, Jobs, Clients, JobEntry } from "./pages"

const App = () => {
  return (
    <Routes>
      <Route element={<Login />} path="login" />
      <Route element={
        <ProtectedRoute>
          <Dashboard />
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