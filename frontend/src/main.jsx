import React,{ StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import UserPage from './pages/UserPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ShowQRcode from './pages/ShowQRcode.jsx'

import Admin from './pages/Admin.jsx'


const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
        <Route index element={<HomePage/>} />
        <Route path='/generatetoken' element={<UserPage/>}/>
        <Route path='/showqr' element={<ShowQRcode/>}/>
        <Route path='/admin' element={<Admin/>}/>
        
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes}/>
  </React.StrictMode>,
)
