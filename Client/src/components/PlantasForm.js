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
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(plantas)
            });

            const data = await res.json();
            
            if (res.ok) {
                console.log(data);
                alert("Planta guardada correctamente");
            } else {
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
            <Grid item xs={12} md={8} lg={6}>
                <Card sx={{ mt: 5, padding: 2 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom textAlign="center">
                            Añadir Planta
                        </Typography>
                        
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}> 
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

                                {/* FILA 3:*/}
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