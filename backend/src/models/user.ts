import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// define the shape of user data
export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

// define the schema for the user model
const userScheme = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

/**
 * A pre-save hook / middleware that hashes the user's password using bcrypt before saving it to the database.
 * @param next - a function that must be called to continue the save process.
 */
userScheme.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

/**
 * creates a new mongoose model for a user.
 * @param {mongoose.Schema} userScheme - schema for the user model.
 * @returns {mongoose.Model<UserType>} - user model.
 */
const User = mongoose.model<UserType>("User", userScheme);

export default User;
