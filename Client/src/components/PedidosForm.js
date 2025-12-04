import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    Button, 
    TextField, 
    Grid, 
    Card, 
    CardContent, 
    Typography, 
    Container, 
    MenuItem,
    Box
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function PedidosForm() {
    const navigate = useNavigate();
    const { id } = useParams(); 

    // Estado con los nombres EXACTOS de tu Tabla Pedidos
    const [pedido, setPedido] = useState({
        idVenta: '',
        IdCliente: '',
        IdProducto: '',
        Unidades: '',
        IdProveedor: '',
        Timeout: ''      // Tiempo de entrega (Fecha)
    });

    // --- LISTAS SIMULADAS (Para los Selects) ---
    const clientesList = [
        { id: 101, nombre: "Juan Pérez" },
        { id: 102, nombre: "María González" }
    ];
    const productosList = [
        { id: 501, nombre: "Maceta Barro #5" },
        { id: 502, nombre: "Fertilizante X" }
    ];
    const proveedoresList = [
        { id: 1, nombre: "Fertilizantes del Norte" },
        { id: 2, nombre: "Macetas López" }
    ];

    // Cargar datos si es edición
    useEffect(() => {
        if (id) {
            setPedido({
                idVenta: id,
                IdCliente: 101,
                IdProducto: 502,
                Unidades: 10,
                IdProveedor: 1,
                Timeout: "2024-03-20"
            });
        }
    }, [id]);

    const handleChange = (e) => {
        setPedido({ ...pedido, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Pedido especial guardado:", pedido);
        alert("Pedido registrado. Se notificará cuando llegue el stock.");
        navigate('/pedidos');
    };

    return (
        <Container maxWidth="md" sx={{ mb: 4 }}>
            <Card sx={{ mt: 5, p: 3, borderTop: '6px solid #7b1fa2' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                        <AddShoppingCartIcon sx={{ color: '#7b1fa2', fontSize: 40, mr: 1 }} />
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#4a0072' }}>
                            {id ? "Modificar Pedido" : "Registrar Pedido Especial"}
                        </Typography>
                    </Box>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>

                            {/* Selector CLIENTE */}
                            <Grid item xs={12} sm={8}>
                                <TextField
                                    select
                                    label="Cliente Solicitante"
                                    name="IdCliente"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    value={pedido.IdCliente}
                                    onChange={handleChange}
                                >
                                    {clientesList.map((c) => (
                                        <MenuItem key={c.id} value={c.id}>{c.nombre}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            {/* Selector PRODUCTO */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    label="Producto Requerido"
                                    name="IdProducto"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    value={pedido.IdProducto}
                                    onChange={handleChange}
                                >
                                    {productosList.map((p) => (
                                        <MenuItem key={p.id} value={p.id}>{p.nombre}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            {/* Unidades (Cantidad) */}
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    label="Cantidad (Unidades)" 
                                    name="Unidades" 
                                    type="number"
                                    fullWidth 
                                    required 
                                    variant="outlined"
                                    value={pedido.Unidades}
                                    onChange={handleChange} 
                                />
                            </Grid>

                            {/* Selector PROVEEDOR */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    label="Proveedor Asignado"
                                    name="IdProveedor"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    value={pedido.IdProveedor}
                                    onChange={handleChange}
                                    helperText="¿A quién le pediremos el stock?"
                                >
                                    {proveedoresList.map((prov) => (
                                        <MenuItem key={prov.id} value={prov.id}>{prov.nombre}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            {/* Timeout (Fecha Entrega) */}
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    label="Fecha Estimada de Entrega (Timeout)" 
                                    name="Timeout" 
                                    type="date"
                                    fullWidth 
                                    required 
                                    InputLabelProps={{ shrink: true }}
                                    value={pedido.Timeout}
                                    onChange={handleChange} 
                                />
                            </Grid>

                            {/* Botones */}
                            <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
                                <Button variant="outlined" color="secondary" startIcon={<ArrowBackIcon />} onClick={() => navigate('/pedidos')}>
                                    Cancelar
                                </Button>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    startIcon={<SaveIcon />}
                                    sx={{ backgroundColor: '#7b1fa2', '&:hover': { backgroundColor: '#4a0072' } }}
                                >
                                    Registrar Pedido
                                </Button>
                            </Grid>

                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}