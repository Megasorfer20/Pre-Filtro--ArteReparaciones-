import "./App.css";
import HeaderMain from "./components/Header/Header";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Sedes from "./components/Sedes/Sedes";

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
                    <Route path="/compras">Compras</Route>
                    <Route path="/ventas">Ventas</Route>
                    <Route path="/reparaciones">Reparaciones</Route>
                    <Route path="/productos">Productos</Route>
                    <Route path="/sedes"><Sedes/></Route>
                    <Route path="/proveedores">Proveedores</Route>
                    <Route path="/clientes">clientes</Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
