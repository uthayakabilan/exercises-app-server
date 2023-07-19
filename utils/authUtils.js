import dotenv from "dotenv";
dotenv.config();
import MongoStore from "connect-mongo";

const mongoConnectionString =
  process.env.EXERCISES_APP_SERVER_MONGODB_CONNECTION_STRING;

export const getUserName = (email) => {
  const words = email.split("@");
  let letters = words[0].split("");
  letters[0] = letters[0].toUpperCase();
  return letters.join("");
};

const store = MongoStore.create({
  mongoUrl: mongoConnectionString,
});

const defaultCookie = {
  path: "/",
  httpOnly: true,
  secure: false,
  maxAge: 6.048e8,
  sameSite: "lax",
};

export const sessionOptions = {
  secret: "secret key",
  saveUninitialized: false,
  resave: false,
  store,
  cookie: defaultCookie,
};

export const corsOptions = {
  origin: [
    "https://exercises-app-client.onrender.com/",
    process.env.EXERCISES_APP_CLIENT_ADDRESS,
  ],
  // origin: "*",
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  credentials: true,
};
