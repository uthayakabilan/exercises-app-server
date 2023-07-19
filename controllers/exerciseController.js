import { isBodyPartValid } from "../utils/bodyPartUtils.js";
import * as DB from "../db/dbActions.js";
import { getUrlByID } from "../utils/getSignedUrl.js";

export const getExercisesByBodyPart = async (req, res) => {
  try {
    const bodyPart = req.params.bodyPart;
    if (bodyPart && isBodyPartValid(bodyPart)) {
      const data = await DB.getByBodyPart(bodyPart);
      const urlData = await Promise.all(
        data.map(async (exercise) => {
          return {
            ...exercise._doc,
            gifUrl: await getUrlByID(exercise.id),
          };
        })
      );
      res.status(200).json(urlData);
    } else {
      res.status(404).json({
        message: `No body part found for : ${req.params.bodyPart}`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getExercisesByName = async (req, res) => {
  try {
    const { name } = req.body;
    if (name && name.length != 0) {
      const data = await DB.getByName(name);
      const urlData = await Promise.all(
        data.map(async (exercise) => {
          return {
            ...exercise._doc,
            gifUrl: await getUrlByID(exercise.id),
          };
        })
      );
      res.status(200).json(urlData);
    } else {
      res.status(404).json({
        message: `No exercise found for : ${name}`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const saveExercise = async (req, res) => {
  try {
    const { exerciseID, email } = req.body;
    if (exerciseID && email) {
      const user = await DB.getUserByEmail(email);
      if (user) {
        if (!user.saved_exercises.includes(exerciseID)) {
          user.saved_exercises.push(exerciseID);
          await user.save();
          res.status(200).json({
            message: `exercise : ${exerciseID} saved to the user : ${user._id} with email : ${user.email}`,
          });
        } else {
          return res.status(200).json({
            message: "exercise already saved",
          });
        }
      } else {
        res.status(403).json({
          message: "user does not exist",
        });
      }
    } else {
      res.status(400).json({
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const removeExercise = async (req, res) => {
  try {
    const { exerciseID, email } = req.body;
    if (exerciseID && email) {
      const user = await DB.getUserByEmail(email);
      if (user) {
        if (user.saved_exercises.includes(exerciseID)) {
          user.saved_exercises.pull(exerciseID);
          await user.save();
          res.status(200).json({
            message: `exercise : ${exerciseID} removed from the user : ${user._id} with email : ${user.email}`,
          });
        } else {
          return res.status(200).json({
            message: `exercise : ${exerciseID} not present in user : ${user.email}`,
          });
        }
      } else {
        res.status(403).json({
          message: "user does not exist",
        });
      }
    } else {
      res.status(400).json({
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getSavedExercises = async (req, res) => {
  try {
    const { email } = req.body;
    if (email) {
      const user = await DB.getUserByEmail(email);
      if (user) {
        if (user.saved_exercises.length > 0) {
          const savedExercises = await DB.getSavedExercisesByUser(user);
          if (savedExercises) {
            res.status(200).json(savedExercises[0].result);
          } else {
            res.status(500).json({ message: "Internal DB Error" });
          }
        } else {
          return res.status(200).json({
            message: "no saved exercises",
          });
        }
      } else {
        res.status(403).json({
          message: "user does not exist",
        });
      }
    } else {
      res.status(400).json({
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
