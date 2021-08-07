import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    roomId: String,
  },
  {
    timestamps: true, // for createdAt and updatedAt
    collection: "users",
  }
);

userSchema.statics.createUser = async function (name, roomId) {
  try {
    const user = await this.create({ name, roomId });
    return user;
  } catch (error) {
    throw error;
  }
};

export default mongoose.model("User", userSchema);
