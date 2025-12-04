import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Button, 
    TextField, 
    Grid, 
    Card, 
    CardContent, 
    Typography, 
    Container, 
    MenuItem,
    Box,
    CircularProgress,
    Alert
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist'; 
import EngineeringIcon from '@mui/icons-material/Engineering'; 

export default function MantenimientoForms() {
    const navigate = useNavigate();

    // 1. Estado del formulario (Coincide con tu tabla de BD)
    const [mantenimiento, setMantenimiento] = useState({
        IDPlanta: '',
        IdPersonal: '',
        freqRiego: '',
        typeFertilizacion: '',
        obsEjemplar: ''
    });

    // 2. ESTADOS PARA LOS CATÁLOGOS REALES (Vacíos al inicio)
    const [listaPlantas, setListaPlantas] = useState([]);
    const [listaTrabajadores, setListaTrabajadores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 3. CARGAR DATOS DEL BACKEND AL INICIAR
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                // Hacemos las dos peticiones al mismo tiempo
                const [resPlantas, resTrabajadores] = await Promise.all([
                    fetch('http://localhost:4000/api/plantas'),
                    fetch('http://localhost:4000/api/trabajadores') // Asegúrate de tener esta ruta creada
                ]);

                if (!resPlantas.ok || !resTrabajadores.ok) {
                    throw new Error("Error al cargar listas del servidor");
                }

                const dataPlantas = await resPlantas.json();
                const dataTrabajadores = await resTrabajadores.json();

                // Guardamos los datos reales
                setListaPlantas(dataPlantas);
                setListaTrabajadores(dataTrabajadores);
                setLoading(false);

            } catch (err) {
                console.error(err);
                setError("No se pudo conectar con la base de datos.");
                setLoading(false);
            }
        };

        cargarDatos();
    }, []);

    const handleChange = (e) => {
        setMantenimiento({ ...mantenimiento, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Enviamos los datos reales al backend
            const response = await fetch('http://localhost:4000/api/mantenimientos/new', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mantenimiento)
            });

            if (response.ok) {
                alert("Mantenimiento registrado con éxito");
                navigate('/mantenimientos'); // Regresar a la lista
            } else {
                alert("Error al guardar mantenimiento");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión");
        }
    };

    if (loading) return <Container sx={{ mt: 5, textAlign: 'center' }}><CircularProgress /></Container>;

    return (
        <Container maxWidth="md" sx={{ mb: 4 }}>
            <Card sx={{ mt: 5, padding: 2, borderLeft: '6px solid #ff9800' }}> 
                <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#e65100' }}>
                        Registro de Mantenimiento
                    </Typography>
                    
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>

                            {/* Selector de PLANTA */}
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <LocalFloristIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField
                                        select
                                        label="Seleccionar Planta"
                                        name="IDPlanta"
                                        fullWidth
                                        required
                                        variant="standard"
                                        value={mantenimiento.IDPlanta}
                                        onChange={handleChange}
                                    >
                                        {listaPlantas.map((planta) => (
                                            // Usamos los nombres reales de tu BD (minúsculas)
                                            <MenuItem key={planta.idplanta} value={planta.idplanta}>
                                                {planta.nameplanta} ({planta.typeplanta})
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                            </Grid>

                            {/* Selector de TRABAJADOR */}
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <EngineeringIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField
                                        select
                                        label="Encargado"
                                        name="IdPersonal"
                                        fullWidth
                                        required
                                        variant="standard"
                                        value={mantenimiento.IdPersonal}
                                        onChange={handleChange}
                                    >
                                        {listaTrabajadores.map((trab) => (
                                            // Ajusta nombres según tu tabla 'trabajadores'
                                            <MenuItem key={trab.idpersonal} value={trab.idpersonal}>
                                                {trab.nameempleado} - {trab.puestoemp}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                            </Grid>

                            {/* ... Resto de campos (Riego, Fertilización, Observaciones) ... */}
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    label="Frecuencia de Riego" 
                                    name="freqRiego" 
                                    fullWidth required variant="outlined" 
                                    onChange={handleChange} 
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    label="Tipo de Fertilización" 
                                    name="typeFertilizacion" 
                                    fullWidth required variant="outlined" 
                                    onChange={handleChange} 
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Observaciones"
                                    name="obsEjemplar"
                                    multiline rows={4} fullWidth required variant="outlined"
                                    onChange={handleChange}
                                />
                            </Grid>

                            {/* Botón Guardar */}
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    size="large"
                                    startIcon={<SaveIcon />}
                                    sx={{ backgroundColor: '#e65100', '&:hover': { backgroundColor: '#ef6c00' } }}
                                >
                                    Guardar Registro
                                </Button>
                            </Grid>

                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}