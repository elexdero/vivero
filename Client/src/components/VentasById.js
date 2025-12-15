import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Container, Card, CardContent, Typography, Box, 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
    CircularProgress, Button, Divider, Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export default function VentasById() {
    const { id } = useParams(); // Recuperamos el ID de la URL
    const navigate = useNavigate();
    
    const [detalles, setDetalles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarDetalle = async () => {
            try {
                const res = await fetch(`http://localhost:4000/api/ventas/${id}`);
                if (!res.ok) throw new Error("No se pudo cargar la venta");
                const data = await res.json();
                setDetalles(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        cargarDetalle();
    }, [id]);

    if (loading) return <Container sx={{ mt: 5, textAlign: 'center' }}><CircularProgress color="success" /></Container>;
    if (error || detalles.length === 0) return <Container sx={{ mt: 5 }}><Typography color="error">Venta no encontrada.</Typography></Container>;

    // Tomamos los datos generales de la primera fila (ya que se repiten en todas)
    const cabecera = detalles[0];
    const fecha = new Date(cabecera.fecha_venta).toLocaleString();

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            {/* Botón Volver */}
            <Button 
                startIcon={<ArrowBackIcon />} 
                onClick={() => navigate('/ventas')}
                sx={{ mb: 2, color: '#2e7d32' }}
            >
                Volver al listado
            </Button>

            <Card sx={{ borderTop: '6px solid #2e7d32', boxShadow: 3 }}>
                <CardContent sx={{ p: 4 }}>
                    
                    {/* ENCABEZADO DEL TICKET */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32', display: 'flex', alignItems: 'center' }}>
                                <ReceiptLongIcon sx={{ fontSize: 35, mr: 1 }} />
                                Venta #{cabecera.id_venta}
                            </Typography>
                            <Chip label="Completada" color="success" size="small" variant="outlined" sx={{ mt: 1 }} />
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', color: 'text.secondary' }}>
                                <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
                                {fecha}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                <strong>Forma de Pago:</strong> {cabecera.forma_pago}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* TABLA DE PRODUCTOS */}
                    <Typography variant="h6" gutterBottom sx={{ color: '#1b5e20' }}>
                        Detalle de Artículos
                    </Typography>
                    
                    <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
                        <Table>
                            <TableHead sx={{ bgcolor: '#f1f8e9' }}>
                                <TableRow>
                                    <TableCell><strong>Descripción</strong></TableCell>
                                    <TableCell><strong>Tipo</strong></TableCell>
                                    <TableCell align="center"><strong>Cant.</strong></TableCell>
                                    <TableCell align="right"><strong>P. Unit</strong></TableCell>
                                    <TableCell align="right"><strong>Subtotal</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {detalles.map((item, index) => {
                                    // Determinamos el nombre y tipo según qué columna venga llena de la BD
                                    let nombre = item.name_planta || item.name_producto || item.name_servicio || "Item desconocido";
                                    let tipo = item.name_planta ? "Planta" : item.name_producto ? "Producto" : "Servicio";
                                    
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{nombre}</TableCell>
                                            <TableCell>
                                                <Chip label={tipo} size="small" sx={{ fontSize: '0.7rem' }} />
                                            </TableCell>
                                            <TableCell align="center">{item.cantidad}</TableCell>
                                            <TableCell align="right">${parseFloat(item.precio_unitario).toFixed(2)}</TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                                                ${parseFloat(item.subtotal).toFixed(2)}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* TOTALES */}
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <Card sx={{ bgcolor: '#2e7d32', color: 'white', minWidth: 200, p: 2 }}>
                            <Typography variant="subtitle2" align="right">
                                TOTAL PAGADO
                            </Typography>
                            <Typography variant="h4" align="right" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <MonetizationOnIcon sx={{ fontSize: 30, mr: 0.5 }} />
                                {parseFloat(cabecera.total_venta).toFixed(2)}
                            </Typography>
                        </Card>
                    </Box>

                </CardContent>
            </Card>
        </Container>
    );
}