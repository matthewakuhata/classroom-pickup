import express, { Request, Response, NextFunction } from "express";

import studentRouter from "./student.routes";
import classroomRouter from "./classroom.routes";
import carRouter from "./car.routes";
import HttpError from "../utils/http-error";

const api = express.Router();
api.use(express.json());

api.use("/student", studentRouter);
api.use("/classroom", classroomRouter);
api.use("/car", carRouter);

/**
 * Unknown API routes handling
 */
api.use((req, res, next) => {
  throw new HttpError(`Unkown path ${req.method} ${req.path}`, 404);
});

/**
 * Error Handling
 */
api.use((error: HttpError, _: Request, res: Response, next: NextFunction) => {
  if (!error.code || !error.message) {
    error = new HttpError(error.message, error.code);
  }

  if (res.headersSent) {
    return next(error);
  }

  res.status(error.code);
  res.json({ message: error.message });
});

export default api;
