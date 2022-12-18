import { screen, render, waitFor, findByRole } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
// import userEvent from "@testing-library/user-event";
// import { BrowserRouter } from "react-router-dom";
// import Registrations from "../Registrations";
import UpdateRegistration from "../UpdateRegistraion";
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
];

const PLATES = ["940Z895", "TKDY153"];

describe("TESTING UpdateRegistration", () => {
  jest.spyOn(window, "alert").mockImplementation(() => {});

  describe("GIVEN the UpdateRegistration component is initially rendered", () => {
    describe("WHEN clicking update with no student selected", () => {
      test("THEN an error message appears", async () => {
        render(<UpdateRegistration students={[]} licencePlates={[]} />, {
          wrapper: BrowserRouter,
        });
        const button = screen.getByRole("button", { name: /update/i });

        userEvent.click(button);
        const error = screen.getByText(/please select a student/i);

        expect(error).toBeInTheDocument();

        const studentInput = await screen.findByRole("combobox", {
          name: /update-student/i,
        });

        userEvent.click(studentInput);
        expect(error).not.toBeInTheDocument();
      });
    });
  });
  describe("GIVEN valid update data", () => {
    describe("WHEN clicking update", () => {
      test("THEN student updates sucessfully AND success message is shown", async () => {
        render(
          <UpdateRegistration
            students={[...STUDENTS]}
            licencePlates={[...PLATES]}
          />,
          {
            wrapper: BrowserRouter,
          }
        );
        const button = screen.getByRole("button", { name: /update/i });
        const studentInput = await screen.findByRole("combobox", {
          name: /update-student/i,
        });
        const licenceInput = await screen.findByRole("combobox", {
          name: /update-licence-plates/i,
        });

        userEvent.type(studentInput, "Doyle Bryce{enter}");
        userEvent.type(licenceInput, "TKDY153{enter}");
        userEvent.click(button);

        // const alerts = await screen.findAllByRole("alert");
        await waitFor(() => {
          expect(window.alert).toHaveBeenCalledTimes(1);
        });
        expect(window.alert).toHaveBeenCalledWith(
          expect.stringContaining("Successfully updated")
        );
      });
    });
  });
});
