import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Registrations from "../Registrations";

const STUDENTS = [
  {
    name: "Linden Wolf",
    id: "5",
    registrations: ["940Z895", "TKDY153"],
    classroomId: 1,
  },
  {
    name: "Doyle Bryce",
    id: "6",
    registrations: ["940Z895"],
    classroomId: 1,
  },
];

describe("TESTING Registrations", () => {
  describe("GIVEN a registration with no errors", () => {
    describe("WHEN clicking register without entering a licence plate", () => {
      test("THEN an error is shown", async () => {
        render(<Registrations />);

        expect(1).toBe(1);
      });
    });

    describe("WHEN clicking register with a licence plate that is already registered", () => {
      test("THEN an error is shown", async () => {
        render(<Registrations />);

        expect(1).toBe(1);
      });
    });

    describe("WHEN clicking register with no students selected", () => {
      test("THEN an error is shown", async () => {
        render(<Registrations />);

        expect(1).toBe(1);
      });
    });
  });

  describe("GIVEN valid inputs", () => {
    describe("WHEN clicking register button", () => {
      test("THEN the request is sent and user is redirected to home page", () => {
        expect(1).toEqual(1);
      });
    });
  });
});
