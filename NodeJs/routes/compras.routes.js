import { Router } from "express";
import {
    getCompra,
    getOneCompra,
    postCompra,
    updateCompra,
    deleteeCompra,
} from "../controller/compras.controller.js";

const router = Router();

router.get("/", getCompra);
router.post("/", postCompra);
router.get("/:id", getOneCompra);
router.patch("/:id", updateCompra);
router.delete("/:id", deleteeCompra);

export default router;