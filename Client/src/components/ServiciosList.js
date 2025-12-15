import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Container, Typography, Box, Button, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, Paper, IconButton 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ServiciosList() {
    const navigate = useNavigate();
    const [servicios, setServicios] = useState([]);
    const API_URL = 'http://localhost:4000/api';

    useEffect(() => { cargarServicios(); }, []);

    const cargarServicios = async () => {
        try {
            const res = await fetch(`${API_URL}/servicios`);
            if (res.ok) setServicios(await res.json());
        } catch (error) { console.error(error); }
    };

    const handleDelete = async (id) => {
        if(!window.confirm("¿Eliminar este servicio?")) return;
        try {
            await fetch(`${API_URL}/servicios/${id}`, { method: 'DELETE' });
            setServicios(prev => prev.filter(s => s.id_servicio !== id));
        } catch (error) { console.error(error); }
    };

    // Función simple para formatear fecha (YYYY-MM-DD)
    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" color="primary" sx={{fontWeight:'bold'}}>Otros Servicios</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/servicios/new')} sx={{bgcolor:'#ef6c00'}}>
                    Nuevo Servicio
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ bgcolor: '#fff3e0' }}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Servicio</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Producto Utilizado</TableCell>
                            <TableCell>Costo</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {servicios.map((row) => (
                            <TableRow key={row.id_servicio}>
                                <TableCell>{row.id_servicio}</TableCell>
                                <TableCell sx={{fontWeight:'bold'}}>{row.name_servicio}</TableCell>
                                <TableCell>{formatDate(row.fecha_servicio)}</TableCell>
                                <TableCell>{row.desc_servicio}</TableCell>
                                <TableCell>{row.name_producto || "Ninguno"}</TableCell>
                                <TableCell>${row.costo_servicio}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => navigate(`/servicios/edit/${row.id_servicio}`)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(row.id_servicio)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}