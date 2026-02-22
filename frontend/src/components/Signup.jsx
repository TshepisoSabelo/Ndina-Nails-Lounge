import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

export default function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value,
        }));
    };

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('All fields are required.');
        return false;
        }

        if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return false;
        }

        if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
        return;
        }

        setLoading(true);

    try {
        const response = await fetch('http://localhost:8000/register', {
        method: 'POST', // POST request
        headers: {
            'Content-Type': 'application/json', // sending JSON
        // Optional: 'Authorization': `Bearer ${token}` if you have one
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
        }),
    });

        const data = await response.json();

        //if (!response.ok) {
       //     setError(data.detail || 'Signup failed. Please try again.');
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

        // Automatically log in the user
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        navigate('/confirm');
        } catch (err) {
        setError('An error occurred. Please try again.');
        console.error('Signup error:', err);
        } finally {
        setLoading(false);
        }
    };

    return (
            <div className="auth-card">
                <h3>Create Account</h3>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full name"
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    disabled={loading}
                    />

                    <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    required
                    disabled={loading}
                    />
                </div>

                <button type="submit" className="auth-button" disabled={loading}>
                    {loading ? 'Creating account...' : 'Sign Up'}
                </button>
                </form>

                <div className="auth-footer">
                <p>Already have an account? <button type="button" onClick={() => navigate('/login')} className="link-button">Login here</button></p>
                </div>
            </div>
    );
}
