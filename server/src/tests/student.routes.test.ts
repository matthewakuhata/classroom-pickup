import request from "supertest";
import app from "../routes/app";
import Classroom from "../models/classroom.model";
import Student from "../models/student.model";

describe("TESTING POST /student", () => {
  describe("GIVEN a valid name and classroomId", () => {
    describe("WHEN calling POST /student", () => {
      test(`THEN a 201 rensponse is returned with a studentId
      AND classroom model is updated with the new student`, async () => {
        const classroom = new Classroom({
          name: "Test Classroom A",
          students: [],
        });
        await classroom.save();

        const response = await request(app).post("/student").send({
          name: "John",
          classroomId: classroom.id,
          registrations: [],
        });

        expect(response.statusCode).toEqual(201);
        expect(response.body.id).toBeDefined();

        const updateClassroom = await Classroom.findById(classroom.id);

        expect(updateClassroom?.students.toString()).toContain(
          response.body.id
        );
      });
    });
  });

  describe("GIVEN an invalid name", () => {
    describe("WHEN calling POST /student", () => {
      test("THEN a 404 error response is returned", async () => {
        const classroom = new Classroom({
          name: "Test Classroom A",
          students: [],
        });
        await classroom.save();

        const response = await request(app).post("/student").send({
          name: "",
          classroomId: classroom.id,
          registrations: [],
        });

        expect(response.statusCode).toEqual(404);
        expect(response.body).toEqual({ message: "Name field is required" });
      });
    });
  });

  describe("GIVEN an invalid classroomId", () => {
    describe("WHEN calling POST /student", () => {
      test("THEN a 400 error response is returned", async () => {
        const invalidId = "639d2dbe0fe8f7ea054bf4ab";
        const response = await request(app).post("/student").send({
          name: "Classroom A",
          classroomId: invalidId,
          registrations: [],
        });

        expect(response.statusCode).toEqual(400);
        expect(response.body).toEqual({
          message: `No classroom found with id ${invalidId}`,
        });
      });
    });
  });
});

describe("TESTING GET /student", () => {
  describe("GIVEN some students in the database", () => {
    describe("WHEN calling GET /student", () => {
      test("THEN a list of all students are returned", async () => {
        const classroom = new Classroom({
          name: "Test Classroom A",
          students: [],
        });
        await classroom.save();

        const student1 = new Student({
          name: "Jonny",
          classroom: classroom.id,
        });
        const student2 = new Student({
          name: "Jim",
          classroom: classroom.id,
        });
        await student1.save();
        await student2.save();

        const response = await request(app).get("/student");

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ id: student1.id }),
            expect.objectContaining({ id: student2.id }),
          ])
        );
      });
    });
  });
});
