import express from "express";
import { getSpecialtyAndDoctors } from "../controller/specialty.js";
const router = express.Router();

router.get("/:specialty", getSpecialtyAndDoctors);

export default router;
