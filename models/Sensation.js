import mongoose from "mongoose";

const sensationSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    description: { type: String, required: true },
    receptor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Receptor' },
  },
  {
    timestamps: true, // for createdAt and updatedAt
    collection: "sensations",
  }
);

export default mongoose.model("Sensation", sensationSchema);