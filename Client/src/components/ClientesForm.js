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
    Box
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function ClientesForm() {
    const navigate = useNavigate();
    const { id } = useParams(); 

    // Estado inicial con los nombres EXACTOS de tu Tabla Clientes
    const [cliente, setCliente] = useState({
        IdCliente: '',
        nameCliente: '',
        apPatCliente: '',
        apMatCliente: '',
        dirCliente: '',
        telCliente: '',
        mailCliente: ''
    });

    // Cargar datos si estamos editando (Simulación)
    useEffect(() => {
        if (id) {
            setCliente({
                IdCliente: id,
                nameCliente: "Juan",
                apPatCliente: "Pérez",
                apMatCliente: "López",
                dirCliente: "Av. Reforma #123",
                telCliente: "55 1234 5678",
                mailCliente: "juan.perez@mail.com"
            });
        }
    }, [id]);

    const handleChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos de Cliente a guardar:", cliente);
        alert("Cliente guardado exitosamente");
        navigate('/clientes');
    };

    return (
        <Container maxWidth="md" sx={{ mb: 4 }}>
            <Card sx={{ mt: 5, p: 3, borderTop: '6px solid #0277bd' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                        <PersonAddIcon sx={{ color: '#0277bd', fontSize: 40, mr: 1 }} />
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#01579b' }}>
                            {id ? "Actualizar Cliente" : "Registrar Nuevo Cliente"}
                        </Typography>
                    </Box>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>

                            {/* Nombre */}
                            <Grid item xs={12} sm={8}>
                                <TextField 
                                    label="Nombre(s)" 
                                    name="nameCliente" 
                                    fullWidth 
                                    required 
                                    variant="outlined"
                                    placeholder="Ej: Ana María"
                                    value={cliente.nameCliente}
                                    onChange={handleChange} 
                                />
                            </Grid>

                            {/* Apellidos */}
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    label="Apellido Paterno" 
                                    name="apPatCliente" 
                                    fullWidth 
                                    required 
                                    variant="outlined"
                                    value={cliente.apPatCliente}
                                    onChange={handleChange} 
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    label="Apellido Materno" 
                                    name="apMatCliente" 
                                    fullWidth 
                                    required 
                                    variant="outlined"
                                    value={cliente.apMatCliente}
                                    onChange={handleChange} 
                                />
                            </Grid>

                            {/* Contacto */}
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    label="Teléfono" 
                                    name="telCliente" 
                                    type="tel"
                                    fullWidth 
                                    required 
                                    variant="outlined"
                                    placeholder="Ej: 55 1122 3344"
                                    value={cliente.telCliente}
                                    onChange={handleChange} 
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    label="Correo Electrónico" 
                                    name="mailCliente" 
                                    type="email"
                                    fullWidth 
                                    required 
                                    variant="outlined"
                                    placeholder="ejemplo@correo.com"
                                    value={cliente.mailCliente}
                                    onChange={handleChange} 
                                />
                            </Grid>

                            {/* Dirección */}
                            <Grid item xs={12}>
                                <TextField 
                                    label="Dirección Completa" 
                                    name="dirCliente" 
                                    multiline
                                    rows={2}
                                    fullWidth 
                                    required 
                                    variant="outlined"
                                    placeholder="Calle, Número, Colonia, Ciudad..."
                                    value={cliente.dirCliente}
                                    onChange={handleChange} 
                                />
                            </Grid>

                            {/* Botones */}
                            <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
                                <Button variant="outlined" color="secondary" startIcon={<ArrowBackIcon />} onClick={() => navigate('/clientes')}>
                                    Cancelar
                                </Button>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    startIcon={<SaveIcon />}
                                    sx={{ backgroundColor: '#0277bd', '&:hover': { backgroundColor: '#01579b' } }}
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