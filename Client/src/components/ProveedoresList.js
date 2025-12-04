import { useState } from 'react'; // <--- Importante: agregamos useState
import { useNavigate } from 'react-router-dom';
import { 
    Box, 
    Button, 
    Grid, 
    Card, 
    CardContent, 
    Typography, 
    Container, 
    Divider,
    IconButton, // <--- Para el botón de icono
    Tooltip     // <--- Para mostrar texto al pasar el mouse (opcional)
} from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BadgeIcon from '@mui/icons-material/Badge';
import DeleteIcon from '@mui/icons-material/Delete'; // <--- El icono de basura

export default function ProveedoresList() {
    const navigate = useNavigate();

    // 1. CAMBIO IMPORTANTE: Usamos useState para los datos
    // Esto permite que la lista se "repinte" cuando borramos algo.
    const [proveedores, setProveedores] = useState([
        {
            IdProveedor: 1,
            nameProveedor: "Fertilizantes del Norte SA",
            RFCProveedor: "FEN900101H4T",
            dirProveedor: "Av. Industrial #405, Monterrey",
            contProveedor: "81 8355 1020"
        },
        {
            IdProveedor: 2,
            nameProveedor: "Macetas y Cerámica López",
            RFCProveedor: "MACL880520KY9",
            dirProveedor: "Carr. Federal Km 20, Toluca",
            contProveedor: "722 555 9988"
        },
        {
            IdProveedor: 3,
            nameProveedor: "Semillas Orgánicas BioVida",
            RFCProveedor: "SOB150315RH2",
            dirProveedor: "Calle Reforma 22, CDMX",
            contProveedor: "55 4433 2211"
        }
    ]);

    // 2. Función para eliminar directamente
    const handleDelete = (id) => {
        const confirmacion = window.confirm("¿Estás seguro de eliminar este proveedor? Se borrará de la lista.");
        if (confirmacion) {
            // Filtramos la lista: "Dame todos MENOS el que tenga este ID"
            const nuevaLista = proveedores.filter(prov => prov.IdProveedor !== id);
            setProveedores(nuevaLista); // Actualizamos el estado visual
        }
    };

    return (
        <Container maxWidth="lg">
            {/* --- ENCABEZADO --- */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 4,
                marginBottom: 4
            }}>
                <Typography variant="h4" sx={{ color: '#00695c', fontWeight: 'bold' }}>
                    Directorio de Proveedores
                </Typography>

                <Button 
                    variant="contained" 
                    startIcon={<AddBusinessIcon />}
                    onClick={() => navigate('/proveedores/new')} 
                    sx={{ backgroundColor: '#00695c', '&:hover': { backgroundColor: '#004d40' } }}
                >
                    Nuevo Proveedor
                </Button>
            </Box>

            {/* --- LISTA DE TARJETAS --- */}
            <Grid container spacing={3}>
                {proveedores.map((prov) => (
                    <Grid item xs={12} md={6} lg={4} key={prov.IdProveedor}>
                        <Card sx={{ 
                            height: '100%', 
                            borderTop: '5px solid #00695c',
                            position: 'relative', // Necesario para posicionar el botón de borrar
                            transition: '0.3s',
                            '&:hover': { boxShadow: 6 }
                        }}>
                            
                            {/* BOTÓN ELIMINAR (Esquina superior derecha) */}
                            <Tooltip title="Eliminar Proveedor">
                                <IconButton 
                                    onClick={() => handleDelete(prov.IdProveedor)}
                                    sx={{ 
                                        position: 'absolute', 
                                        top: 8, 
                                        right: 8, 
                                        color: '#ef5350' // Rojo suave
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>

                            <CardContent sx={{ pt: 4 }}> {/* Padding top extra para no chocar con el botón */}
                                
                                {/* Encabezado con Icono */}
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                                    <LocalShippingIcon sx={{ color: '#00695c', fontSize: 30 }} />
                                    <Typography variant="h6" component="div" sx={{ lineHeight: 1.2, width: '85%' }}>
                                        {prov.nameProveedor}
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 1.5 }} />

                                {/* Datos de Contacto */}
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1.5 }}>
                                    <BadgeIcon fontSize="small" color="action" />
                                    <Typography variant="body2"><strong>RFC:</strong> {prov.RFCProveedor}</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1.5 }}>
                                    <PhoneIcon fontSize="small" color="action" />
                                    <Typography variant="body2"><strong>Tel:</strong> {prov.contProveedor}</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                                    <LocationOnIcon fontSize="small" color="action" sx={{ mt: 0.3 }} />
                                    <Typography variant="body2">{prov.dirProveedor}</Typography>
                                </Box>
                                
                                <Typography variant="caption" display="block" sx={{ mt: 2, textAlign: 'right', color: 'text.secondary' }}>
                                    ID: {prov.IdProveedor}
                                </Typography>

                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}