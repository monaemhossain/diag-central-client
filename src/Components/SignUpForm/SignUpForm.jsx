import { NavLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import toast from 'react-hot-toast';
import './SignUpForm.css'


const SignUpForm = () => {
    const [allDistricts, setAllDistricts] = useState([])
    const [allUpazilas, setAllUpazilas] = useState([])
    const [blood, setBlood] = useState('')
    const [upazila, setUpazila] = useState('')
    const [district, setDistrict] = useState('')

    const { signUp, user, dbUsers } = useContext(AuthContext)
    const navigate = useNavigate();

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

    const [userImage, setUserImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        // console.log(file);
        setUserImage(file);
    };

    // redirect user based on there role
    const [isRole, setIsRole] = useState('')

    if(user){
        const {email} = user;
        const currentUser = dbUsers.filter(user => email == user.userEmail)
        const { role } = currentUser[0];
        setIsRole(role)
    }
    
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(e.target);
        const form = e.target;
        const userName = form.name.value;
        const userEmail = form.email.value;
        const userBloodGroup = blood;
        const userDistrict = upazila;
        const userUpazila = district;
        const newPassword = form.newPassword.value;
        const confirmPassword = form.confirmPassword.value;
        const activeStatus = true;
        const role = "user";

        if (newPassword !== confirmPassword) {
            toast.error("password doesn't match");
            return;
        }
        else if (newPassword.length < 6) {
            toast.error("Password should be at least 6 characters")
            return;
        }
        else if (!/[A-Z]/.test(newPassword)) {
            toast.error("Password must have at least one uppercase letter")
            return;
        }
        else if (!/[a-z]/.test(newPassword)) {
            toast.error("Password must have at least one lowercase letter")
            return;
        }

        // console.log(userDetails);
        // upload img to cloud
        if (!userImage) {
            console.error('No image selected');
            return;
        }

        const formData = new FormData();
        formData.append('image', userImage);
        axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(res => {
                // Check if the upload was successful
                if (res.data.status === 200) {
                    const imageUrl = res.data.data.url;
                    console.log('Image uploaded successfully:', imageUrl);

                    signUp(userEmail, newPassword, userName)
                    .then((newUser) => {
                            updateProfile(newUser.user, {
                                displayName: userName,
                                photoURL: imageUrl,
                            })

                            
                            const userDetails = { userName, userEmail, userBloodGroup, userDistrict, userUpazila, imageUrl, activeStatus, role }
                            console.log(newUser);
                            // post user details to the server
                            axios.post('http://localhost:4000/users', userDetails)
                            .then((res) => {
                                console.log(res.data)
                                if (res.data.insertedId) {
                                    toast.success('Account created successfully')
                                }
                            }).catch(err => console.log(err))
                            
                            if(isRole === 'admin'){
                                navigate('/admin-dashboard')
                            }else if(isRole === 'user'){
                                navigate('/user-dashboard')
                            }
                            // navigate(`${isRole === 'admin' ? '/admin-dashboard' : '/user-dashboard'}`);
                        })

                        .catch((error) => {
                            if (error.code == "auth/email-already-in-use") {
                                toast.error("Your already have account")
                            } else if (error.code == "auth/invalid-email") {
                                toast.error("invalid email address")
                            }
                            else {
                                toast.error("Something went wrong! Please contact with support team.")
                            }
                        })


                } else {
                    console.error('Error uploading image:', res.data.error.message);
                    toast.error('Profile photo upload failed');
                }

            })
            .catch(error => {
                console.error('Error uploading image:', error.message);
                toast.error("Profile photo upload failed")
                return;
            })



    }

    return (
        <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0 pt-4">
            <div className='flex items-center justify-center text-2xl'>
                <NavLink to='/login'
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >Log in</NavLink>
                <Divider orientation="vertical" flexItem>or</Divider>
                <NavLink to='/sign-up'
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active text-primary text-2xl font-bold sm:text-3xl" : ""
                    }
                >Sign Up</NavLink>
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
                        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
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
                            <FormControl>
                                <TextField
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    InputProps={{ endAdornment: <CloudUploadIcon /> }}
                                />
                            </FormControl>
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
export default SignUpForm;