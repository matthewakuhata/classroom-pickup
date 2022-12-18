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

describe("TESTING PUT /student", () => {
  describe("GIVEN a valid students id and some updated fields", () => {
    describe("WHEN calling PUT /student", () => {
      test("THEN 200 response is returned with the student id", async () => {
        const classroom = new Classroom({
          name: "Test Classroom A",
          students: [],
        });
        await classroom.save();

        const newClassroom = new Classroom({
          name: "Test Classroom B",
          students: [],
        });
        await newClassroom.save();

        const student = new Student({
          name: "Jonny",
          classroom: classroom.id,
        });
        await student.save();

        const updatedInfo = {
          id: student.id,
          name: "Jon",
          classroomId: newClassroom.id,
        };
        const response = await request(app).patch("/student").send(updatedInfo);

        expect(response.statusCode).toEqual(200);
        expect(response.body.id).toEqual(student.id);

        const updatedStudent = await Student.findById(student.id);
        expect(updatedStudent?.name).toEqual(updatedInfo.name);
        expect(updatedStudent?.classroom.toString()).toEqual(
          updatedInfo.classroomId
        );
      });
    });
  });

  describe("GIVEN an invalid classroomId", () => {
    describe("WHEN calling PUT /student", () => {
      test("THEN 400 response is returned", async () => {
        const classroom = new Classroom({
          name: "Test Classroom A",
          students: [],
        });
        await classroom.save();

        const newClassroom = new Classroom({
          name: "Test Classroom B",
          students: [],
        });

        const student = new Student({
          name: "Jonny",
          classroom: classroom.id,
        });
        await student.save();

        const updatedInfo = {
          id: student.id,
          name: "Jon",
          classroomId: newClassroom.id,
        };
        const response = await request(app).patch("/student").send(updatedInfo);

        expect(response.statusCode).toEqual(400);
        expect(response.body.message).toEqual("Could not find classroom");
      });
    });
  });

  describe("GIVEN an invalid studentId", () => {
    describe("WHEN calling PUT /student", () => {
      test("THEN 400 response is returned", async () => {
        const classroom = new Classroom({
          name: "Test Classroom A",
          students: [],
        });
        await classroom.save();

        const student = new Student({
          name: "Jonny",
          classroom: classroom.id,
        });

        const updatedInfo = {
          id: student.id,
          name: "Jon",
          classroomId: classroom.id,
        };
        const response = await request(app).patch("/student").send(updatedInfo);

        expect(response.statusCode).toEqual(400);
        expect(response.body.message).toEqual("Could not find student");
      });
    });
  });
});
