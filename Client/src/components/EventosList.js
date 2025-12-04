import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Box, 
    Button, 
    Grid, 
    Card, 
    CardContent, 
    CardActions,
    Typography, 
    Container, 
    Chip,
    IconButton,
    Tooltip,
    Divider
} from '@mui/material';
// Importación de Iconos
import EventIcon from '@mui/icons-material/Event'; 
import ClassIcon from '@mui/icons-material/Class'; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function EventosList() {
    const navigate = useNavigate();

    // 1. Datos Completos para llenar la tabla
    const [eventos, setEventos] = useState([
        {
            IdEvento: 1,
            NomCurse: "Taller de Terrarios Eternos",
            DesEvento: "Aprende a crear ecosistemas autosustentables en frascos de vidrio. Incluye materiales y plantas.",
            DateEvento: "2024-03-10",
            CostEvento: 650.00,
            MaxPersonas: 12,
            IdCliente: 101,
            NombreCliente: "Ana García"
        },
        {
            IdEvento: 2,
            NomCurse: "Curso de Poda y Injertos",
            DesEvento: "Técnicas profesionales para podar frutales y rosales sin dañar la planta. Práctica en vivo.",
            DateEvento: "2024-03-18",
            CostEvento: 450.00,
            MaxPersonas: 20,
            IdCliente: 102,
            NombreCliente: "Carlos López"
        },
        {
            IdEvento: 3,
            NomCurse: "Huertos Urbanos para Principiantes",
            DesEvento: "Todo lo que necesitas saber para cultivar tus propias hortalizas en macetas o espacios pequeños.",
            DateEvento: "2024-04-05",
            CostEvento: 300.00,
            MaxPersonas: 25,
            IdCliente: 103,
            NombreCliente: "María Rodríguez"
        },
        {
            IdEvento: 4,
            NomCurse: "Control de Plagas Orgánico",
            DesEvento: "Aprende a identificar y combatir pulgones, cochinillas y hongos usando remedios caseros y ecológicos.",
            DateEvento: "2024-04-12",
            CostEvento: 250.00,
            MaxPersonas: 30,
            IdCliente: 104,
            NombreCliente: "Pedro Martínez"
        },
        {
            IdEvento: 5,
            NomCurse: "Cuidados Básicos de Orquídeas",
            DesEvento: "Clase magistral sobre riego, iluminación y trasplante de orquídeas Phalaenopsis.",
            DateEvento: "2024-05-01",
            CostEvento: 500.00,
            MaxPersonas: 15,
            IdCliente: 105,
            NombreCliente: "Lucía Fernández"
        }
    ]);

    // 2. Función Eliminar
    const handleDelete = (id) => {
        if(window.confirm("¿Deseas cancelar este evento y eliminarlo de la agenda?")) {
            const nuevaLista = eventos.filter(e => e.IdEvento !== id);
            setEventos(nuevaLista);
        }
    };

    return (
        <Container maxWidth="lg">
            {/* --- ENCABEZADO --- */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 4,
                marginBottom: 4
            }}>
                <Typography variant="h4" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                    Agenda de Cursos y Talleres
                </Typography>

                <Button 
                    variant="contained" 
                    startIcon={<ClassIcon />}
                    onClick={() => navigate('/eventos/new')} 
                    sx={{ backgroundColor: '#2e7d32', '&:hover': { backgroundColor: '#1b5e20' } }}
                >
                    Crear Evento
                </Button>
            </Box>

            {/* --- GRID DE EVENTOS --- */}
            <Grid container spacing={3}>
                {eventos.map((evt) => (
                    <Grid item xs={12} md={6} lg={4} key={evt.IdEvento}>
                        <Card sx={{ 
                            height: '100%', 
                            display: 'flex', 
                            flexDirection: 'column',
                            borderTop: '5px solid #43a047', // Borde verde
                            boxShadow: 3,
                            transition: '0.3s',
                            '&:hover': { transform: 'scale(1.02)' }
                        }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                {/* Título */}
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <EventIcon sx={{ color: '#2e7d32', mr: 1 }} />
                                    <Typography variant="h6" component="div" sx={{ lineHeight: 1.2 }}>
                                        {evt.NomCurse}
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 1.5 }} />

                                {/* Chips de Fecha y Costo */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Chip 
                                        icon={<EventIcon />} 
                                        label={evt.DateEvento} 
                                        size="small" 
                                        color="primary"
                                        variant="outlined" 
                                    />
                                    <Chip 
                                        icon={<AttachMoneyIcon />} 
                                        label={`$${evt.CostEvento}`} 
                                        size="small" 
                                        color="success" 
                                    />
                                </Box>
                                
                                {/* Descripción */}
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
                                    {evt.DesEvento}
                                </Typography>

                                {/* Información Extra (Cupo y Cliente Organizador) */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <GroupIcon fontSize="small" color="action" />
                                    <Typography variant="caption">
                                        Cupo Máximo: <strong>{evt.MaxPersonas} personas</strong>
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <PersonIcon fontSize="small" color="action" />
                                    <Typography variant="caption">
                                        Organizador: <strong>{evt.NombreCliente || "Sin asignar"}</strong>
                                    </Typography>
                                </Box>

                            </CardContent>

                            {/* --- BOTONES DE ACCIÓN --- */}
                            <CardActions sx={{ justifyContent: 'space-between', bgcolor: '#f1f8e9', padding: 2 }}>
                                
                                {/* Botón NUEVO: Ir a Gestionar Inscripciones */}
                                <Button 
                                    size="small" 
                                    startIcon={<GroupIcon />} 
                                    onClick={() => navigate(`/eventos/inscripciones/${evt.IdEvento}`)}
                                    sx={{ color: '#2e7d32', fontWeight: 'bold' }}
                                >
                                    Inscribir Alumnos
                                </Button>

                                {/* Botones de Editar y Borrar */}
                                <Box>
                                    <Tooltip title="Editar Evento">
                                        <IconButton color="primary" onClick={() => navigate(`/eventos/edit/${evt.IdEvento}`)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar Evento">
                                        <IconButton color="error" onClick={() => handleDelete(evt.IdEvento)}>
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