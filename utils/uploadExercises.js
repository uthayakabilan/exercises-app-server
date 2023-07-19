import Exercises from "../models/exerciseModel.js";
import { exercises } from "./exerciseData.js";

export const saveToDB = async () => {
  exercises.map(async (exercise) => {
    try {
      await Exercises.create(exercise);
      console.log(`${exercise.name} saved`);
    } catch (error) {
      console.log(error);
    }
  });
  console.log("exercises saved");
};
