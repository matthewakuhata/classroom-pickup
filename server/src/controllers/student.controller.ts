import { Request, Response, NextFunction } from "express";

import Student from "../models/student.model";
import Classroom from "../models/classroom.model";
import { TypedBodyRequest } from "../types";
import HttpError from "../utils/http-error";
import mongoose, { ObjectId } from "mongoose";

const listStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const students = await Student.find();
    const mappedStudents = students.map((student) =>
      student.toObject({ getters: true })
    );
    res.status(200).json(mappedStudents);
  } catch (error) {
    return next(error);
  }
};

const createStudent = async (
  req: TypedBodyRequest<{
    name: string;
    registrations: string[];
    classroomId: ObjectId;
  }>,
  res: Response,
  next: NextFunction
) => {
  const { name, registrations, classroomId } = req.body;

  try {
    if (!name) {
      throw new Error("Name field is required");
    }

    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      throw new HttpError(`No classroom found with id ${classroomId}`, 400);
    }

    const createdStudent = new Student({
      name,
      cars: registrations || [],
      classroom: classroom.id,
    });

    const session = await mongoose.startSession();
    session.startTransaction();

    await createdStudent.save({ session: session });

    classroom.students.push(createdStudent.id);
    await classroom.save({ session: session });

    await session.commitTransaction();
    res.status(201).json({ id: createdStudent.id });
  } catch (error) {
    return next(error);
  }
};

export default { listStudents, createStudent };
