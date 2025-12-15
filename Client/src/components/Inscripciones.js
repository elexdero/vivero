import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Container, Typography, Box, Paper, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Button, IconButton, 
    MenuItem, Select, FormControl, InputLabel, Alert, Snackbar,
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function Inscripciones() {
    const { id_evento } = useParams();
    const navigate = useNavigate();

    // --- ESTADOS ---
    const [inscritos, setInscritos] = useState([]);
    const [clientesDisponibles, setClientesDisponibles] = useState([]);
    const [seleccionado, setSeleccionado] = useState('');
    const [mensaje, setMensaje] = useState({ open: false, text: '', type: 'success' });
    
    // Estados para el MODAL de Nuevo Cliente
    const [openModal, setOpenModal] = useState(false);
    const [nuevoCliente, setNuevoCliente] = useState({
        name_cliente: '', ap_pat_cliente: '', ap_mat_cliente: '',
        dir_cliente: '', tel_cliente: '', mail_cliente: ''
    });

    // Ajusta la URL si tu puerto es diferente
    const API_URL = 'http://localhost:4000/api';

    // --- CARGAR DATOS INICIALES ---
    useEffect(() => {
        cargarInscritos();
        cargarClientes();
    }, [id_evento]);

    const cargarInscritos = async () => {
        try {
            const res = await fetch(`${API_URL}/inscripciones/${id_evento}`);
            if (res.ok) setInscritos(await res.json());
        } catch (error) { console.error(error); }
    };

    const cargarClientes = async () => {
        try {
            // Nota: Asegúrate de que tu ruta en el backend sea /clientes
            const res = await fetch(`${API_URL}/clientes`);
            if (res.ok) setClientesDisponibles(await res.json());
        } catch (error) { console.error(error); }
    };

    // --- FUNCIÓN 1: INSCRIBIR CLIENTE EXISTENTE (Botón Inscribir) ---
    const handleInscribir = async () => {
        if (!seleccionado) return;
        try {
            const res = await fetch(`${API_URL}/inscripciones/new`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_evento: id_evento, id_cliente: seleccionado })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Error al inscribir (¿Ya está inscrito?)");
            }

            setMensaje({ open: true, text: 'Alumno inscrito correctamente', type: 'success' });
            setSeleccionado('');
            cargarInscritos(); // Actualiza la tabla
        } catch (error) {
            setMensaje({ open: true, text: error.message, type: 'error' });
        }
    };

    // --- FUNCIÓN 2 MEJORADA: CREAR CLIENTE + AUTO-INSCRIBIR ---
    const handleGuardarCliente = async () => {
        try {
            // PASO 1: Crear el cliente en la Base de Datos
            // Verifica que tu ruta en backend sea '/clientes' o '/clientes/new'
            const resCliente = await fetch(`${API_URL}/clientes`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoCliente)
            });

            if (!resCliente.ok) throw new Error("Error al registrar cliente");

            const clienteCreado = await resCliente.json();

            // PASO 2: Inscribirlo automáticamente al evento actual
            // Usamos el ID del cliente recién creado
            const resInscripcion = await fetch(`${API_URL}/inscripciones/new`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    id_evento: id_evento, 
                    id_cliente: clienteCreado.id_cliente 
                })
            });

            if (!resInscripcion.ok) throw new Error("Cliente creado, pero hubo error al inscribirlo.");

            // PASO 3: Limpieza y Actualización
            setOpenModal(false);
            setNuevoCliente({ name_cliente: '', ap_pat_cliente: '', ap_mat_cliente: '', dir_cliente: '', tel_cliente: '', mail_cliente: '' });

            // Recargamos todo para que se vea reflejado
            await cargarClientes();   // Actualiza el dropdown
            await cargarInscritos();  // Actualiza la tabla de inscritos

            setMensaje({ open: true, text: 'Cliente registrado e inscrito exitosamente', type: 'success' });

        } catch (error) {
            setMensaje({ open: true, text: error.message, type: 'error' });
        }
    };

    const handleDelete = async (id) => {
        if(!window.confirm("¿Eliminar inscripción?")) return;
        try {
            await fetch(`${API_URL}/inscripciones/delete/${id}`, { method: 'DELETE' });
            setInscritos(prev => prev.filter(i => i.id_inscripcion !== id));
        } catch (error) { console.error(error); }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <IconButton onClick={() => navigate('/eventos')} sx={{ mr: 2 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4">Inscripciones del Evento</Typography>
            </Box>

            {/* CAJA DE INSCRIPCIÓN */}
            <Paper sx={{ p: 3, mb: 4, bgcolor: '#f5f5f5', borderLeft: '6px solid #2e7d32' }}>
                <Typography variant="h6" gutterBottom sx={{color: '#2e7d32', fontWeight:'bold'}}>
                    Inscribir Alumno
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <FormControl fullWidth size="small" sx={{bgcolor:'white'}}>
                        <InputLabel>Buscar alumno por nombre...</InputLabel>
                        <Select
                            value={seleccionado}
                            label="Buscar alumno por nombre..."
                            onChange={(e) => setSeleccionado(e.target.value)}
                        >
                            {clientesDisponibles.map((c) => (
                                <MenuItem key={c.id_cliente} value={c.id_cliente}>
                                    {c.name_cliente} {c.ap_pat_cliente} {c.ap_mat_cliente}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button 
                        variant="contained" 
                        color="success"
                        startIcon={<PersonAddIcon />}
                        onClick={handleInscribir} 
                        disabled={!seleccionado}
                        sx={{height: 40}}
                    >
                        Inscribir
                    </Button>
                    
                    {/* BOTÓN PARA ABRIR EL MODAL */}
                    <Button 
                        variant="outlined" 
                        startIcon={<AddCircleOutlineIcon />} 
                        onClick={() => setOpenModal(true)}
                        sx={{ whiteSpace: 'nowrap', height: 40 }}
                    >
                        Nuevo Cliente
                    </Button>
                </Box>
            </Paper>

            {/* TABLA DE INSCRITOS */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ bgcolor: '#eeeeee' }}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre Completo</TableCell>
                            <TableCell>Fecha Inscripción</TableCell>
                            <TableCell align="right">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inscritos.length === 0 ? (
                            <TableRow><TableCell colSpan={4} align="center">No hay inscritos aún</TableCell></TableRow>
                        ) : (
                            inscritos.map((row) => (
                                <TableRow key={row.id_inscripcion}>
                                    <TableCell>{row.id_inscripcion}</TableCell>
                                    <TableCell>{row.name_cliente} {row.ap_pat_cliente} {row.ap_mat_cliente}</TableCell>
                                    <TableCell>{row.fecha_registro ? new Date(row.fecha_registro).toLocaleDateString() : 'Hoy'}</TableCell>
                                    <TableCell align="right">
                                        <IconButton color="error" onClick={() => handleDelete(row.id_inscripcion)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* --- MODAL (POPUP) PARA REGISTRAR NUEVO CLIENTE --- */}
            <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{bgcolor: '#2e7d32', color: 'white'}}>Registrar Nuevo Cliente</DialogTitle>
                <DialogContent sx={{mt: 2}}>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField label="Nombre(s)" fullWidth size="small" required
                                value={nuevoCliente.name_cliente}
                                onChange={(e) => setNuevoCliente({...nuevoCliente, name_cliente: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Apellido Paterno" fullWidth size="small" required
                                value={nuevoCliente.ap_pat_cliente}
                                onChange={(e) => setNuevoCliente({...nuevoCliente, ap_pat_cliente: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Apellido Materno" fullWidth size="small"
                                value={nuevoCliente.ap_mat_cliente}
                                onChange={(e) => setNuevoCliente({...nuevoCliente, ap_mat_cliente: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Dirección" fullWidth size="small"
                                value={nuevoCliente.dir_cliente}
                                onChange={(e) => setNuevoCliente({...nuevoCliente, dir_cliente: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Teléfono" fullWidth size="small"
                                value={nuevoCliente.tel_cliente}
                                onChange={(e) => setNuevoCliente({...nuevoCliente, tel_cliente: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Email" fullWidth size="small"
                                value={nuevoCliente.mail_cliente}
                                onChange={(e) => setNuevoCliente({...nuevoCliente, mail_cliente: e.target.value})}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{p: 3}}>
                    <Button onClick={() => setOpenModal(false)} color="error" variant="outlined">Cancelar</Button>
                    <Button onClick={handleGuardarCliente} variant="contained" color="success">Guardar e Inscribir</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={mensaje.open} autoHideDuration={4000} onClose={() => setMensaje({...mensaje, open: false})}>
                <Alert severity={mensaje.type} variant="filled">{mensaje.text}</Alert>
            </Snackbar>
        </Container>
    );
}