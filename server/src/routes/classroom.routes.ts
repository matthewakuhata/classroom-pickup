import express from "express";
import classroomController from "../controllers/classroom.controller";

const router = express.Router();

router.get("/", classroomController.listClassrooms);
router.post("/", classroomController.createClassroom);

export default router;
