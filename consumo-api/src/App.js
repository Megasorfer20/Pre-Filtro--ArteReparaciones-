import "./App.css";
import HeaderMain from "./components/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sedes from "./components/Sedes/Sedes";
import Productos from "./components/Productos/Productos";
import Proveedores from "./components/Proveedores/Proveedores";
import Clientes from "./components/Clientes/Clientes";
import Reparaciones from "./components/Reparaciones/Reparaciones";
import Compras from "./components/Compras/Compras";
import Ventas from "./components/Ventas/Ventas";

function App() {
  return (
    <div className="App">
      <Router>
        <HeaderMain />
        <Switch>
          <Route exact path="/">
            <div>
              <h1>Selecciona el campo que quieres visualizar</h1>
            </div>
          </Route>
          <Route path="/compras">
            <Compras />
          </Route>
          <Route path="/ventas">
            <Ventas />
          </Route>
          <Route path="/reparaciones">
            <Reparaciones />
          </Route>
          <Route path="/productos">
            <Productos />
          </Route>
          <Route path="/sedes">
            <Sedes />
          </Route>
          <Route path="/proveedores">
            <Proveedores />
          </Route>
          <Route path="/clientes">
            <Clientes />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
