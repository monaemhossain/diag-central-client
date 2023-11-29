import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import validator from 'validator';
import { Pagination } from '@mui/material';






const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const ReservationTable = () => {
    const [reservations, setReservations] = useState([]);
    const [test, setTest] = useState([])
    const [appointmentId, setAppointmentIdId] = useState('')

    useEffect(() => {
        axios.get('http://localhost:4000/appointments')
            .then(res => setReservations(res.data))
    }, [])
    // console.log(reservations);





    const [openEdit, setOpenEdit] = useState(false);
    const handleClickOpenEdit = async (id) => {
        await axios.get(`http://localhost:4000/appointments/${id}`)
            .then(res => setTest(res.data))
            .catch(err => console.log(err))
        setOpenEdit(true);
        setAppointmentIdId(id);
    };
    // console.log(times[0]);

    // edit and delete dialog open and close button function
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const [openCancel, setOpenCancel] = useState(false);
    const handleClickOpenCancel = () => {
        setOpenCancel(true);
    };
    const handleCloseCancel = () => {
        setOpenCancel(false);
    };





    // edit test
    const handleUpdateTest = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const availableDate = form.availableDate.value;
        const timeSlot = form.timeSlot.value;
        const image = form.image.value;

        if (validator.isURL(image) === false) {
            toast.error('Image link is invalid');
            return;
        }

        const description = form.description.value;
        const availableSlot = parseInt(form.availableSlot.value);
        const price = form.price.value;

        const updatedData = { title, availableDate, timeSlot, image, description, availableSlot, price };

        axios.put(`http://localhost:4000/appointments/result/${appointmentId}`, updatedData)
            .then(() => {
                axios.get('http://localhost:4000/appointments')
                    .then(res => setReservations(res.data))
                toast.success('Test Updated successfully')
            })
            .catch(err => console.log(err))
        setOpenEdit(false)
    }



    // cancel appointment
    const handleCancelAppointment = (e, id) => {
        console.log(id);
        e.preventDefault();
        console.log(id);
        axios.delete(`http://localhost:4000/appointments/${id}`)
            .then(() => {
                axios.get('http://localhost:4000/appointments')
                    .then(res => setReservations(res.data))
                    .catch((err) => console.log(err))
            });
        setOpenCancel(false)
    }

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        All Reservations
                    </h3>
                </div>
            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6"></th>
                            <th className="py-3 px-6">Patient</th>
                            <th className="py-3 px-6">Test Name</th>
                            <th className="py-3 px-6">Test Time </th>
                            <th className="py-3 px-6">Test Date </th>
                            <th className="py-3 px-6"></th>

                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            reservations?.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="text-center">{idx + 1}.</td>
                                    <td className="flex items-center gap-x-3 py-3 whitespace-nowrap">
                                        <img src={validator.isURL(item?.userPhoto) ? item?.userPhoto : 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'} className="w-10 h-10 rounded-full" />
                                        <div>
                                            <span className="block text-gray-700 text-sm font-medium">{item?.userName}</span>
                                            <span className="block text-gray-700 text-sm font-medium">{item?.userEmail}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap space-x-3">{item?.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap space-x-3">{item?.timeSlot}</td>
                                    <td className="px-6 py-4 whitespace-nowrap space-x-3">{item?.availableDate}</td>
                                    <td className="text-right px-6 whitespace-nowrap space-x-2">


                                        {/* delete test */}

                                        <React.Fragment>
                                            <Button variant='contained' color='error' onClick={handleClickOpenCancel} >
                                                Cancel
                                            </Button>
                                            <BootstrapDialog
                                                onClose={handleCloseCancel}
                                                aria-labelledby="customized-dialog-title"
                                                open={openCancel}
                                            >
                                                <DialogTitle sx={{ m: 0, p: 3 }} id="customized-dialog-title">
                                                    Are you sure? You want to cancel the appointment?
                                                </DialogTitle>
                                                <DialogActions sx={{ p: 2 }}>
                                                    <Button onClick={handleCloseCancel}>No</Button>
                                                    <Button variant='contained' color='error' onClick={(e) => handleCancelAppointment(e, item._id)} autoFocus>
                                                        Yes!
                                                    </Button>
                                                </DialogActions>
                                            </BootstrapDialog>
                                        </React.Fragment>

                                        <React.Fragment>
                                            <Button variant='contained' onClick={() => handleClickOpenEdit(item?._id)} >
                                                Submit Report
                                            </Button>
                                            <BootstrapDialog
                                                onClose={handleCloseEdit}
                                                aria-labelledby="customized-dialog-title"
                                                open={openEdit}
                                            >
                                                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                                    Submit Test Report
                                                </DialogTitle>
                                                <IconButton
                                                    aria-label="close"
                                                    onClick={handleCloseEdit}
                                                    sx={{
                                                        position: 'absolute',
                                                        right: 8,
                                                        top: 8,
                                                        color: (theme) => theme.palette.grey[500],
                                                    }}
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                                <DialogContent dividers>
                                                    <div className="bg-white w-full shadow p-4 py-6 sm:p-6 sm:rounded-lg">
                                                        <form onSubmit={(e) => handleUpdateTest(e)} className="space-y-5">
                                                            <div>
                                                                <label className="font-medium" htmlFor="title">
                                                                    Patient name:
                                                                </label>
                                                                <input
                                                                    id="title"
                                                                    type="text"
                                                                    defaultValue={test.title}
                                                                    required
                                                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="font-medium" htmlFor="availableDate">
                                                                    Report date:
                                                                </label>
                                                                <br />
                                                                <input
                                                                    defaultValue={test.availableDate}
                                                                    id="availableDate"
                                                                    type="date"
                                                                    required
                                                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                                                                />
                                                            </div>

                                                            <div>
                                                                <p>image</p>
                                                            </div>
                                                            <div>
                                                                <label className="font-medium" htmlFor="description">
                                                                    Result description
                                                                </label>
                                                                <textarea defaultValue={test.description} required id="description" className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"></textarea>
                                                            </div>

                                                            <div>
                                                                <label className="font-medium" htmlFor="price">
                                                                    Price
                                                                </label>
                                                                <input
                                                                    defaultValue={test.price}
                                                                    id="price"
                                                                    type="number"
                                                                    required
                                                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                                                                />
                                                            </div>

                                                            <div className="flex gap-2">
                                                                <button
                                                                    type="submit"
                                                                    className="w-full px-4 py-2 text-white font-medium bg-primary hover:bg-secondary active:bg-primary rounded-lg duration-150"
                                                                >
                                                                    Submit Test Result
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </DialogContent>

                                            </BootstrapDialog>
                                        </React.Fragment>



                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <Pagination count={10} variant="outlined" sx={{ mt: 3, display: 'grid', justifyContent: 'center' }} />
        </div>
    )
}

export default ReservationTable;