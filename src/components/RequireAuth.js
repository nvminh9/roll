import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    const roleArr = [localStorage.getItem('rAct_R').slice(0, -14)];

    // console.log(allowedRoles);

    return roleArr.find((role) => allowedRoles?.includes(role)) ? (
        <Outlet />
    ) : localStorage.getItem('rAct_T').slice(0, -14) ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
