import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import session from "express-session";
import "./setup/mongoDbSetup.js";
import bodyPartRoute from "./routes/bodyPart.js";
import searchRoute from "./routes/searchRoute.js";
const port = process.env.EXERCISES_APP_SERVER_PORT;
import { sessionOptions, corsOptions } from "./utils/authUtils.js";
import authRoute from "./routes/authRoute.js";
import saveRoute from "./routes/saveRoute.js";
// import morgan from "morgan";
import cors from "cors";

const app = express();
app.use(cors(corsOptions));
// app.use(morgan("combined"));
// app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`Server listening on port : ${port}`);
});
app.use(session(sessionOptions));

app.get("/", (req, res) => {
  res.send("Welcome to Exercises app server");
});

app.use("/bodypart", bodyPartRoute);
app.use("/search", searchRoute);
app.use("/auth", authRoute);
app.use("/save", saveRoute);
