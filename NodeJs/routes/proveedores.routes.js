import { Router } from "express";
import {
    getProveedor,
    getOneProveedor,
    postProveedor,
    updateProveedor,
    deleteeProveedor,
} from "../controller/proveedores.controller.js";

const router = Router();

router.get("/", getProveedor);
router.post("/", postProveedor);
router.get("/:id", getOneProveedor);
router.patch("/:id", updateProveedor);
router.delete("/:id", deleteeProveedor);

export default router;