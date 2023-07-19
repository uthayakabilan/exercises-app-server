import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoString = process.env.EXERCISES_APP_SERVER_MONGODB_CONNECTION_STRING;
mongoose
  .connect(mongoString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((e) => console.log(e));
