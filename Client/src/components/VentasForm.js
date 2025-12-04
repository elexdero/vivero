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

    // --- 1. ESTADOS PARA LOS CATÁLOGOS REALES (Ya no hay mock data) ---
    const [catPlantas, setCatPlantas] = useState([]);
    const [catProductos, setCatProductos] = useState([]);
    const [catServicios, setCatServicios] = useState([]);
    const [catClientes, setCatClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- 2. ESTADOS DE LA VENTA ---
    const [idCliente, setIdCliente] = useState('');
    const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
    const [tipoItem, setTipoItem] = useState('planta');
    const [idItemSel, setIdItemSel] = useState('');
    const [cantidad, setCantidad] = useState(1);
    const [carrito, setCarrito] = useState([]);

    // --- 3. CARGAR DATOS DEL BACKEND AL INICIAR ---
    useEffect(() => {
        const cargarCatalogos = async () => {
            try {
                // Hacemos todas las peticiones al mismo tiempo
                const [resPlantas, resProductos, resServicios, resClientes] = await Promise.all([
                    fetch('http://localhost:4000/api/plantas'),
                    fetch('http://localhost:4000/api/productos'),
                    fetch('http://localhost:4000/api/otrosServicios'), 
                    fetch('http://localhost:4000/api/clientes')
                ]);

                // Convertimos a JSON
                const dataPlantas = await resPlantas.json();
                const dataProductos = await resProductos.json();
                const dataServicios = await resServicios.json();
                const dataClientes = await resClientes.json();

                // Guardamos en el estado (verificando que sean arrays)
                setCatPlantas(Array.isArray(dataPlantas) ? dataPlantas : []);
                setCatProductos(Array.isArray(dataProductos) ? dataProductos : []);
                setCatServicios(Array.isArray(dataServicios) ? dataServicios : []);
                setCatClientes(Array.isArray(dataClientes) ? dataClientes : []);
                
                setLoading(false);
            } catch (err) {
                console.error("Error cargando catálogos:", err);
                setError("No se pudieron cargar los catálogos. Revisa que el backend esté encendido.");
                setLoading(false);
            }
        };
        cargarCatalogos();
    }, []);

    // --- 4. FUNCIÓN PARA NORMALIZAR DATOS ---
    // Convierte las columnas raras de Postgres a un formato estándar para el carrito
    const mapItemToStandard = (item, tipo) => {
        if (!item) return null;
        if (tipo === 'planta') {
            return {
                id: item.idplanta, // Postgres devuelve minúsculas
                nombre: item.nameplanta,
                precio: parseFloat(item.precioplanta || 0)
            };
        }
        if (tipo === 'producto') {
            return {
                id: item.idproducto,
                nombre: item.nameproducto,
                precio: parseFloat(item.precioproducto || 0)
            };
        }
        if (tipo === 'servicio') {
            return {
                id: item.idservicio,
                nombre: item.nomservicio,
                precio: parseFloat(item.costservicio || 0)
            };
        }
        return null;
    };

    // Helper para saber qué lista mostrar en el Select
    const getListaActual = () => {
        if (tipoItem === 'planta') return catPlantas;
        if (tipoItem === 'producto') return catProductos;
        if (tipoItem === 'servicio') return catServicios;
        return [];
    };

    const handleAgregar = () => {
        if (!idItemSel) return;

        const lista = getListaActual();
        // Buscamos el objeto completo en la lista descargada
        const itemCrudo = lista.find(i => 
            (i.idplanta === idItemSel) || (i.idproducto === idItemSel) || (i.idservicio === idItemSel)
        );

        if (!itemCrudo) return;

        // Lo convertimos a formato bonito
        const itemEstandar = mapItemToStandard(itemCrudo, tipoItem);

        const nuevoItem = {
            uniqueId: Date.now(),
            tipo: tipoItem,
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
        if (!idCliente || carrito.length === 0) {
            alert("Faltan datos para la venta");
            return;
        }

        const ventaData = {
            idCliente,
            fecha,
            total: calcularTotal(),
            // El backend no guardará el detalle por ahora (según tu código), 
            // pero lo enviamos por si acaso lo implementas luego.
            detalles: carrito 
        };

        try {
            const response = await fetch('http://localhost:4000/api/ventas/new', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ventaData)
            });

            if (response.ok) {
                alert("Venta registrada con éxito");
                navigate('/ventas');
            } else {
                alert("Error al guardar venta");
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
                            <Typography variant="h6">1. Cliente y Fecha</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <TextField
                                        select label="Cliente" fullWidth value={idCliente}
                                        onChange={(e) => setIdCliente(e.target.value)}
                                    >
                                        {/* Usamos nombres en minúscula de Postgres */}
                                        {catClientes.map(c => (
                                            <MenuItem key={c.idcliente} value={c.idcliente}>
                                                {c.namecliente} {c.appatcliente}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField type="date" label="Fecha" fullWidth value={fecha} onChange={(e) => setFecha(e.target.value)} />
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 3 }} />

                            <Typography variant="h6">2. Agregar Ítem</Typography>
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
                                            // Normalizamos para mostrar bonito en el menú
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
                                Agregar
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 2 }}>
                        <CardContent>
                            <Typography variant="h6">Resumen</Typography>
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
                                                <TableCell align="right">${row.subtotal}</TableCell>
                                                <TableCell padding="none">
                                                    <IconButton size="small" color="error" onClick={() => handleEliminarItem(row.uniqueId)}>
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Box sx={{ borderTop: '1px solid #ddd', pt: 2, textAlign: 'center' }}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                                    Total: ${calcularTotal().toFixed(2)}
                                </Typography>
                                <Button variant="contained" size="large" startIcon={<SaveIcon />} 
                                    sx={{ mt: 2, width: '100%', bgcolor: '#1b5e20' }} onClick={handleGuardarVenta} 
                                    disabled={carrito.length === 0}
                                >
                                    Cobrar
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}