import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Redirect from './components/Redirect'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/go/:short_code' element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
