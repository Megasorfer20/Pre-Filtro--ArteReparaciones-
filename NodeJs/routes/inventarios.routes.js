import { Router } from "express";
import {
    getInventario,
    getOneInventario,
    postInventario,
    updateInventario,
    deleteeInventario,
} from "../controller/inventarios.controller.js";

const router = Router();

router.get("/", getInventario);
router.post("/", postInventario);
router.get("/:id", getOneInventario);
router.patch("/:id", updateInventario);
router.delete("/:id", deleteeInventario);

export default router;