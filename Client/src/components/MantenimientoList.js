import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Box, 
    Button, 
    Grid, 
    Card, 
    CardContent, 
    Typography, 
    Container, 
    Chip, 
    Divider,
    Avatar,
    CircularProgress,
    Alert
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ScienceIcon from '@mui/icons-material/Science'; 
import PersonIcon from '@mui/icons-material/Person';

export default function MantenimientoList() {
    const navigate = useNavigate();

    // 1. ESTADOS PARA DATOS REALES
    const [mantenimientos, setMantenimientos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. CARGAR DATOS DEL BACKEND
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                // Asegúrate de tener esta ruta en tu backend
                const response = await fetch('http://localhost:4000/api/mantenimientos');
                
                if (!response.ok) {
                    throw new Error('Error al conectar con el servidor');
                }

                const data = await response.json();
                console.log("Bitácora recibida:", data); // Revisa consola para ver nombres de columnas
                setMantenimientos(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err.message);
                setLoading(false);
            }
        };

        cargarDatos();
    }, []);

    return (
        <Container maxWidth="lg">
            {/* --- ENCABEZADO Y BOTÓN --- */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 4,
                marginBottom: 4
            }}>
                <Typography variant="h4" sx={{ color: '#e65100', fontWeight: 'bold' }}>
                    Bitácora de Mantenimiento
                </Typography>

                <Button 
                    variant="contained" 
                    startIcon={<AddCircleIcon />}
                    onClick={() => navigate('/mantenimientos/new')} 
                    sx={{ backgroundColor: '#e65100', '&:hover': { backgroundColor: '#ef6c00' } }}
                >
                    Nuevo Registro
                </Button>
            </Box>

            {/* MENSAJES DE ESTADO */}
            {loading && <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress sx={{color:'#e65100'}} /></Box>}
            {error && <Alert severity="error">{error}</Alert>}

            {/* --- LISTADO DE TARJETAS --- */}
            {!loading && !error && (
                <Grid container spacing={3}>
                    {mantenimientos.map((item) => {
                        // NORMALIZACIÓN DE NOMBRES (Postgres devuelve minúsculas)
                        // Ajustamos para leer lo que venga del JOIN
                        const id = item.idmantenimiento;
                        const planta = item.nameplanta || item.nombreplanta || "Planta #" + item.idplanta;
                        const personal = item.nameempleado || item.nombrepersonal || "Personal #" + item.idpersonal;
                        // Ajusta nombrecolumna según tu BD
                        const riego = item.freqriego || item.frecuenciariego; 
                        const fert = item.typefertilizacion || item.tipofertilizacion;
                        const obs = item.obsejemplar || item.observaciones;
                        const fecha = item.fecharegistro || "Fecha no disponible";

                        return (
                            <Grid item xs={12} md={6} lg={4} key={id}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderTop: '4px solid #ff9800' }}>
                                    <CardContent>
                                        {/* Título de la Planta */}
                                        <Typography variant="h6" component="div" gutterBottom>
                                            {planta}
                                        </Typography>
                                        
                                        {/* Fecha pequeña */}
                                        <Typography variant="caption" display="block" sx={{ mb: 2, color: 'text.secondary' }}>
                                            Registro #{id} 
                                        </Typography>

                                        {/* Datos Técnicos */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                                            <WaterDropIcon fontSize="small" color="primary" />
                                            <Typography variant="body2"><strong>Riego:</strong> {riego}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                                            <ScienceIcon fontSize="small" color="secondary" />
                                            <Typography variant="body2"><strong>Fertilizante:</strong> {fert}</Typography>
                                        </Box>

                                        <Divider sx={{ my: 1.5 }} />

                                        {/* Observaciones */}
                                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#e65100' }}>
                                            Observaciones:
                                        </Typography>
                                        <Box sx={{ 
                                            backgroundColor: '#fff3e0', 
                                            padding: 1.5, 
                                            borderRadius: 1, 
                                            mt: 0.5, 
                                            mb: 2,
                                            fontStyle: 'italic',
                                            fontSize: '0.9rem'
                                        }}>
                                            "{obs}"
                                        </Box>

                                        {/* Pie de tarjeta: El Trabajador */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto' }}>
                                            <Avatar sx={{ width: 24, height: 24, bgcolor: '#e65100', fontSize: '0.8rem' }}>
                                                <PersonIcon fontSize="inherit"/>
                                            </Avatar>
                                            <Typography variant="caption" color="text.primary">
                                                Realizado por: <strong>{personal}</strong>
                                            </Typography>
                                        </Box>

                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            )}
            
            {!loading && mantenimientos.length === 0 && (
                <Typography align="center" sx={{ mt: 4, color: 'gray' }}>
                    No hay registros de mantenimiento aún.
                </Typography>
            )}
        </Container>
    );
}