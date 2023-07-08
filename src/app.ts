import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { blogsRouter } from "./routes/blog";

import passport from "passport";
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

import { authRouter } from "./routes/userAthentication";
import User from "./model/User";

dotenv.config();

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username: string, password: string, done: any) => {
      try {
        const user = await User.findOne({ username });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_KEY,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), //ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async (token: any, done: any) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Check if MONGO_URL is in .env file
if (process.env.MONGO_URL == null) {
  throw new Error("MONGO_URL not specified in .env file!");
}

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(passport.initialize());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

connectDB();

// middleware
app.use(cors()); // enable cors
app.use(express.json()); // parse json request body
app.use(express.urlencoded({ extended: true })); // parse urlencoded request body

// routes
app.use("/api/v1/", blogsRouter);
app.use("/", authRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
