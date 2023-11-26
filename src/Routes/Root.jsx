import { Outlet } from "react-router-dom";
import AppMenu from "../Components/Shared/AppMenu";
import Footer from "../Components/Shared/Footer";
import Box from '@mui/material/Box';

const Root = () => {
    return (
        <div>
            <AppMenu />
                <Box className="min-h-[calc(100vh-402px)]">
                    <Outlet />
                </Box>
            <Footer />
        </div>
    );
};

export default Root;