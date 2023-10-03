import { Router } from "express";
import {
    getProducto,
    getOneProducto,
    postProducto,
    updateProducto,
    deleteeProducto,
} from "../controller/productos.controller.js";

const router = Router();

router.get("/", getProducto);
router.post("/", postProducto);
router.get("/:id", getOneProducto);
router.patch("/:id", updateProducto);
router.delete("/:id", deleteeProducto);

export default router;