import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const AccessedRoute = ({children}) => {
    const { user } = useContext(AuthContext)
    const location = useLocation()


    if (user) {
        return <Navigate state={location.pathname} to="/"></Navigate>;
    }
    return children;
};
AccessedRoute.propTypes = {
    children: PropTypes.node
}
export default AccessedRoute;