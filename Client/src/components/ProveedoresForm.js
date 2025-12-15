import { Card, CardContent, Grid, TextField, Typography, Button, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProveedoresForm() {
    
    // Usamos los nombres exactos de la BD para facilitar el envío
    const [proveedor, setProveedor] = useState({
        name_proveedor: '',
        rfc_proveedor: '',
        dir_proveedor: '',
        cont_proveedor: ''
    });

    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    
    const navigate = useNavigate();
    const params = useParams(); // Para leer el ID en modo edición

    // Cargar datos si estamos editando
    useEffect(() => {
        if (params.id) {
            const cargarDatos = async () => {
                setLoading(true);
                try {
                    // Petición al backend
                    const res = await fetch(`http://localhost:4000/api/proveedores/${params.id}`);
                    const data = await res.json();
                    
                    // Rellenamos el estado con los datos recibidos
                    setProveedor({
                        name_proveedor: data.name_proveedor,
                        rfc_proveedor: data.rfc_proveedor,
                        dir_proveedor: data.dir_proveedor,
                        cont_proveedor: data.cont_proveedor
                    });
                    setEditing(true);
                } catch (error) {
                    console.error(error);
                    alert("Error al cargar proveedor");
                }
                setLoading(false);
            };
            cargarDatos();
        }
    }, [params.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const url = editing 
                ? `http://localhost:4000/api/proveedores/edit/${params.id}`
                : 'http://localhost:4000/api/proveedores/new';
            const method = editing ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(proveedor)
            });

            if (res.ok) {
                alert(editing ? "Proveedor actualizado" : "Proveedor registrado");
                navigate('/proveedores');
            } else {
                alert("Error al guardar (verifica los datos)");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión");
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        setProveedor({ ...proveedor, [e.target.name]: e.target.value });
    };

    return (
        <Grid container direction="column" alignItems='center' justifyContent='center'>
            <Grid item xs={12} md={8} lg={6}>
                <Card sx={{ mt: 5, padding: 3 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom textAlign="center" sx={{ mb: 3 }}>
                            {editing ? "Editar Proveedor" : "Registrar Proveedor"}
                        </Typography>
                        
                        {loading ? <CircularProgress sx={{ display:'block', mx:'auto' }} /> : (
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField name='name_proveedor' label="Nombre / Razón Social" variant='outlined' fullWidth 
                                            value={proveedor.name_proveedor} onChange={handleChange} required />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField name='rfc_proveedor' label="RFC" variant='outlined' fullWidth 
                                            value={proveedor.rfc_proveedor} onChange={handleChange} required />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField name='cont_proveedor' label="Teléfono / Contacto" variant='outlined' fullWidth 
                                            value={proveedor.cont_proveedor} onChange={handleChange} required />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField name='dir_proveedor' label="Dirección Completa" variant='outlined' fullWidth multiline rows={2}
                                            value={proveedor.dir_proveedor} onChange={handleChange} required />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" type='submit' fullWidth size="large" sx={{ mt: 2, bgcolor: '#1565c0' }}>
                                            {editing ? "Guardar Cambios" : "Registrar"}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}