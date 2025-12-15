import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Box, Button, Grid, Card, CardContent, Typography, Container, 
    Avatar, IconButton, Tooltip, Divider, CircularProgress
} from '@mui/material';
// Iconos
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ClientesList() {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = 'http://localhost:4000/api';

    // 1. CARGAR CLIENTES (Mostrar Todos)
    useEffect(() => {
        cargarClientes();
    }, []);

    const cargarClientes = async () => {
        try {
            const res = await fetch(`${API_URL}/clientes`);
            if (res.ok) {
                const data = await res.json();
                setClientes(data);
            }
        } catch (error) {
            console.error("Error cargando clientes:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Box sx={{textAlign:'center', mt:5}}><CircularProgress /></Box>;

    return (
        <Container maxWidth="lg">
            {/* --- ENCABEZADO --- */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 4 }}>
                <Typography variant="h4" sx={{ color: '#0277bd', fontWeight: 'bold' }}>
                    Cartera de Clientes
                </Typography>

                <Button 
                    variant="contained" 
                    startIcon={<PersonAddIcon />}
                    onClick={() => navigate('/clientes/new')} // Ir a Añadir
                    sx={{ backgroundColor: '#0277bd', '&:hover': { backgroundColor: '#01579b' } }}
                >
                    Registrar Nuevo
                </Button>
            </Box>

            {/* --- LISTA DE TARJETAS --- */}
            <Grid container spacing={3}>
                {clientes.length === 0 ? (
                    <Grid item xs={12}>
                        <Typography variant="h6" align="center" color="text.secondary">
                            No hay clientes registrados.
                        </Typography>
                    </Grid>
                ) : (
                    clientes.map((cliente) => (
                        <Grid item xs={12} md={6} lg={4} key={cliente.id_cliente}>
                            <Card sx={{ 
                                height: '100%', borderTop: '5px solid #0288d1', boxShadow: 3,
                                transition: '0.3s', '&:hover': { transform: 'scale(1.02)' }
                            }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Avatar sx={{ bgcolor: '#0277bd', mr: 2 }}>
                                            <AccountCircleIcon />
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6" sx={{ lineHeight: 1.1 }}>
                                                {cliente.name_cliente} {cliente.ap_pat_cliente}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                ID: {cliente.id_cliente}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Divider sx={{ mb: 2 }} />

                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <PhoneIcon fontSize="small" color="action" sx={{ mr: 1.5 }} />
                                        <Typography variant="body2">{cliente.tel_cliente || "Sin teléfono"}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <EmailIcon fontSize="small" color="action" sx={{ mr: 1.5 }} />
                                        <Typography variant="body2">{cliente.mail_cliente || "Sin email"}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                        <HomeIcon fontSize="small" color="action" sx={{ mr: 1.5, mt: 0.3 }} />
                                        <Typography variant="body2">{cliente.dir_cliente || "Sin dirección"}</Typography>
                                    </Box>
                                    
                                    {/* BOTÓN EDITAR */}
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                        <Button 
                                            size="small" 
                                            variant="outlined"
                                            startIcon={<EditIcon />}
                                            onClick={() => navigate(`/clientes/edit/${cliente.id_cliente}`)}
                                        >
                                            Modificar
                                        </Button>
                                    </Box>

                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </Container>
    );
}