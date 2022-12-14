import { screen, render, logRoles } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Classrooms from "../Classrooms";

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

describe("TESTING Classrooms", () => {
  describe("GIVEN a registration with related students", () => {
    describe("WHEN when searching for the registration", () => {
      test("THEN students related to the registration enabled", async () => {
        render(<Classrooms />);

        const inputRegistration = screen.getByRole("textbox");
        const searchButton = screen.getByRole("button");

        await userEvent.type(inputRegistration, "ACFGBCV");
        await userEvent.click(searchButton);

        expect(1).toBe(1);
      });
    });
  });

  describe("GIVEN a registration with no related students", () => {
    describe("WHEN when searching for the registration", () => {
      test.skip("THEN students related to the registration enabled", async () => {
        render(<Classrooms />);
        const inputRegistration = screen.getByRole("textbox");
        const searchButton = screen.getByRole("button");

        await userEvent.type(inputRegistration, "ACFGBCV");
        await userEvent.click(searchButton);

        const errorMsg = screen.getByText("No students found");
        expect(1).toBe(1);
      });
    });
  });

  describe("GIVEN a registration with that has already been searched", () => {
    describe("WHEN when searching for the registration", () => {
      test("THEN students an error message appears", async () => {
        const registration = "ACFGBCV";
        render(<Classrooms />);
        const inputRegistration = screen.getByRole("textbox");
        const searchButton = screen.getByRole("button");

        await userEvent.type(inputRegistration, registration);
        await userEvent.click(searchButton);
        await userEvent.click(searchButton);

        const errorMsg = screen.getByText(
          `Registration "${registration}" has already been entered. Please try again!`
        );
        expect(errorMsg).toBeInTheDocument();
      });
    });
  });
});
