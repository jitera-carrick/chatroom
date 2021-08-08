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

userSchema.statics.deleteUser = async function (name, roomId) {
  try {
    await this.delete({ name, roomId });
    console.log("deleted user from database", name, roomId);
  } catch (error) {
    throw error;
  }
};

userSchema.statics.findUser = async function (name, roomId) {
  try {
    await this.find({ name, roomId });
  } catch (error) {
    throw error;
  }
};

export default mongoose.model("User", userSchema);
