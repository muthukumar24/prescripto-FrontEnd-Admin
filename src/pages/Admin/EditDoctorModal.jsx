import React, { useState } from 'react';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';

const EditDoctorModal = ({ doctor, isOpen, onClose, getAllDoctors, aToken }) => {
    const [docImg, setDocImg] = useState(null);
    const [name, setName] = useState(doctor?.name || '');
    const [email, setEmail] = useState(doctor?.email || '');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState(doctor?.experience || '1 Year');
    const [fees, setFees] = useState(doctor?.fees || '');
    const [about, setAbout] = useState(doctor?.about || '');
    const [speciality, setSpeciality] = useState(doctor?.speciality || 'General Physician');
    const [degree, setDegree] = useState(doctor?.degree || '');
    const [address1, setAddress1] = useState(doctor?.address?.line1 || '');
    const [address2, setAddress2] = useState(doctor?.address?.line2 || '');

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();

            if (docImg) {
                formData.append('image', docImg);
            }
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experience', experience);
            formData.append('fees', Number(fees));
            formData.append('about', about);
            formData.append('speciality', speciality);
            formData.append('degree', degree);
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

            const { data } = await axios.put(`https://prescripto-backend-1af3.onrender.com/api/admin/update-doctor/${doctor._id}`, formData, {
                headers: { aToken },
            });

            if (data.success) {
                toast.success(data.message);
                getAllDoctors();
                onClose();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            {isOpen && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl'>
                        <h2 className='text-xl mb-4'>Edit Doctor</h2>
                        <form onSubmit={onSubmitHandler} className='space-y-4'>

                            <div className='flex items-center gap-4 mb-4'>
                                <label htmlFor='doc-img'>
                                    <img
                                        className='w-16 h-16 rounded-full cursor-pointer bg-gray-100'
                                        src={docImg ? URL.createObjectURL(docImg) : doctor?.image || assets.upload_area}
                                        alt=''
                                    />
                                </label>
                                <input
                                    type='file'
                                    id='doc-img'
                                    hidden
                                    onChange={(e) => setDocImg(e.target.files[0])}
                                />
                                <p>Upload Doctor Picture</p>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label>Your Name</label>
                                    <input
                                        type='text'
                                        className='border rounded px-3 py-2 w-full'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Doctor Email</label>
                                    <input
                                        type='email'
                                        className='border rounded px-3 py-2 w-full'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Set Password</label>
                                    <input
                                        type='password'
                                        className='border rounded px-3 py-2 w-full'
                                        placeholder='Leave blank to keep the current password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label>Experience</label>
                                    <select
                                        className='border rounded px-3 py-2 w-full'
                                        value={experience}
                                        onChange={(e) => setExperience(e.target.value)}
                                    >
                                        <option value='1 Year'>1 Year</option>
                                        <option value='2 Years'>2 Years</option>
                                        <option value='3 Years'>3 Years</option>
                                        <option value='4 Years'>4 Years</option>
                                        <option value='5 Years'>5 Years</option>
                                        <option value='6 Years'>6 Years</option>
                                        <option value='8 Years'>8 Years</option>
                                        <option value='9 Years'>9 Years</option>
                                        <option value='10 Years'>10 Years</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Fees</label>
                                    <input
                                        type='number'
                                        className='border rounded px-3 py-2 w-full'
                                        value={fees}
                                        onChange={(e) => setFees(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Speciality</label>
                                    <select
                                        className='border rounded px-3 py-2 w-full'
                                        value={speciality}
                                        onChange={(e) => setSpeciality(e.target.value)}
                                    >
                                        <option value='General Physician'>General Physician</option>
                                        <option value='Gynecologist'>Gynecologist</option>
                                        <option value='Dermatologist'>Dermatologist</option>
                                        <option value='Pediatricians'>Pediatricians</option>
                                        <option value='Neurologist'>Neurologist</option>
                                        <option value='Gastroenterologist'>Gastroenterologist</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Degree</label>
                                    <input
                                        type='text'
                                        className='border rounded px-3 py-2 w-full'
                                        value={degree}
                                        onChange={(e) => setDegree(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Address 1</label>
                                    <input
                                        type='text'
                                        className='border rounded px-3 py-2 w-full'
                                        value={address1}
                                        onChange={(e) => setAddress1(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Address 2</label>
                                    <input
                                        type='text'
                                        className='border rounded px-3 py-2 w-full'
                                        value={address2}
                                        onChange={(e) => setAddress2(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label>About Doctor</label>
                                <textarea
                                    className='border rounded px-3 py-2 w-full'
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className='flex justify-end space-x-3'>
                                <button
                                    type='button'
                                    onClick={onClose}
                                    className='px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600'
                                >
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditDoctorModal;
