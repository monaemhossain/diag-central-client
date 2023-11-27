import { NavLink, useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import toast from 'react-hot-toast';
import { useContext, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';

const LoginForm = () => {
    const { logIn,  dbUsers } = useContext(AuthContext)
    const navigate = useNavigate();
    const [isRole, setIsRole] = useState('')

    // navigate to user or admin dashboard


    // log in with email and password
    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target;
        const userEmail = form.email.value;
        const userPassword = form.password.value;

        logIn(userEmail, userPassword)
            .then(() => {
                toast.success("Login success")
                const currentUser = dbUsers.filter(user => userEmail == user.userEmail)
                const { role } = currentUser[0];
                setIsRole(role)
                console.log(role);
                console.log(currentUser);

               if(isRole === 'admin'){
                    navigate('/admin-dashboard');                    
                }else if(isRole === 'user'){                    
                    navigate('/user-dashboard');
                }
            
            navigate(location?.state ? location.state : '/');

            
            })
            .catch((err) => {
                console.log(err);
                if (err.code == "auth/network-request-failed") {
                    toast.error("Network Error. Check you internet connection")
                    return;
                }
                if (err.code == "auth/invalid-login-credentials") {
                    toast.error("Invalid login credentials try login with Google instead")
                    return;
                }
                toast.error("Email and password does not match")
            })
        console.log(isRole);
    }

    return (
        <div className="max-w-md w-full text-gray-600 space-y-5 pt-4">
            <div className='flex items-center justify-center text-2xl'>
                <NavLink to='/login'
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active text-2xl font-bold sm:text-3xl text-primary" : ""
                    }
                >Log in</NavLink>
                <Divider orientation="vertical" flexItem>or</Divider>
                <NavLink to='/sign-up'
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active text-primary" : ""
                    }
                >Sign Up</NavLink>
            </div>
            <form
                onSubmit={handleLogin}
                className="space-y-5"
            >
                <FormControl fullWidth>
                    <TextField
                        label="Your Email Address"
                        id="email"
                        size="small"
                        type='email'
                        required
                        defaultValue='user2@user.com'
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        label="Your Password"
                        id="password"
                        size="small"
                        type='password'
                        required
                        defaultValue='User123'
                    />
                </FormControl>

                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-x-3">
                        <input type="checkbox" id="remember-me-checkbox" className="checkbox-item peer hidden" />
                        <label
                            htmlFor="remember-me-checkbox"
                            className="relative flex w-5 h-5 bg-white peer-checked:bg-indigo-600 rounded-md border ring-offset-2 ring-indigo-600 duration-150 peer-active:ring cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45"
                        >
                        </label>
                        <span>Remember me</span>
                    </div>
                    <a href="#" className="text-center text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                </div>
                <Button
                    type='submit'
                    variant='outlined'
                    sx={{ ":hover": { color: '#111' }, backgroundColor: '#5094ED', color: '#fff' }}
                    className="w-full px-4 py-2 text-white font-medium bg-indigo-600 active:bg-indigo-600 rounded-lg duration-150 hover:bg-secondary border"
                >
                    Sign in
                </Button>
            </form>
        </div>
    );
};

export default LoginForm;