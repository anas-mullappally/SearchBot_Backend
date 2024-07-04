import express from "express";
import { getSpecialityAndDoctors } from "../controller/specialty.js";
const router = express.Router();

router.get("/:speciality", getSpecialityAndDoctors);

export default router;
