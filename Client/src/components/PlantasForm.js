import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardContent, Grid, TextField, Typography, Container, CircularProgress, MenuItem } from '@mui/material';

export default function PlantasForm() {
    const [plant, setPlant] = useState({
        namePlanta: '',
        nameCient: '',
        typePlanta: '',
        tamPlanta: '',
        typeLuz: '',
        frecuenciaRiego: '',
        precioPlanta: '',
        stock: '',
        idProveedor: '' // <--- CAMPO NUEVO
    });
    
    const [proveedores, setProveedores] = useState([]); // <--- LISTA DE PROVEEDORES
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const params = useParams();

    // Cargar proveedores al iniciar
    useEffect(() => {
        cargarProveedores();
        if (params.id) {
            cargarPlanta(params.id);
        }
    }, [params.id]);

    const cargarProveedores = async () => {
        try {
            const res = await fetch('http://localhost:4000/api/proveedores');
            if (res.ok) {
                setProveedores(await res.json());
            }
        } catch (error) {
            console.error("Error cargando proveedores:", error);
        }
    }

    const cargarPlanta = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:4000/api/planta/${id}`);
            const data = await res.json();
            setPlant({
                namePlanta: data.name_planta,
                nameCient: data.name_cient,
                typePlanta: data.type_planta || data.tipoplanta,
                tamPlanta: data.tam_planta,
                typeLuz: data.type_luz,
                frecuenciaRiego: data.frecuencia_riego,
                precioPlanta: data.precio_planta,
                stock: data.stock,
                idProveedor: data.id_proveedor || '' // <--- Cargamos el ID si existe
            });
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (params.id) {
                await fetch(`http://localhost:4000/api/plantas/edit/${params.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(plant),
                });
            } else {
                await fetch('http://localhost:4000/api/plantas/new', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(plant),
                });
            }
            navigate('/plantas');
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        setPlant({ ...plant, [e.target.name]: e.target.value });
    };

    return (
        <Container maxWidth="md">
            <Grid container direction="column" alignItems="center" justifyContent="center">
                <Grid item xs={12} sx={{ mt: 4 }}>
                    <Card sx={{ mt: 5, padding: 2 }}>
                        <CardContent>
                            <Typography variant='h5' textAlign='center' sx={{ mb: 3 }}>
                                {params.id ? "Editar Planta" : "Añadir Planta"}
                            </Typography>
                            
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField label="Nombre Común" name="namePlanta" value={plant.namePlanta} onChange={handleChange} fullWidth required />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField label="Nombre Científico" name="nameCient" value={plant.nameCient} onChange={handleChange} fullWidth />
                                    </Grid>
                                    
                                    <Grid item xs={6}>
                                        <TextField label="Tipo de Planta" name="typePlanta" value={plant.typePlanta} onChange={handleChange} fullWidth />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField label="Tamaño (cm)" name="tamPlanta" type="number" value={plant.tamPlanta} onChange={handleChange} fullWidth />
                                    </Grid>
                                    
                                    <Grid item xs={6}>
                                        <TextField label="Tipo de Luz" name="typeLuz" value={plant.typeLuz} onChange={handleChange} fullWidth />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField label="Frecuencia Riego" name="frecuenciaRiego" value={plant.frecuenciaRiego} onChange={handleChange} fullWidth />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField label="Precio ($)" name="precioPlanta" type="number" value={plant.precioPlanta} onChange={handleChange} fullWidth required />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField label="Stock (Cantidad)" name="stock" type="number" value={plant.stock} onChange={handleChange} fullWidth InputProps={{ inputProps: { min: 0 } }} />
                                    </Grid>

                                    {/* --- SELECTOR DE PROVEEDOR --- */}
                                    <Grid item xs={12}>
                                        <TextField
                                            select
                                            label="Proveedor Principal"
                                            name="idProveedor"
                                            value={plant.idProveedor}
                                            onChange={handleChange}
                                            fullWidth
                                            helperText="Selecciona quién surte esta planta"
                                        >
                                            <MenuItem value="">
                                                <em>Ninguno / Desconocido</em>
                                            </MenuItem>
                                            {proveedores.map((prov) => (
                                                // Ajusta 'prov.id_proveedor' y 'prov.name_proveedor' según tu DB exacta
                                                <MenuItem key={prov.id_proveedor} value={prov.id_proveedor}>
                                                    {prov.name_proveedor}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Button variant='contained' color='primary' type='submit' fullWidth disabled={loading}>
                                            {loading ? <CircularProgress color="inherit" size={24} /> : "Guardar Planta"}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}