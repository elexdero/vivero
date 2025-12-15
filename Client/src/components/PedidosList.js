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
    IconButton,
    Tooltip,
    Divider,
    CircularProgress,
    Alert
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Icono para recibir
import AccessTimeIcon from '@mui/icons-material/AccessTime'; 
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export default function PedidosList() {
    const navigate = useNavigate();
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. Cargar Pedidos del Backend
    const cargarPedidos = async () => {
        try {
            const res = await fetch('http://localhost:4000/api/pedidos');
            if (res.ok) {
                const data = await res.json();
                setPedidos(data);
            } else {
                setError("Error al cargar la lista de pedidos");
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError("No se pudo conectar con el servidor");
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarPedidos();
    }, []);

    // 2. Función para RECIBIR MERCANCÍA (Actualiza Stock)
    const handleRecibir = async (id) => {
        if(!window.confirm("¿Confirmar que llegó la mercancía? Esto sumará el stock al inventario.")) return;

        try {
            const res = await fetch(`http://localhost:4000/api/pedidos/${id}/recibir`, {
                method: 'PUT'
            });

            if (res.ok) {
                alert("¡Stock actualizado correctamente!");
                cargarPedidos(); // Recargamos para ver el cambio de estado
            } else {
                const data = await res.json();
                alert("Error: " + data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión");
        }
    };

    // Formatear fecha bonita
    const formatDate = (dateString) => {
        if(!dateString) return "N/D";
        return new Date(dateString).toLocaleDateString();
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
                <Typography variant="h4" sx={{ color: '#7b1fa2', fontWeight: 'bold' }}>
                    Pedidos a Proveedores
                </Typography>

                <Button 
                    variant="contained" 
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => navigate('/pedidos/new')} 
                    sx={{ backgroundColor: '#7b1fa2', '&:hover': { backgroundColor: '#4a0072' } }}
                >
                    Nuevo Pedido
                </Button>
            </Box>

            {loading && <Box sx={{display:'flex', justifyContent:'center'}}><CircularProgress color="secondary"/></Box>}
            {error && <Alert severity="error">{error}</Alert>}

            {/* --- GRID DE PEDIDOS --- */}
            <Grid container spacing={3}>
                {!loading && pedidos.map((pedido) => (
                    <Grid item xs={12} md={6} lg={4} key={pedido.id_pedido}>
                        <Card sx={{ 
                            height: '100%', 
                            // Si ya está recibido, borde verde. Si es pendiente, borde morado.
                            borderLeft: pedido.estado === 'Recibido' ? '6px solid #2e7d32' : '6px solid #9c27b0', 
                            boxShadow: 3,
                            position: 'relative'
                        }}>
                            <CardContent>
                                {/* Encabezado: Proveedor */}
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <LocalShippingIcon sx={{ color: '#7b1fa2', mr: 1 }} />
                                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                        {pedido.name_proveedor}
                                    </Typography>
                                </Box>
                                
                                <Typography variant="body2" sx={{ mb: 2, ml: 4, color: '#4a148c', fontWeight: 'bold' }}>
                                    Folio: #{pedido.id_pedido}
                                </Typography>

                                <Divider sx={{ mb: 2 }} />

                                {/* Detalles: Total y Fecha */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">
                                        <strong>Total Estimado:</strong>
                                    </Typography>
                                    <Chip 
                                        icon={<MonetizationOnIcon />} 
                                        label={`$${pedido.total_estimado}`} 
                                        size="small" 
                                        variant="outlined"
                                        color="secondary"
                                    />
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="body2">
                                        <strong>Fecha Entrega:</strong>
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {formatDate(pedido.fecha_entrega)}
                                    </Typography>
                                </Box>

                                {/* Estado del Pedido */}
                                <Chip 
                                    icon={pedido.estado === 'Recibido' ? <InventoryIcon /> : <AccessTimeIcon />} 
                                    label={pedido.estado} 
                                    color={pedido.estado === 'Recibido' ? "success" : "warning"} 
                                    sx={{ width: '100%', justifyContent: 'center', mb: 2 }}
                                />

                                {/* Botones de Acción */}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                    {pedido.estado === 'Pendiente' && (
                                        <Tooltip title="Confirmar Recepción (Sumar al Stock)">
                                            <Button 
                                                size="small" 
                                                variant="contained" 
                                                color="success" 
                                                startIcon={<CheckCircleIcon />}
                                                onClick={() => handleRecibir(pedido.id_pedido)}
                                            >
                                                Recibir
                                            </Button>
                                        </Tooltip>
                                    )}
                                    
                                    {pedido.estado === 'Recibido' && (
                                        <Typography variant="caption" color="green" sx={{fontStyle:'italic'}}>
                                            Stock actualizado
                                        </Typography>
                                    )}
                                </Box>

                            </CardContent>
                        </Card>
                    </Grid>
                ))}

                {!loading && pedidos.length === 0 && (
                    <Container sx={{textAlign:'center', mt:5}}>
                        <Typography color="text.secondary">No hay pedidos registrados.</Typography>
                    </Container>
                )}
            </Grid>
        </Container>
    );
}