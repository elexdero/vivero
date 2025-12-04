import { useNavigate } from 'react-router-dom';
import { 
    Box, 
    Button, 
    Grid, 
    Card, 
    CardContent, 
    Typography, 
    Container, 
    Chip, 
    Divider 
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import WorkIcon from '@mui/icons-material/Work';

export default function TrabajadoresList() {
    const navigate = useNavigate();

    // 1. Datos Simulados (Mock Data) basados en tu esquema SQL
    const trabajadores = [
        {
            IdPersonal: 10001,
            nameEmpleado: "Juan",
            apPatEmpleado: "Pérez",
            apMatEmpleado: "López",
            DateNacimiento: "1990-05-15",
            dirEmpelado: "Av. Siempre Viva 123",
            puestoEmp: "Jardinero Jefe",
            turnoEmp: "Matutino",
            sueldoEmp: 12500,
            altaEmp: "2023-01-10",
            bajaEmp: null // null significa que sigue trabajando
        },
        {
            IdPersonal: 10002,
            nameEmpleado: "Maria",
            apPatEmpleado: "González",
            apMatEmpleado: "Rui",
            DateNacimiento: "1995-08-22",
            dirEmpelado: "Calle Reforma 45",
            puestoEmp: "Vendedora",
            turnoEmp: "Mixto",
            sueldoEmp: 9800,
            altaEmp: "2023-03-01",
            bajaEmp: "2024-02-15" // Tiene fecha, ya no trabaja ahí
        },
        {
            IdPersonal: 10003,
            nameEmpleado: "Carlos",
            apPatEmpleado: "Sánchez",
            apMatEmpleado: "Díaz",
            DateNacimiento: "1988-11-30",
            dirEmpelado: "Colonia Centro #4",
            puestoEmp: "Gerente",
            turnoEmp: "Completo",
            sueldoEmp: 18000,
            altaEmp: "2022-06-15",
            bajaEmp: null
        }
    ];

    return (
        <Container maxWidth="lg">
            {/* --- SECCIÓN DE BOTONES --- */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                marginTop: 4,
                marginBottom: 4
            }}>
                <Button 
                    variant="contained" 
                    startIcon={<PersonAddIcon />}
                    onClick={() => navigate('/trabajadores/new')} 
                    sx={{ backgroundColor: '#303413', '&:hover': { backgroundColor: '#23260e' } }}
                >
                    Contratar Trabajador
                </Button>
                
                <Button 
                    variant="contained" 
                    color="error"
                    startIcon={<PersonRemoveIcon />}
                    onClick={() => navigate('/trabajadores/delete')} 
                >
                    Dar de Baja
                </Button>
            </Box>

            {/* --- LISTA DE TRABAJADORES --- */}
            <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', color: '#303413' }}>
                Nómina de Personal
            </Typography>

            <Grid container spacing={3}>
                {trabajadores.map((emp) => (
                    <Grid item xs={12} md={6} lg={4} key={emp.IdPersonal}>
                        <Card sx={{ 
                            height: '100%', 
                            borderLeft: emp.bajaEmp ? '6px solid #d32f2f' : '6px solid #2e7d32', // Borde Rojo o Verde según estado
                            position: 'relative'
                        }}>
                            <CardContent>
                                {/* Encabezado: Nombre y Chip de Estado */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                        {emp.nameEmpleado} {emp.apPatEmpleado}
                                    </Typography>
                                    <Chip 
                                        label={emp.bajaEmp ? "INACTIVO" : "ACTIVO"} 
                                        color={emp.bajaEmp ? "error" : "success"} 
                                        size="small" 
                                    />
                                </Box>

                                <Typography color="text.secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <WorkIcon fontSize="small"/> {emp.puestoEmp}
                                </Typography>

                                <Divider sx={{ my: 1.5 }} />

                                {/* Detalles Administrativos */}
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Typography variant="caption" display="block" color="text.secondary">ID Personal</Typography>
                                        <Typography variant="body2">{emp.IdPersonal}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="caption" display="block" color="text.secondary">Turno</Typography>
                                        <Typography variant="body2">{emp.turnoEmp}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="caption" display="block" color="text.secondary">Fecha Alta</Typography>
                                        <Typography variant="body2">{emp.altaEmp}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="caption" display="block" color="text.secondary">Sueldo</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                                            ${emp.sueldoEmp}
                                        </Typography>
                                    </Grid>
                                    
                                    {/* Mostrar fecha de baja solo si existe */}
                                    {emp.bajaEmp && (
                                        <Grid item xs={12}>
                                            <Typography variant="caption" display="block" color="error">Fecha Baja</Typography>
                                            <Typography variant="body2" color="error">{emp.bajaEmp}</Typography>
                                        </Grid>
                                    )}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}