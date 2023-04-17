import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom';
import Loading from '../more/Loader';
import Profile from '../components/user/Profile';

const ProtectedRoute = (props) => {

    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

    if (loading) {
        // Render a loading spinner or placeholder while the authentication status is being checked
        return <Loading />;
    }

    if (props.isAdmin && user.role !== 'admin') {
        // If the user is not an admin and isAdmin is set to true, navigate to the login page
        window.alert('only admin can do this');
        return <Navigate to="/login" />;
    }

    // If the user is authenticated and has the correct role, render the protected component

    return (
        <Routes>
            <Route path='/' element={props.element} />
        </Routes>

    )
};

export default ProtectedRoute