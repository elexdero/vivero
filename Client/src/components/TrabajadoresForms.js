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
    MenuItem,
    Alert,
    CircularProgress
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function TrabajadoresForm() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Estado inicial alineado a tu Base de Datos
    const [worker, setWorker] = useState({
        nameEmpleado: '',
        apPatEmpleado: '',
        apMatEmpleado: '',
        DateNacimiento: '',
        dirEmpelado: '',
        telEmpleado: '',   // Nuevo campo
        emailEmpleado: '', // Nuevo campo
        puestoEmp: '',
        turnoEmp: '',
        sueldoEmp: '',
        altaEmp: new Date().toISOString().split('T')[0]
    });

    const handleChange = (e) => {
        setWorker({ ...worker, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // 1. Preparamos el objeto para enviarlo al backend
        // (Mapeamos los nombres del formulario a los que espera el backend)
        const datosAEnviar = {
            nameTrabajador: worker.nameEmpleado,
            apPatTrabajador: worker.apPatEmpleado,
            apMatTrabajador: worker.apMatEmpleado,
            fechaNacimiento: worker.DateNacimiento,
            direccionTrabajador: worker.dirEmpelado,
            telTrabajador: worker.telEmpleado,
            emailTrabajador: worker.emailEmpleado,
            puestoTrabajador: worker.puestoEmp,
            turnoTrabajador: worker.turnoEmp,
            sueldoTrabajador: worker.sueldoEmp,
            fechaAlta: worker.altaEmp
        };

        try {
            // 2. Hacemos la petición POST al servidor
            const response = await fetch('http://localhost:4000/api/registrarTrabajador', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosAEnviar)
            });

            if (response.ok) {
                alert("Trabajador registrado correctamente");
                navigate('/trabajadores'); 
            } else {
                const data = await response.json();
                setError(data.message || "Error al guardar trabajador");
            }
        } catch (err) {
            console.error(err);
            setError("Error de conexión con el servidor");
        } finally {
            setLoading(false);
        }
    };

    const turnos = ['Matutino', 'Vespertino', 'Mixto', 'Completo'];

    return (
        <Container maxWidth="md" sx={{ mb: 4 }}>
            <Card sx={{ mt: 5, padding: 2, borderTop: '5px solid #303413' }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#303413' }}>
                        Contratación de Personal
                    </Typography>
                    
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

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
                                <TextField label="Dirección Completa" name="dirEmpelado" fullWidth required variant="outlined" onChange={handleChange} />
                            </Grid>
                            
                            {/* Agregué Teléfono y Email para completar la BD */}
                            <Grid item xs={12} sm={6}>
                                <TextField label="Teléfono" name="telEmpleado" type="tel" fullWidth required variant="outlined" onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Correo Electrónico" name="emailEmpleado" type="email" fullWidth required variant="outlined" onChange={handleChange} />
                            </Grid>


                            {/* --- SECCIÓN 2: DATOS LABORALES --- */}
                            <Grid item xs={12} sm={6}>
                                <TextField label="Puesto / Cargo" name="puestoEmp" fullWidth required variant="outlined" onChange={handleChange} />
                            </Grid>
                            
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
                                <TextField label="Sueldo Mensual ($)" name="sueldoEmp" type="number" fullWidth required variant="outlined" onChange={handleChange} />
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
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    sx={{ backgroundColor: '#303413' }} 
                                    startIcon={loading ? <CircularProgress size={20} color="inherit"/> : <SaveIcon />}
                                    disabled={loading}
                                >
                                    {loading ? "Guardando..." : "Guardar Trabajador"}
                                </Button>
                            </Grid>

                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}