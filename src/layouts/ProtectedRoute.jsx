import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {

  const currentUser = true

  return (
    <div>
      {currentUser ? <Outlet/> : <Navigate to={"/sign-in"}/>}
    </div>
  )
}

export default ProtectedRoute