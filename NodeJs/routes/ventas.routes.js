import { Router } from "express";
import {
    getVenta,
    getOneVenta,
    postVenta,
    updateVenta,
    deleteeVenta,
} from "../controller/ventas.controller.js";

const router = Router();

router.get("/", getVenta);
router.post("/", postVenta);
router.get("/:id", getOneVenta);
router.patch("/:id", updateVenta);
router.delete("/:id", deleteeVenta);

export default router;