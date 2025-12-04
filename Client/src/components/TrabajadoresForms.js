import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Button, 
    TextField, 
    Grid, 
    Card, 
    CardContent, 
    Typography, 
    Container, 
    Divider,
    MenuItem 
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function TrabajadoresForm() {
    const navigate = useNavigate();

    // Estado inicial para todos los campos de tu Base de Datos
    const [worker, setWorker] = useState({
        IdPersonal: '',
        nameEmpleado: '',
        apPatEmpleado: '',
        apMatEmpleado: '',
        DateNacimiento: '',
        dirEmpelado: '',
        puestoEmp: '',
        turnoEmp: '',
        sueldoEmp: '',
        altaEmp: new Date().toISOString().split('T')[0] // Pone la fecha de hoy por defecto
    });

    // Manejador genérico para guardar lo que escribas en el estado
    const handleChange = (e) => {
        setWorker({ ...worker, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // AQUÍ CONECTARÁS TU BACKEND DESPUÉS
        console.log("Datos a enviar:", worker);
        alert("Trabajador guardado con éxito (Simulación)");
        navigate('/trabajadores'); // Regresa a la lista
    };

    const turnos = ['Matutino', 'Vespertino', 'Mixto', 'Completo'];

    return (
        <Container maxWidth="md" sx={{ mb: 4 }}>
            <Card sx={{ mt: 5, padding: 2, borderTop: '5px solid #303413' }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#303413' }}>
                        Contratación de Personal
                    </Typography>
                    
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            
                            {/* --- SECCIÓN 1: DATOS PERSONALES --- */}
                            <Grid item xs={12}>
                                <Divider textAlign="left" sx={{color: 'text.secondary'}}>DATOS PERSONALES</Divider>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField label="Nombre(s)" name="nameEmpleado" fullWidth required variant="outlined" onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField label="Apellido Paterno" name="apPatEmpleado" fullWidth required variant="outlined" onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField label="Apellido Materno" name="apMatEmpleado" fullWidth required variant="outlined" onChange={handleChange} />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    label="Fecha de Nacimiento" 
                                    name="DateNacimiento" 
                                    type="date" 
                                    fullWidth 
                                    required 
                                    InputLabelProps={{ shrink: true }} 
                                    onChange={handleChange} 
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Dirección Completa" name="dirEmpelado" fullWidth required variant="outlined" placeholder="Calle, Número, Colonia..." onChange={handleChange} />
                            </Grid>


                            {/* --- SECCIÓN 2: DATOS LABORALES --- */}
                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <Divider textAlign="left" sx={{color: 'text.secondary'}}>DATOS LABORALES</Divider>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField label="Puesto / Cargo" name="puestoEmp" fullWidth required variant="outlined" onChange={handleChange} />
                            </Grid>
                            
                            {/* Selector para el Turno */}
                            <Grid item xs={12} sm={4}>
                                <TextField 
                                    select 
                                    label="Turno" 
                                    name="turnoEmp" 
                                    fullWidth 
                                    required 
                                    defaultValue=""
                                    onChange={handleChange}
                                >
                                    {turnos.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    label="Sueldo Mensual ($)" 
                                    name="sueldoEmp" 
                                    type="number" 
                                    fullWidth 
                                    required 
                                    variant="outlined" 
                                    onChange={handleChange} 
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    label="Fecha de Alta" 
                                    name="altaEmp" 
                                    type="date" 
                                    fullWidth 
                                    required 
                                    defaultValue={worker.altaEmp}
                                    InputLabelProps={{ shrink: true }} 
                                    onChange={handleChange} 
                                />
                            </Grid>

                            {/* --- BOTONES DE ACCIÓN --- */}
                            <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                                <Button variant="outlined" color="secondary" startIcon={<ArrowBackIcon />} onClick={() => navigate('/trabajadores')}>
                                    Cancelar
                                </Button>
                                <Button type="submit" variant="contained" sx={{ backgroundColor: '#303413' }} startIcon={<SaveIcon />}>
                                    Guardar Trabajador
                                </Button>
                            </Grid>

                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}