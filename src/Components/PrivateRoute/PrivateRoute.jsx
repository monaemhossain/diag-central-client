import { useContext } from "react";
import PropTypes from 'prop-types';
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useContext(AuthContext)
    const location = useLocation()

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex' }} className="min-h-[calc(100vh-405px)] items-center justify-center">
                <CircularProgress />
            </Box>
        )
    }

    if (user) {
        return children;
    }

    return <Navigate state={location.pathname} to="/login"></Navigate>;
};
PrivateRoute.propTypes = {
    children: PropTypes.node
}
export default PrivateRoute;