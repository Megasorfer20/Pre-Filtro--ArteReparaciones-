import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import clientesRouter from "../routes/clientes.routes.js";
import comprasRouter from "../routes/compras.routes.js";
import empleadosRouter from "../routes/empleados.routes.js";
import inventariosRouter from "../routes/inventarios.routes.js";
import productosRouter from "../routes/productos.routes.js";
import proveedoresRouter from "../routes/proveedores.routes.js";
import reparacionesRouter from "../routes/reparaciones.routes.js";
import sedesRouter from "../routes/sedes.routes.js";
import ventasRouter from "../routes/ventas.routes.js";


dotenv.config()
class App{
    
constructor(){
    this.app = express()
    this.port = process.env.PORT

    this.middlewares()
    this.routes()
}

middlewares(){
    this.app.use(cors())
    this.app.use(express.json())
}

routes(){
    this.app.use("/clientes",clientesRouter)
    this.app.use("/compras",comprasRouter)
    this.app.use("/empleados",empleadosRouter)
    this.app.use("/inventarios",inventariosRouter)
    this.app.use("/productos",productosRouter)
    this.app.use("/proveedores",proveedoresRouter)
    this.app.use("/reparaciones",reparacionesRouter)
    this.app.use("/sedes",sedesRouter)
    this.app.use("/ventas",ventasRouter)
}

listen(){
    this.app.listen(this.port,()=>{
        console.log(`Server conected on Port ${this.port}`);
    })
}

}

export default App