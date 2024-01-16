import { render, screen } from "@testing-library/react";
import Todo from "./Todo";
import userEvent from "@testing-library/user-event";

test("Renders Todo", async () => {
  const mockTask = {
    id: Math.floor(Math.random() * 100),
    task: "Testing",
    completed: false,
    isEditing: false,
  };

  const mockFn = jest.fn();
  render(
    <Todo
      task={mockTask}
      deleteTodo={mockFn}
      editTodo={mockFn}
      toggleComplete={mockFn}
    />
  );

  const titleTask = screen.getByText(mockTask.task);
  const buttonEdit = screen.getByTestId("edit-icon");
  const buttonDelete = screen.getByTestId("delete-icon");

  expect(titleTask).toBeInTheDocument();
  expect(buttonEdit).toBeInTheDocument();
  expect(buttonDelete).toBeInTheDocument();

  await userEvent.click(buttonEdit);

  expect(mockFn).toHaveBeenCalled();
  expect(mockFn).toHaveBeenCalledWith(mockTask.id);

  await userEvent.click(buttonDelete);

  expect(mockFn).toHaveBeenCalled();
  expect(mockFn).toHaveBeenCalledWith(mockTask.id);

  await userEvent.click(titleTask);

  expect(mockFn).toHaveBeenCalled();
  expect(mockFn).toHaveBeenCalledWith(mockTask.id);
});

describe("Should Render Exact Classname", () => {
  test("If Is Completed True", () => {
    const mockTask = {
      id: Math.floor(Math.random() * 100),
      task: "Testing",
      completed: true,
      isEditing: false,
    };
    const { container } = render(<Todo task={mockTask} />);

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.getElementsByClassName("completed").length).toBe(1);
  });

  test("If Is Completed False", () => {
    const mockTask = {
      id: Math.floor(Math.random() * 100),
      task: "Testing",
      completed: false,
      isEditing: false,
    };
    const { container } = render(<Todo task={mockTask} />);

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.getElementsByClassName("incompleted").length).toBe(1);
  });
});
