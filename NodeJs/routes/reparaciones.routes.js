import { Router } from "express";
import {
    getReparacion,
    getOneReparacion,
    postReparacion,
    updateReparacion,
    deleteeReparacion,
} from "../controller/reparaciones.controller.js";

const router = Router();

router.get("/", getReparacion);
router.post("/", postReparacion);
router.get("/:id", getOneReparacion);
router.patch("/:id", updateReparacion);
router.delete("/:id", deleteeReparacion);

export default router;