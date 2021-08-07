import mongoose from "mongoose";

const room = new mongoose.Schema(
  {
    roomId: String,
  },
  {
    timestamps: true, // for createdAt and updatedAt
    collection: "rooms",
  }
);

room.statics.createRoom = async function (roomId) {
  try {
    const room = await this.create({ roomId });
    return room;
  } catch (error) {
    throw error;
  }
};

export default mongoose.model("Room", room);
