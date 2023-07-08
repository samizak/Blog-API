import User from "../model/User";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import passport from "passport";

require("dotenv").config();

const Login = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("login", async (err: any, user: any, info: any) => {
    try {
      if (!user) {
        res.status(400).send("User not found");
        return next();
      }
      if (err) {
        const error = new Error("An error occurred.");
        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, username: user.username };
        const token = jwt.sign({ user: body }, process.env.JWT_KEY!, {
          expiresIn: "1d",
        });

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

const Register = async (req: Request, res: Response, next: NextFunction) => {
  // check if username exists
  const userExists = await User.find({ username: req.body.username });
  if (userExists.length > 0) {
    return res.status(409).json({
      error: "Username already exists",
    });
  }
  User.create({ username: req.body.username, password: req.body.password }, (err, user) => {
    if (err) return next(err);
    jwt.sign(
      { _id: user._id, username: user.username },
      process.env.JWT_KEY!,
      { expiresIn: "5m" },
      (err: any, token: any) => {
        if (err) return next(err);
        return res.status(200).json({
          token,
          user: {
            _id: user._id,
            username: user.username,
          },
          message: "Signup successful",
        });
      }
    );
  });
  res.status(200).send("registered");
};

const Delete = async (req: Request, res: Response) => {
  User.findOneAndDelete({ _id: req.params.id }, (err: any, member: any) => {
    if (!err && member) {
      return res.status(200).json(member);
    }

    return res.status(500).json(err);
  });
};

const GetUsers = async (req: Request, res: Response) => {
  User.find()
    .sort([["username", "ascending"]] as any)
    .exec((err, users) => {
      if (err) return res.status(200).json(err);
      return res.status(500).json(users);
    });
};

export { Login, Register, Delete, GetUsers };
