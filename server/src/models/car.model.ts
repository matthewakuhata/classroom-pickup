import mongoose from "mongoose";

const Schema = mongoose.Schema;

const carSchema = new Schema({
  licencePlate: { type: String, required: true, unique: true },
});

export default mongoose.model("Car", carSchema);
