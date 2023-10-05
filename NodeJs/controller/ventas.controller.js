import { ObjectId } from "mongodb";
import { client, conection } from "../conection/conection.js";

const getVenta = async (req,res) => {
    try {
        const ventasDB = (await conection()).Ventas
        const ventas = await ventasDB.find({}).toArray();
        res.json(ventas)
        client.close();
    } catch (error) {
        console.log(error);
    }
};

const postVenta = async (req,res) => {};

const getOneVenta = async (req,res) => {
    try {
        const {id} = req.params
        const VentasObjectId = new ObjectId(id)
        const ventasDB = (await conection()).Ventas
        const ventas = await ventasDB.find({
            _id: VentasObjectId
        }).toArray();
        res.json(ventas)
        client.close();
    } catch (error) {
        console.log(error);
    }
};

const updateVenta = async (req,res) => {};

const deleteeVenta = async (req,res) => {};

export { getVenta, postVenta, getOneVenta, updateVenta, deleteeVenta };