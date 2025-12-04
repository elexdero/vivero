import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Box, 
    Button, 
    Grid, 
    Card, 
    CardContent, 
    CardActions,
    Typography, 
    Container, 
    Chip,
    IconButton,
    Tooltip
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Inventory2Icon from '@mui/icons-material/Inventory2'; // Icono de caja/producto
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export default function ProductosList() {
    const navigate = useNavigate();

    // 1. Datos Simulados (Mock Data)
    const [productos, setProductos] = useState([
        {
            IdProducto: 501,
            nameProducto: "Maceta de Barro #5",
            infoProducto: "Maceta artesanal mediana, ideal para interiores.",
            stock: 150,
            precioProducto: 85.00,
            nombreProveedor: "Macetas y Cerámica López" // Simulamos el JOIN con proveedores
        },
        {
            IdProducto: 502,
            nameProducto: "Fertilizante Triple 17",
            infoProducto: "Bolsa de 1kg. Nutrición balanceada.",
            stock: 40,
            precioProducto: 120.50,
            nombreProveedor: "Fertilizantes del Norte SA"
        },
        {
            IdProducto: 503,
            nameProducto: "Tierra Negra Preparada",
            infoProducto: "Costal de 5kg con hoja y abono.",
            stock: 0, // Stock en cero para probar el color rojo
            precioProducto: 45.00,
            nombreProveedor: "Semillas Orgánicas BioVida"
        }
    ]);

    // 2. Función Eliminar
    const handleDelete = (id) => {
        if(window.confirm("¿Estás seguro de eliminar este producto del inventario?")) {
            const nuevaLista = productos.filter(p => p.IdProducto !== id);
            setProductos(nuevaLista);
        }
    };

    // 3. Función Modificar (Navegación simulada)
    const handleEdit = (id) => {
        // Aquí navegarías a la ruta de edición pasando el ID
        navigate(`/productos/edit/${id}`);
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
                <Typography variant="h4" sx={{ color: '#5d4037', fontWeight: 'bold' }}>
                    Inventario de Productos
                </Typography>

                <Button 
                    variant="contained" 
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => navigate('/productos/new')} 
                    sx={{ backgroundColor: '#795548', '&:hover': { backgroundColor: '#5d4037' } }}
                >
                    Registrar Producto
                </Button>
            </Box>

            {/* --- GRID DE PRODUCTOS --- */}
            <Grid container spacing={3}>
                {productos.map((prod) => (
                    <Grid item xs={12} sm={6} md={4} key={prod.IdProducto}>
                        <Card sx={{ 
                            height: '100%', 
                            display: 'flex', 
                            flexDirection: 'column',
                            borderTop: prod.stock > 0 ? '5px solid #8d6e63' : '5px solid #d32f2f', // Borde rojo si no hay stock
                            boxShadow: 3
                        }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                {/* Título e Icono */}
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Inventory2Icon sx={{ color: '#795548', mr: 1 }} />
                                    <Typography variant="h6" component="div">
                                        {prod.nameProducto}
                                    </Typography>
                                </Box>

                                {/* Precio y Stock */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Chip 
                                        icon={<LocalOfferIcon />} 
                                        label={`$${prod.precioProducto}`} 
                                        color="success" 
                                        variant="outlined" 
                                    />
                                    <Typography 
                                        variant="body2" 
                                        sx={{ 
                                            fontWeight: 'bold', 
                                            color: prod.stock > 10 ? 'green' : 'red' 
                                        }}
                                    >
                                        Stock: {prod.stock} pzas.
                                    </Typography>
                                </Box>
                                
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
                                    {prod.infoProducto}
                                </Typography>

                                <Typography variant="caption" display="block" color="text.secondary">
                                    Proveedor: {prod.nombreProveedor}
                                </Typography>
                            </CardContent>

                            {/* --- BOTONES DE ACCIÓN (Modificar / Eliminar) --- */}
                            <CardActions sx={{ justifyContent: 'flex-end', bgcolor: '#f5f5f5' }}>
                                <Tooltip title="Modificar">
                                    <IconButton color="primary" onClick={() => handleEdit(prod.IdProducto)}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Eliminar">
                                    <IconButton color="error" onClick={() => handleDelete(prod.IdProducto)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}