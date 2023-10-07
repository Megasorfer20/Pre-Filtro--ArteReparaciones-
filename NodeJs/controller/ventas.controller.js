import { ObjectId } from "mongodb";
import { client, conection } from "../conection/conection.js";

const getVenta = async (req, res) => {
    try {
        const ventasDB = (await conection()).Ventas;
        const ventas = await ventasDB.find({}).toArray();
        res.json(ventas);
    } catch (error) {
        console.log(error);
    }
};

const postVenta = async (req, res) => {
    try {
        const { FechaVenta,
            Empleado,
            Elementos,
            Cliente,
            TotalPagar, } = req.body;
        const productosDB = (await conection()).Ventas;
        await productosDB.insertOne({
            FechaVenta: new Date(FechaVenta),
            Empleado: new ObjectId(Empleado),
            Elementos,
            Cliente: new ObjectId(Cliente),
            TotalPagar: Number(TotalPagar),
        });
        client.close();
    } catch (error) {
        console.log(error);
    }
};

const getOneVenta = async (req, res) => {
    try {
        const { id } = req.params;
        const VentasObjectId = new ObjectId(id);
        const ventasDB = (await conection()).Ventas;
        const ventas = await ventasDB
            .find({
                _id: VentasObjectId,
            })
            .toArray();
        res.json(ventas);
    } catch (error) {
        console.log(error);
    }
};

const updateVenta = async (req, res) => {};

const deleteeVenta = async (req, res) => {
    try {
        const { id } = req.params;
        const productoId = new ObjectId(id);
        const productosDB = (await conection()).Ventas;
        await productosDB.deleteOne({
            _id: productoId,
        });
        client.close();
    } catch (error) {
        console.log(error);
    }
};

export { getVenta, postVenta, getOneVenta, updateVenta, deleteeVenta };
