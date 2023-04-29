import {useSelector} from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom';

export const PrivateRoute = () => {
    const user = useSelector((state) => state.user);

    if (user.status === 'loading' || user.status === 'idle') {
        return <div>Loading...</div>;
    }

    return user ? <Outlet/> : <Navigate to="/login"/>;
};
