import { Typography, Container } from '@mui/material';
import { useAuth } from '../context/AppContext';

export default function Dashboard() {
    const { token, role } = useAuth();

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Dashboard</Typography>
            {token ? (
                <Typography>Welcome! Your role is <strong>{role}</strong></Typography>
            ) : (
                <Typography>Please log in.</Typography>
            )}
        </Container>
    );
}
