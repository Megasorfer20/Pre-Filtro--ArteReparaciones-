import { Router } from "express";
import {
    getCliente,
    getOneCliente,
    postCliente,
    updateCliente,
    deleteeCliente,
} from "../controller/cliente.controller.js";

const router = Router();

router.get("/", getCliente);
router.post("/", postCliente);
router.get("/:id", getOneCliente);
router.patch("/:id", updateCliente);
router.delete("/:id", deleteeCliente);

export default router;
