import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Button, TextField, Grid, Card, CardContent, Typography, Container, MenuItem, Box,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Divider,
    CircularProgress, Alert
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function VentasForm() {
    const navigate = useNavigate();

    // 1. ESTADOS PARA LOS CATÁLOGOS (Ya no cargamos clientes)
    const [catPlantas, setCatPlantas] = useState([]);
    const [catProductos, setCatProductos] = useState([]);
    const [catServicios, setCatServicios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. ESTADOS DE LA VENTA (Sin idCliente)
    const [formaPago, setFormaPago] = useState('Efectivo');
    const [tipoItem, setTipoItem] = useState('planta');
    const [idItemSel, setIdItemSel] = useState('');
    const [cantidad, setCantidad] = useState(1);
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        const cargarCatalogos = async () => {
            try {
                // CAMBIO: Quitamos fetch de clientes
                const [resPlantas, resProductos, resServicios] = await Promise.all([
                    fetch('http://localhost:4000/api/plantas'),
                    fetch('http://localhost:4000/api/productos'),
                    fetch('http://localhost:4000/api/servicios')
                ]);

                setCatPlantas(await resPlantas.json());
                setCatProductos(await resProductos.json());
                setCatServicios(await resServicios.json());
                
                setLoading(false);
            } catch (err) {
                console.error("Error cargando catálogos:", err);
                setError("No se pudieron cargar los catálogos.");
                setLoading(false);
            }
        };
        cargarCatalogos();
    }, []);

    const mapItemToStandard = (item, tipo) => {
        if (!item) return null;
        if (tipo === 'planta') {
            return {
                id: item.id_planta,
                nombre: item.name_planta,
                precio: parseFloat(item.precio_planta || 0)
            };
        }
        if (tipo === 'producto') {
            return {
                id: item.id_producto,
                nombre: item.name_producto,
                precio: parseFloat(item.precio_producto || 0)
            };
        }
        if (tipo === 'servicio') {
            return {
                id: item.id_servicio,
                nombre: item.name_servicio,
                precio: parseFloat(item.costo_servicio || 0)
            };
        }
        return null;
    };

    const getListaActual = () => {
        if (tipoItem === 'planta') return catPlantas;
        if (tipoItem === 'producto') return catProductos;
        if (tipoItem === 'servicio') return catServicios;
        return [];
    };

    const handleAgregar = () => {
        if (!idItemSel) return;
        const lista = getListaActual();
        const itemCrudo = lista.find(i => 
            (i.id_planta === idItemSel) || (i.id_producto === idItemSel) || (i.id_servicio === idItemSel)
        );

        if (!itemCrudo) return;
        const itemEstandar = mapItemToStandard(itemCrudo, tipoItem);

        const nuevoItem = {
            uniqueId: Date.now(),
            type: tipoItem,
            id: itemEstandar.id,
            nombre: itemEstandar.nombre,
            precio: itemEstandar.precio,
            cantidad: parseInt(cantidad),
            subtotal: itemEstandar.precio * parseInt(cantidad)
        };

        setCarrito([...carrito, nuevoItem]);
        setIdItemSel('');
        setCantidad(1);
    };

    const handleEliminarItem = (uniqueId) => {
        setCarrito(carrito.filter(item => item.uniqueId !== uniqueId));
    };

    const calcularTotal = () => {
        return carrito.reduce((acc, item) => acc + item.subtotal, 0);
    };

    const handleGuardarVenta = async () => {
        if (carrito.length === 0) {
            alert("Agrega productos al carrito.");
            return;
        }

        const ventaData = {
            // CAMBIO: Quitamos id_cliente del payload
            forma_pago: formaPago,
            total_venta: calcularTotal(),
            detalles: carrito
        };

        try {
            const response = await fetch('http://localhost:4000/api/ventas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ventaData)
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Venta registrada con éxito. Folio: ${data.id_venta}`);
                navigate('/ventas');
            } else {
                alert("Error del servidor: " + data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión");
        }
    };

    if (loading) return <Container sx={{mt:5, textAlign:'center'}}><CircularProgress /></Container>;

    return (
        <Container maxWidth="xl" sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, mb: 2 }}>
                <IconButton onClick={() => navigate('/ventas')} sx={{ mr: 2 }}><ArrowBackIcon /></IconButton>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Punto de Venta</Typography>
            </Box>

            {error && <Alert severity="error" sx={{mb: 2}}>{error}</Alert>}

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 2 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>1. Agregar Ítems</Typography>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={3}>
                                    <TextField select label="Tipo" fullWidth value={tipoItem} 
                                        onChange={(e) => { setTipoItem(e.target.value); setIdItemSel(''); }}
                                    >
                                        <MenuItem value="planta">Planta</MenuItem>
                                        <MenuItem value="producto">Producto</MenuItem>
                                        <MenuItem value="servicio">Servicio</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField select label="Seleccionar Artículo" fullWidth value={idItemSel} 
                                        onChange={(e) => setIdItemSel(e.target.value)} disabled={!tipoItem}
                                    >
                                        {getListaActual().map(item => {
                                            const datos = mapItemToStandard(item, tipoItem);
                                            return (
                                                <MenuItem key={datos.id} value={datos.id}>
                                                    {datos.nombre} - ${datos.precio}
                                                </MenuItem>
                                            );
                                        })}
                                    </TextField>
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField label="Cant." type="number" fullWidth value={cantidad} 
                                        onChange={(e) => setCantidad(e.target.value)} InputProps={{ inputProps: { min: 1 } }} 
                                    />
                                </Grid>
                            </Grid>
                            <Button variant="contained" fullWidth startIcon={<AddShoppingCartIcon />} 
                                sx={{ mt: 2, bgcolor: '#2e7d32' }} onClick={handleAgregar}
                            >
                                Agregar al Carrito
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom>Carrito de Compras</Typography>
                            
                            <TableContainer component={Paper} sx={{ mt: 1, mb: 2, bgcolor: '#f1f8e9', maxHeight: 300 }}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Cant.</TableCell>
                                            <TableCell>Desc.</TableCell>
                                            <TableCell align="right">Subt.</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {carrito.map((row) => (
                                            <TableRow key={row.uniqueId}>
                                                <TableCell>{row.cantidad}</TableCell>
                                                <TableCell>{row.nombre}</TableCell>
                                                <TableCell align="right">${row.subtotal.toFixed(2)}</TableCell>
                                                <TableCell padding="none">
                                                    <IconButton size="small" color="error" onClick={() => handleEliminarItem(row.uniqueId)}>
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {carrito.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={4} align="center">Carrito vacío</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Box sx={{ borderTop: '1px solid #ddd', pt: 2 }}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2e7d32', textAlign: 'right', mb: 2 }}>
                                    Total: ${calcularTotal().toFixed(2)}
                                </Typography>

                                <TextField select label="Forma de Pago" fullWidth value={formaPago}
                                    onChange={(e) => setFormaPago(e.target.value)} sx={{ mb: 2 }}
                                >
                                    <MenuItem value="Efectivo">Efectivo</MenuItem>
                                    <MenuItem value="Tarjeta">Tarjeta Débito/Crédito</MenuItem>
                                    <MenuItem value="Transferencia">Transferencia</MenuItem>
                                </TextField>

                                <Button variant="contained" size="large" startIcon={<SaveIcon />} 
                                    sx={{ width: '100%', bgcolor: '#1b5e20' }} onClick={handleGuardarVenta} 
                                    disabled={carrito.length === 0}
                                >
                                    Confirmar Venta
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}