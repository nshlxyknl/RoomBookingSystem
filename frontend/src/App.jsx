
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ProtectedRoutes } from './routes/ProtectedRoutes'
import { PublicRoutes } from './routes/PublicRoutes'
import Dashboard from './dashboard/Dashboard'
import { Toaster } from 'sonner'

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
         <Route path='/' element={<PublicRoutes> <HomePage/> </PublicRoutes>}> </Route>
  <Route path='/register' element={<PublicRoutes> <Register/> </PublicRoutes> } ></Route>
  <Route path='/login' element={<PublicRoutes> <Login/> </PublicRoutes> } ></Route>
         <Route path='/dashboard' element={<ProtectedRoutes> <Dashboard/> </ProtectedRoutes>}/> 
      </Routes>
      <Footer/>
               <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>

  )
}

export default App
