import GoogleIcon from '@mui/icons-material/Google';
import { NavLink } from 'react-router-dom';

const LoginForm = () => {
    return (
        <div className="max-w-md w-full text-gray-600 space-y-5">
            <div className="text-center pb-8">
                <div className="mt-5">
                    <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
                </div>
            </div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-5"
            >
                <div>
                    <label className="font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>
                <div>
                    <label className="font-medium">
                        Password
                    </label>
                    <input
                        type="password"
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>
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
                    <a href="javascript:void(0)" className="text-center text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                </div>
                <button
                    className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 hover:bg-secondary border"
                >
                    Sign in
                </button>
            </form>
            <button className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100">
                <GoogleIcon />
                Continue with Google
            </button>
            <p className="text-center">Don&#39;t have an account? <NavLink to="/sign-up" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</NavLink></p>
        </div>
    );
};

export default LoginForm;