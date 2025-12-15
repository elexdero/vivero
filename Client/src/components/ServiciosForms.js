import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, TextField, Button, Paper, Grid, MenuItem, Alert } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

export default function ServicioForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    
    // Inicializamos con valores vacíos para evitar error de "uncontrolled input"
    const [formData, setFormData] = useState({
        name_servicio: '', 
        fecha_servicio: '', 
        desc_servicio: '', 
        costo_servicio: '', 
        id_producto: ''
    });
    
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState('');
    const API_URL = 'http://localhost:4000/api';

    // --- Calcular fecha mínima (Mañana) para VALIDACIÓN ---
    const getMinDate = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1); 
        
        const yyyy = tomorrow.getFullYear();
        const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const dd = String(tomorrow.getDate()).padStart(2, '0');
        
        return `${yyyy}-${mm}-${dd}`;
    };
    const minDate = getMinDate();

    useEffect(() => {
        cargarProductos();
        if (id) cargarServicio();
    }, [id]);

    const cargarProductos = async () => {
        try {
            const res = await fetch(`${API_URL}/productos`);
            if (res.ok) setProductos(await res.json());
        } catch (e) { console.error(e); }
    };

    const cargarServicio = async () => {
        try {
            const res = await fetch(`${API_URL}/servicios/${id}`);
            if (res.ok) {
                const data = await res.json();
                
                // --- CORRECCIÓN DE FECHA ---
                // Si viene fecha, la cortamos en la 'T'. Si no, cadena vacía.
                if (data.fecha_servicio) {
                    data.fecha_servicio = String(data.fecha_servicio).split('T')[0];
                }
                
                setFormData(data);
            } else {
                setError("No se pudo cargar el servicio para editar");
            }
        } catch (error) {
            console.error(error);
            setError("Error de conexión al cargar el servicio");
        }
    };

    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar errores previos

        // --- VALIDACIÓN DE FECHA ---
        // Solo validamos que sea futura si es un NUEVO registro (!id).
        // Si estamos EDITANDO (id existe), permitimos fechas pasadas (histórico).
        if (!id && formData.fecha_servicio < minDate) {
            setError("Para nuevos registros, la fecha debe ser a partir de mañana.");
            return;
        }

        try {
            const method = id ? 'PUT' : 'POST';
            const url = id ? `${API_URL}/servicios/${id}` : `${API_URL}/servicios`;
            
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                navigate('/servicios');
            } else {
                setError("Error al guardar el servicio");
            }
        } catch (err) { 
            setError(err.message); 
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{color:'#ef6c00', fontWeight:'bold'}}>
                    {id ? "Editar Servicio" : "Registrar Servicio"}
                </Typography>
                
                {error && <Alert severity="error" sx={{mb:2}}>{error}</Alert>}
                
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField 
                                label="Nombre del Servicio" 
                                fullWidth 
                                name="name_servicio" 
                                value={formData.name_servicio || ''} // Evita error si es null
                                onChange={handleChange} 
                                required 
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField 
                                type="date" 
                                label="Fecha" 
                                InputLabelProps={{ shrink: true }} 
                                fullWidth 
                                name="fecha_servicio" 
                                value={formData.fecha_servicio || ''} 
                                onChange={handleChange} 
                                required 
                                // Bloqueamos el calendario SOLO si es nuevo. Si es editar, dejamos libre.
                                inputProps={!id ? { min: minDate } : {}} 
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label="Descripción" 
                                fullWidth 
                                multiline 
                                rows={2} 
                                name="desc_servicio" 
                                value={formData.desc_servicio || ''} 
                                onChange={handleChange} 
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                type="number" 
                                label="Costo ($)" 
                                fullWidth 
                                name="costo_servicio" 
                                value={formData.costo_servicio || ''} 
                                onChange={handleChange} 
                                required 
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField 
                                select 
                                label="Producto Usado (Opcional)" 
                                fullWidth 
                                name="id_producto" 
                                value={formData.id_producto || ''} 
                                onChange={handleChange}
                            >
                                <MenuItem value=""><em>Ninguno</em></MenuItem>
                                {productos.map((p) => (
                                    <MenuItem key={p.id_producto} value={p.id_producto}>
                                        {p.name_producto} (Stock: {p.stock})
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <Button type="submit" variant="contained" fullWidth startIcon={<SaveIcon />} sx={{bgcolor:'#ef6c00'}}>
                                Guardar Servicio
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}