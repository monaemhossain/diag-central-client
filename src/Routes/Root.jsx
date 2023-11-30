import { Outlet } from "react-router-dom";
import AppMenu from "../Components/Shared/AppMenu";
import Footer from "../Components/Shared/Footer";
import Box from '@mui/material/Box';
import { Toaster } from "react-hot-toast";
// import ResponsiveAppBar from "../Components/Shared/testMenu";

const Root = () => {

    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
                containerClassName="mt-20 rounded-full"
                
                toastOptions={{
                    duration: 5000,
                }}
            />
            <AppMenu />
            {/* <ResponsiveAppBar /> */}
            <Box className="min-h-[calc(100vh-152px)]">
                <Outlet />
                
            </Box>
            <Footer />


        </div>
    );
};

export default Root;