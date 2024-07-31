import express from "express";
import {
  getDoctors,
  // getOpenAIresp,
  // getSpecialityAndDoctors,
} from "../controller/specialty.js";
const router = express.Router();

// router.post("/openAi", getOpenAIresp);
router.get("/doctors",getDoctors)
// router.get("/:speciality", getSpecialityAndDoctors);

export default router;
