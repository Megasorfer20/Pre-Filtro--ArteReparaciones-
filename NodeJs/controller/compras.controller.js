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

const postCompra = async (req, res) => {};

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

const deleteeCompra = async (req, res) => {};

export { getCompra, postCompra, getOneCompra, updateCompra, deleteeCompra };
