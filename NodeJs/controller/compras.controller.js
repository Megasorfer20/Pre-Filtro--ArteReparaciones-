import { ObjectId } from "mongodb";
import { client, conection } from "../conection/conection.js";

const getCompra = async (req, res) => {
    try {
        const compraDB = (await conection()).Compras;
        const compras = await compraDB.find({}).toArray();
        res.json(compras);
    } catch (error) {
        console.log(error);
    }
};

const postCompra = async (req, res) => {
    try {
        const {
            FechaCompra,
            Proveedor,
            Elementos,
            Empleado,
            FechaEntrega,
            TotalPagar,
        } = req.body;

        const FechaCompraPaeser = new Date(FechaCompra)
        const FechaEntregaParser = new Date(FechaEntrega)

        const ProveedorParser  = new ObjectId(Proveedor)
        const EmpleadoParser = new ObjectId( Empleado)

        const productosDB = (await conection()).Compras;
        await productosDB.insertOne({
            FechaCompra: FechaCompraPaeser,
            Proveedor: ProveedorParser,
            Elementos,
            Empleado: EmpleadoParser,
            FechaEntrega: FechaEntregaParser,
            TotalPagar: Number(TotalPagar),
        });
        client.close();
    } catch (error) {
        console.log(error);
    }
};

const getOneCompra = async (req, res) => {
    try {
        const { id } = req.params;
        const idCompras = new ObjectId(id);
        const compraDB = (await conection()).Compras;
        const compras = await compraDB
            .find({
                _id: idCompras,
            })
            .toArray();
        res.json(compras);
    } catch (error) {
        console.log(error);
    }
};

const updateCompra = async (req, res) => {};

const deleteeCompra = async (req, res) => {
    try {
        const { id } = req.params;
        const productoId = new ObjectId(id);
        const productosDB = (await conection()).Compras;
        await productosDB.deleteOne({
            _id: productoId,
        });
        client.close();
    } catch (error) {
        console.log(error);
    }
};

export { getCompra, postCompra, getOneCompra, updateCompra, deleteeCompra };
