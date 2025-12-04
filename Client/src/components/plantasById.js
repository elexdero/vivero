import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Card, CardContent, Typography, Box, Alert, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function PlantasById() {
    const navigate = useNavigate();
    const [idBusqueda, setIdBusqueda] = useState('');
    const [plantaEncontrada, setPlantaEncontrada] = useState(null);
    const [error, setError] = useState(false);

    const handleSearch = async () => {
        try {
            // Conexión real al backend
            const response = await fetch(`http://localhost:4000/api/plantas/${idBusqueda}`);
            const data = await response.json();

            // Verificamos si el backend devolvió un objeto válido
            if (response.ok && data) {
                setPlantaEncontrada(data); // Ajusta según si tu backend devuelve {rows: [...]} o el objeto directo
                setError(false);
            } else {
                setPlantaEncontrada(null);
                setError(true);
            }
        } catch (err) {
            console.error(err);
            setPlantaEncontrada(null);
            setError(true);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                
                {/* Botón Volver */}
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 2 }}>
                    Volver a la lista
                </Button>

                <Typography variant="h5" gutterBottom sx={{ color: '#303413', fontWeight: 'bold' }}>
                    Buscar Planta por ID
                </Typography>

                {/* Formulario de Búsqueda */}
                <Box sx={{ display: 'flex', gap: 1, mt: 3, mb: 4 }}>
                    <TextField 
                        label="Ingresa el ID" 
                        variant="outlined" 
                        fullWidth 
                        type="number"
                        value={idBusqueda}
                        onChange={(e) => setIdBusqueda(e.target.value)}
                    />
                    <Button 
                        variant="contained" 
                        onClick={handleSearch}
                        sx={{ backgroundColor: '#303413', '&:hover': { backgroundColor: '#23260e' } }}
                    >
                        <SearchIcon />
                    </Button>
                </Box>

                {/* MENSAJE DE ERROR */}
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        No se encontró ninguna planta con el ID: {idBusqueda}
                    </Alert>
                )}

                {/* RESULTADO (Solo se muestra si plantaEncontrada tiene datos) */}
                {plantaEncontrada && (
                    <Card sx={{ backgroundColor: '#f4f6e6', border: '1px solid #303413' }}>
                        <CardContent>
                            <Typography variant="h4" component="div">
                                {plantaEncontrada.nombre}
                            </Typography>
                            <Typography sx={{ fontStyle: 'italic', color: 'text.secondary', mb: 2 }}>
                                {plantaEncontrada.nombreCientifico}
                            </Typography>
                            
                            <Box sx={{ textAlign: 'left', mt: 2 }}>
                                <Typography><strong>ID:</strong> {plantaEncontrada.id}</Typography>
                                <Typography><strong>Tipo:</strong> {plantaEncontrada.tipo}</Typography>
                                <Typography><strong>Stock:</strong> {plantaEncontrada.stock}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                )}
            </Paper>
        </Container>
    );
}