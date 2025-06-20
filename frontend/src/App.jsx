import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'

function App() {

  return (
    <>

      <Outlet />
    </>
  )
}

export default App
