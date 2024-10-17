import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";


export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')

    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [dashData, setDashData] = useState(false);

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.get('https://prescripto-backend-1af3.onrender.com/api/admin/all-doctors', {headers: { aToken }});
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
            const { data } = await axios.post('https://prescripto-backend-1af3.onrender.com/api/admin/change-availability', { docId }, {headers: { aToken }});
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
            const { data } = await axios.get('https://prescripto-backend-1af3.onrender.com/api/admin/appointments', {headers: { aToken }});
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

    const getDashData = async () => {
        try {
            const { data } = await axios.get('https://prescripto-backend-1af3.onrender.com/api/admin/dashboard', { headers: { aToken }});
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
        appointments, getAllAppointments,
        getDashData, 
        dashData
    }


    return (
        <AdminContext.Provider value={value} >
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider