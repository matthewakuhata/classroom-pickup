import request from "supertest";
import app from "../routes/app";
import Classroom from "../models/classroom.model";
import Car from "../models/car.model";
import Student from "../models/student.model";

describe("TESTING POST /car", () => {
  describe("GIVEN all data is valid", () => {
    describe("WHEN calling POST /car", () => {
      test(`THEN a 201 rensponse is returned with a car id`, async () => {
        const classroom = new Classroom({
          name: "Test Classroom A",
          students: [],
        });
        await classroom.save();

        const student1 = new Student({
          name: "Jonny",
          classroom: classroom.id,
        });
        await student1.save();

        const licencePlate = "ASDFV12";
        const students = [student1.id];

        const response = await request(app).post("/car").send({
          licencePlate,
          students,
        });

        expect(response.statusCode).toEqual(201);
        expect(response.body.id).toBeDefined();

        const updatedStudent = await Student.findById(student1.id);
        expect(updatedStudent?.cars).toContain(licencePlate);
      });
    });
  });

  describe("GIVEN an invalid licencePlate", () => {
    describe("WHEN calling POST /car", () => {
      test("THEN a 400 error response is returned", async () => {
        const response = await request(app).post("/car").send({
          licencePlate: "",
        });

        expect(response.statusCode).toEqual(400);
        expect(response.body).toEqual({
          message: "Licence Plate is requried",
        });
      });
    });
  });

  describe("GIVEN an duplicate licence plate", () => {
    describe("WHEN calling POST /car", () => {
      test("THEN a 400 error response is returned", async () => {
        const licencePlate = "ASDFV12";
        await new Car({
          licencePlate,
          students: [],
        }).save();

        const response = await request(app).post("/car").send({
          licencePlate,
          students: [],
        });

        expect(response.statusCode).toEqual(400);
        expect(response.body).toEqual({
          message:
            'E11000 duplicate key error collection: test.cars index: licencePlate_1 dup key: { licencePlate: "ASDFV12" }',
        });
      });
    });
  });
});

describe("TESTING GET /car/options", () => {
  describe("GIVEN some cars are registered in the database", () => {
    describe("WHEN calling GET /car/options", () => {
      test("THEN a list of all registered licence plates are returned", async () => {
        const car1 = await new Car({
          licencePlate: "ASDFV12",
          students: [],
        });

        const car2 = await new Car({
          licencePlate: "ASDFV123",
          students: [],
        });
        car1.save();
        car2.save();

        const response = await request(app).get("/car/options").send();

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual(
          expect.arrayContaining([car1.licencePlate, car2.licencePlate])
        );
      });
    });
  });
});
