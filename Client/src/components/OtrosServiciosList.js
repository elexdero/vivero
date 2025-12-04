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
import AddTaskIcon from '@mui/icons-material/AddTask';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeckIcon from '@mui/icons-material/Deck'; // Icono para "Paisajismo/Terraza"
import EventIcon from '@mui/icons-material/Event';
import DesignServicesIcon from '@mui/icons-material/DesignServices';

export default function OtrosServiciosList() {
    const navigate = useNavigate();

    // 1. Datos Simulados (Mock Data)
    const [servicios, setServicios] = useState([
        {
            IdServicio: 101,
            NomServicio: "Diseño de Jardín Zen",
            DateServ: "2023-11-20",
            DescServicio: "Instalación de piedras, arena y plantas minimalistas en patio trasero.",
            CostServicio: 3500.00,
            NombreProducto: "Piedra Decorativa Blanca" // Simulación del JOIN con Productos
        },
        {
            IdServicio: 102,
            NomServicio: "Mantenimiento Residencial",
            DateServ: "2023-12-05",
            DescServicio: "Poda de árboles altos y fertilización general.",
            CostServicio: 1200.50,
            NombreProducto: "Fertilizante Triple 17"
        },
        {
            IdServicio: 103,
            NomServicio: "Instalación de Riego",
            DateServ: "2023-12-10",
            DescServicio: "Sistema de goteo automatizado para 20 metros cuadrados.",
            CostServicio: 5800.00,
            NombreProducto: "Manguera y Conexiones"
        }
    ]);

    // Función Eliminar
    const handleDelete = (id) => {
        if(window.confirm("¿Deseas cancelar y eliminar este servicio de la agenda?")) {
            const nuevaLista = servicios.filter(s => s.IdServicio !== id);
            setServicios(nuevaLista);
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
                <Typography variant="h4" sx={{ color: '#c2185b', fontWeight: 'bold' }}>
                    Catálogo de Servicios
                </Typography>

                <Button 
                    variant="contained" 
                    startIcon={<AddTaskIcon />}
                    onClick={() => navigate('/otrosServicios/new')} 
                    sx={{ backgroundColor: '#c2185b', '&:hover': { backgroundColor: '#880e4f' } }}
                >
                    Agendar Servicio
                </Button>
            </Box>

            {/* --- GRID DE SERVICIOS --- */}
            <Grid container spacing={3}>
                {servicios.map((serv) => (
                    <Grid item xs={12} md={6} lg={4} key={serv.IdServicio}>
                        <Card sx={{ 
                            height: '100%', 
                            display: 'flex', 
                            flexDirection: 'column',
                            borderLeft: '6px solid #e91e63', // Borde Rosa Fuerte
                            boxShadow: 3,
                            transition: '0.3s',
                            '&:hover': { transform: 'translateY(-5px)' }
                        }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                {/* Título */}
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <DesignServicesIcon sx={{ color: '#c2185b', mr: 1.5, fontSize: 30 }} />
                                    <Typography variant="h6" component="div" sx={{ lineHeight: 1.2 }}>
                                        {serv.NomServicio}
                                    </Typography>
                                </Box>

                                <Divider sx={{ mb: 2 }} />

                                {/* Fecha y Costo */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Chip 
                                        icon={<EventIcon />} 
                                        label={serv.DateServ} 
                                        size="small" 
                                        variant="outlined" 
                                    />
                                    <Typography variant="h6" sx={{ color: '#c2185b', fontWeight: 'bold' }}>
                                        ${serv.CostServicio}
                                    </Typography>
                                </Box>
                                
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontStyle: 'italic' }}>
                                    "{serv.DescServicio}"
                                </Typography>

                                <Typography variant="caption" display="block" color="text.primary" sx={{ mt: 2 }}>
                                    <strong>Material Principal:</strong> {serv.NombreProducto || "N/A"}
                                </Typography>
                            </CardContent>

                            {/* Botones de Acción */}
                            <CardActions sx={{ justifyContent: 'flex-end', bgcolor: '#fce4ec' }}>
                                <Tooltip title="Editar Servicio">
                                    <IconButton color="primary" onClick={() => navigate(`/otrosServicios/edit/${serv.IdServicio}`)}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Eliminar Servicio">
                                    <IconButton color="error" onClick={() => handleDelete(serv.IdServicio)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}