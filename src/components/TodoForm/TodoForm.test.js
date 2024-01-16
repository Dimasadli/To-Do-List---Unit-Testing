import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoForm from "./TodoForm";

test("Renders Todo Form", async () => {
  const mock = jest.fn();

  render(<TodoForm addTodo={mock} />);

  const input = screen.getByRole("textbox");
  const buttonSubmit = screen.getByRole("button", { name: "Add Task" });

  expect(input).toBeInTheDocument();
  expect(buttonSubmit).toBeInTheDocument();

  await userEvent.click(buttonSubmit);

  expect(mock).not.toHaveBeenCalled();

  await userEvent.type(input, "abcde");
  await userEvent.click(buttonSubmit);

  expect(mock).toHaveBeenCalled();
});
