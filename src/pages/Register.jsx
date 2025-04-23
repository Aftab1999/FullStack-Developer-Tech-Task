import React, { useState } from 'react';
import { TextField, Button, Container, Typography, MenuItem } from '@mui/material';
import axios from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [form, setForm] = useState({ email: '', password: '', role: 'customer' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/register', form);
            alert('Registered successfully!');
            navigate('/login');
        } catch (err) {
            alert(err.response.data.error || 'Register failed');
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h5" gutterBottom>Register</Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="Email" name="email" fullWidth margin="normal" onChange={handleChange} />
                <TextField label="Password" name="password" type="password" fullWidth margin="normal" onChange={handleChange} />
                <TextField select label="Role" name="role" fullWidth value={form.role} onChange={handleChange}>
                    <MenuItem value="customer">Customer</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                </TextField>
                <Button variant="contained" type="submit" fullWidth>Register</Button>
            </form>
        </Container>
    );
}
