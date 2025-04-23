import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from '../utils/axiosInstance';
import { useAuth } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/login', form);
            login(res.data.token, res.data.role);
            navigate('/');
        } catch (err) {
            alert(err.response.data.error || 'Login failed');
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h5" gutterBottom>Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="Email" name="email" fullWidth margin="normal" onChange={handleChange} />
                <TextField label="Password" name="password" type="password" fullWidth margin="normal" onChange={handleChange} />
                <Button variant="contained" type="submit" fullWidth>Login</Button>
            </form>
        </Container>
    );
}
