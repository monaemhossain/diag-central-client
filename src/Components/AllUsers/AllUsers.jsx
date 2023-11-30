import { useState } from "react";
import { Backdrop, Button, Fade, FormControl, InputLabel, MenuItem, Modal, Select, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import toast from "react-hot-toast";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    height: '400px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
};
const AllUsers = () => {
    // const { dbUsers } = useContext(AuthContext)
    const [dbUsers, setDbUsers] = useState([])
    axios.get('https://diag-central-server.vercel.app/users', {withCredentials: true})
    .then(res => setDbUsers(res.data))
    // console.log(dbUsers);
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState([])
    const { imageUrl, userName, userEmail, role, activeStatus, _id } = userData;
    // update user role and activeStatus
    const [userRole, setUserRole] = useState(role || "");
    const [status, setStatus] = useState(activeStatus || "");
    const handleChangeRole = (event) => {
        setUserRole(event.target.value);
    };
    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };

    // console.log(_id);
    const handleOpen = async (id) => {
        try {
            // Make the asynchronous API call
            const response = await axios.get(`https://diag-central-server.vercel.app/user/${id}`);
            setUserData(response.data);
            setUserRole(response.data.role);
            setStatus(response.data.activeStatus);
            // Set open state
            setOpen(true);
        } catch (error) {
            console.log(error);
        }
    };
    const handleClose = () => setOpen(false);


    // console.log(role);

    const handleUpdateUser = (e) => {
        e.preventDefault();
        const role = userRole;
        const activeStatus = status;
        const updateData = { role, activeStatus }


        axios.put(`https://diag-central-server.vercel.app/update/role/${_id}`, updateData)
            .then(() => {
                toast.success('User updated');
            }).catch(err => console.log(err))
        // console.log(userRole);
        // console.log(status);
    }




    return (
        <>
            <div >
                <h2 className="text-2xl font-semibold text-center">All User List</h2>
            </div>
            <div className="divide-y lg:w-[900px] md:w-[600px] mx-auto">
                {
                    dbUsers.map((item, idx) => (
                        <div key={idx}>
                            <div className="py-5 flex items-start justify-between">
                                <div className="flex gap-3">
                                    <img src={item.imageUrl} className="flex-none w-12 h-12 rounded-full" />
                                    <div>
                                        <span className="block text-sm text-gray-700 font-semibold">{item.userName}</span>
                                        <span className="block text-sm text-gray-600">{item.userEmail}</span>
                                    </div>
                                </div>

                                <Button onClick={() => handleOpen(item._id)} variant="outlined" >User Details</Button>
                            </div>
                            <div>
                                <Modal
                                    sx={{ width: 500, margin: '0 auto' }}
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    open={open}
                                    onClose={handleClose}
                                    closeAfterTransition
                                    slots={{ backdrop: Backdrop }}
                                    slotProps={{
                                        backdrop: {
                                            timeout: 500,
                                        },
                                    }}
                                >
                                    <Fade in={open}>
                                        <Box sx={style}>
                                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                                Update user details
                                            </Typography>
                                            <div className="grid grid-cols-2 gap-4 w-full justify-center items-center">
                                                <div className="w-full h-full">
                                                    <img src={imageUrl} alt="" className="w-full h-full" />
                                                </div>
                                                <Box sx={{ m: 1 }}>
                                                    <Box sx={{ m: 1 }}>
                                                        <p>Name: {userName}</p>
                                                        <p>Email: {userEmail}</p>
                                                    </Box>
                                                    <FormControl fullWidth sx={{ m: 1 }} size="small">
                                                        <InputLabel id="userRole">User role</InputLabel>
                                                        <Select
                                                            fullWidth
                                                            labelId="userRole"
                                                            id="userRole"
                                                            value={userRole}
                                                            label="Role"
                                                            onChange={handleChangeRole}
                                                            defaultValue={role}
                                                        >
                                                            <MenuItem value={"admin"}>admin</MenuItem>
                                                            <MenuItem value={"user"}>user</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    <FormControl fullWidth sx={{ m: 1 }} size="small">
                                                        <InputLabel id="activeStatus">Active status</InputLabel>
                                                        <Select
                                                            labelId="activeStatus"
                                                            id="activeStatus"
                                                            value={status}
                                                            label="Active status"
                                                            onChange={handleChangeStatus}
                                                            defaultValue={activeStatus}
                                                        >
                                                            <MenuItem value={"active"}>active</MenuItem>
                                                            <MenuItem value={"block"}>block</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    <Button variant="outlined" fullWidth color="error" sx={{ m: 1 }} onClick={(e) => handleUpdateUser(e, item._id)}>
                                                        Save
                                                    </Button>
                                                </Box>
                                            </div>
                                        </Box>
                                    </Fade>
                                </Modal>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default AllUsers;