import { useContext } from "react";
import PropTypes from 'prop-types';
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";

const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useContext(AuthContext)
    const location = useLocation()

    if (isLoading) {
        return (
            <div className="flex min-h-[calc(100vh-158px)] items-center justify-center">
                <InfinitySpin
                    width='200'
                    color="#5CF0B0"
                />
            </div>
        )
    }

    if (user) {
        return children;
    } else {
        return <Navigate state={location.pathname} to="/login"></Navigate>;
    }

};
PrivateRoute.propTypes = {
    children: PropTypes.node
}
export default PrivateRoute;