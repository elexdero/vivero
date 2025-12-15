import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Box, Button, Grid, Card, CardContent, Typography, Container, 
    CircularProgress, Alert, IconButton, Tooltip, TextField, InputAdornment 
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import StoreIcon from '@mui/icons-material/Store';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function ProveedoresList() {
    const navigate = useNavigate();
    const [proveedores, setProveedores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const cargarProveedores = async () => {
        try {
            // Asegúrate de que esta ruta coincida con tu main.routes.js
            const response = await fetch('http://localhost:4000/api/proveedores');
            if (!response.ok) throw new Error('Error al conectar con el servidor');
            const data = await response.json();
            setProveedores(Array.isArray(data) ? data : []);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarProveedores();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("¿Eliminar este proveedor permanentemente?")) {
            try {
                // CORRECCIÓN: Usamos la ruta de delete del backend
                const res = await fetch(`http://localhost:4000/api/deleteProveedor/${id}`, { method: 'DELETE' });
                
                if (res.ok) {
                    // CORRECCIÓN: Filtramos usando id_proveedor (SINGULAR)
                    setProveedores(proveedores.filter(p => p.id_proveedor !== id));
                    alert("Proveedor eliminado");
                } else {
                    alert("No se pudo eliminar (verifica que el ID sea correcto)");
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    // Filtro de búsqueda
    const proveedoresFiltrados = proveedores.filter(p => {
        const term = searchTerm.toLowerCase();
        const nombre = (p.name_proveedor || "").toLowerCase();
        const rfc = (p.rfc_proveedor || "").toLowerCase();
        return nombre.includes(term) || rfc.includes(term);
    });

    return (
        <Container maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 4 }}>
                <Typography variant="h4" sx={{ color: '#1565c0', fontWeight: 'bold' }}>
                    Proveedores
                </Typography>
                <Button 
                    variant="contained" 
                    startIcon={<AddCircleIcon />}
                    onClick={() => navigate('/proveedores/new')}
                    sx={{ backgroundColor: '#1565c0' }}
                >
                    Nuevo Proveedor
                </Button>
            </Box>

            <Box sx={{ mb: 4 }}>
                <TextField 
                    fullWidth variant="outlined" placeholder="Buscar por Nombre o RFC..."
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
                        style: { backgroundColor: 'white' }
                    }}
                />
            </Box>

            {loading && <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>}
            {error && <Alert severity="error">{error}</Alert>}

            {!loading && !error && (
                <Grid container spacing={3}>
                    {proveedoresFiltrados.map((prov) => (
                        // CORRECCIÓN: key={prov.id_proveedor} (SINGULAR)
                        <Grid item xs={12} sm={6} md={4} key={prov.id_proveedor}>
                            <Card sx={{ height: '100%', borderTop: '6px solid #1565c0', display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <StoreIcon sx={{ color: '#1565c0', mr: 1 }} />
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                            {prov.name_proveedor}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        <strong>RFC:</strong> {prov.rfc_proveedor}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                                        <LocationOnIcon fontSize="small" color="action" />
                                        <Typography variant="body2">{prov.dir_proveedor}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <PhoneIcon fontSize="small" color="action" />
                                        <Typography variant="body2">{prov.cont_proveedor}</Typography>
                                    </Box>
                                </CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2, bgcolor: '#e3f2fd' }}>
                                    <Tooltip title="Editar">
                                        {/* CORRECCIÓN: /{prov.id_proveedor} (SINGULAR) */}
                                        <IconButton color="primary" onClick={() => navigate(`/proveedores/edit/${prov.id_proveedor}`)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar">
                                        {/* CORRECCIÓN: handleDelete(prov.id_proveedor) (SINGULAR) */}
                                        <IconButton color="error" onClick={() => handleDelete(prov.id_proveedor)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}