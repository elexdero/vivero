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
    Box
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClassIcon from '@mui/icons-material/Class';

export default function EventosForm() {
    const navigate = useNavigate();
    const { id } = useParams(); 

    // Estado con los nombres EXACTOS de tu tabla 'Tabla evento'
    const [evento, setEvento] = useState({
        IdEvento: '',
        NomCurse: '',      // Nombre del evento
        DesEvento: '',     // Descripción
        DateEvento: '',    // Fecha
        CostEvento: '',    // Costo
        MaxPersonas: '',   // Cupo
        IdCliente: ''      // Cliente inscrito/asignado
    });

    // Lista simulada de Clientes (Mock)
    const listaClientes = [
        { id: 101, nombre: "Ana García", email: "ana@mail.com" },
        { id: 102, nombre: "Carlos López", email: "carlos@mail.com" },
        { id: 103, nombre: "María Rodríguez", email: "maria@mail.com" },
        { id: 104, nombre: "Pedro Martínez", email: "pedro@mail.com" }
    ];

    // Cargar datos si es edición
    useEffect(() => {
        if (id) {
            setEvento({
                IdEvento: id,
                NomCurse: "Taller de Poda",
                DesEvento: "Taller práctico...",
                DateEvento: "2024-03-15",
                CostEvento: 350,
                MaxPersonas: 15,
                IdCliente: 101
            });
        }
    }, [id]);

    const handleChange = (e) => {
        setEvento({ ...evento, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Evento a guardar:", evento);
        alert("Evento registrado exitosamente");
        navigate('/eventos');
    };

    return (
        <Container maxWidth="md" sx={{ mb: 4 }}>
            <Card sx={{ mt: 5, p: 3, borderTop: '6px solid #2e7d32' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                        <ClassIcon sx={{ color: '#2e7d32', fontSize: 40, mr: 1 }} />
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1b5e20' }}>
                            {id ? "Modificar Evento" : "Nuevo Curso / Evento"}
                        </Typography>
                    </Box>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>

                            {/* Nombre del Curso (NomCurse) */}
                            <Grid item xs={12} sm={8}>
                                <TextField 
                                    label="Nombre del Curso/Evento" 
                                    name="NomCurse" 
                                    fullWidth 
                                    required 
                                    variant="outlined"
                                    placeholder="Ej: Taller de Huertos"
                                    value={evento.NomCurse}
                                    onChange={handleChange} 
                                />
                            </Grid>

                            {/* Descripción */}
                            <Grid item xs={12}>
                                <TextField 
                                    label="Descripción del Evento" 
                                    name="DesEvento" 
                                    multiline
                                    rows={3}
                                    fullWidth 
                                    required 
                                    variant="outlined"
                                    placeholder="Temario, materiales incluidos, etc."
                                    value={evento.DesEvento}
                                    onChange={handleChange} 
                                />
                            </Grid>

                            {/* Fecha */}
                            <Grid item xs={12} sm={4}>
                                <TextField 
                                    label="Fecha del Evento" 
                                    name="DateEvento" 
                                    type="date"
                                    fullWidth 
                                    required 
                                    InputLabelProps={{ shrink: true }}
                                    value={evento.DateEvento}
                                    onChange={handleChange} 
                                />
                            </Grid>

                            {/* Costo */}
                            <Grid item xs={12} sm={4}>
                                <TextField 
                                    label="Costo por Persona" 
                                    name="CostEvento" 
                                    type="number"
                                    fullWidth 
                                    required 
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    }}
                                    value={evento.CostEvento}
                                    onChange={handleChange} 
                                />
                            </Grid>

                            {/* Cupo Máximo */}
                            <Grid item xs={12} sm={4}>
                                <TextField 
                                    label="Cupo Máximo" 
                                    name="MaxPersonas" 
                                    type="number"
                                    fullWidth 
                                    required 
                                    variant="outlined"
                                    value={evento.MaxPersonas}
                                    onChange={handleChange} 
                                />
                            </Grid>

                            {/* Selector de CLIENTE (IdCliente) */}
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    label="Cliente Inscrito / Organizador"
                                    name="IdCliente"
                                    fullWidth
                                    required
                                    variant="outlined"
                                    value={evento.IdCliente}
                                    onChange={handleChange}
                                    helperText="Selecciona el cliente asociado a este evento"
                                >
                                    {listaClientes.map((cliente) => (
                                        <MenuItem key={cliente.id} value={cliente.id}>
                                            {cliente.nombre} ({cliente.email})
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            {/* Botones */}
                            <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
                                <Button variant="outlined" color="secondary" startIcon={<ArrowBackIcon />} onClick={() => navigate('/eventos')}>
                                    Cancelar
                                </Button>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    startIcon={<SaveIcon />}
                                    sx={{ backgroundColor: '#2e7d32', '&:hover': { backgroundColor: '#1b5e20' } }}
                                >
                                    Guardar Evento
                                </Button>
                            </Grid>

                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}