import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  bodyPart: String,
  equipment: String,
  gifUrl: String,
  id: String,
  name: String,
  target: String,
});

const Exercises = mongoose.model("exercises", exerciseSchema);
export default Exercises;
