import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../Component/Dashboard'

const Routess = () => {
  return (
      <Routes>
    <Route path='/' element={<Dashboard></Dashboard>} />
      </Routes>
  )
}

export default Routess
