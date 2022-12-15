import mongoose from "mongoose";
// import uniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: { type: String, required: true },
  cars: [{ type: String, required: false, ref: "Car" }],
  classroom: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Classroom",
  },
});

export default mongoose.model("Student", studentSchema);
