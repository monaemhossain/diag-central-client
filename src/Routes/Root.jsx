import { Outlet } from "react-router-dom";
import AppMenu from "../Components/Shared/AppMenu";
import Footer from "../Components/Shared/Footer";
import Box from '@mui/material/Box';
import { Toaster } from "react-hot-toast";

const Root = () => {

    return (
        <div>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            <AppMenu />
            <Box className="min-h-[calc(100vh-370px)]">
                <Outlet />

            </Box>
            <Footer />


        </div>
    );
};

export default Root;