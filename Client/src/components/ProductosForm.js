import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Box, TextField, Button, Paper, Grid, MenuItem, Alert } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

export default function ProductoForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [producto, setProducto] = useState({
        name_producto: '', info_producto: '', stock: '', precio_producto: '', id_proveedor: ''
    });
    const [proveedores, setProveedores] = useState([]);
    const [error, setError] = useState('');
    
    const API_URL = 'http://localhost:4000/api';

    useEffect(() => {
        cargarProveedores();
        if (id) cargarProducto();
    }, [id]);

    const cargarProveedores = async () => {
        const res = await fetch(`${API_URL}/proveedores`);
        if (res.ok) setProveedores(await res.json());
    };

    const cargarProducto = async () => {
        const res = await fetch(`${API_URL}/productos/${id}`);
        if (res.ok) setProducto(await res.json());
    };

    const handleChange = (e) => setProducto({...producto, [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = id ? 'PUT' : 'POST';
            const url = id ? `${API_URL}/productos/${id}` : `${API_URL}/productos`;
            
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(producto)
            });

            if (res.ok) navigate('/productos');
            else setError("Error al guardar el producto");
        } catch (err) { setError(err.message); }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>{id ? "Editar Producto" : "Nuevo Producto"}</Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <TextField label="Nombre del Producto" fullWidth name="name_producto" value={producto.name_producto} onChange={handleChange} required />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField select label="Proveedor" fullWidth name="id_proveedor" value={producto.id_proveedor} onChange={handleChange} required>
                                {proveedores.map((p) => (
                                    // AJUSTA AQUÍ SI TU PROVEEDOR TIENE OTROS NOMBRES DE COLUMNA
                                    <MenuItem key={p.id_proveedor} value={p.id_proveedor}>
                                        {p.name_proveedor}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Descripción / Info" fullWidth name="info_producto" value={producto.info_producto} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField type="number" label="Stock (Cantidad)" fullWidth name="stock" value={producto.stock} onChange={handleChange} required />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField type="number" label="Precio Unitario ($)" fullWidth name="precio_producto" value={producto.precio_producto} onChange={handleChange} required />
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <Button type="submit" variant="contained" fullWidth startIcon={<SaveIcon />}>Guardar</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}