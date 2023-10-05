import { client, conection } from "../conection/conection.js";
import { ObjectId } from "mongodb";

const getInventario = async (req, res) => {
    try {
        const inventarioDB = (await conection()).Inventarios
        const inventarios = await inventarioDB.find({}).toArray();
        res.json(inventarios)
        client.close();
    } catch (error) {
        console.log(error);
    }
};

const postInventario = () => {};

const getOneInventario = () => {};

const getInventarioByProveedor = async (req,res) => {
    try {
        const { id } = req.params;
    const objectIdProveedor = new ObjectId(id);
        const inventarioDB = (await conection()).Inventarios
        const inventarios = await inventarioDB.find({
            Proveedor: objectIdProveedor
        }).toArray();
        res.json(inventarios)
        client.close();
    } catch (error) {
        console.log(error);
    }
};

const updateInventario = () => {};

const deleteeInventario = () => {};

export { getInventario, postInventario, getOneInventario, updateInventario, deleteeInventario,getInventarioByProveedor };