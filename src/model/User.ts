import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

export interface IUser {
  username: string;
  password: string;
  isValidPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password!, 10);
  this.password = hash;
  next();
});

userSchema.method("isValidPassword", async function fullName(password: string) {
  const user: IUser = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
});

export default model<IUser>("User", userSchema);
