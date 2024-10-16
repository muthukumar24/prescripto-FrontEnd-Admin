import React, { useContext } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Admin/Dashboard';
import DoctorProfile from './pages/Dcotor/DoctorProfile';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import DoctorDashboard from './pages/Dcotor/DoctorDashboard';
import DoctorAppointments from './pages/Dcotor/DoctorAppointments';
import { DoctorContext } from './context/DoctorContext';
import { AdminContext } from './context/AdminContext';

const App = () => {

  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);

  return dToken || aToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>}></Route>
          <Route path='/admin-dashboard' element={<Dashboard />}></Route>
          <Route path='/all-appointments' element={<AllAppointments/>}></Route>
          <Route path='/add-doctor' element={<AddDoctor/>}></Route>
          <Route path='/doctor-list' element={<DoctorsList/>}></Route>
          <Route path='/doctor-dashboard' element={<DoctorDashboard/>}></Route>
          <Route path='/doctor-appointments' element={<DoctorAppointments/>}></Route>
          <Route path='/doctor-profile' element={<DoctorProfile/>}></Route>
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  )
}

export default App