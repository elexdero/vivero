import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    Button, 
    TextField, 
    Grid, 
    Card, 
    CardContent, 
    Typography, 
    Container, 
    CircularProgress,
    Box,
    Alert
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function ClientesForm() {
    
    const [cliente, setCliente] = useState({
        name_cliente: '',
        ap_pat_cliente: '',
        ap_mat_cliente: '',
        tel_cliente: '',
        dir_cliente:'',
        correo_cliente: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const params = useParams(); // Para detectar si estamos editando (trae el id)

    // --- 1. CARGAR DATOS SI ESTAMOS EDITANDO ---
    useEffect(() => {
        if (params.id) {
            cargarCliente(params.id);
        }
    }, [params.id]);

    const cargarCliente = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:4000/api/clientes/${id}`);
            if (!res.ok) {
                throw new Error("No se pudo obtener la información del cliente");
            }
            const data = await res.json();
            
            // Llenamos el formulario con los datos recibidos
            setCliente({
                name_cliente: data.name_cliente,
                ap_pat_cliente: data.ap_pat_cliente,
                ap_mat_cliente: data.ap_mat_cliente || '', // Si es null, ponemos string vacío
                dir_cliente : data.dir_cliente || '',
                tel_cliente: data.tel_cliente || '',
                mail_cliente: data.mail_cliente || ''

            });
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
        setLoading(false);
    };

    // --- 2. MANEJAR CAMBIOS EN LOS INPUTS ---
    const handleChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    // --- 3. GUARDAR (POST O PUT) ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let response;
            if (params.id) {
                // MODO EDICIÓN (PUT)
                response = await fetch(`http://localhost:4000/api/clientes/${params.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(cliente),
                });
            } else {
                // MODO CREACIÓN (POST)
                response = await fetch('http://localhost:4000/api/clientes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(cliente),
                });
            }

            if (response.ok) {
                navigate('/clientes'); // Volver a la lista
            } else {
                const data = await response.json();
                setError(data.message || "Hubo un error al guardar");
            }
        } catch (error) {
            console.error(error);
            setError("Error de conexión con el servidor");
        }
        setLoading(false);
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4, mb: 2 }}>
                 <Button 
                    startIcon={<ArrowBackIcon />} 
                    onClick={() => navigate('/clientes')}
                    sx={{ mb: 2 }}
                >
                    Volver
                </Button>
            </Box>
           
            <Grid container direction="column" alignItems="center" justifyContent="center">
                <Grid item xs={12} sx={{ width: '100%' }}>
                    <Card sx={{ p: 3, boxShadow: 3, borderTop: '5px solid #1976d2' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                                <PersonAddIcon sx={{ fontSize: 40, color: '#1976d2', mr: 1 }} />
                                <Typography variant='h5' textAlign='center' sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                    {params.id ? "Editar Cliente" : "Registrar Nuevo Cliente"}
                                </Typography>
                            </Box>

                            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                            
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    {/* Nombre */}
                                    <Grid item xs={12}>
                                        <TextField 
                                            label="Nombre(s)" 
                                            name="name_cliente" 
                                            value={cliente.name_cliente} 
                                            onChange={handleChange} 
                                            fullWidth 
                                            required 
                                            variant="outlined"
                                        />
                                    </Grid>

                                    {/* Apellidos */}
                                    <Grid item xs={12} sm={6}>
                                        <TextField 
                                            label="Apellido Paterno" 
                                            name="ap_pat_cliente" 
                                            value={cliente.ap_pat_cliente} 
                                            onChange={handleChange} 
                                            fullWidth 
                                            required 
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField 
                                            label="Apellido Materno" 
                                            name="ap_mat_cliente" 
                                            value={cliente.ap_mat_cliente} 
                                            onChange={handleChange} 
                                            fullWidth 
                                        />
                                    </Grid>
                                    {/*Direcci+on cliente */}
                                    <Grid item xs={12} sm={6}>
                                        <TextField 
                                            label="Dirección" 
                                            name="dir_cliente" 
                                            value={cliente.dir_cliente} 
                                            onChange={handleChange} 
                                            fullWidth 
                                            type="text"
                                        />
                                    </Grid>
                                    {/* Contacto */}
                                    <Grid item xs={12} sm={6}>
                                        <TextField 
                                            label="Teléfono" 
                                            name="tel_cliente" 
                                            value={cliente.tel_cliente} 
                                            onChange={handleChange} 
                                            fullWidth 
                                            type="tel"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField 
                                            label="Correo Electrónico" 
                                            name="mail_cliente" 
                                            value={cliente.mail_cliente} 
                                            onChange={handleChange} 
                                            fullWidth 
                                            type="email"
                                        />
                                    </Grid>

                                    {/* Botón Guardar */}
                                    <Grid item xs={12} sx={{ mt: 2 }}>
                                        <Button 
                                            variant='contained' 
                                            type='submit' 
                                            fullWidth 
                                            disabled={loading}
                                            startIcon={<SaveIcon />}
                                            sx={{ py: 1.5, fontSize: '1rem', bgcolor: '#1976d2' }}
                                        >
                                            {loading ? <CircularProgress color="inherit" size={24} /> : "Guardar Cliente"}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}