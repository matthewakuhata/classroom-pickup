import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Registrations from "../Registrations";

describe("TESTING Registrations", () => {
  describe("GIVEN a registration with no errors", () => {
    describe("WHEN clicking register without entering a licence plate or students", () => {
      test("THEN an error is shown for both fields and register is disabled", async () => {
        render(<Registrations />, { wrapper: BrowserRouter });

        const studentInput = await screen.findByRole("combobox", {
          name: /related-students/i,
        });
        const licenceInput = await screen.findByRole("textbox", {
          name: "Licence Plate",
        });
        const registerButton = await screen.findByRole("button", {
          name: /Register/i,
        });

        userEvent.clear(studentInput);
        userEvent.clear(licenceInput);
        userEvent.click(registerButton);

        expect(registerButton).toBeDisabled();

        const errorTextStudent = screen.getByText(
          /Please select at least one student!/i
        );
        const errorTextPlate = screen.getByText(
          /Please Enter a valid licence plate/i
        );
        expect(registerButton).toBeDisabled();
        expect(errorTextStudent).toBeInTheDocument();
        expect(errorTextPlate).toBeInTheDocument();
      });
    });

    describe("WHEN clicking register with a licence plate that is already registered", () => {
      test("THEN an error is shown", async () => {
        render(<Registrations />, { wrapper: BrowserRouter });
        const registeredPlate = "TKDY153";

        const licenceInput = await screen.findByRole("textbox", {
          name: "Licence Plate",
        });
        const registerButton = await screen.findByRole("button", {
          name: /Register/i,
        });

        userEvent.type(licenceInput, registeredPlate);
        userEvent.click(registerButton);

        const errorTextPlate = screen.getByText(
          /Licence plate already registered! Please enter a new one./i
        );

        expect(errorTextPlate).toBeInTheDocument();
      });
    });
  });

  describe("GIVEN valid inputs", () => {
    describe("WHEN clicking register button", () => {
      test("THEN the request is sent and no errors occured", async () => {
        render(
          <BrowserRouter>
            <Registrations />
          </BrowserRouter>
        );

        const newPlate = "QASDFY7";
        const licenceInput = await screen.findByRole("textbox", {
          name: "Licence Plate",
        });
        const registerButton = await screen.findByRole("button", {
          name: /Register/i,
        });

        const studentInput = await screen.findByRole("combobox", {
          name: /related-students/i,
        });

        userEvent.type(studentInput, "Linden Wolf{enter}");
        userEvent.type(licenceInput, newPlate);
        userEvent.click(registerButton);

        const errorTextPlate1 = screen.queryByText(
          /Licence plate already registered! Please enter a new one./i
        );
        const errorTextPlate2 = screen.queryByText(
          /Please Enter a valid licence plate/i
        );
        const errorTextStudent = screen.queryByText(
          /Please select at least one student!/i
        );

        expect(errorTextPlate1).not.toBeInTheDocument();
        expect(errorTextPlate2).not.toBeInTheDocument();
        expect(errorTextStudent).not.toBeInTheDocument();
      });
    });
  });
});
