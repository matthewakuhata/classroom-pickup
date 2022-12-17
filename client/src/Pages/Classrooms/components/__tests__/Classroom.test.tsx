import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Classroom from "../Classroom";

const STUDENTS = [
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
  {
    name: "Matthew A",
    id: "7",
    cars: ["VEDFGT4"],
    classroomId: 1,
  },
];
describe("TESTING Classroom", () => {
  describe("GIVEN a class room with registration input", () => {
    describe("WHEN rendering the classroom", () => {
      test("THEN students related to the registration are highlighted", () => {
        const { container } = render(
          <Classroom students={STUDENTS} registration={"TKDY153"} />
        );
        expect(container).toMatchSnapshot();
      });
    });
  });

  describe("GIVEN a classroom with some students", () => {
    describe("WHEN rendering the classroom with no registration", () => {
      test("THEN the student are displayed with a checkbox that is disbabled", () => {
        render(<Classroom students={STUDENTS} registration={""} />);

        STUDENTS.forEach((student) => {
          const checkbox = screen.getByRole("checkbox", { name: student.name });
          expect(checkbox).toBeInTheDocument();
          expect(checkbox).toBeDisabled();
        });
      });
    });

    describe("WHEN rendering the classroom with a registration", () => {
      test("THEN the student related to the registration are enabled", async () => {
        render(<Classroom students={STUDENTS} registration={"TKDY153"} />);

        const checkbox = screen.getByRole("checkbox", { name: "Linden Wolf" });
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toBeEnabled();

        await userEvent.click(checkbox);
        expect(checkbox).toBeChecked();
      });
    });

    describe("WHEN selecting some students", () => {
      test("THEN the number of student that have been pickedup increases", async () => {
        render(<Classroom students={STUDENTS} registration={"940Z895"} />);

        const checkbox1 = screen.getByRole("checkbox", { name: "Linden Wolf" });
        const checkbox2 = screen.getByRole("checkbox", { name: "Doyle Bryce" });
        const pickedup = screen.getByText(/picked up/i);
        expect(pickedup).toHaveTextContent("0 / 3");

        await userEvent.click(checkbox1);
        expect(pickedup).toHaveTextContent("1 / 3");

        await userEvent.click(checkbox2);
        expect(pickedup).toHaveTextContent("2 / 3");
      });
    });

    describe("WHEN deselecting some students", () => {
      test("THEN the number of student that have been pickedup decreases", async () => {
        render(<Classroom students={STUDENTS} registration={"940Z895"} />);

        const checkbox1 = screen.getByRole("checkbox", { name: "Linden Wolf" });
        const checkbox2 = screen.getByRole("checkbox", { name: "Doyle Bryce" });
        const pickedup = screen.getByText(/picked up/i);
        await userEvent.click(checkbox1);
        await userEvent.click(checkbox2);

        expect(pickedup).toHaveTextContent("2 / 3");

        await userEvent.click(checkbox2);
        expect(pickedup).toHaveTextContent("1 / 3");
      });
    });
  });
});
