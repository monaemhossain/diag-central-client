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

const ManageAllTests = () => {
    const [tests, setTests] = useState([]);
    const [test, setTest] = useState([])
    const [testId, setTestId] = useState('')

    useEffect(() => {
        axios.get('https://diag-central-server.vercel.app/tests')
            .then(res => setTests(res.data))
    }, [])
    // console.log(tests);





    // edit and delete dialog open and close button function
    const [openEdit, setOpenEdit] = useState(false);
    const handleClickOpenEdit = async (id) => {
        await axios.get(`https://diag-central-server.vercel.app/test/${id}`)
            .then(res => setTest(res.data))
            .catch(err => console.log(err))
        setOpenEdit(true);
        setTestId(id);
    };
    // console.log(times[0]);

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const [openDelete, setOpenDelete] = useState(false);
    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };
    const handleCloseDelete = () => {
        setOpenDelete(false);
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
        // console.log(testData);
        // console.log(testId);
        axios.put(`https://diag-central-server.vercel.app/update/test/${testId}`, updatedData)
            .then(() => {
                axios.get('https://diag-central-server.vercel.app/tests')
                    .then(res => setTests(res.data))
                toast.success('Test Updated successfully')
            })
            .catch(err => console.log(err))
            setOpenEdit(false)
    }



    // delete test
    const handleDeleteTest = (e, id) => {
        e.preventDefault();
        console.log(id);
        axios.delete(`https://diag-central-server.vercel.app/test/${id}`)
            .then(() => {
                axios.get('https://diag-central-server.vercel.app/tests')
                    .then(res => setTests(res.data))
                    .catch((err) => console.log(err))
            });
        setOpenDelete(false)
    }

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        All tests
                    </h3>
                </div>
            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6"></th>
                            <th className="py-3 px-6">Test Name</th>
                            <th className="py-3 px-6">Available Date</th>
                            <th className="py-3 px-6">Available Time </th>
                            <th className="py-3 px-6">Available Slot </th>
                            <th className="py-3 px-6"></th>

                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            tests?.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="text-center">{idx + 1}.</td>
                                    <td className="flex items-center gap-x-3 py-3 whitespace-nowrap">
                                        <img src={validator.isURL(item.image) ? item.image : 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'} className="w-10 h-10 rounded-full" />
                                        <div>
                                            <span className="block text-gray-700 text-sm font-medium">{item.title}</span>
                                            <span className="block text-gray-700 text-xs">{item?.description?.slice(0, 30)}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap space-x-3">{item.availableDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap space-x-3">{item.timeSlot}</td>
                                    <td className="px-6 py-4 whitespace-nowrap space-x-3 text-center">{item.availableSlot}</td>
                                    <td className="text-right px-6 whitespace-nowrap">

                                        <React.Fragment>
                                            <button onClick={() => handleClickOpenEdit(item._id)}
                                                className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                                            >
                                                Edit
                                            </button>
                                            <BootstrapDialog
                                                onClose={handleCloseEdit}
                                                aria-labelledby="customized-dialog-title"
                                                open={openEdit}
                                            >
                                                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                                    Edit Test
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
                                                                    Update test name
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
                                                                    Update date
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
                                                                <label className="font-medium" htmlFor="timeSlot">
                                                                    Update Time
                                                                </label>
                                                                <input
                                                                    id="timeSlot"
                                                                    type="text"
                                                                    defaultValue={test.timeSlot}
                                                                    required
                                                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="font-medium" htmlFor="image">
                                                                    update test thumbnail image url
                                                                </label>
                                                                <input
                                                                    defaultValue={test.image}
                                                                    id="image"
                                                                    type="text"
                                                                    required
                                                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="font-medium" htmlFor="description">
                                                                    Update description
                                                                </label>
                                                                <textarea defaultValue={test.description} required id="description" className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"></textarea>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-2">
                                                                <div>
                                                                    <label className="font-medium" htmlFor="availableSlot">
                                                                        Update slot
                                                                    </label>
                                                                    <input
                                                                        defaultValue={test.availableSlot}
                                                                        id="availableSlot"
                                                                        type="number"
                                                                        required
                                                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="font-medium" htmlFor="price">
                                                                        Change Price
                                                                    </label>
                                                                    <input
                                                                        defaultValue={test.price}
                                                                        id="price"
                                                                        type="number"
                                                                        required
                                                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-primary shadow-sm rounded-lg"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <button
                                                                    type="submit"
                                                                    className="w-full px-4 py-2 text-white font-medium bg-primary hover:bg-secondary active:bg-primary rounded-lg duration-150"
                                                                >
                                                                    Update Test
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </DialogContent>

                                            </BootstrapDialog>
                                        </React.Fragment>


                                        {/* delete test */}

                                        <React.Fragment>
                                            <button onClick={handleClickOpenDelete} className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                                Delete
                                            </button>
                                            <BootstrapDialog
                                                onClose={handleCloseDelete}
                                                aria-labelledby="customized-dialog-title"
                                                open={openDelete}
                                            >
                                                <DialogTitle sx={{ m: 0, p: 3 }} id="customized-dialog-title">
                                                    Are you sure? This Test will be deleted permanently and cannot be recovered!!
                                                </DialogTitle>
                                                <IconButton
                                                    aria-label="close"
                                                    onClick={handleCloseDelete}
                                                    sx={{
                                                        position: 'absolute',
                                                        right: 8,
                                                        top: 8,
                                                        color: (theme) => theme.palette.grey[500],
                                                    }}
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                                <DialogActions sx={{ p: 2 }}>
                                                    <Button onClick={handleCloseDelete}>No</Button>
                                                    <Button variant='contained' color='error' onClick={(e) => handleDeleteTest(e, item._id)} autoFocus>
                                                        Yes! Delete it
                                                    </Button>
                                                </DialogActions>
                                            </BootstrapDialog>
                                        </React.Fragment>

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

                <Pagination count={10} variant="outlined" sx={{mt: 3, display:'grid', justifyContent: 'center'}}/>
        </div>
    )
}

export default ManageAllTests;