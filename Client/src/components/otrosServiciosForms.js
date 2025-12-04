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
    InputAdornment,
    Box // <--- ¡AGREGA ESTO!
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeckIcon from '@mui/icons-material/Deck';

export default function OtrosServiciosForms() {
    const navigate = useNavigate();
    const { id } = useParams(); 

    // Estado con los nombres EXACTOS de tu tabla
    const [servicio, setServicio] = useState({
        IdServicio: '',
        NomServicio: '',
        DateServ: new Date().toISOString().split('T')[0], // Fecha de hoy por defecto
        DescServicio: '',
        CostServicio: '',
        IdProducto: ''  // Foreign Key
    });

    // Lista simulada de productos para usar en el servicio
    const listaProductos = [
        { id: 501, nombre: "Maceta de Barro #5" },
        { id: 502, nombre: "Fertilizante Triple 17" },
        { id: 503, nombre: "Tierra Negra Preparada" },
        { id: 504, nombre: "Piedra Decorativa" },
        {id: 505, nombre: "Rosa Blanca Premium"}
    ];

    // Cargar datos si es edición
    useEffect(() => {
        if (id) {
            setServicio({
                IdServicio: id,
                NomServicio: "Diseño de Jardín Zen",
                DateServ: "2023-11-20",
                DescServicio: "Instalación completa...",
                CostServicio: 3500,
                IdProducto: 504
            });
        }
    }, [id]);

    const handleChange = (e) => {
        setServicio({ ...servicio, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Servicio a guardar:", servicio);
        alert("Servicio registrado exitosamente");
        navigate('/otrosServicios');
    };

    return (
        <Container maxWidth="md" sx={{ mb: 4 }}>
            <Card sx={{ mt: 5, p: 3, borderTop: '6px solid #c2185b' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                        <DeckIcon sx={{ color: '#c2185b', fontSize: 40, mr: 1 }} />
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#880e4f' }}>
                            {id ? "Modificar Servicio" : "Nuevo Servicio de Paisajismo"}
                        </Typography>
                    </Box>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            
                            {/* Nombre del Servicio */}
                            <Grid item xs={12} sm={8}>
                                <TextField 
                                    label="Nombre del Servicio" 
                                    name="NomServicio" 
                                    fullWidth 
                                    required 
                                    variant="outlined"
                                    placeholder="Ej: Poda de altura, Diseño de jardín..."
                                    value={servicio.NomServicio}
                                    onChange={handleChange} 
                                />
                            </Grid>

                            {/* Descripción */}
                            <Grid item xs={12}>
                                <TextField 
                                    label="Descripción Detallada" 
                                    name="DescServicio" 
                                    multiline
                                    rows={4}
                                    fullWidth 
                                    required 
                                    variant="outlined"
                                    placeholder="Detalles del trabajo a realizar..."
                                    value={servicio.DescServicio}
                                    onChange={handleChange} 
                                />
                            </Grid>

                            {/* Fecha */}
                            <Grid item xs={12} sm={4}>
                                <TextField 
                                    label="Fecha Programada" 
                                    name="DateServ" 
                                    type="date"
                                    fullWidth 
                                    required 
                                    InputLabelProps={{ shrink: true }}
                                    value={servicio.DateServ}
                                    onChange={handleChange} 
                                />
                            </Grid>

                            {/* Costo */}
                            <Grid item xs={12} sm={4}>
                                <TextField 
                                    label="Costo ($)" 
                                    name="CostServicio" 
                                    type="number"
                                    fullWidth 
                                    required 
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    }}
                                    value={servicio.CostServicio}
                                    onChange={handleChange} 
                                />
                            </Grid>

                            {/* Selector de Producto (Material) */}
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    select
                                    label="Material Principal"
                                    name="IdProducto"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    value={servicio.IdProducto}
                                    onChange={handleChange}
                                    helperText="Selecciona el insumo principal"
                                >
                                    {listaProductos.map((prod) => (
                                        <MenuItem key={prod.id} value={prod.id}>
                                            {prod.nombre}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            {/* Botones */}
                            <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
                                <Button variant="outlined" color="secondary" startIcon={<ArrowBackIcon />} onClick={() => navigate('/otrosServicios')}>
                                    Cancelar
                                </Button>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    startIcon={<SaveIcon />}
                                    sx={{ backgroundColor: '#c2185b', '&:hover': { backgroundColor: '#880e4f' } }}
                                >
                                    Agendar
                                </Button>
                            </Grid>

                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}