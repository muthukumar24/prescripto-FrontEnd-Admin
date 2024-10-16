import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";


export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')

    const [appoinments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [dashData, setDashData] = useState(false);

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.get('http://localhost:4000/api/admin/all-doctors', {headers: { aToken }});
            if(data.success){
                setDoctors(data.doctors);
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post('http://localhost:4000/api/admin/change-availability', { docId }, {headers: { aToken }});
            if(data.success){
                toast.success(data.message);
                getAllDoctors();
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get('http://localhost:4000/api/admin/appointments', {headers: { aToken }});
            if(data.success){
                setAppointments(data.appointments.reverse());
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const cancelAppointment = async (appoinmentId) => {
        try {
            const { data } = await axios.post('http://localhost:4000/api/admin/cancel-appointment', { appoinmentId }, { headers: { aToken }});
            if(data.success){
                toast.success(data.message);
                getAllAppointments();
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error)
        }
    }

    const getDashData = async () => {
        try {
            const { data } = await axios.get('http://localhost:4000/api/admin/dashboard', { headers: { aToken }});
            if(data.success){
                setDashData(data.dashData);
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const value = {
        aToken, setAToken, doctors,
        getAllDoctors, changeAvailability, 
        appoinments, getAllAppointments,
        getDashData, cancelAppointment, 
        dashData
    }


    return (
        <AdminContext.Provider value={value} >
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider