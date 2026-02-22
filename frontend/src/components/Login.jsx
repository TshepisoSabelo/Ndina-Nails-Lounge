import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
        const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            email,
            password,
            }),
        });

        const data = await response.json();

        //if (!response.ok) {
        //    setError(data.detail || 'Login failed. Please try again.');
        //    return;
        //}

        console.log("STATUS:", response.status);
        console.log("RESPONSE DATA:", data);

        if (!response.ok) {
            console.error("SERVER ERROR:", data);
            setError(data.detail || "Signup failed.");
            return;
        }

        console.log("SUCCESS:", data);

        // Store token and user info
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        navigate('/confirm');
        } catch (err) {
        setError('An error occurred. Please try again.');
        console.error('Login error:', err);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="auth-card">
            <h3>Welcome Back</h3>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                disabled={loading}
                />
            </div>

            <div className="form-group">
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                disabled={loading}
                />
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
            </form>

            <div className="auth-footer">
            <p>Don't have an account? <button type="button" onClick={() => navigate('/signup')} className="link-button">Sign up here</button></p>
            <button type="button" onClick={() => navigate('/forgot-password')} className="forgot-password">Forgot password?</button>
            </div>
        </div>
    );
}