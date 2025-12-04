import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Box, 
    Button, 
    Grid, 
    Card, 
    CardContent, 
    Typography, 
    Container, 
    Avatar,
    IconButton,
    Tooltip,
    Divider
} from '@mui/material';
// Iconos
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ClientesList() {
    const navigate = useNavigate();

    // 1. Datos Simulados (Mock Data) usando tus nombres de columna EXACTOS
    const [clientes, setClientes] = useState([
        {
            IdCliente: 100,
            nameCliente: "Juan",
            apPatCliente: "Pérez",
            apMatCliente: "López",
            dirCliente: "Av. Reforma #123, CDMX",
            telCliente: "55 1234 5678",
            mailCliente: "juan.perez@mail.com"
        },
        {
            IdCliente: 101,
            nameCliente: "María",
            apPatCliente: "González",
            apMatCliente: "Rui",
            dirCliente: "Calle 5 de Mayo #45, Puebla",
            telCliente: "22 2345 6789",
            mailCliente: "maria.gonz@mail.com"
        },
        {
            IdCliente: 102,
            nameCliente: "Carlos",
            apPatCliente: "Sánchez",
            apMatCliente: "Díaz",
            dirCliente: "Col. Centro #88, Guadalajara",
            telCliente: "33 9876 5432",
            mailCliente: "carlos.s@mail.com"
        }
    ]);

    // Función Eliminar
    const handleDelete = (id) => {
        if(window.confirm("¿Seguro que deseas eliminar a este cliente de la base de datos?")) {
            const nuevaLista = clientes.filter(c => c.IdCliente !== id);
            setClientes(nuevaLista);
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
                <Typography variant="h4" sx={{ color: '#0277bd', fontWeight: 'bold' }}>
                    Cartera de Clientes
                </Typography>

                <Button 
                    variant="contained" 
                    startIcon={<PersonAddIcon />}
                    onClick={() => navigate('/clientes/new')} 
                    sx={{ backgroundColor: '#0277bd', '&:hover': { backgroundColor: '#01579b' } }}
                >
                    Registrar Cliente
                </Button>
            </Box>

            {/* --- GRID DE CLIENTES --- */}
            <Grid container spacing={3}>
                {clientes.map((cliente) => (
                    <Grid item xs={12} md={6} lg={4} key={cliente.IdCliente}>
                        <Card sx={{ 
                            height: '100%', 
                            borderTop: '5px solid #0288d1', 
                            boxShadow: 3,
                            transition: '0.3s',
                            '&:hover': { transform: 'scale(1.02)' }
                        }}>
                            <CardContent>
                                {/* Encabezado: Nombre Completo */}
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Avatar sx={{ bgcolor: '#0277bd', mr: 2 }}>
                                        <AccountCircleIcon />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h6" component="div" sx={{ lineHeight: 1.1 }}>
                                            {cliente.nameCliente} {cliente.apPatCliente}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            ID: {cliente.IdCliente}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Divider sx={{ mb: 2 }} />

                                {/* Datos de Contacto */}
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                    <PhoneIcon fontSize="small" color="action" sx={{ mr: 1.5 }} />
                                    <Typography variant="body2">{cliente.telCliente}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                    <EmailIcon fontSize="small" color="action" sx={{ mr: 1.5 }} />
                                    <Typography variant="body2">{cliente.mailCliente}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <HomeIcon fontSize="small" color="action" sx={{ mr: 1.5, mt: 0.3 }} />
                                    <Typography variant="body2">{cliente.dirCliente}</Typography>
                                </Box>
                                
                                {/* Botones de Acción (Editar/Borrar) */}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 1 }}>
                                    <Tooltip title="Editar Datos">
                                        <IconButton size="small" color="primary" onClick={() => navigate(`/clientes/edit/${cliente.IdCliente}`)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar Cliente">
                                        <IconButton size="small" color="error" onClick={() => handleDelete(cliente.IdCliente)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>

                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}