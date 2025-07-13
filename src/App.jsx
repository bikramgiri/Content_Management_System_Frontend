import React from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import CreateBlog from './pages/CreateBlog/CreateBlog'
import SingleBlog from './pages/SingleBlog/SingleBlog'
import EditBlog from './pages/EditBlog/EditBlog'

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createBlog" element={<CreateBlog />} />
        <Route path="/singleBlog/:id" element={<SingleBlog />} />
        <Route path="/editBlog/:id" element={<EditBlog />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
