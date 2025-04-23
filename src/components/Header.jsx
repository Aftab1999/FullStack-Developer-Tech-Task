import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../context/AppContext';
import { Link } from 'react-router-dom';

export default function Header() {
    const { token, role, logout } = useAuth();

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>My Shop</Typography>

                    <Button color="inherit" component={Link} to="/products">Products</Button>

                    {token ? (
                        <>
                            <Typography mr={2}>Role: {role}</Typography>
                            <Button color="inherit" onClick={logout}>Logout</Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/register">Register</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
}
