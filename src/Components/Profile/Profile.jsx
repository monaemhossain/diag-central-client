import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { updateProfile } from "firebase/auth";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
    const { user, dbUsers } = useContext(AuthContext);
    const dbUser = dbUsers.filter(item => user.email === item.userEmail)
    // console.log(dbUser[0]);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [userName, setUserName] = React.useState(user.displayName);

    // Function to handle changes in the text field
    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };
    const [imageUrl, setImageUrl] = React.useState(user.photoURL);

    // Function to handle changes in the text field
    const handleImageUrlChange = (event) => {
        setImageUrl(event.target.value);
    };


    const { displayName, email, photoURL } = user
    // const userName = React.useRef(displayName)
    // const imageUrl = React.useRef(photoURL)
    const updateData = { userName, imageUrl }


    const handleUpdateProfile = () => {
        console.log(updateData);
        // console.log(imageUrl.current);
        updateProfile(user, {
            displayName: userName,
            photoURL: imageUrl,
        })
        .then(() => axios.put(`http://localhost:4000/update/user/${dbUser[0]._id}`, updateData))
        .then(() => {
            toast.success('User profile updated successfully');
            setOpen(false);
        })
        .catch((error) => {
            toast.error('Error updating user profile');
            console.error('Error updating user profile:', error.message);
        });
    }

    return (
        <section className="py-14 border">
            <div className="max-w-screen-xl mx-auto md:px-8">
                <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
                    <div className="flex-1 lg:block">
                        <img src={photoURL} className="md:max-w-xs sm:rounded-lg" alt="" />
                    </div>
                    <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
                        <h3 className="text-primary font-semibold">
                            Name: {displayName}
                        </h3>
                        <p className="text-gray-800 text-2xl font-semibold sm:text-3xl">
                            Email: {email}
                        </p>

                        <React.Fragment>
                            <Button onClick={handleClickOpen} className="inline-flex gap-x-1 items-center text-primary hover:text-indigo-500 duration-150 font-medium">Edit profile
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                                </svg>
                            </Button>
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Edit Profile</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Update your name"
                                        type="name"
                                        fullWidth
                                        variant="outlined"
                                        value={userName}
                                        onChange={handleUserNameChange}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="email"
                                        label="Update Email Address"
                                        type="email"
                                        fullWidth
                                        variant="outlined"
                                        defaultValue={user.email}
                                        disabled
                                        tooltip="you can't change the email"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="imageUrl"
                                        label="Update your Profile Photo Url"
                                        type="imageUrl"
                                        fullWidth
                                        variant="outlined"
                                        value={imageUrl}
                                        onChange={handleImageUrlChange}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button variant="contained" color="error" onClick={handleClose}>Cancel</Button>
                                    <Button variant="contained" color="secondary" onClick={handleUpdateProfile}>Update</Button>
                                </DialogActions>
                            </Dialog>
                        </React.Fragment>


                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;