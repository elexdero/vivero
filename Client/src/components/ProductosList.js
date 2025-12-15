import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Container, Typography, Box, Button, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Paper, IconButton, Chip,
    TextField, InputAdornment // --- NUEVO: Importar componentes de input
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search'; // --- NUEVO: Importar icono lupa

export default function ProductosList() {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    
    // --- NUEVO: Estado para el texto de búsqueda
    const [busqueda, setBusqueda] = useState(""); 

    const API_URL = 'http://localhost:4000/api';

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            const res = await fetch(`${API_URL}/productos`);
            if (res.ok) setProductos(await res.json());
        } catch (error) { console.error(error); }
    };

    const handleDelete = async (id) => {
        if(!window.confirm("¿Eliminar producto del inventario?")) return;
        try {
            await fetch(`${API_URL}/productos/${id}`, { method: 'DELETE' });
            setProductos(prev => prev.filter(p => p.id_producto !== id));
        } catch (error) { console.error(error); }
    };

    // --- NUEVO: Lógica de filtrado
    // Filtramos la lista original 'productos' basándonos en el texto 'busqueda'
    const productosFiltrados = productos.filter(producto => 
        producto.name_producto.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            {/* Encabezado con Título, Buscador y Botón */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" color="primary" sx={{fontWeight:'bold'}}>
                    Inventario
                </Typography>

                {/* --- NUEVO: Caja de Búsqueda --- */}
                <TextField
                    label="Buscar por nombre..."
                    variant="outlined"
                    size="small"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ width: '40%', bgcolor: 'white' }}
                />

                <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/productos/new')}>
                    Nuevo Producto
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ bgcolor: '#e8f5e9' }}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Producto</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Proveedor</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* --- NUEVO: Usamos 'productosFiltrados' en lugar de 'productos' */}
                        {productosFiltrados.map((row) => (
                            <TableRow key={row.id_producto}>
                                <TableCell>{row.id_producto}</TableCell>
                                <TableCell sx={{fontWeight:'bold'}}>{row.name_producto}</TableCell>
                                <TableCell>{row.info_producto}</TableCell>
                                <TableCell>{row.name_proveedor || "N/A"}</TableCell>
                                <TableCell>
                                    <Chip label={row.stock} color={row.stock < 10 ? "error" : "success"} size="small" />
                                </TableCell>
                                <TableCell>${row.precio_producto}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => navigate(`/productos/edit/${row.id_producto}`)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(row.id_producto)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {/* Mensaje si no hay resultados */}
                        {productosFiltrados.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    No se encontraron productos con ese nombre.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}