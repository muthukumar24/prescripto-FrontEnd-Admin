import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import EditDoctorModal from '../Admin/EditDoctorModal';

const DoctorsList = () => {

  const { doctors, changeAvailability , aToken , getAllDoctors} = useContext(AdminContext)
  const [seletedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(null);


  const editDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  }

  // Remove Doctor
  const removeDoctor = async (id) => {
    try {
      const response = await axios.post('http://localhost:4000/api/admin/remove-doctor', { id }, { headers: { aToken } });
      if (response.data.success) {
        toast.success(response.data.message);
        await getAllDoctors();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  useEffect(() => {
    if (aToken) {
        getAllDoctors()
    }
}, [aToken])

  return (
    <>
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors.map((item, index) => (
          <div className='border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
            <img className='bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
            <div className='p-4'>
              <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
              <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
              <div className='mt-2 flex justify-between items-center gap-1 text-sm'>
                <div className='flex gap-1'>
                <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
                <p>Available</p>
                </div>
                <div className='flex gap-2'>
                <h3 onClick={() => editDoctor(item)} className="cursor-pointer text-lg"><FaEdit color='#5F6FFF' /></h3>
                <h4 onClick={() => removeDoctor(item._id)} className="cursor-pointer text-lg"><MdDelete color='#5F6FFF' /></h4>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Doctor Edit Modal */}
      {
        isModalOpen && (
        <EditDoctorModal
        doctor = {seletedDoctor}
        isOpen = {isModalOpen}
        onClose = {() => setIsModalOpen(false)}
        getAllDoctors = {getAllDoctors}
        aToken = {aToken} />
      )}
    </>
  )
}

export default DoctorsList