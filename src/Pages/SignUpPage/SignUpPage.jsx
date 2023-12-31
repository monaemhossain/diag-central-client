import { Box } from '@mui/material';
import SignUpForm from '../../Components/SignUpForm/SignUpForm';

const SignUpPage = () => {



    return (
        <>
            <main className="w-full flex pb-10">
                <Box className="relative flex-1 hidden items-center justify-center min-h-[calc(100vh-80px)] lg:flex bg-secondary">
                    <Box className="relative z-10 w-full max-w-3xl">
                        <img src="Outer-space.png" alt="" />
                    </Box>

                </Box>
                <Box className="flex-1 flex items-center justify-center h-[calc(100vh-80px)]">
                    <SignUpForm />
                </Box>
            </main>
        </>
    );
};

export default SignUpPage;