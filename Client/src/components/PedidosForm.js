import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Button, TextField, Grid, Card, CardContent, Typography, Container, MenuItem, Box,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, 
    CircularProgress, Alert
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function PedidosForm() {
    const navigate = useNavigate();

    // 1. ESTADOS DE CATÁLOGOS
    const [clientes, setClientes] = useState([]); // <--- NECESITAMOS CLIENTES
    const [proveedores, setProveedores] = useState([]);
    const [plantas, setPlantas] = useState([]);
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. ESTADOS DEL FORMULARIO
    const [idCliente, setIdCliente] = useState(''); // <--- EL CLIENTE PIDE
    const [fechaEntrega, setFechaEntrega] = useState('');
    
    // 3. ESTADOS PARA ITEM
    const [tipoItem, setTipoItem] = useState('planta');
    const [idItemSel, setIdItemSel] = useState('');
    const [idProvSel, setIdProvSel] = useState(''); // Proveedor sugerido para este item
    const [cantidad, setCantidad] = useState(1);
    const [precio, setPrecio] = useState(0); 

    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [resCli, resProv, resPlantas, resProd] = await Promise.all([
                    fetch('http://localhost:4000/api/clientes'), // Traemos clientes
                    fetch('http://localhost:4000/api/proveedores'),
                    fetch('http://localhost:4000/api/plantas'),
                    fetch('http://localhost:4000/api/productos')
                ]);

                setClientes(await resCli.json());
                setProveedores(await resProv.json());
                setPlantas(await resPlantas.json());
                setProductos(await resProd.json());
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Error al cargar catálogos");
                setLoading(false);
            }
        };
        cargarDatos();
    }, []);

    const getListaActual = () => {
        if (tipoItem === 'planta') return plantas;
        if (tipoItem === 'producto') return productos;
        return [];
    };

    const handleAgregarItem = () => {
        if (!idItemSel || !idProvSel || cantidad <= 0 || precio <= 0) {
            alert("Completa los datos del item (Producto, Proveedor, Cantidad y Precio)");
            return;
        }

        const lista = getListaActual();
        const itemObj = lista.find(i => (i.id_planta === idItemSel) || (i.id_producto === idItemSel));
        const provObj = proveedores.find(p => p.id_proveedor === idProvSel);
        
        const nombreItem = itemObj.name_planta || itemObj.name_producto || "Item";
        const nombreProv = provObj ? provObj.name_proveedor : "Desconocido";

        const nuevoItem = {
            uniqueId: Date.now(),
            type: tipoItem,
            id: idItemSel,
            id_proveedor: idProvSel,
            nombre: nombreItem,
            nombre_proveedor: nombreProv,
            cantidad: parseInt(cantidad),
            precio: parseFloat(precio),
            subtotal: parseInt(cantidad) * parseFloat(precio)
        };

        setCarrito([...carrito, nuevoItem]);
        setIdItemSel('');
        setCantidad(1);
        setPrecio(0);
    };

    const handleEliminarItem = (uniqueId) => {
        setCarrito(carrito.filter(i => i.uniqueId !== uniqueId));
    };

    const calcularTotal = () => carrito.reduce((acc, i) => acc + i.subtotal, 0);

    const handleSubmit = async () => {
        if (!idCliente || !fechaEntrega || carrito.length === 0) {
            alert("Faltan datos: Cliente, Fecha o Items");
            return;
        }

        const payload = {
            id_cliente: idCliente, // Enviamos el cliente
            fecha_entrega: fechaEntrega,
            items: carrito
        };

        try {
            const res = await fetch('http://localhost:4000/api/pedidos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert("Encargo registrado correctamente");
                navigate('/pedidos');
            } else {
                const data = await res.json();
                alert("Error: " + data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión");
        }
    };

    if(loading) return <Container sx={{mt:5, textAlign:'center'}}><CircularProgress /></Container>;

    return (
        <Container maxWidth="lg" sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, mb: 2 }}>
                <IconButton onClick={() => navigate('/pedidos')} sx={{ mr: 2 }}><ArrowBackIcon /></IconButton>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#7b1fa2' }}>Nuevo Encargo (Cliente)</Typography>
            </Box>

            {error && <Alert severity="error" sx={{mb:2}}>{error}</Alert>}

            <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                    <Card sx={{ p: 2, mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>1. Datos del Cliente</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        select label="Cliente Solicitante" fullWidth
                                        value={idCliente}
                                        onChange={(e) => setIdCliente(e.target.value)}
                                    >
                                        {clientes.map(c => (
                                            <MenuItem key={c.id_cliente} value={c.id_cliente}>
                                                {c.name_cliente} {c.ap_pat_cliente}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        type="date" label="Fecha Límite / Entrega" fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        value={fechaEntrega}
                                        onChange={(e) => setFechaEntrega(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    <Card sx={{ p: 2 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>2. ¿Qué necesita?</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField select label="Tipo" fullWidth value={tipoItem} onChange={(e) => setTipoItem(e.target.value)}>
                                        <MenuItem value="planta">Planta</MenuItem>
                                        <MenuItem value="producto">Producto</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField select label="Artículo" fullWidth value={idItemSel} onChange={(e) => setIdItemSel(e.target.value)}>
                                        {getListaActual().map(item => (
                                            <MenuItem key={item.id_planta || item.id_producto} value={item.id_planta || item.id_producto}>
                                                {item.name_planta || item.name_producto}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField select label="Proveedor (Para conseguirlo)" fullWidth value={idProvSel} onChange={(e) => setIdProvSel(e.target.value)}>
                                        {proveedores.map(p => (
                                            <MenuItem key={p.id_proveedor} value={p.id_proveedor}>
                                                {p.name_proveedor}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Cantidad" type="number" fullWidth value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField label="Precio Cotizado ($)" type="number" fullWidth value={precio} onChange={(e) => setPrecio(e.target.value)} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" fullWidth startIcon={<AddShoppingCartIcon />} onClick={handleAgregarItem} sx={{bgcolor: '#7b1fa2'}}>
                                        Agregar Encargo
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={7}>
                    <Card sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom>Resumen del Pedido</Typography>
                            <TableContainer component={Paper} sx={{ maxHeight: 400, mb: 2, bgcolor:'#f3e5f5' }}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Cant.</TableCell>
                                            <TableCell>Descripción</TableCell>
                                            <TableCell>Surte</TableCell>
                                            <TableCell align="right">Subtotal</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {carrito.map((row) => (
                                            <TableRow key={row.uniqueId}>
                                                <TableCell>{row.cantidad}</TableCell>
                                                <TableCell>
                                                    {row.nombre} <br/>
                                                    <Typography variant="caption" color="textSecondary">({row.type})</Typography>
                                                </TableCell>
                                                <TableCell>{row.nombre_proveedor}</TableCell>
                                                <TableCell align="right">${row.subtotal}</TableCell>
                                                <TableCell>
                                                    <IconButton size="small" color="error" onClick={() => handleEliminarItem(row.uniqueId)}>
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Box sx={{ mt: 'auto', borderTop: '1px solid #ddd', pt: 2 }}>
                                <Typography variant="h5" align="right" sx={{ fontWeight: 'bold', color: '#7b1fa2', mb: 2 }}>
                                    Total: ${calcularTotal().toFixed(2)}
                                </Typography>
                                <Button 
                                    variant="contained" size="large" fullWidth startIcon={<SaveIcon />} 
                                    onClick={handleSubmit} sx={{ bgcolor: '#4a0072' }}
                                    disabled={carrito.length === 0}
                                >
                                    Confirmar Encargo
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}