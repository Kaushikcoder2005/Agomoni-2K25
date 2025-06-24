import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
       <ToastContainer />
      <Outlet />
    </>
  )
}

export default App
