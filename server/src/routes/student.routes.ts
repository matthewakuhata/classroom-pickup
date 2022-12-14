import express from "express";
import studentController from "../controllers/student.controller";

const router = express.Router();

router.get("/", studentController.listStudents);
router.post("/", studentController.createStudent);
router.patch("/", studentController.updateStudent);

export default router;
