
import React from 'react'
import Sign from './components/Sign-in';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/sign' element={<Sign />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<Navigate to='/sign' />} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App;
