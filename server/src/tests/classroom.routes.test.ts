import request from "supertest";
import app from "../routes/app";
import Classroom from "../models/classroom.model";

describe("TESTING POST /classroom", () => {
  describe("GIVEN all data is valid", () => {
    describe("WHEN calling POST /classroom", () => {
      test(`THEN a 201 rensponse is returned with a classroom id`, async () => {
        const name = "Classroom Testing123";
        const response = await request(app).post("/classroom").send({
          name,
        });

        expect(response.statusCode).toEqual(201);
        expect(response.body.id).toBeDefined();
      });
    });
  });

  describe("GIVEN an invalid name", () => {
    describe("WHEN calling POST /classroom", () => {
      test("THEN a 400 error response is returned", async () => {
        const response = await request(app).post("/classroom").send({
          name: "",
        });

        expect(response.statusCode).toEqual(400);
        expect(response.body).toEqual({ message: "Name field is required" });
      });
    });
  });
});

describe("TESTING GET /classroom", () => {
  describe("GIVEN some classrooms in the database", () => {
    describe("WHEN calling GET /classroom", () => {
      test("THEN a list of all classrooms are returned", async () => {
        const classroomA = new Classroom({
          name: "Test Classroom A",
          students: [],
        });
        const classroomB = new Classroom({
          name: "Test Classroom A",
          students: [],
        });
        await classroomA.save();
        await classroomB.save();

        const response = await request(app).get("/classroom");

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ id: classroomA.id }),
            expect.objectContaining({ id: classroomB.id }),
          ])
        );
      });
    });
  });
});
