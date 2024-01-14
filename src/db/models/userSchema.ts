import mongoose from "mongoose";
import { IUser } from "@/src/types/types";

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, unique: true },
  displayName: String,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
