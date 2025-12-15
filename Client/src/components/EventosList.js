import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Box, Button, Grid, Card, CardContent, CardActions, Typography, Container, 
    Chip, IconButton, Tooltip, Divider, CircularProgress, Alert 
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event'; 
import ClassIcon from '@mui/icons-material/Class'; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// Definir la URL base fuera del componente para fácil cambio
const API_URL = 'http://localhost:4000/api/eventos';

export default function EventosList() {
    const navigate = useNavigate();
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cargarEventos = async () => {
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error("Error al cargar eventos");
            
            const data = await res.json();
            setEventos(data);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            // El finally se ejecuta siempre, haya error o no
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarEventos();
    }, []);

    const handleDelete = async (id) => {
        // Idealmente aquí usarías un Dialog de Material UI, pero window.confirm es funcional
        if(window.confirm("¿Eliminar este evento de forma permanente?")) {
            try {
                const res = await fetch(`${API_URL}/delete/${id}`, { method: 'DELETE' });
                if (!res.ok) throw new Error("Error al eliminar");

                // Actualizamos el estado local para no tener que recargar la página
                // ASUMIENDO que la ID en base de datos es 'id_evento'
                setEventos(prev => prev.filter(e => e.id_evento !== id));
            } catch (error) {
                console.error(error);
                alert("No se pudo eliminar el evento");
            }
        }
    };

    const formatearFecha = (fechaString) => {
        if(!fechaString) return "Sin fecha";
        // Opción: 'es-MX' para formato local de México
        return new Date(fechaString).toLocaleDateString('es-MX', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress color="success" />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 4 }}>
                <Typography variant="h4" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                    Gestión de Eventos
                </Typography>
                <Button 
                    variant="contained" 
                    startIcon={<ClassIcon />}
                    onClick={() => navigate('/eventos/new')} 
                    sx={{ backgroundColor: '#2e7d32', '&:hover': { backgroundColor: '#1b5e20' } }}
                >
                    Nuevo Evento
                </Button>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            {!error && eventos.length === 0 && (
                <Alert severity="info">No hay eventos registrados en el sistema.</Alert>
            )}

            <Grid container spacing={3}>
                {eventos.map((evt) => (
                    // OJO: Aquí asumo que tu campo ID es 'id_evento'
                    <Grid item xs={12} md={6} lg={4} key={evt.id_evento}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderTop: '5px solid #43a047', boxShadow: 3, transition: '0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <EventIcon sx={{ color: '#2e7d32', mr: 1 }} />
                                    <Typography variant="h6" sx={{ lineHeight: 1.2, fontWeight: 'bold' }}>
                                        {evt.nombre_evento}
                                    </Typography>
                                </Box>
                                <Divider sx={{ my: 1.5 }} />
                                
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Chip label={formatearFecha(evt.fecha_evento || evt.date_evento)} size="small" color="primary" variant="outlined" />
                                    <Chip icon={<AttachMoneyIcon />} label={`$${evt.costo_evento || evt.cost_evento}`} size="small" color="success" variant="outlined" />
                                </Box>
                                
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    {evt.des_evento}
                                </Typography>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <GroupIcon fontSize="small" color="action" />
                                    <Typography variant="caption">
                                        Cupo: <strong>{evt.cupo_maximo} personas</strong>
                                    </Typography>
                                </Box>
                            </CardContent>

                            <CardActions sx={{ justifyContent: 'space-between', bgcolor: '#f1f8e9', padding: 2 }}>
                                <Button 
                                    size="small" 
                                    startIcon={<PersonAddIcon />}
                                    sx={{ color: '#2e7d32', fontWeight: 'bold' }}
                                    onClick={() => navigate(`/eventos/inscripciones/${evt.id_evento}`)}
                                >
                                    Alumnos
                                </Button>

                                <Box>
                                    <Tooltip title="Editar">
                                        <IconButton color="primary" onClick={() => navigate(`/eventos/edit/${evt.id_evento}`)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar">
                                        <IconButton color="error" onClick={() => handleDelete(evt.id_evento)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}