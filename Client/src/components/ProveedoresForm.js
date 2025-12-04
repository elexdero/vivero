import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Button, 
    TextField, 
    Grid, 
    Card, 
    CardContent, 
    Typography, 
    Container,
    InputAdornment
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BusinessIcon from '@mui/icons-material/Business';

export default function ProveedoresForm() {
    const navigate = useNavigate();

    // 1. Estado inicial con los nombres EXACTOS de tu tabla
    const [proveedor, setProveedor] = useState({
        IdProveedor: '',
        nameProveedor: '',
        RFCProveedor: '',
        dirProveedor: '',
        contProveedor: ''
    });

    const handleChange = (e) => {
        setProveedor({ ...proveedor, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos del proveedor a guardar:", proveedor);
        alert("Proveedor registrado con éxito");
        navigate('/proveedores');
    };

    return (
        <Container maxWidth="md" sx={{ mb: 4 }}>
            <Card sx={{ mt: 5, p: 2, borderLeft: '6px solid #00695c' }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#00695c' }}>
                        Registro de Proveedor
                    </Typography>
                    
                    <Typography variant="body2" sx={{ mb: 3, textAlign: 'center', color: 'text.secondary' }}>
                        Ingresa los datos fiscales y de contacto de la empresa proveedora.
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>

                            {/* RFC */}
                            <Grid item xs={12} sm={8}>
                                <TextField 
                                    label="RFC" 
                                    name="RFCProveedor" 
                                    fullWidth 
                                    required 
                                    variant="outlined" 
                                    placeholder="Ej: ABC123456HM1"
                                    inputProps={{ style: { textTransform: 'uppercase' } }} // Sugerencia visual
                                    onChange={handleChange} 
                                />
                            </Grid>

                            {/* Nombre de la Empresa */}
                            <Grid item xs={12}>
                                <TextField 
                                    label="Nombre o Razón Social" 
                                    name="nameProveedor" 
                                    fullWidth 
                                    required 
                                    variant="outlined" 
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BusinessIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={handleChange} 
                                />
                            </Grid>

                            {/* Teléfono */}
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    label="Teléfono de Contacto" 
                                    name="contProveedor" 
                                    type="tel"
                                    fullWidth 
                                    required 
                                    variant="outlined" 
                                    placeholder="Ej: 55 1234 5678"
                                    onChange={handleChange} 
                                />
                            </Grid>

                            {/* Dirección */}
                            <Grid item xs={12} sm={6}>
                                <TextField 
                                    label="Dirección Completa" 
                                    name="dirProveedor" 
                                    fullWidth 
                                    required 
                                    variant="outlined" 
                                    placeholder="Calle, Número, Colonia, Ciudad"
                                    onChange={handleChange} 
                                />
                            </Grid>

                            {/* Botones */}
                            <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                                <Button variant="outlined" color="secondary" startIcon={<ArrowBackIcon />} onClick={() => navigate('/proveedores')}>
                                    Cancelar
                                </Button>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    startIcon={<SaveIcon />}
                                    sx={{ backgroundColor: '#00695c', '&:hover': { backgroundColor: '#004d40' } }}
                                >
                                    Guardar Proveedor
                                </Button>
                            </Grid>

                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
}