const bodyPartList = [
  "back",
  "cardio",
  "chest",
  "lower arms",
  "lower legs",
  "neck",
  "shoulders",
  "upper arms",
  "upper legs",
  "waist",
];

export const isBodyPartValid = (bodyPart) => {
  return bodyPartList.includes(bodyPart);
};
