import Exercises from "../models/exerciseModel.js";
import User from "../models/userModel.js";

export const getByBodyPart = async (bodyPart) => {
  const data = await Exercises.find({ bodyPart }).limit(20);
  return data;
};

export const getByName = async (name) => {
  const data = await Exercises.find({ name: new RegExp(name, "i") }).limit(30);
  return data;
};

export const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (user) {
    return user;
  }
  return false;
};

export const getSavedExercisesByUser = async (user) => {
  const result = await User.aggregate([
    {
      $match: { email: user.email },
    },
    {
      $lookup: {
        from: "exercises",
        localField: "saved_exercises",
        foreignField: "id",
        as: "result",
      },
    },
    {
      $project: {
        _id: 0,
        result: 1,
      },
    },
  ]);
  if (result) {
    return result;
  } else {
    return false;
  }
};
