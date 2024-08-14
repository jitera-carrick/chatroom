import mongoose from "mongoose";
import { Schema } from "mongoose";

const receptorSchema = new Schema(
  {
    type: { type: String, required: true },
    function: { type: String, required: true },
    location: { type: String, required: true },
  },
  {
    timestamps: true, // for createdAt and updatedAt
    collection: "receptors",
  }
);

receptorSchema.virtual('sensations', {
  ref: 'Sensation',
  localField: '_id',
  foreignField: 'receptor_id',
});

export default mongoose.model("Receptor", receptorSchema);