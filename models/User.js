import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: String,
    //   default: () => uuidv4().replace(/\-/g, ""),
    // },
    name: String,
  },
  {
    timestamps: true, // for createdAt and updatedAt
    collection: "users",
  }
);

userSchema.statics.createUser = async function (name) {
  try {
    const user = await this.create({ name });
    return user;
  } catch (error) {
    throw error;
  }
};

export default mongoose.model("User", userSchema);
