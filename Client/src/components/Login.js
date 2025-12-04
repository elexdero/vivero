import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Button, 
    TextField, 
    Card, 
    CardContent, 
    Typography, 
    Container, 
    Box,
    InputAdornment,
    Alert
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';

export default function Login() {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        user: '',
        pass: ''
    });

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        setError(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // NOTA: Asegúrate que tu backend corre en el puerto 4000
            const response = await fetch('http://localhost:4000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        rfc: credentials.user,     // "users" en tu BD
        password: credentials.pass // "passwords" en tu BD
    }),
});

            const data = await response.json();

            if (response.ok) {
                console.log(data.message);
                navigate('/plantas'); 
            } else {
                setError(true);
                setErrorMessage(data.message || "Credenciales incorrectas");
            }

        } catch (err) {
            console.error("Error de conexión:", err);
            setError(true);
            setErrorMessage("No se pudo conectar con el servidor (Backend apagado).");
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card sx={{ width: '100%', boxShadow: 5, borderTop: '6px solid #2e7d32', borderRadius: 2 }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
                    
                    <Box sx={{ m: 1, bgcolor: '#2e7d32', borderRadius: '50%', p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LoginIcon sx={{ color: 'white', fontSize: 30 }} />
                    </Box>

                    <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1b5e20' }}>
                        Acceso al Vivero
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                            {errorMessage}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Usuario (RFC)"
                            name="user"
                            autoComplete="username"
                            autoFocus
                            value={credentials.user}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="pass"
                            label="Contraseña"
                            type="password"
                            autoComplete="current-password"
                            value={credentials.pass}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' }, py: 1.5 }}
                        >
                            Ingresar
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}