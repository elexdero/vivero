import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Container, 
    Typography, 
    List, 
    ListItem, 
    ListItemText, 
    IconButton, 
    Paper, 
    Button,
    Box,
    CircularProgress,
    Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function PlantasDelete() {
    const navigate = useNavigate();

    // 1. ESTADO INICIAL VACÍO (Ya no hay datos falsos)
    const [plantas, setPlantas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. EFECTO PARA CARGAR DATOS DE LA BASE DE DATOS
    useEffect(() => {
        const cargarPlantas = async () => {
            try {
                // Petición a tu Backend
                const response = await fetch('http://localhost:4000/api/plantas');
                
                if (!response.ok) {
                    throw new Error('Error al cargar las plantas');
                }

                const data = await response.json();
                console.log("Plantas cargadas para eliminar:", data);
                setPlantas(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("No se pudieron cargar las plantas. Revisa tu servidor.");
                setLoading(false);
            }
        };

        cargarPlantas();
    }, []);

    // 3. FUNCIÓN PARA ELIMINAR EN LA BASE DE DATOS
    const handleDelete = async (id) => {
        // Confirmación visual
        if (window.confirm("¿Estás seguro de eliminar permanentemente esta planta?")) {
            try {
                // Petición DELETE al backend
                const response = await fetch(`http://localhost:4000/api/plantas/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Si el servidor dice "OK", actualizamos la lista visualmente
                    // Filtramos usando 'idplanta' (minúsculas de Postgres)
                    setPlantas(plantas.filter(planta => planta.idplanta !== id));
                    alert("Planta eliminada correctamente");
                } else {
                    alert("Hubo un error al intentar eliminar la planta");
                }
            } catch (error) {
                console.error("Error de conexión:", error);
                alert("Error de conexión con el servidor");
            }
        }
    };

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <CircularProgress color="success" />
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                
                {/* Encabezado */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/plantas')}>
                        Volver
                    </Button>
                    <Typography variant="h5" sx={{ flexGrow: 1, textAlign: 'center', color: '#d32f2f' }}>
                        Eliminar Plantas
                    </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                    Selecciona la planta que deseas eliminar permanentemente de la base de datos.
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                {/* Lista de Plantas */}
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {plantas.map((planta) => (
                        <ListItem
                            key={planta.idplanta} // OJO: Usamos idplanta (Postgres minúsculas)
                            secondaryAction={
                                <IconButton 
                                    edge="end" 
                                    aria-label="delete" 
                                    onClick={() => handleDelete(planta.idplanta)}
                                    color="error"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }
                            sx={{ borderBottom: '1px solid #eee' }}
                        >
                            <ListItemText
                                // Usamos nameplanta y namecient (Postgres minúsculas)
                                primary={planta.nameplanta}
                                secondary={planta.namecient} 
                                secondaryTypographyProps={{ style: { fontStyle: 'italic' } }}
                            />
                        </ListItem>
                    ))}
                    
                    {!loading && plantas.length === 0 && (
                        <Typography sx={{ textAlign: 'center', mt: 4, fontStyle: 'italic' }}>
                            No hay plantas registradas.
                        </Typography>
                    )}
                </List>

            </Paper>
        </Container>
    );
}