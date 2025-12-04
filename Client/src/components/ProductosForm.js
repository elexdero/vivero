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
    InputAdornment
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// --- IMPORTANTE: export default function ---
export default function ProductosForm() {
    const navigate = useNavigate();
    const { id } = useParams(); 

    // Estado inicial con los nombres EXACTOS de tu Tabla
    const [producto, setProducto] = useState({
        IdProducto: '',
        nameProducto: '',     // Nombre del Producto
        infoProducto: '',     // Descripción Producto
        stock: '',            // Existencias
        precioProducto: '',   // Precio
        IdProveedor: ''       // Identificador del Proveedor (Foreign Key)
    });

    // Lista simulada de proveedores para el Select
    const proveedoresList = [
        { id: 1, nombre: "Fertilizantes del Norte SA" },
        { id: 2, nombre: "Macetas y Cerámica López" },
        { id: 3, nombre: "Semillas Orgánicas BioVida" }
    ];

    // Simulación de "Cargar Datos" si estamos editando
    useEffect(() => {
        if (id) {
            setProducto({
                IdProducto: id,
                nameProducto: "Maceta Barro #5",
                infoProducto: "Maceta mediana artesanal",
                stock: 150,
                precioProducto: 85.50,
                IdProveedor: 2
            });
        }
    }, [id]);

    const handleChange = (e) => {
        setProducto({ ...producto, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos listos para enviar a BD:", producto);
        alert("Producto procesado con éxito");
        navigate('/productos');
    };

    return (
        <Container maxWidth="md" sx={{ mb: 4 }}>
            <Card sx={{ mt: 5, p: 2, borderTop: '6px solid #795548' }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#5d4037' }}>
                        {id ? "Modificar Producto" : "Registrar Nuevo Producto"}
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            

                            {/* CAMPO 2: nameProducto */}
                            <Grid item xs={12} sm={8}>
                                <TextField 
                                    label="Nombre del Producto" 
                                    name="nameProducto" 
                                    fullWidth 
                                    required 
                                    variant="outlined"
                                    placeholder="Ej: Maceta, Tierra, Pala..."
                                    value={producto.nameProducto}
                                    onChange={handleChange} 
                                />
                            </Grid>

                            {/* CAMPO 3: infoProducto (Descripción) */}
                            <Grid item xs={12}>
                                <TextField 
                                    label="Descripción del Producto" 
                                    name="infoProducto" 
                                    multiline
                                    rows={3}
                                    fullWidth 
                                    required 
                                    variant="outlined"
                                    placeholder="Detalles técnicos, tamaño, material..."
                                    value={producto.infoProducto}
                                    onChange={handleChange} 
                                />
                            </Grid>

                            {/* CAMPO 4: stock (Existencias) */}
                            <Grid item xs={12} sm={4}>
                                <TextField 
                                    label="Existencias (Stock)" 
                                    name="stock" 
                                    type="number"
                                    fullWidth 
                                    required 
                                    variant="outlined"
                                    value={producto.stock}
                                    onChange={handleChange} 
                                />
                            </Grid>

                            {/* CAMPO 5: precioProducto */}
                            <Grid item xs={12} sm={4}>
                                <TextField 
                                    label="Precio Unitario" 
                                    name="precioProducto" 
                                    type="number"
                                    fullWidth 
                                    required 
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    }}
                                    value={producto.precioProducto}
                                    onChange={handleChange} 
                                />
                            </Grid>

                            {/* CAMPO 6: IdProveedor (Selector) */}
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    select
                                    label="Proveedor"
                                    name="IdProveedor"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    value={producto.IdProveedor}
                                    onChange={handleChange}
                                    helperText="Selecciona de la lista"
                                >
                                    {proveedoresList.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.nombre}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            {/* Botones */}
                            <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                                <Button variant="outlined" color="secondary" startIcon={<ArrowBackIcon />} onClick={() => navigate('/productos')}>
                                    Cancelar
                                </Button>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    startIcon={<SaveIcon />}
                                    sx={{ backgroundColor: '#795548', '&:hover': { backgroundColor: '#5d4037' } }}
                                >
                                    Guardar
                                </Button>
                            </Grid>

                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}