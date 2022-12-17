import { rest } from "msw";

export const handlers = [
  rest.get("/api/v1/car/options", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(["940Z895", "TKDY153"]));
  }),
  rest.get("/api/v1/classroom", (req, res, ctx) => {
    return res(ctx.json(CLASSROOMS));
  }),
  rest.post("/api/v1/car", (req, res, ctx) => {
    return res(ctx.status(201));
  }),
  rest.get("/api/v1/student", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "Linden Wolf",
          id: "5",
          cars: ["940Z895", "TKDY153"],
          classroomId: 1,
        },
        {
          name: "Doyle Bryce",
          id: "6",
          cars: ["940Z895"],
          classroomId: 1,
        },
      ])
    );
  }),
];

const CLASSROOMS = [
  {
    name: "Classroom A",
    students: [
      { name: "Jon Doe", id: "1", cars: ["Q3AWT67"], classroomId: 1 },
      {
        name: "Miriam Fairburn ",
        id: "2",
        cars: ["QS0KZH2"],
        classroomId: 1,
      },
      {
        name: "Dorthy Jack",
        id: "3",
        cars: ["NV37L4O"],
        classroomId: 1,
      },
      {
        name: "Humphrey Chance",
        id: "4",
        cars: ["Q3AWT67", "O10ET9K"],
        classroomId: 1,
      },
      {
        name: "Linden Wolf",
        id: "5",
        cars: ["940Z895", "TKDY153"],
        classroomId: 1,
      },
      {
        name: "Doyle Bryce",
        id: "6",
        cars: ["940Z895", "TKDY153"],
        classroomId: 1,
      },
    ],
  },
];
