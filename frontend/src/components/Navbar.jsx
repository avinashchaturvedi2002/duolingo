import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const token = localStorage.getItem('token'); // Check if the user is authenticated
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token
        navigate('/login'); // Redirect to the login page
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link to="/" className="navbar-brand">Experience Sharing</Link>
                <div className="navbar-nav">
                    {token ? (
                        <>
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/my-posts" className="nav-link">My Posts</Link>
                            <Link to="/create-post" className="nav-link">Create Post</Link>
                            <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;