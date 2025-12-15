import { useEffect, useState } from 'react';
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
    IconButton,
    CircularProgress
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';

export default function TrabajadoresList() {
    const navigate = useNavigate();
    
    // 1. Estados para manejar la data real
    const [trabajadores, setTrabajadores] = useState([]);
    const [loading, setLoading] = useState(true);

    // 2. Función para cargar trabajadores del Backend
    const loadTrabajadores = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/trabajadores');
            if (response.ok) {
                const data = await response.json();
                setTrabajadores(data);
            } else {
                console.error("Error al obtener trabajadores");
            }
            setLoading(false);
        } catch (error) {
            console.error("Error de conexión:", error);
            setLoading(false);
        }
    };

    // 3. Cargar datos al iniciar el componente
    useEffect(() => {
        loadTrabajadores();
    }, []);

    // 4. Función para eliminar trabajador
    const handleDelete = async (id) => {
        // Confirmación simple
        if (!window.confirm("¿Estás seguro de que quieres eliminar a este trabajador?")) return;

        try {
            const response = await fetch(`http://localhost:4000/api/borrarTrabajador/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Filtramos el estado para quitar el eliminado sin recargar página
                setTrabajadores(trabajadores.filter((t) => t.id_trabajador !== id));
            } else {
                alert("Error al eliminar el trabajador");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container maxWidth="lg">
            {/* --- SECCIÓN DE BOTONES --- */}
        
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginTop: 4, 
                marginBottom: 4 
            }}>
                <Typography variant="h4" sx={{ color: '#303413', fontWeight: 'bold' }}>
                    Personal
                </Typography>

                <Button 
                    variant="contained" 
                    startIcon={<PersonAddIcon />}
                    onClick={() => navigate('/trabajadores/new')} 
                    sx={{ backgroundColor: '#303413', '&:hover': { backgroundColor: '#23260e' } }}
                >
                    Personal
                </Button>
            </Box>
            {/* --- LOADING --- */}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress sx={{ color: '#303413' }} />
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {trabajadores.map((emp) => (
                        <Grid item xs={12} md={6} lg={4} key={emp.id_trabajador}>
                            <Card sx={{ 
                                height: '100%', 
                                borderLeft: '6px solid #2e7d32', 
                                position: 'relative',
                                boxShadow: 3
                            }}>
                                <CardContent>
                                    {/* Encabezado: Nombre */}
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                            {emp.name_trabajador} {emp.ap_pat_trabajador} {emp.ap_mat_trabajador}
                                        </Typography>
                                        <Chip 
                                            label="ACTIVO" 
                                            color="success" 
                                            size="small" 
                                        />
                                    </Box>

                                    <Divider sx={{ my: 1.5 }} />

                                    {/* Detalles (Basados en tu Backend) */}
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <PhoneIcon fontSize="small" color="action" />
                                            <Typography variant="body2">{emp.tel_trabajador || 'Sin teléfono'}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <EmailIcon fontSize="small" color="action" />
                                            <Typography variant="body2">{emp.email_trabajador || 'Sin email'}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <HomeIcon fontSize="small" color="action" />
                                            <Typography variant="body2">{emp.dir_trabajador || emp.direccion_trabajador || 'Sin dirección'}</Typography>
                                        </Grid>
                                        
                                        <Grid item xs={12} sx={{ mt: 1 }}>
                                            <Typography variant="caption" display="block" color="text.secondary">ID Sistema: {emp.id_trabajador}</Typography>
                                        </Grid>
                                    </Grid>

                                    {/* Botones de Acción */}
    
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}