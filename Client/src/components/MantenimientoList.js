import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Container, Typography, Box, Button, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Paper, IconButton, CircularProgress 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function MantenimientosList() {
    const navigate = useNavigate();
    const [mantenimientos, setMantenimientos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Ajusta si tu puerto es distinto
    const API_URL = 'http://localhost:4000/api';

    useEffect(() => {
        cargarMantenimientos();
    }, []);

    const cargarMantenimientos = async () => {
        try {
            const res = await fetch(`${API_URL}/mantenimientos`);
            if (res.ok) {
                const data = await res.json();
                setMantenimientos(data);
            } else {
                console.error("Error al cargar la lista de mantenimientos");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if(!window.confirm("¿Estás seguro de eliminar este registro de mantenimiento?")) return;

        try {
            const res = await fetch(`${API_URL}/mantenimientos/${id}`, { method: 'DELETE' });
            
            if (res.ok) {
                // Actualizamos la lista visualmente sin recargar
                setMantenimientos(prev => prev.filter(m => m.id_mantenimiento !== id));
            } else {
                alert("No se pudo eliminar el registro");
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            {/* --- ENCABEZADO --- */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                    Bitácora de Mantenimiento
                </Typography>
                <Button 
                    variant="contained" 
                    color="success"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/mantenimientos/new')}
                    sx={{ textTransform: 'none', fontSize: '1rem' }}
                >
                    Registrar Mantenimiento
                </Button>
            </Box>

            {/* --- TABLA --- */}
            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead sx={{ bgcolor: '#e3f2fd' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Planta / Ejemplar</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Encargado</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Frecuencia Riego</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Fertilización</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Observaciones</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mantenimientos.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    No hay mantenimientos registrados aún.
                                </TableCell>
                            </TableRow>
                        ) : (
                            mantenimientos.map((row) => (
                                <TableRow key={row.id_mantenimiento} hover>
                                    <TableCell>{row.id_mantenimiento}</TableCell>
                                    
                                    {/* PLANTA: Asegúrate que venga como name_planta del backend */}
                                    <TableCell sx={{ fontWeight: '500', color: '#2e7d32' }}>
                                        {row.name_planta}
                                    </TableCell>
                                    
                                    {/* TRABAJADOR: Aquí usamos snake_case según tu base de datos */}
                                    <TableCell>
                                        {row.name_trabajador} {row.ap_pat_trabajador}
                                    </TableCell>
                                    
                                    <TableCell>{row.freq_riego}</TableCell>
                                    <TableCell>{row.type_fertilizacion}</TableCell>
                                    <TableCell sx={{ maxWidth: 200 }}>
                                        <Typography variant="body2" noWrap title={row.obs_ejemplar}>
                                            {row.obs_ejemplar || "Ninguna"}
                                        </Typography>
                                    </TableCell>
                                    
                                    <TableCell align="center">
                                        <IconButton color="error" onClick={() => handleDelete(row.id_mantenimiento)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}