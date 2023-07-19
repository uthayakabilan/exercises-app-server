import express from "express";
import { getExercisesByBodyPart } from "../controllers/exerciseController.js";
const router = express.Router();

router.get("/:bodyPart", getExercisesByBodyPart);
router.get("/", (req, res) => {
  res.send("Body part home route");
});

export default router;
