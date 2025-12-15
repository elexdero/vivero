import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Box, Button, Grid, Card, Typography, Container, Chip, ButtonGroup, IconButton, CircularProgress
} from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function VentasList() {
    const navigate = useNavigate();
    const [filtro, setFiltro] = useState('todo'); 
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarVentas();
    }, []);

    const cargarVentas = async () => {
        try {
            const res = await fetch('http://localhost:4000/api/ventas');
            if (res.ok) setVentas(await res.json());
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const ventasFiltradas = ventas.filter(venta => {
        if (filtro === 'todo') return true;
        const fechaVenta = new Date(venta.fecha_venta).toISOString().split('T')[0];
        const hoy = new Date().toISOString().split('T')[0];
        if (filtro === 'hoy') return fechaVenta === hoy;
        return true;
    });

    if (loading) return <Container sx={{mt:5, textAlign:'center'}}><CircularProgress /></Container>;

    return (
        <Container maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 4 }}>
                <Typography variant="h4" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                    Registro de Ventas
                </Typography>
                <Button 
                    variant="contained" size="large" startIcon={<PointOfSaleIcon />}
                    onClick={() => navigate('/ventas/new')} 
                    sx={{ backgroundColor: '#2e7d32', '&:hover': { backgroundColor: '#1b5e20' } }}
                >
                    Nueva Venta
                </Button>
            </Box>

            <Card sx={{ mb: 4, p: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1, flexWrap:'wrap' }}>
                    <CalendarTodayIcon color="action" />
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Filtrar por:</Typography>
                    <ButtonGroup variant="outlined" color="success">
                        <Button variant={filtro === 'hoy' ? 'contained' : 'outlined'} onClick={() => setFiltro('hoy')}>Día (Hoy)</Button>
                        <Button variant={filtro === 'todo' ? 'contained' : 'outlined'} onClick={() => setFiltro('todo')}>Todo</Button>
                    </ButtonGroup>
                </Box>
            </Card>

            <Grid container spacing={2}>
                {ventasFiltradas.map((v) => (
                    <Grid item xs={12} key={v.id_venta}>
                        <Card sx={{ display: 'flex', alignItems: 'center', p: 2, borderLeft: '6px solid #4caf50' }}>
                            <Box sx={{ mr: 3, color: '#2e7d32' }}><ReceiptIcon fontSize="large" /></Box>
                            
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h6">
                                    {/* CAMBIO: Solo mostramos Folio y Fecha */}
                                    Folio de Venta: #{v.id_venta}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {new Date(v.fecha_venta).toLocaleString()} • Pago: {v.forma_pago}
                                </Typography>
                            </Box>

                            <Box sx={{ textAlign: 'right', minWidth: 150 }}>
                                <Typography variant="h5" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                                    ${parseFloat(v.total_venta).toFixed(2)}
                                </Typography>
                                <Chip label={v.forma_pago} size="small" variant="outlined" sx={{ mt: 0.5 }} />
                            </Box>

                            <IconButton sx={{ ml: 2 }} onClick={() => navigate(`/ventas/${v.id_venta}`)}>
                                <VisibilityIcon />
                            </IconButton>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}