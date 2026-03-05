import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarLayout from '../components/SidebarLayout'

const DashboardLayout = () => {
  return (
    <div>
      <SidebarLayout />
      <Outlet />
    </div>
  )
}

export default DashboardLayout