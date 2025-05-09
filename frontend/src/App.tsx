import './App.css'
import Login from './pages/login'
import AdminLogin from './pages/adminLogin'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/dashboard' element={<h1>Hii</h1>}></Route>
          <Route path='/admin/login' element={<AdminLogin />}></Route>
          <Route path='/admin/dashboard' element={<h1>Hii</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
