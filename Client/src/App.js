import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from '@mui/material/Container';
import Navbar from "./components/navbar";

// --- IMPORTACIONES DE COMPONENTES ---
import PlantasForm from "./components/PlantasForm";
import PlantasList from "./components/PlantasList";
import PlantasDelete from "./components/plantasDelete";
import PlantasById from "./components/plantasById";
import TrabajadoresForm from "./components/TrabajadoresForms";
import TrabajadoresDelete from "./components/TrabajadoresDelete";
import TrabajadoresList from "./components/trabajadoresList";
import MantenimientoList from "./components/MantenimientoList";
import MantenimientoForms from "./components/MantenimentoForms";
import ProveedoresList from "./components/ProveedoresList";
import ProveedoresForm from "./components/ProveedoresForm";
import ProductosList from "./components/ProductosList";
import ProductosForm from "./components/ProductosForm";
import ServiciosList from "./components/ServiciosList";
import ServiciosForms from "./components/ServiciosForms";
import Inscripciones from './components/Inscripciones';
import ClientesList from './components/ClientesList';
import ClientesForm from './components/ClientesForm';
import EventosList from "./components/EventosList";
import EventosForm from './components/EventosForm';
import PedidosList from './components/PedidosList';
import PedidosForm from './components/PedidosForm';
import VentasList from './components/VentasList';
import VentasForm from './components/VentasForm';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container fixed>
        <Routes>
          {/* Ruta Principal */}
          <Route path='/' element={<PlantasList />} />

          {/* --- Rutas Plantas --- */}
          <Route path='/plantas' element={<PlantasList />} />
          <Route path='/plantas/ById' element={<PlantasById />} />
          <Route path="/plantas/new" element={<PlantasForm />} />
          <Route path="plantas/delete" element={<PlantasDelete />} />
          <Route path="plantas/edit/:id" element={<PlantasForm />} />

          {/* --- Rutas Trabajadores --- */}
          <Route path='/trabajadores' element={<TrabajadoresList />} />
          <Route path='trabajadores/new' element={<TrabajadoresForm />} />
          <Route path="trabajadores/delete" element={<TrabajadoresDelete />} />

          {/* --- Ventas --- */}
          <Route path='/ventas' element={<VentasList />} />
          <Route path='/ventas/new' element={<VentasForm />} />

          {/* --- Inscripciones --- */}
          <Route path="/eventos/inscripciones/:id_evento" element={<Inscripciones />} />

          {/* --- Rutas Eventos --- */}
          <Route path="/eventos" element={<EventosList />} />
          <Route path="/eventos/new" element={<EventosForm />} />
          <Route path='/eventos/edit/:id' element={<EventosForm />} />

          {/* --- Rutas Productos --- */}
          <Route path='/productos' element={<ProductosList />} />
          <Route path='/productos/new' element={<ProductosForm />} />
          <Route path='/productos/edit/:id' element={<ProductosForm />} />

          {/* --- Rutas Otros Servicios --- */}
          <Route path='/servicios' element={<ServiciosList />} />
          <Route path='/servicios/new' element={<ServiciosForms />} />
          <Route path='/servicios/edit/:id' element={<ServiciosForms />} />

          {/* --- Rutas Proveedores --- */}
          <Route path="/proveedores" element={<ProveedoresList />} />
          <Route path="/proveedores/new" element={<ProveedoresForm />} />
          <Route path="/proveedores/edit/:id" element={<ProveedoresForm />} />

          {/* --- Rutas Clientes --- */}
          <Route path='/clientes' element={<ClientesList />} />
          <Route path='/clientes' element={<ClientesForm />} />
          <Route path='/clientes/edit/:id' element={<ClientesForm />} />

          {/* --- Rutas Pedidos --- */}
          <Route path='/pedidos' element={<PedidosList />} />
          <Route path='/pedidos/new' element={<PedidosForm />} />
          <Route path='/pedidos/edit/:id' element={<PedidosForm />} />

          {/* --- Rutas Mantenimiento --- */}
          <Route path="/mantenimientos" element={<MantenimientoList />} />
          <Route path="/mantenimientos/new" element={<MantenimientoForms />} />

        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;