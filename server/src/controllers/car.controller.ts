import { Request, Response, NextFunction } from "express";
import mongoose, { ObjectId } from "mongoose";

import { TypedBodyRequest } from "../types";
import Car from "../models/car.model";
import Student from "../models/student.model";
import HttpError from "../utils/http-error";

const getLicencePlateOptions = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cars = await Car.find().select("licencePlate");
    const licensePlates = cars.map((car) => car.licencePlate);
    res.status(200).json(licensePlates);
  } catch (error) {
    return next(error);
  }
};

const registerCar = async (
  req: TypedBodyRequest<{
    licencePlate: string;
    students: ObjectId[];
  }>,
  res: Response,
  next: NextFunction
) => {
  const { licencePlate, students } = req.body;

  if (!licencePlate) {
    return next(new HttpError("Licence Plate is requried", 400));
  }

  const car = new Car({
    licencePlate,
  });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await car.save({ session: session });
  } catch (error: any) {
    return next(new HttpError(error.message, 400));
  }

  try {
    await Student.updateMany(
      {
        _id: {
          $in: students,
        },
      },
      { $push: { cars: licencePlate } },
      {
        session: session,
      }
    );
  } catch (error) {
    return next(
      new HttpError("Failed to update students. Please try again", 400)
    );
  }

  await session.commitTransaction();
  res.status(201).json({ id: car.id });
};

export default { getLicencePlateOptions, registerCar };
