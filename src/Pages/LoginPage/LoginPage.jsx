import { Box } from '@mui/material';
import LoginForm from '../../Components/LoginForm/LoginForm';

const LoginPage = () => {



  return (
      <main className="w-full flex">
        <Box className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex bg-secondary">
          <Box className="relative z-10 w-full max-w-3xl">
            <img src="Outer-space.png" alt="" />
          </Box>
          
        </Box>
        <Box className="flex-1 flex items-center justify-center h-screen">
          <LoginForm />
        </Box>
      </main>
  );
};

export default LoginPage;