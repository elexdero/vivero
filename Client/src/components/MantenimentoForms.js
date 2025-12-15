import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Container, Typography, Box, TextField, Button, Paper, Grid, 
    MenuItem, Select, FormControl, InputLabel, Alert, CircularProgress 
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function MantenimientoForm() {
    const navigate = useNavigate();
    
    // Estado del formulario
    const [formData, setFormData] = useState({
        id_planta: '',
        id_personal: '',
        freq_riego: '',
        type_fertilizacion: '',
        obs_ejemplar: ''
    });

    // Estados para las listas desplegables
    const [plantas, setPlantas] = useState([]);
    const [trabajadores, setTrabajadores] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const API_URL = 'http://localhost:4000/api';

    // CARGAR LISTAS (Plantas y Trabajadores)
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                // Hacemos las dos peticiones en paralelo
                const [resPlantas, resTrabajadores] = await Promise.all([
                    fetch(`${API_URL}/plantas`),       // Asegúrate de tener esta ruta
                    fetch(`${API_URL}/trabajadores`)   // Esta ya la tienes
                ]);

                if (resPlantas.ok) setPlantas(await resPlantas.json());
                if (resTrabajadores.ok) setTrabajadores(await resTrabajadores.json());

            } catch (err) {
                console.error("Error cargando listas:", err);
                setError("No se pudieron cargar las listas de plantas o trabajadores.");
            } finally {
                setLoading(false);
            }
        };

        cargarDatos();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/mantenimientos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error("Error al registrar el mantenimiento");

            navigate('/mantenimientos'); // Volver a la tabla
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <Box sx={{p:5, textAlign:'center'}}><CircularProgress /></Box>;

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/mantenimientos')} sx={{ mb: 2 }}>
                Volver a la bitácora
            </Button>
            
            <Paper sx={{ p: 4 }} elevation={3}>
                <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Registrar Mantenimiento
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        
                        {/* SELECCIÓN DE PLANTA */}
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Planta / Ejemplar</InputLabel>
                                <Select
                                    name="id_planta"
                                    value={formData.id_planta}
                                    label="Planta / Ejemplar"
                                    onChange={handleChange}
                                >
                                    {plantas.map((p) => (
                                        // Ajusta 'id_planta' y 'name_planta' según tu DB exacta
                                        <MenuItem key={p.id_planta} value={p.id_planta}>
                                            {p.name_planta} (ID: {p.id_planta})
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* SELECCIÓN DE TRABAJADOR */}
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Encargado del Mantenimiento</InputLabel>
                                <Select
                                    name="id_personal"
                                    value={formData.id_personal}
                                    label="Encargado del Mantenimiento"
                                    onChange={handleChange}
                                >
                                    {trabajadores.map((t) => (
                                        // AQUI ES EL CAMBIO CLAVE:
                                        // Usamos t.id_trabajador, t.name_trabajador, etc.
                                        <MenuItem key={t.id_trabajador} value={t.id_trabajador}>
                                            {t.name_trabajador} {t.ap_pat_trabajador}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField 
                                label="Frecuencia de Riego" 
                                placeholder="Ej: Diario, Cada 3 días"
                                fullWidth 
                                name="freq_riego" 
                                value={formData.freq_riego} 
                                onChange={handleChange} 
                                required 
                            />
                        </Grid>
                        
                        <Grid item xs={6}>
                            <TextField 
                                label="Tipo de Fertilización" 
                                placeholder="Ej: Orgánica, Química"
                                fullWidth 
                                name="type_fertilizacion" 
                                value={formData.type_fertilizacion} 
                                onChange={handleChange} 
                                required 
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                label="Observaciones / Estado de Salud" 
                                placeholder="Describe el estado de la planta..."
                                fullWidth 
                                multiline
                                rows={3}
                                name="obs_ejemplar" 
                                value={formData.obs_ejemplar} 
                                onChange={handleChange} 
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                fullWidth 
                                size="large"
                                startIcon={<SaveIcon />}
                                sx={{ bgcolor: '#0277bd' }}
                            >
                                Guardar Mantenimiento
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}