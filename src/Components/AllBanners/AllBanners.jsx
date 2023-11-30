import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import validator from 'validator';
import { Pagination, Switch } from '@mui/material';






const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const AllBanners = () => {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/banners')
            .then(res => setBanners(res.data))
    }, [])
    // console.log(reservations);



    const [openCancel, setOpenCancel] = useState(false);
    const [bannerId , setBannerId] = useState('')
    const handleClickOpen = (id) => {
        setOpenCancel(true);
        setBannerId(id);
    };
    const handleClose = () => {
        setOpenCancel(false);
    };

    // turn on or off the banner
    const handleChange = async (e, id) => {
        const newStatus = e.target.checked;

        try {
            await axios.put('http://localhost:4000/banners/resetActive');

            await axios.put(`http://localhost:4000/banners/update/${id}`, { isActive: newStatus })
                .then(() => {
                    axios.get('http://localhost:4000/banners')
                        .then(res => setBanners(res.data))
                })
            setBanners((prevBanners) =>
                prevBanners.map((banner) =>
                    banner._id === id ? { ...banner, isActive: newStatus } : banner
                )
            );
        } catch (error) {
            console.error('Error updating isActive status:', error);
        }
    };

    // Delete banner
    const handleDeleteBanner = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:4000/banners/${bannerId}`)
            .then(() => {
                axios.get('http://localhost:4000/banners')
                    .then(res => setBanners(res.data))
                    .catch((err) => console.log(err))
                toast.success('banner is deleted')
            });
        setOpenCancel(false)
    }

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="items-start justify-between md:flex">
                <div className="md:flex grid gap-2 w-full justify-center md:justify-between items-center">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl text-center">
                        All Banners
                    </h3>
                </div>
            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6"></th>
                            <th className="py-3 px-6">Thumbnail</th>
                            <th className="py-3 px-6">Banner Name</th>
                            <th className="py-3 px-6">Banner title</th>
                            <th className="py-3 px-6">Activate status </th>
                            <th className="py-3 px-6">On/Off</th>
                            <th className="py-3 px-6"></th>

                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            banners?.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="text-center">{idx + 1}.</td>
                                    <td className="flex items-center gap-x-3 py-3 whitespace-nowrap justify-center">
                                        <img src={validator.isURL(item?.imageUrl) ? item?.imageUrl : 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'} className="w-10 h-10 rounded-full" />
                                        
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap space-x-3">{item?.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap space-x-3">{item?.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap space-x-3">
                                        {item?.isActive === true ? 'active' : 'not active'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap space-x-3">
                                        <Switch
                                            checked={item.isActive}
                                            onChange={(e) => handleChange(e, item._id)}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </td>
                                    <td className="text-right px-6 whitespace-nowrap space-x-2">


                                        {/* delete banner */}

                                        <React.Fragment>
                                            <Button variant='contained' color='error' onClick={() => handleClickOpen(item._id)} >
                                                Delete
                                            </Button>
                                            <BootstrapDialog
                                                onClose={handleClose}
                                                aria-labelledby="customized-dialog-title"
                                                open={openCancel}
                                            >
                                                <DialogTitle sx={{ m: 0, p: 3 }} id="customized-dialog-title">
                                                    Are you sure? You want to delete the banner?
                                                </DialogTitle>
                                                <DialogActions sx={{ p: 2 }}>
                                                    <Button onClick={handleClose}>No</Button>
                                                    <Button variant='contained' color='error' onClick={(e) => handleDeleteBanner(e)} autoFocus>
                                                        Yes!
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

            <Pagination count={10} variant="outlined" sx={{ mt: 3, display: 'grid', justifyContent: 'center' }} />
        </div>
    )
}

export default AllBanners;