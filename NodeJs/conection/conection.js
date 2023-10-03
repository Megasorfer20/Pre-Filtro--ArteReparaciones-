import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URI;
const nombreDB = process.env.BDKEY;
const client = new MongoClient(url);
const conection = async () => {
    try {
        await client.connect();
        const db = client.db(nombreDB);
        const colections = {
            Clientes: db.collection("Clientes"),
            Compras: db.collection("Compras"),
            Empleados: db.collection("Empleados"),
            Inventarios: db.collection("Inventarios"),
            Productos: db.collection("Productos"),
            Proveedores: db.collection("Proveedores"),
            Reparaciones: db.collection("Reparaciones"),
            Sedes: db.collection("Sedes"),
            Ventas: db.collection("Ventas"),
        };

        console.log("Coneccion Exitosa");
        return colections;
    } catch (error) {
        console.log(error);
        throw new Error(`No se puede conectar`);
    }
};

export { conection, client };
