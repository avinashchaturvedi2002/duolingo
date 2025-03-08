import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State to store the error message
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            localStorage.setItem('token', response.data.token); // Store the token
            navigate('/'); // Redirect to the home page after login
        } catch (error) {
            console.error('Error logging in:', error);
            if (error.response && error.response.status === 400) {
                setError('Invalid username or password'); // Set the error message
            } else {
                setError('An error occurred. Please try again.'); // Generic error message
            }
            // Clear the username and password fields
            setUsername('');
            setPassword('');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Login</h1>
            {error && <div className="alert alert-danger">{error}</div>} {/* Display the error message */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default Login;