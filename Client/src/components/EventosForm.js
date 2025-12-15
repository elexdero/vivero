import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, Grid, Card, CardContent, Typography, Container, Box, InputAdornment, CircularProgress } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClassIcon from '@mui/icons-material/Class';

export default function EventosForm() {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [loading, setLoading] = useState(false);

    // Estado inicial con TUS nombres de columna
    const [evento, setEvento] = useState({
        nombre_evento: '',
        des_evento: '',
        date_evento: '',
        cost_evento: '',
        cupo_maximo: ''
    });

    // Cargar datos si es edición
    useEffect(() => {
        if (id) {
            const cargarDatos = async () => {
                setLoading(true);
                try {
                    const res = await fetch(`http://localhost:4000/api/eventos/${id}`);
                    const data = await res.json();
                    
                    // Formato fecha para input date (YYYY-MM-DD)
                    const fechaFormat = data.date_evento ? data.date_evento.split('T')[0] : '';
                    
                    setEvento({
                        nombre_evento: data.nombre_evento,
                        des_evento: data.des_evento,
                        date_evento: fechaFormat,
                        cost_evento: data.cost_evento,
                        cupo_maximo: data.cupo_maximo
                    });
                } catch (error) {
                    console.error("Error cargando evento:", error);
                }
                setLoading(false);
            };
            cargarDatos();
        }
    }, [id]);

    const handleChange = (e) => {
        setEvento({ ...evento, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const url = id ? `http://localhost:4000/api/eventos/${id}` : 'http://localhost:4000/api/eventos/new';
            const method = id ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(evento)
            });

            if (res.ok) {
                navigate('/eventos');
            } else {
                alert("Error al guardar evento");
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <Container maxWidth="md" sx={{ mb: 4 }}>
            <Card sx={{ mt: 5, p: 3, borderTop: '6px solid #2e7d32' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                        <ClassIcon sx={{ color: '#2e7d32', fontSize: 40, mr: 1 }} />
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1b5e20' }}>
                            {id ? "Modificar Evento" : "Nuevo Evento"}
                        </Typography>
                    </Box>

                    {loading ? <CircularProgress sx={{display:'block', mx:'auto'}}/> : (
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={8}>
                                    <TextField 
                                        label="Nombre del Evento" 
                                        name="nombre_evento" 
                                        fullWidth required variant="outlined"
                                        value={evento.nombre_evento} 
                                        onChange={handleChange} 
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField 
                                        label="Descripción" 
                                        name="des_evento" 
                                        multiline rows={3} fullWidth required variant="outlined"
                                        value={evento.des_evento} 
                                        onChange={handleChange} 
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField 
                                        label="Fecha" 
                                        name="date_evento" 
                                        type="date" fullWidth required 
                                        InputLabelProps={{ shrink: true }}
                                        value={evento.date_evento} 
                                        onChange={handleChange} 
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField 
                                        label="Costo" 
                                        name="cost_evento" 
                                        type="number" fullWidth required
                                        InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                                        value={evento.cost_evento} 
                                        onChange={handleChange} 
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField 
                                        label="Cupo Máximo" 
                                        name="cupo_maximo" 
                                        type="number" fullWidth required
                                        value={evento.cupo_maximo} 
                                        onChange={handleChange} 
                                    />
                                </Grid>

                                <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
                                    <Button variant="outlined" color="secondary" startIcon={<ArrowBackIcon />} onClick={() => navigate('/eventos')}>
                                        Cancelar
                                    </Button>
                                    <Button type="submit" variant="contained" startIcon={<SaveIcon />} sx={{ backgroundColor: '#2e7d32' }}>
                                        Guardar
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
}