import GoogleIcon from '@mui/icons-material/Google';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useState } from 'react';
import axios from 'axios';



const SignUpForm = () => {
    const [allDistricts, setAllDistricts] = useState([])
    const [allUpazilas, setAllUpazilas] = useState([])
    const [blood, setBlood] = useState('')
    const [upazila, setUpazila] = useState('')
    const [district, setDistrict] = useState('')
    const bloodGroupList = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    const handleChangeBlood = (event) => {
        setBlood(event.target.value);
    };

    const handleChangeDistrict = (event) => {
        setDistrict(event.target.value);
    };

    const handleChangeUpazila = (event) => {
        setUpazila(event.target.value)
    };

    useEffect(() => {
        axios.get('upazilas.json')
            .then(res => setAllUpazilas(res.data[2].data))
            .catch(err => console.log(err))

        axios.get('districts.json')
            .then(res => setAllDistricts(res.data[2].data))
            .catch(err => console.log(err))

    }, [])



    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(e.target);
        const form = e.target;
        const userName = form.name.value;
        const userEmail = form.email.value;
        const userBloodGroup = blood;
        const userDistrict = upazila;
        const userUpazila = district;
        const userAvatar = form.avatar.value;
        const newPassword = form.newPassword.value;
        const confirmPassword = form.confirmPassword.value;
        const userDetails = {userName, userEmail, userBloodGroup, userDistrict, userUpazila, userAvatar, newPassword, confirmPassword}
        console.log(userDetails);
    }

    return (
        <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
            <div>
                <img src="https://floatui.com/logo.svg" width={150} className="lg:hidden" />
                <div className="mt-5 space-y-2">
                    <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Sign up</h3>
                    <p className="">Already have an account? <NavLink to='/login' className="font-medium text-defaultText    hover:text-indigo-500 ">Log in</NavLink></p>
                </div>
            </div>
            <div className="grid grid-cols-1">
                <Button variant="outlined" sx={{ py: 1 }} >
                    <GoogleIcon className='text-primary' />
                </Button>
            </div>
            <div className="relative">
                <span className="block w-full h-px bg-gray-300"></span>
                <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">Or continue with</p>
            </div>
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <FormControl fullWidth>
                    <TextField
                        label="Your Full Name"
                        id="name"
                        size="small"
                        type='text'
                        required
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        label="Your Email Address"
                        id="email"
                        size="small"
                        type='email'
                        required
                    />
                </FormControl>

                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="bloodGroup">Blood Group</InputLabel>
                                <Select
                                    labelId="bloodGroup"
                                    id="bloodGroup"
                                    label="bloodGroup"
                                    value={blood}
                                    onChange={handleChangeBlood}
                                    required
                                >
                                    {
                                        bloodGroupList?.map((item, index) =>
                                            <MenuItem value={item} key={index}>{item}</MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </Grid>


                        <Grid item xs={6}>
                            <Button fullWidth component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ py: '7px' }}>
                                Upload Avatar
                                <VisuallyHiddenInput id='avatar' type="file" required />
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="district">District</InputLabel>
                                <Select
                                    labelId="district"
                                    id="district"
                                    label="district"
                                    value={district}
                                    onChange={handleChangeDistrict}
                                    required
                                >
                                    {
                                        allDistricts?.map((item, index) =>
                                            <MenuItem value={item.name} key={index}>{item.name}</MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </Grid>


                        <Grid item xs={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="upazila">Upazila</InputLabel>
                                <Select size="small"
                                    labelId="upazila"
                                    id="upazila"
                                    label="upazila"
                                    value={upazila}
                                    onChange={handleChangeUpazila}
                                    required
                                >

                                    {
                                        allUpazilas?.map((item, index) =>
                                            <MenuItem value={item.name} key={index}>{item.name}</MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>


                <FormControl fullWidth>
                    <TextField
                        label="New Password"
                        id="newPassword"
                        size="small"
                        type='password'
                        required
                    />
                </FormControl>


                <FormControl fullWidth>
                    <TextField
                        label="Confirm Password"
                        id="confirmPassword"
                        size="small"
                        type='password'
                        required
                    />
                </FormControl>

                <Button
                    type='submit'
                    variant='outlined'
                    color='primary'
                    sx={{ backgroundColor: '#5094ED', color: '#ffffff', ":hover": { color: '#132043' } }}
                    className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 border"
                >
                    Create account
                </Button>
            </form>
        </div>
    );
};
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
export default SignUpForm;