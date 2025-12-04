import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    Box, 
    Button, 
    Card, 
    CardContent, 
    Typography, 
    Container, 
    TextField, 
    MenuItem, 
    List, 
    ListItem, 
    ListItemText, 
    ListItemAvatar, 
    Avatar, 
    IconButton, 
    Divider,
    Alert
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';

export default function Inscripciones() {
    const navigate = useNavigate();
    const { id } = useParams(); // Recibimos el ID del Evento desde la URL

    // 1. Simulación: Datos del Evento Actual (En realidad harías un fetch con el ID)
    const eventoActual = {
        id: id,
        nombre: "Taller de Terrarios Eternos",
        cupoMaximo: 12,
        costo: 650
    };

    // 2. Simulación: Todos tus clientes disponibles (para el menú desplegable)
    const todosLosClientes = [
        { id: 101, nombre: "Ana García", email: "ana@mail.com" },
        { id: 102, nombre: "Carlos López", email: "carlos@mail.com" },
        { id: 103, nombre: "María Rodríguez", email: "maria@mail.com" },
        { id: 104, nombre: "Pedro Martínez", email: "pedro@mail.com" },
        { id: 105, nombre: "Lucía Fernández", email: "lucia@mail.com" }
    ];

    // 3. ESTADO: Lista de alumnos YA inscritos en este evento
    const [inscritos, setInscritos] = useState([
        { id: 101, nombre: "Ana García", email: "ana@mail.com", fechaInscripcion: "2024-02-28" }
    ]);

    // Estado para el selector del alumno nuevo
    const [alumnoSeleccionado, setAlumnoSeleccionado] = useState('');

    // --- FUNCIONES ---

    const handleInscribir = () => {
        // Validaciones básicas
        if (!alumnoSeleccionado) return;
        
        // Verificar si ya está inscrito
        const yaExiste = inscritos.find(alum => alum.id === alumnoSeleccionado);
        if (yaExiste) {
            alert("Este alumno ya está inscrito en el curso.");
            return;
        }

        // Verificar cupo (Opcional)
        if (inscritos.length >= eventoActual.cupoMaximo) {
            alert("¡Cupo lleno! No se pueden inscribir más alumnos.");
            return;
        }

        // Buscar los datos completos del cliente seleccionado
        const datosCliente = todosLosClientes.find(c => c.id === alumnoSeleccionado);

        // Agregarlo a la lista de inscritos
        const nuevaInscripcion = {
            ...datosCliente,
            fechaInscripcion: new Date().toISOString().split('T')[0] // Fecha de hoy
        };

        setInscritos([...inscritos, nuevaInscripcion]);
        setAlumnoSeleccionado(''); // Limpiar el selector
    };

    const handleEliminar = (idAlumno) => {
        if (window.confirm("¿Deseas dar de baja a este alumno del curso?")) {
            setInscritos(inscritos.filter(alum => alum.id !== idAlumno));
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/eventos')} sx={{ mb: 2 }}>
                Volver a Eventos
            </Button>

            <Card sx={{ borderTop: '6px solid #1976d2' }}>
                <CardContent>
                    
                    {/* ENCABEZADO DEL EVENTO */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <SchoolIcon sx={{ color: '#1976d2', fontSize: 40, mr: 2 }} />
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                Inscripciones: {eventoActual.nombre}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Cupo: {inscritos.length} / {eventoActual.cupoMaximo} alumnos
                            </Typography>
                        </Box>
                    </Box>
                    
                    <Divider sx={{ mb: 3 }} />

                    {/* SECCIÓN 1: AGREGAR ALUMNO */}
                    <Typography variant="h6" gutterBottom sx={{ color: '#1565c0' }}>
                        Inscribir Nuevo Alumno
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'flex-start' }}>
                        <TextField
                            select
                            label="Seleccionar Cliente"
                            fullWidth
                            value={alumnoSeleccionado}
                            onChange={(e) => setAlumnoSeleccionado(e.target.value)}
                            size="small"
                        >
                            {todosLosClientes.map((cliente) => (
                                <MenuItem key={cliente.id} value={cliente.id}>
                                    {cliente.nombre}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button 
                            variant="contained" 
                            startIcon={<PersonAddIcon />} 
                            onClick={handleInscribir}
                            disabled={!alumnoSeleccionado}
                        >
                            Inscribir
                        </Button>
                    </Box>

                    {/* SECCIÓN 2: LISTA DE ASISTENCIA */}
                    <Typography variant="h6" gutterBottom>
                        Lista de Asistencia ({inscritos.length})
                    </Typography>

                    {inscritos.length === 0 ? (
                        <Alert severity="info">Aún no hay alumnos inscritos en este curso.</Alert>
                    ) : (
                        <List sx={{ bgcolor: '#f5f5f5', borderRadius: 2 }}>
                            {inscritos.map((alumno) => (
                                <div key={alumno.id}>
                                    <ListItem
                                        secondaryAction={
                                            <IconButton edge="end" color="error" onClick={() => handleEliminar(alumno.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: '#1976d2' }}>
                                                <PersonIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={alumno.nombre}
                                            secondary={`Inscrito el: ${alumno.fechaInscripcion} | Email: ${alumno.email}`}
                                        />
                                    </ListItem>
                                    <Divider component="li" />
                                </div>
                            ))}
                        </List>
                    )}

                </CardContent>
            </Card>
        </Container>
    );
}