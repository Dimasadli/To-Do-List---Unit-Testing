import { render, screen } from "@testing-library/react";
import EditTodoForm from "./EditTodoForm";
import userEvent from "@testing-library/user-event";

test("Renders Edit Form", async () => {
  const mock = jest.fn();

  const mockTask = {
    id: Math.floor(Math.random() * 100),
    task: "Testing",
    completed: false,
    isEditing: false,
  };

  render(<EditTodoForm editTodo={mock} task={mockTask} />);

  const input = screen.getByRole("textbox");
  const buttonSubmit = screen.getByRole("button", { name: "Add Task" });

  expect(input).toBeInTheDocument();
  expect(buttonSubmit).toBeInTheDocument();

  await userEvent.type(input, "abcde");
  await userEvent.click(buttonSubmit);

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith("Testingabcde", mockTask.id);
});
