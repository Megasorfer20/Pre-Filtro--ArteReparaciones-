import { Router } from "express";
import {
    getEmpleado,
    getOneEmpleado,
    postEmpleado,
    updateEmpleado,
    deleteeEmpleado,
    getEmpleadoBySede
} from "../controller/empleados.controller.js";

const router = Router();

router.get("/", getEmpleado);
router.post("/", postEmpleado);
router.get("/:id", getOneEmpleado);
router.get("/idSede/:id", getEmpleadoBySede);
router.patch("/:id", updateEmpleado);
router.delete("/:id", deleteeEmpleado);

export default router;