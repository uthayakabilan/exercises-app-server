import express from "express";
import {
  getSavedExercises,
  removeExercise,
  saveExercise,
} from "../controllers/exerciseController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("save home route");
});
router.post("/", saveExercise);
router.post("/getsaved", getSavedExercises);
router.post("/removesaved", removeExercise);

export default router;
