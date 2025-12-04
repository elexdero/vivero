import { Card, CardContent, Grid, TextField, Typography, Button } from '@mui/material';
import { useState, useEffect } from 'react';



export default function PlantasForm() {

    const[plantas, setPlantas] = useState({
        namePlanta: '',
        nameCient: '',
        typePlanta: '',
        tamPlanta: '',
        typeLuz: '',
        frecuenciaRiego: '',
        precioPlanta: ''
    });


const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:4000/api/plantas/new', {
                method: 'POST',
                // --- AGREGAR ESTO ES OBLIGATORIO ---
                headers: { 
                    'Content-Type': 'application/json' 
                },
                // -----------------------------------
                body: JSON.stringify(plantas)
            });

            const data = await res.json();
            
            if (res.ok) {
                console.log(data);
                alert("Planta guardada correctamente");
            } else {
                // Esto te mostrará el mensaje de error del backend en una alerta
                alert(data.message); 
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión");
        }
    };
    
    const handleChange = (e) =>{
        setPlantas({...plantas, [e.target.name] : e.target.value});
    };

    return (
        <Grid
            container
            direction="column"
            alignItems='center'
            justifyContent='center'
        >
            <Grid item xs={12} md={8} lg={6}> {/* Aumenté el ancho (xs=3 era muy pequeño) */}
                <Card sx={{ mt: 5, padding: 2 }}> {/* Padding interno para que no pegue a los bordes */}
                    <CardContent>
                        <Typography variant="h5" gutterBottom textAlign="center">
                            Añadir Planta
                        </Typography>
                        
                        <form onSubmit={handleSubmit}>
                            {/* spacing={2} da espacio automático entre todos los campos */}
                            <Grid container spacing={2}> 
                                
                                {/* FILA 1: Nombre y Científico */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name='namePlanta'
                                        label="Nombre de la planta"
                                        variant='filled'
                                        placeholder='Ej: Tulipan'
                                        fullWidth
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name='nameCient'
                                        label="Nombre científico"
                                        variant='filled'
                                        placeholder='Ej: Tulipa spp'
                                        fullWidth
                                        onChange={handleChange}
                                    />
                                </Grid>

                                {/* FILA 2: Stock, Tamaño y Tipo (3 columnas) */}
                                {/*<Grid item xs={12} sm={4}>
                                    <TextField
                                        name='stockPlanta'
                                        label="Stock"
                                        type="number"
                                        variant='filled'
                                        placeholder='Ej: 55'
                                        fullWidth
                                        onChange={handleChange}
                                    />
                                </Grid>*/}
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        name='tamPlanta'
                                        label="Tamaño (cm)"
                                        variant='filled'
                                        placeholder='Ej: 40.2'
                                        fullWidth
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        name='typePlanta'
                                        label="Tipo de planta"
                                        variant='filled'
                                        placeholder='Ej: Bulbosa'
                                        fullWidth
                                        onChange={handleChange}
                                    />
                                </Grid>

                                {/* FILA 3: Luz y Riego */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name= 'typeLuz'
                                        label="Tipo de luz"
                                        variant='filled'
                                        placeholder='Ej: Sombra'
                                        fullWidth
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name='frecuenciaRiego'
                                        label="Frecuencia de riego"
                                        variant='filled'
                                        placeholder='Ej: Cada 3 días'
                                        fullWidth
                                        onChange={handleChange}
                                    />
                                </Grid>
    
                                 <Grid item xs={12} sm={6}>
                                    <TextField
                                        name='precioPlanta'
                                        label="Costo"
                                        variant='filled'
                                        placeholder='Ej: $150.00'
                                        fullWidth
                                        onChange={handleChange}
                                    />
                                </Grid>
                                {/* Botón de Guardar */}
                                <Grid item xs={12} sx={{marginLeft: 2}}>
                                    <Button variant="contained" color="primary" type='submit' fullWidth sx={{mt: 2}}>
                                        Guardar planta
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}