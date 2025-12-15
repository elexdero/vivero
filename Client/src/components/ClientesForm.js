import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    Container, Typography, Box, TextField, Button, Paper, Grid, CircularProgress, Alert 
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ClienteForm() {
    const navigate = useNavigate();
    const { id } = useParams(); // Si hay ID, estamos editando. Si no, creando.
    
    const [cliente, setCliente] = useState({
        name_cliente: '',
        ap_pat_cliente: '',
        ap_mat_cliente: '',
        dir_cliente: '',
        tel_cliente: '',
        mail_cliente: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_URL = 'http://localhost:4000/api';

    // Cargar datos si estamos editando
    useEffect(() => {
        if (id) {
            cargarCliente();
        }
    }, [id]);

    const cargarCliente = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/clientes/${id}`);
            if (!res.ok) throw new Error("No se pudo cargar el cliente");
            const data = await res.json();
            setCliente(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const method = id ? 'PUT' : 'POST'; // Si hay ID actualizamos, si no creamos
            const url = id ? `${API_URL}/clientes/${id}` : `${API_URL}/clientes`;

            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cliente)
            });

            if (!res.ok) throw new Error("Error al guardar");

            navigate('/clientes'); // Regresar a la lista
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/clientes')} sx={{ mr: 2 }}>
                    Volver
                </Button>
                <Typography variant="h4" color="primary">
                    {id ? "Editar Cliente" : "Nuevo Cliente"}
                </Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Paper sx={{ p: 4 }} elevation={3}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField 
                                label="Nombre(s)" fullWidth name="name_cliente" 
                                value={cliente.name_cliente} onChange={handleChange} required 
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                label="Apellido Paterno" fullWidth name="ap_pat_cliente" 
                                value={cliente.ap_pat_cliente} onChange={handleChange} required 
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                label="Apellido Materno" fullWidth name="ap_mat_cliente" 
                                value={cliente.ap_mat_cliente} onChange={handleChange} 
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label="Dirección" fullWidth name="dir_cliente" 
                                value={cliente.dir_cliente} onChange={handleChange} 
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                label="Teléfono" fullWidth name="tel_cliente" 
                                value={cliente.tel_cliente} onChange={handleChange} 
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                label="Email" fullWidth name="mail_cliente" 
                                value={cliente.mail_cliente} onChange={handleChange} 
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                fullWidth 
                                size="large"
                                startIcon={loading ? <CircularProgress size={20} color="inherit"/> : <SaveIcon />}
                                disabled={loading}
                            >
                                {id ? "Guardar Cambios" : "Registrar Cliente"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}