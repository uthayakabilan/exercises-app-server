import express from "express";
import { getExercisesByName } from "../controllers/exerciseController.js";
const router = express.Router();

router.post("/name", getExercisesByName);

router.post("/", (req, res) => {
  res.send("Search home route");
});

export default router;
