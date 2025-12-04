import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Box, 
    Button, 
    Grid, 
    Card, 
    CardContent, 
    Typography, 
    Container, 
    CircularProgress, 
    Chip, 
    Alert,
    IconButton,
    Tooltip,
    TextField,       
    InputAdornment,
    MenuItem 
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import GrassIcon from '@mui/icons-material/Grass';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function PlantasList() {
    const navigate = useNavigate();

    const [plantas, setPlantas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    //para filtrar
    const [searchTerm, setSearchTerm] = useState(""); 
    const [filterType, setFilterType] = useState("");

    const cargarPlantas = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/plantas');
            if (!response.ok) throw new Error('No se pudo conectar con la Base de Datos');
            const data = await response.json();
            
            if (Array.isArray(data)) {
                // Filtro para quitar nulos
                const plantasValidas = data.filter(planta => planta.name_planta !== null && planta.name_planta !== "");
                setPlantas(plantasValidas);
            } else {
                setPlantas([]); 
            }
            setLoading(false);
        } catch (err) {
            console.error("Error:", err);
            setError("Error de conexión. Revisa el backend.");
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarPlantas();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("¿Confirmas eliminar esta planta?")) {
            try {
                await fetch(`http://localhost:4000/api/deletePlanta/${id}`, { method: 'DELETE' });
                setPlantas(plantas.filter(p => p.id_planta !== id));
            } catch (error) {
                console.error(error);
            }
        }
    };

    const uniqueTypes = [...new Set(plantas.map(p => p.tipoplanta || p.type_planta || "General"))];


    const plantasFiltradas = plantas.filter((planta) => {
        // 1. Preparamos los datos
        const termino = searchTerm.toLowerCase();
        const nombre = (planta.name_planta || "").toLowerCase();
        const id = (planta.id_planta || "").toString();
        const tipoPlanta = planta.tipoplanta || planta.type_planta || "General";

        const matchesSearch = nombre.includes(termino) || id.includes(termino);

        const matchesType = filterType ? tipoPlanta === filterType : true;
        return matchesSearch && matchesType;
    });

    return (
        <Container maxWidth="lg">
            
            {/* ENCABEZADO */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 2 }}>
                <Typography variant="h4" sx={{ color: '#33691e', fontWeight: 'bold' }}>
                    Catálogo de Plantas
                </Typography>
                <Button 
                    variant="contained" 
                    startIcon={<AddCircleIcon />}
                    onClick={() => navigate('/plantas/new')} 
                    sx={{ backgroundColor: '#33691e' }}
                >
                    Nueva Planta
                </Button>
            </Box>

            {/* --- BARRA DE HERRAMIENTAS (BUSCADOR + FILTRO) --- */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={10} sm={6}>
                    <TextField 
                        fullWidth
                        variant="outlined"
                        placeholder="Buscar por Nombre o ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                            style: { backgroundColor: 'white' }
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        select
                        fullWidth
                        label="Filtrar por Tipo"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FilterListIcon color="action" />
                                </InputAdornment>
                            ),
                            style: { backgroundColor: 'white' }
                        }}
                    >
                        <MenuItem value="">
                            <em>Todos los tipos</em>
                        </MenuItem>
                        {uniqueTypes.map((tipo) => (
                            <MenuItem key={tipo} value={tipo}>
                                {tipo}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>

            {loading && <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress color="success" /></Box>}
            {error && <Alert severity="error">{error}</Alert>}

            {!loading && !error && (
                <Grid container spacing={3}>
                    {plantasFiltradas.map((planta) => {
                        
                        const id = planta.id_planta; 
                        const nombre = planta.name_planta || "Sin Nombre";
                        const cientifico = planta.name_cient || "N/D";
                        const tipo = planta.tipoplanta || planta.type_planta || "General";
                        const riego = planta.frecuencia_riego || "N/D";
                        const precio = planta.precio_planta || 0;
                        const luz = planta.tipoluz || planta.type_luz || "N/D";

                        return (
                            <Grid item xs={12} sm={6} md={4} key={id}>
                                <Card sx={{ height: '100%', borderTop: '6px solid #558b2f', display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <GrassIcon sx={{ color: '#558b2f', mr: 1 }} />
                                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                                {nombre}
                                            </Typography>
                                        </Box>
                                        
                                        <Typography sx={{ mb: 1.5, fontStyle: 'italic', color: '#558b2f' }} variant="body2">
                                            {cientifico}
                                        </Typography>

                                        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                                            <strong>ID:</strong> {id} <br />
                                            <strong>Tipo:</strong> {tipo} <br />
                                            <strong>Luz:</strong> {luz} <br />
                                            <strong>Riego:</strong> {riego} <br />
                                        </Typography>

                                        <Chip 
                                            icon={<MonetizationOnIcon />} 
                                            label={`$${precio}`} 
                                            color="success" 
                                            variant="outlined" 
                                            sx={{ fontWeight: 'bold' }}
                                        />
                                    </CardContent>

                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2, bgcolor: '#f1f8e9' }}>
                                        <Tooltip title="Editar">
                                            <IconButton color="secondary" onClick={() => navigate(`/plantas/edit/${id}`)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Eliminar">
                                            <IconButton color="error" onClick={() => handleDelete(id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            )}
            
            {!loading && plantasFiltradas.length === 0 && (
                <Typography align="center" sx={{ mt: 5, color: 'text.secondary' }}>
                    {plantas.length > 0 
                        ? "No hay plantas que coincidan con la búsqueda." 
                        : "No hay plantas registradas en la base de datos."}
                </Typography>
            )}
        </Container>
    );
}