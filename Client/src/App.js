import { BrowserRouter, Routes, Route} from "react-router-dom";
import PlantasForm from "./components/PlantasForm";
import PlantasList from "./components/PlantasList";
import PlantasDelete from "./components/plantasDelete";
import PlantasById from "./components/plantasById";
import TrabajadoresForm from "./components/TrabajadoresForms";
import TrabajadoresDelete from "./components/TrabajadoresDelete";
import MantenimientoList from "./components/MantenimientoList";
import MantenimientoForms from "./components/MantenimentoForms";
import ProveedoresList from "./components/ProveedoresList";
import ProveedoresForm from "./components/ProveedoresForm";
import ProductosList from "./components/ProductosList";
import ProductosForm from "./components/ProductosForm";
import OtrosServiciosList from "./components/OtrosServiciosList";
import Inscripciones from './components/Inscripciones';
import ClientesList from './components/ClientesList';
import ClientesForm from './components/ClientesForm';
import EventosList from "./components/EventosList";
import EventosForm from './components/EventosForm';
import PedidosList from './components/PedidosList';
import PedidosForm from './components/PedidosForm';
import VentasList from './components/VentasList';
import VentasForm from './components/VentasForm';
import Navbar  from "./components/navbar";
import Container from '@mui/material/Container';
import TrabajadoresList from "./components/trabajadoresList";
import OtrosServiciosForms from "./components/otrosServiciosForms";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Container fixed>
          <Routes>
          {/* Ruta de Login (Puede ser la principal o /login)
           <Route path='/login' element={<Login/>} /> */}
          <Route path='/' element={<PlantasList/>}/>

          {/*Rutas Plantas*/}
          <Route path='/plantas' element={<PlantasList/>}/>
          <Route path='/plantas/ById' element={<PlantasById/>}/>
          <Route path="/plantas/new" element={<PlantasForm/>}/>
          <Route path="plantas/delete" element ={<PlantasDelete/>}/>
          <Route path="plantas/update" element/>
          {/*EDIT ROUTES*/}

          {/*Rutas trabajadores*/}
          <Route path='/trabajadores' element = {<TrabajadoresList/>}/>
          <Route path='trabajadores/new' element={<TrabajadoresForm/>}/>
          <Route path="trabajadores/delete" element={<TrabajadoresDelete/>}/>

          {/*Ventas*/}
          <Route path='/ventas' element={<VentasList/>} />
          <Route path='/ventas/new' element={<VentasForm/>} />

          {/*Inscripciones*/}
          <Route path='/eventos/inscripciones/:id' element={<Inscripciones/>} />
          {/*Rutas eventos*/}
          <Route path="/eventos" element={<EventosList/>}/>
          <Route path="/eventos/new" element={<EventosForm/>}/>
          <Route path='/eventos/edit/:id' element={<EventosForm/>} />
          <Route path="eventos/registrarClientes" element/>

          {/*Rutas Productos*/}
          <Route path='/productos' element={<ProductosList/>}/>
          <Route path='/productos/new' element={<ProductosForm/>} />
          <Route path='/productos/edit/:id' element={<ProductosForm/>} />

          {/*Rutas otros servicios*/}
          <Route path='/otrosServicios' element={<OtrosServiciosList/>}/>
          <Route path='/otrosServicios/new' element={<OtrosServiciosForms/>} />
          <Route path='/otrosServicios/edit/:id' element={<OtrosServiciosForms/>} />

          {/*Rutas proveedores*/}
          <Route path="/proveedores" element = {<ProveedoresList/>}/>
          <Route path="/proveedores/new" element = {<ProveedoresForm/>}/>

          {/*Rutas clientes*/}
          <Route path='/clientes' element={<ClientesList/>} />
          <Route path='/clientes/new' element={<ClientesForm/>} />
          <Route path='/clientes/edit/:id' element={<ClientesForm/>} />
          {/*Rutas pedidos*/}
          <Route path='/pedidos' element={<PedidosList/>} />
          <Route path='/pedidos/new' element={<PedidosForm/>} />
          <Route path='/pedidos/edit/:id' element={<PedidosForm/>} />
          {/*Rutas Mantenimiento*/}
          <Route path="/mantenimientos" element ={<MantenimientoList/>}/>
          <Route path="/mantenimientos/new" element={<MantenimientoForms/>}/>


          </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
