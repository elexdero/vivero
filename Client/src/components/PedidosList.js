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
    IconButton,
    Tooltip,
    Divider
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Para el tiempo de entrega
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';

export default function PedidosList() {
    const navigate = useNavigate();

    // 1. Datos Simulados (Mock Data)
    const [pedidos, setPedidos] = useState([
        {
            idVenta: 501,
            IdCliente: 101,
            NombreCliente: "Juan Pérez",      // JOIN simulado
            IdProducto: 502,
            NombreProducto: "Fertilizante X", // JOIN simulado
            Unidades: 10,
            IdProveedor: 1,
            NombreProveedor: "Fertilizantes del Norte", // JOIN simulado
            Timeout: "2024-03-20" // Fecha estimada de llegada
        },
        {
            idVenta: 502,
            IdCliente: 102,
            NombreCliente: "María González",
            IdProducto: 501,
            NombreProducto: "Maceta Barro #5",
            Unidades: 50,
            IdProveedor: 2,
            NombreProveedor: "Macetas López",
            Timeout: "2024-03-25"
        }
    ]);

    // Función Eliminar (Cancelar Pedido)
    const handleDelete = (id) => {
        if(window.confirm("¿Cancelar este pedido pendiente?")) {
            const nuevaLista = pedidos.filter(p => p.idVenta !== id);
            setPedidos(nuevaLista);
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
                <Typography variant="h4" sx={{ color: '#7b1fa2', fontWeight: 'bold' }}>
                    Pedidos Pendientes (Stock)
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

            {/* --- GRID DE PEDIDOS --- */}
            <Grid container spacing={3}>
                {pedidos.map((pedido) => (
                    <Grid item xs={12} md={6} lg={4} key={pedido.idVenta}>
                        <Card sx={{ 
                            height: '100%', 
                            borderLeft: '6px solid #9c27b0', // Morado
                            boxShadow: 3,
                            position: 'relative'
                        }}>
                            <CardContent>
                                {/* Encabezado: Producto y Cantidad */}
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <InventoryIcon sx={{ color: '#7b1fa2', mr: 1 }} />
                                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                        {pedido.NombreProducto}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ mb: 2, ml: 4, color: '#4a148c', fontWeight: 'bold' }}>
                                    Cantidad solicitada: {pedido.Unidades} pzas.
                                </Typography>

                                <Divider sx={{ mb: 2 }} />

                                {/* Detalles: Cliente y Proveedor */}
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                    <strong>Cliente:</strong> {pedido.NombreCliente}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
                                    <LocalShippingIcon fontSize="small" sx={{ mr: 0.5 }} />
                                    <Typography variant="caption">
                                        Proveedor: {pedido.NombreProveedor}
                                    </Typography>
                                </Box>

                                {/* Fecha de Entrega (Timeout) */}
                                <Chip 
                                    icon={<AccessTimeIcon />} 
                                    label={`Llega: ${pedido.Timeout}`} 
                                    color="secondary" 
                                    variant="outlined" 
                                    sx={{ width: '100%', justifyContent: 'center' }}
                                />

                                {/* Botones de Acción */}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                    <Tooltip title="Editar Pedido">
                                        <IconButton size="small" color="primary" onClick={() => navigate(`/pedidos/edit/${pedido.idVenta}`)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Cancelar Pedido">
                                        <IconButton size="small" color="error" onClick={() => handleDelete(pedido.idVenta)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>

                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}