import React from "react";
import { Link,useNavigate, useLocation} from "react-router-dom";
import  {AppBar, Box, Button, Container, Toolbar, Typography}  from '@mui/material';

export default function Navbar(){
    const navigate = useNavigate();
    const location = useLocation();
    return(
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" color="transparent">
                <Container>
                    <Toolbar>
                        <Typography variant="h8" sx={{flexGrow: 1}}>
                            <Link to='/' style={{textDecoration:'none', color: '#23260e'}}>
                                Plantas en Armonia
                            </Link>
                        </Typography>
                       <Button variant="contained" onClick={() => navigate('/plantas')} sx={{marginLeft: 2, backgroundColor: '#303413','&:hover': { backgroundColor: '#23260e'}}}>
                            Plantas 
                        </Button>
                        <Button variant="contained" onClick={() => navigate('/productos')} sx={{marginLeft: 2, backgroundColor: '#303413','&:hover': { backgroundColor: '#23260e'}}}>
                            Productos 
                        </Button>
                        <Button variant="contained" color="primary" onClick={() =>navigate('/mantenimientos')} sx={{marginLeft: 2, backgroundColor: '#303413','&:hover': { backgroundColor: '#23260e'}}}>
                            Mantenimientos
                        </Button>
                        <Button variant="contained" color="primary" onClick={() =>navigate('/trabajadores')} sx={{marginLeft: 2, backgroundColor: '#303413','&:hover': { backgroundColor: '#23260e'}}}>
                            Trabajadores
                        </Button>
                        <Button variant="contained" color="primary" onClick={() =>navigate('/otrosServicios')} sx={{marginLeft: 2, backgroundColor: '#303413','&:hover': { backgroundColor: '#23260e'}}}>
                            Servicios
                        </Button>
                        <Button variant="contained" onClick={() => navigate('/proveedores')} sx={{marginLeft: 2, backgroundColor: '#303413','&:hover': { backgroundColor: '#23260e'}}}>
                            Proveedores 
                        </Button>
                        <Button variant="contained" color="primary" onClick={() =>navigate('/clientes')} sx={{marginLeft: 2, backgroundColor: '#303413','&:hover': { backgroundColor: '#23260e'}}}>
                            clientes
                        </Button>
                        <Button variant="contained" color="primary" onClick={() =>navigate('/eventos')} sx={{marginLeft: 2, backgroundColor: '#303413','&:hover': { backgroundColor: '#23260e'}}}>
                            Eventos
                        </Button>
                        <Button variant="contained" color="primary" onClick={() =>navigate('/pedidos')} sx={{marginLeft: 2, backgroundColor: '#303413','&:hover': { backgroundColor: '#23260e'}}}>
                            Pedidos
                        </Button>
                        <Button variant="contained" color="primary" onClick={() =>navigate('/ventas')} sx={{marginLeft: 2,backgroundColor: '#303413','&:hover': { backgroundColor: '#23260e'}}}>
                            Ventas
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}