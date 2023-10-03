import { client, conection } from "../conection/conection.js";

const getVenta = async (req,res) => {
    try {
        const ventasDB = (await conection()).Ventas
        const ventas = await ventasDB.find({}).toArray();
        res.json(ventas)
        client.close();
    } catch (error) {
        console.log(error);
        throw new Error(`No se puede conectar a la coleccion`)
    }
};

const postVenta = () => {};

const getOneVenta = () => {};

const updateVenta = () => {};

const deleteeVenta = () => {};

export { getVenta, postVenta, getOneVenta, updateVenta, deleteeVenta };