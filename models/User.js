import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: String,
    roomId: String,
    socketId: String,
  },
  {
    timestamps: true, // for createdAt and updatedAt
    collection: "users",
  }
);

userSchema.statics.createUser = async function (username, roomId) {
  try {
    const user = await this.create({ username, roomId });
    return user;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.deleteUser = async function ({ socketId }) {
  try {
    await this.deleteOne({ socketId });
    console.log("deleted user from database", socketId);
  } catch (error) {
    throw error;
  }
};

userSchema.statics.findUser = async function (socketId) {
  try {
    return await this.findOne({ socketId }).exec();
  } catch (error) {
    throw error;
  }
};

userSchema.statics.findAndUpdate = async function (username, roomId, socketId) {
  try {
    await this.findOneAndUpdate({ username, roomId }, { socketId });
  } catch (error) {
    throw error;
  }
};

export default mongoose.model("User", userSchema);
