import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Student from "../Student";

describe("TESTING Student component", () => {
  describe("GIVEN a Student component is not in an active state", () => {
    describe("WHEN clicking the checkbox", () => {
      test("THEN the checbox is not checked", async () => {
        const onChangeHandler = jest.fn();
        render(
          <Student
            name="jon"
            id="1"
            isActive={false}
            onChangeHandler={onChangeHandler}
          />
        );

        const checkbox = screen.getByRole("checkbox", { name: /jon/i });
        expect(checkbox).toBeInTheDocument();

        await userEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
        expect(onChangeHandler).not.toBeCalled();
      });
    });
  });

  describe("GIVEN a Student component is in an active state", () => {
    describe("WHEN clicking the checkbox", () => {
      test("THEN the checbox is checked", async () => {
        const onChangeHandler = jest.fn();
        render(
          <Student
            name="jon"
            id="1"
            isActive={true}
            onChangeHandler={onChangeHandler}
          />
        );

        const checkbox = screen.getByRole("checkbox", { name: /jon/i });
        expect(checkbox).toBeInTheDocument();

        await userEvent.click(checkbox);
        expect(checkbox).toBeChecked();
        expect(onChangeHandler).toBeCalled();
        expect(onChangeHandler).toBeCalledWith(1);

        await userEvent.click(checkbox);
        expect(onChangeHandler).nthCalledWith(2, -1);
      });
    });
  });
});
