import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Container, 
    Typography, 
    List, 
    ListItem, 
    ListItemText, 
    ListItemAvatar,
    Avatar,
    IconButton, 
    Paper, 
    Button,
    Box,
    Alert
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';

export default function TrabajadoresDelete() {
    const navigate = useNavigate();

    // 1. Datos Simulados (Mezcla de activos e inactivos)
    const [trabajadores, setTrabajadores] = useState([
        { IdPersonal: 10001, nameEmpleado: "Juan", apPatEmpleado: "Pérez", puestoEmp: "Jardinero Jefe", bajaEmp: null },
        { IdPersonal: 10002, nameEmpleado: "Maria", apPatEmpleado: "González", puestoEmp: "Vendedora", bajaEmp: "2024-02-15" }, // Ya está de baja
        { IdPersonal: 10003, nameEmpleado: "Carlos", apPatEmpleado: "Sánchez", puestoEmp: "Gerente", bajaEmp: null },
    ]);

    // 2. Filtramos solo los que ESTÁN ACTIVOS (bajaEmp === null)
    // No tiene sentido dar de baja a alguien que ya no trabaja ahí.
    const activos = trabajadores.filter(t => t.bajaEmp === null);

    const handleBaja = (id) => {
        const fechaHoy = new Date().toISOString().split('T')[0];

        if (window.confirm(`¿Estás seguro de procesar la BAJA de este empleado con fecha ${fechaHoy}?`)) {
            // Actualizamos la lista simulada
            const nuevosTrabajadores = trabajadores.map(emp => {
                if (emp.IdPersonal === id) {
                    return { ...emp, bajaEmp: fechaHoy }; // Le ponemos fecha de salida
                }
                return emp;
            });

            setTrabajadores(nuevosTrabajadores);
            alert("Baja procesada correctamente. El empleado pasará a estatus INACTIVO.");
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                
                {/* Encabezado */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/trabajadores')}>
                        Volver
                    </Button>
                    <Typography variant="h5" sx={{ flexGrow: 1, textAlign: 'center', color: '#d32f2f', fontWeight: 'bold' }}>
                        Baja de Personal
                    </Typography>
                </Box>

                <Alert severity="warning" sx={{ mb: 3 }}>
                    Estás viendo solo a los empleados <strong>ACTIVOS</strong>. Al dar de baja, se registrará la fecha de hoy como su salida.
                </Alert>

                {/* Lista de Empleados Activos */}
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {activos.map((emp) => (
                        <ListItem
                            key={emp.IdPersonal}
                            secondaryAction={
                                <Button 
                                    variant="outlined" 
                                    color="error" 
                                    startIcon={<PersonRemoveIcon />}
                                    onClick={() => handleBaja(emp.IdPersonal)}
                                >
                                    Procesar Baja
                                </Button>
                            }
                            sx={{ borderBottom: '1px solid #eee', py: 2 }}
                        >
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: '#303413' }}>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${emp.nameEmpleado} ${emp.apPatEmpleado}`}
                                secondary={
                                    <>
                                        <Typography component="span" variant="body2" color="text.primary">
                                            {emp.puestoEmp}
                                        </Typography>
                                        <br />
                                        {`ID: ${emp.IdPersonal}`}
                                    </>
                                }
                            />
                        </ListItem>
                    ))}

                    {activos.length === 0 && (
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                            <Typography variant="h6" color="text.secondary">
                                No hay empleados activos para dar de baja.
                            </Typography>
                        </Box>
                    )}
                </List>

            </Paper>
        </Container>
    );
}