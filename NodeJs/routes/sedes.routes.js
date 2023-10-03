import { Router } from "express";
import {
    getSede,
    getOneSede,
    postSede,
    updateSede,
    deleteeSede,
} from "../controller/sedes.controller.js";

const router = Router();

router.get("/", getSede);
router.post("/", postSede);
router.get("/:id", getOneSede);
router.patch("/:id", updateSede);
router.delete("/:id", deleteeSede);

export default router;