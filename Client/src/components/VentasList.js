import { useState } from 'react';
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
    ButtonGroup,
    Divider,
    IconButton
} from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function VentasList() {
    const navigate = useNavigate();
    const [filtro, setFiltro] = useState('todo'); // todo, hoy, semana, mes

    // 1. Datos Simulados de Ventas Históricas
    const ventasDB = [
        {
            idVenta: 1001,
            fecha: "2024-03-05", // Digamos que hoy es 5 de Marzo
            cliente: "Juan Pérez",
            total: 1250.00,
            items: "2x Rosales, 1x Fertilizante",
            tipo: "Venta Mostrador"
        },
        {
            idVenta: 1002,
            fecha: "2024-03-04", // Ayer
            cliente: "María González",
            total: 3500.00,
            items: "1x Diseño Jardín Zen", // Servicio
            tipo: "Servicio"
        },
        {
            idVenta: 1003,
            fecha: "2024-02-20", // Mes pasado
            cliente: "Pedro Martínez",
            total: 450.00,
            items: "3x Macetas Barro",
            tipo: "Venta Mostrador"
        }
    ];

    // Lógica simple de filtrado (Simulación)
    const ventasFiltradas = ventasDB.filter(venta => {
        if (filtro === 'todo') return true;
        // Aquí iría lógica real de fechas (moment.js o dayjs)
        // Por ahora simulamos:
        if (filtro === 'hoy') return venta.fecha === "2024-03-05";
        if (filtro === 'semana') return venta.fecha >= "2024-03-01";
        if (filtro === 'mes') return venta.fecha >= "2024-03-01";
        return true;
    });

    return (
        <Container maxWidth="lg">
            {/* --- ENCABEZADO --- */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 4 }}>
                <Typography variant="h4" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                    Registro de Ventas
                </Typography>
                <Button 
                    variant="contained" 
                    size="large"
                    startIcon={<PointOfSaleIcon />}
                    onClick={() => navigate('/ventas/new')} 
                    sx={{ backgroundColor: '#2e7d32', '&:hover': { backgroundColor: '#1b5e20' } }}
                >
                    Nueva Venta
                </Button>
            </Box>

            {/* --- BARRA DE FILTROS --- */}
            <Card sx={{ mb: 4, p: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1 }}>
                    <CalendarTodayIcon color="action" />
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Filtrar por:</Typography>
                    
                    <ButtonGroup variant="outlined" color="success">
                        <Button 
                            variant={filtro === 'hoy' ? 'contained' : 'outlined'} 
                            onClick={() => setFiltro('hoy')}
                        >
                            Día (Hoy)
                        </Button>
                        <Button 
                            variant={filtro === 'semana' ? 'contained' : 'outlined'}
                            onClick={() => setFiltro('semana')}
                        >
                            Semana
                        </Button>
                        <Button 
                            variant={filtro === 'mes' ? 'contained' : 'outlined'}
                            onClick={() => setFiltro('mes')}
                        >
                            Mes
                        </Button>
                        <Button 
                            variant={filtro === 'todo' ? 'contained' : 'outlined'}
                            onClick={() => setFiltro('todo')}
                        >
                            Todo el Historial
                        </Button>
                    </ButtonGroup>
                </Box>
            </Card>

            {/* --- LISTA DE VENTAS --- */}
            <Grid container spacing={2}>
                {ventasFiltradas.map((v) => (
                    <Grid item xs={12} key={v.idVenta}>
                        <Card sx={{ display: 'flex', alignItems: 'center', p: 2, borderLeft: '6px solid #4caf50' }}>
                            {/* Icono */}
                            <Box sx={{ mr: 3, color: '#2e7d32' }}>
                                <ReceiptIcon fontSize="large" />
                            </Box>
                            
                            {/* Info Principal */}
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h6">
                                    Folio: #{v.idVenta} - {v.cliente}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {v.fecha} • {v.items}
                                </Typography>
                            </Box>

                            {/* Total y Botón */}
                            <Box sx={{ textAlign: 'right', minWidth: 150 }}>
                                <Typography variant="h5" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                                    ${v.total.toFixed(2)}
                                </Typography>
                                <Chip label={v.tipo} size="small" variant="outlined" sx={{ mt: 0.5 }} />
                            </Box>

                            <IconButton sx={{ ml: 2 }}>
                                <VisibilityIcon />
                            </IconButton>
                        </Card>
                    </Grid>
                ))}
                
                {ventasFiltradas.length === 0 && (
                    <Typography sx={{ width: '100%', textAlign: 'center', mt: 4, color: 'text.secondary' }}>
                        No se encontraron ventas con este filtro.
                    </Typography>
                )}
            </Grid>
        </Container>
    );
}