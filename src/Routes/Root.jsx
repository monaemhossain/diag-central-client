import { Outlet } from "react-router-dom";
import AppMenu from "../Components/Shared/AppMenu";
import Footer from "../Components/Shared/Footer";

const Root = () => {
    return (
        <div>
            <AppMenu />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Root;