import mongoose from "mongoose";

const Schema = mongoose.Schema;

const classroomSchema = new Schema({
  name: { type: String, required: true },
  students: [
    { type: mongoose.Types.ObjectId, required: false, ref: "Student" },
  ],
});

export default mongoose.model("Classroom", classroomSchema);
