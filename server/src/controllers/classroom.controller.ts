import { Request, Response, NextFunction } from "express";

import { TypedBodyRequest } from "../types";
import Classroom from "../models/classroom.model";
import HttpError from "../utils/http-error";

const listClassrooms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const classrooms = await Classroom.find().populate("students");
    const mappedClassrooms = classrooms.map((classroom) =>
      classroom.toObject({ getters: true })
    );

    res.status(200).json(mappedClassrooms);
  } catch (error: any) {
    return next(new HttpError(error.message, 500));
  }
};

const createClassroom = async (
  req: TypedBodyRequest<{ name: string; students: string[] }>,
  res: Response,
  next: NextFunction
) => {
  const { name, students } = req.body;

  try {
    if (!name) {
      throw new HttpError("Name field is required", 400);
    }

    const createdClassroom = new Classroom({
      name,
      students: students || [],
    });

    await createdClassroom.save();

    res.status(201).json({ id: createdClassroom.id });
  } catch (error) {
    return next(error);
  }
};

export default { listClassrooms, createClassroom };
