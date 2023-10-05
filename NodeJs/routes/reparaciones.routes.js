import { Router } from "express";
import {
    getReparacion,
    getOneReparacion,
    postReparacion,
    updateReparacion,
    deleteeReparacion,
    getEspecificacionesReparacion,
    getProblemasReparacion,
} from "../controller/reparaciones.controller.js";

const router = Router();

router.get("/", getReparacion);
router.post("/", postReparacion);
router.get("/:id", getOneReparacion);
router.get("/especificaciones/:id", getEspecificacionesReparacion);
router.get("/problemas/:id", getProblemasReparacion);
router.patch("/:id", updateReparacion);
router.delete("/:id", deleteeReparacion);

export default router;
