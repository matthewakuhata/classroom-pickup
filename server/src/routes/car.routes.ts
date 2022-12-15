import express from "express";
import carController from "../controllers/car.controller";

const router = express.Router();

router.get("/options", carController.getLicencePlateOptions);
router.post("/", carController.registerCar);

export default router;
